#!/bin/zsh
# Watcher de Obsidian: cuando la app pasa de abierta a cerrada, lanza pipeline.sh.
# Pensado para correr bajo launchd (KeepAlive). Log: ~/Library/Logs/apuntesweb-watcher.log
set -u

export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"
REPO="$(cd "$(dirname "$0")/.." && pwd)"
LOCK="/tmp/apuntesweb-pipeline.lock"
COOLDOWN=300   # segundos mínimos entre ejecuciones del pipeline
INTERVALO=15   # segundos entre comprobaciones de proceso

log() { print -- "[watcher $(date '+%Y-%m-%d %H:%M:%S')] $*"; }

log "Watcher iniciado (repo: $REPO)."
estado_previo="cerrado"
ultima_ejecucion=0

while true; do
  if pgrep -xq Obsidian; then
    estado="abierto"
  else
    estado="cerrado"
  fi

  if [[ "$estado_previo" == "abierto" && "$estado" == "cerrado" ]]; then
    ahora=$(date +%s)
    if (( ahora - ultima_ejecucion < COOLDOWN )); then
      log "Obsidian cerrado, pero en cooldown: no se relanza el pipeline."
    elif [[ -e "$LOCK" ]]; then
      log "Obsidian cerrado, pero hay un pipeline en curso (lock presente)."
    else
      log "Obsidian se ha cerrado: lanzando pipeline."
      touch "$LOCK"
      if "$REPO/automation/pipeline.sh"; then
        log "Pipeline terminado correctamente."
      else
        log "Pipeline terminó con error ($?)."
      fi
      rm -f "$LOCK"
      ultima_ejecucion=$(date +%s)
    fi
  fi

  estado_previo="$estado"
  sleep "$INTERVALO"
done
