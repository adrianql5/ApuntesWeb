#!/bin/zsh
# Instala (o desinstala con --uninstall) el job diario de publicación.
# Cada día a las 21:00, launchd lanza una mini-app (ApuntesWebDiario.app) que
# ejecuta pipeline.sh: si git detecta notas modificadas en las bóvedas → build,
# revisión con Claude y PR; si no hay cambios, termina sin hacer nada.
# La mini-app existe por el TCC de macOS: como bundle con identificador propio,
# un único permiso de acceso al Escritorio cubre toda la cadena de procesos.
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
PLIST_ORIGEN="$REPO/automation/com.adrianql5.apuntesweb.diario.plist"
PLIST_DESTINO="$HOME/Library/LaunchAgents/com.adrianql5.apuntesweb.diario.plist"
ETIQUETA="com.adrianql5.apuntesweb.diario"
APP_DIR="$HOME/Library/ApuntesWeb"
APP="$APP_DIR/ApuntesWebDiario.app"

if [[ "${1:-}" == "--uninstall" ]]; then
  launchctl bootout "gui/$(id -u)/$ETIQUETA" 2>/dev/null || true
  rm -f "$PLIST_DESTINO"
  rm -rf "$APP"
  print "Job diario desinstalado."
  exit 0
fi

# 1. Compilar la mini-app envoltorio
mkdir -p "$APP_DIR"
rm -rf "$APP"
osacompile -o "$APP" -e "do shell script \"exec /bin/zsh '$REPO/automation/pipeline.sh' >> \$HOME/Library/Logs/apuntesweb-diario.log 2>&1\""
# Sin icono en el Dock + identificador de bundle (osacompile no lo pone y el TCC
# lo necesita); tras tocar el Info.plist hay que volver a firmar.
defaults write "$APP/Contents/Info" LSUIElement -bool true
defaults write "$APP/Contents/Info" CFBundleIdentifier "com.adrianql5.apuntesweb.diarioapp"
codesign --force --sign - "$APP"

# 2. Instalar el LaunchAgent
mkdir -p "$HOME/Library/LaunchAgents"
cp "$PLIST_ORIGEN" "$PLIST_DESTINO"
launchctl bootout "gui/$(id -u)/$ETIQUETA" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$PLIST_DESTINO"
print "Job diario instalado: cada día a las 21:00. Log: ~/Library/Logs/apuntesweb-diario.log"
print "La primera ejecución macOS preguntará si ApuntesWebDiario puede acceder al"
print "Escritorio: hay que PERMITIRLO (un único permiso para toda la cadena)."
print "Probar ahora:  launchctl kickstart gui/\$(id -u)/$ETIQUETA"
print "Desinstalar:   automation/install-daily.sh --uninstall"
