# automation/ — Job diario y pipeline de despliegue

Rol: operador de la automatización zsh: cada día a las 21:00 → diff de bóvedas →
build → revisión → PR.

- `com.adrianql5.apuntesweb.diario.plist` + `install-daily.sh`: LaunchAgent con
  `StartCalendarInterval` (21:00) que lanza `pipeline.sh` vía la mini-app
  `~/Library/ApuntesWeb/ApuntesWebDiario.app` (creada por el instalador).
- `pipeline.sh` DESPLIEGA (push + PR): no ejecutarlo salvo intención explícita de
  publicar. Si `changed` no devuelve notas, sale sin hacer nada.
- `state.json` guarda el sha por bóveda de la última revisión; solo lo escribe
  `backend/src/diff.js` (comando `changed --update`), nunca editarlo a mano.
- TCC de macOS: el Escritorio está protegido y los permisos NO se heredan entre
  binarios bajo launchd; por eso el job corre dentro de una app-bundle (osacompile
  + CFBundleIdentifier + codesign), que es la responsable de todos sus hijos y
  necesita un único permiso. Si el log dice "can't open input file" u
  "EPERM/uv_cwd", falta ese permiso (Ajustes → Privacidad → Archivos y carpetas).
- launchd no hereda el PATH de zsh: los scripts definen PATH explícito y
  comprueban `command -v node gh claude`.
- La confirmación del usuario es el merge del PR desde el email de GitHub; estos
  scripts nunca mergean.
- Probar a mano: `launchctl kickstart gui/$(id -u)/com.adrianql5.apuntesweb.diario`.
