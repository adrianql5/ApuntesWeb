#!/bin/zsh
# Instala (o desinstala con --uninstall) el LaunchAgent del watcher de Obsidian.
set -euo pipefail

PLIST_ORIGEN="$(cd "$(dirname "$0")" && pwd)/com.adrianql5.apuntesweb.watcher.plist"
PLIST_DESTINO="$HOME/Library/LaunchAgents/com.adrianql5.apuntesweb.watcher.plist"
ETIQUETA="com.adrianql5.apuntesweb.watcher"

if [[ "${1:-}" == "--uninstall" ]]; then
  launchctl bootout "gui/$(id -u)/$ETIQUETA" 2>/dev/null || true
  rm -f "$PLIST_DESTINO"
  print "Watcher desinstalado."
  exit 0
fi

mkdir -p "$HOME/Library/LaunchAgents"
cp "$PLIST_ORIGEN" "$PLIST_DESTINO"
launchctl bootout "gui/$(id -u)/$ETIQUETA" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$PLIST_DESTINO"
print "Watcher instalado y arrancado. Log: ~/Library/Logs/apuntesweb-watcher.log"
print "Desinstalar: automation/install-watcher.sh --uninstall"
