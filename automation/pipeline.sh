#!/bin/zsh
# Pipeline de publicación de ApuntesWeb:
#   build → PDFs → revisión con Claude → rama → push → PR
# La confirmación del usuario es el MERGE del PR desde el email de GitHub.
# Con --dry-run hace build + revisión pero NO toca git ni crea PR (para pruebas).
set -euo pipefail

DRY_RUN=0
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=1

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
REPO="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO"

log() { print -- "[pipeline $(date '+%H:%M:%S')] $*"; }

for cmd in node gh claude git; do
  command -v "$cmd" > /dev/null || { log "FALTA $cmd en el PATH"; exit 1; }
done

# 1) ¿Hay notas cambiadas desde la última revisión?
CAMBIOS="$(node backend/src/index.js changed)"
if [[ "$CAMBIOS" == "[]" ]]; then
  log "Sin cambios en los apuntes: nada que publicar."
  exit 0
fi
log "Notas cambiadas detectadas."

# 2) Build del sitio + PDFs de las asignaturas afectadas
log "Generando sitio…"
node backend/src/index.js build --strict
log "Generando PDFs de asignaturas cambiadas…"
node backend/src/index.js pdf --solo-cambiadas

# 3) Revisión de ortografía/coherencia con Claude (solo notas cambiadas)
mkdir -p review-tmp
rm -f review-tmp/informe.md
log "Lanzando revisión con Claude…"
if ! claude -p "Ejecuta la skill del proyecto revisar-apuntes: revisa las notas que devuelva 'node backend/src/index.js changed' y escribe el informe en review-tmp/informe.md con el formato de la skill." \
  --model haiku \
  --allowedTools "Bash(node backend/src/index.js changed),Read,Write" > review-tmp/claude.log 2>&1; then
  log "AVISO: la revisión con Claude falló (ver review-tmp/claude.log); sigo sin informe."
fi
if [[ ! -f review-tmp/informe.md ]]; then
  {
    print "# Actualización de apuntes — $(date '+%d/%m/%Y')"
    print
    print "La revisión automática no generó informe. Notas cambiadas:"
    print
    print '```json'
    print -- "$CAMBIOS"
    print '```'
  } > review-tmp/informe.md
fi

if (( DRY_RUN )); then
  log "Dry-run: build y revisión hechos; NO se registra la revisión ni se crea PR."
  log "Informe en review-tmp/informe.md; sitio en docs/ (sirve con: python3 -m http.server -d docs)."
  exit 0
fi

# 4) Registrar la revisión, commitear la salida y abrir PR
node backend/src/index.js changed --update
RAMA="apuntes/$(date '+%Y%m%d-%H%M')"
git checkout -b "$RAMA"
git add docs automation/state.json
if git diff --cached --quiet; then
  log "La salida generada no cambió: nada que publicar."
  git checkout main && git branch -D "$RAMA"
  exit 0
fi
git commit -m "Apuntes: actualización $(date '+%d/%m/%Y %H:%M')"
git push -u origin "$RAMA"

gh pr create \
  --title "Apuntes: actualización $(date '+%d/%m/%Y')" \
  --body-file review-tmp/informe.md
log "PR creado. Recibirás el email de GitHub: Merge = publicar, Close = descartar."

git checkout main
