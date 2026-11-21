#!/bin/zsh
# Pipeline de publicación de ApuntesWeb:
#   sync con origin → ¿cambios? → ¿bóveda en reposo? → build → PDFs →
#   commit en main → push (GitHub Actions publica en Pages)
# "En reposo" = ningún archivo cambiado se ha tocado en los últimos REPOSO_MIN
# minutos; si estás editando espera (hasta ESPERA_MAX_MIN) para no publicar a medias.
# Con --dry-run hace el build pero NO toca git (para pruebas).
set -euo pipefail

DRY_RUN=0
[[ "${1:-}" == "--dry-run" ]] && DRY_RUN=1

REPOSO_MIN=30
ESPERA_MAX_MIN=180

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$HOME/.local/bin"
REPO="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO"

log() { print -- "[pipeline $(date '+%d/%m %H:%M:%S')] $*"; }

for cmd in node git; do
  command -v "$cmd" > /dev/null || { log "FALTA $cmd en el PATH"; exit 1; }
done

# 0) Partir siempre de main limpio y al día (si no, se construye con config vieja)
if (( ! DRY_RUN )); then
  if [[ -n "$(git status --porcelain)" ]]; then
    log "El repo tiene cambios sin commitear: no publico para no mezclarlos."
    exit 1
  fi
  git checkout -q main
  git pull -q --ff-only origin main
fi

# 1) ¿Hay notas cambiadas desde la última publicación?
CAMBIOS="$(node backend/src/index.js changed)"
if [[ "$CAMBIOS" == "[]" ]]; then
  log "Sin cambios en los apuntes: nada que publicar."
  exit 0
fi
log "Notas cambiadas detectadas."

# 2) Esperar a que la bóveda esté en reposo
minutos_desde_ultima_edicion() {
  node -e '
    const { statSync } = require("node:fs");
    const rutas = JSON.parse(process.argv[1]).flatMap((v) => v.notas.map((n) => n.ruta));
    const ultima = Math.max(...rutas.map((r) => statSync(r).mtimeMs));
    console.log(Math.floor((Date.now() - ultima) / 60000));
  ' "$(node backend/src/index.js changed)"
}
ESPERADO=0
while (( $(minutos_desde_ultima_edicion) < REPOSO_MIN )); do
  if (( ESPERADO >= ESPERA_MAX_MIN )); then
    log "Llevas ${ESPERA_MAX_MIN} min editando sin parar: lo dejo para la próxima ejecución."
    exit 0
  fi
  log "Edición reciente (< ${REPOSO_MIN} min): espero 10 min para no publicar a medias…"
  sleep 600
  ESPERADO=$(( ESPERADO + 10 ))
done
CAMBIOS="$(node backend/src/index.js changed)"

# 3) PDFs de las asignaturas afectadas y build del sitio (en este orden: el build
#    enlaza las partes en que se haya dividido un PDF grande)
log "Generando PDFs de asignaturas cambiadas…"
node backend/src/index.js pdf --solo-cambiadas
log "Generando sitio…"
node backend/src/index.js build --strict

if (( DRY_RUN )); then
  log "Dry-run: build hecho; NO se registra ni se publica nada."
  log "Sitio en docs/ (sirve con: python3 -m http.server -d docs)."
  exit 0
fi

# 4) Commit en main y push. state.json solo queda registrado si el push llega a
#    GitHub: si falla, se deshace el commit y la próxima ejecución lo reintenta.
BASE="$(git rev-parse HEAD)"
node backend/src/index.js changed --update
git add docs automation/state.json
if git diff --cached --quiet; then
  log "La salida generada no cambió: solo registro el estado."
fi
ASIGNATURAS="$(print -- "$CAMBIOS" | node -e '
  let s = ""; process.stdin.on("data", (d) => (s += d)).on("end", () => {
    const a = JSON.parse(s).flatMap((v) => v.notas.map((n) => `${v.vault} ${n.asignatura}`));
    console.log([...new Set(a)].join(", "));
  });')"
git commit -q -m "Apuntes: actualización $(date '+%d/%m/%Y %H:%M')" -m "Cambios en: $ASIGNATURAS"
if ! git push -q origin main; then
  log "ERROR: el push falló (¿sin red?). Deshago el commit; se reintentará en la próxima ejecución."
  git reset -q --hard "$BASE"
  exit 1
fi
log "Publicado ($ASIGNATURAS). GitHub Actions lo desplegará en Pages en ~1 min."
