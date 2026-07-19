# automation/ — Watcher y pipeline de despliegue

Rol: operador de la automatización zsh: cierre de Obsidian → build → revisión → PR.

- `watch-obsidian.sh`: LaunchAgent que vigila el proceso Obsidian (poll `pgrep`).
- `pipeline.sh` DESPLIEGA (push + PR): no ejecutarlo salvo intención explícita de publicar.
- `state.json` guarda el sha por bóveda de la última revisión; solo lo escribe
  `backend/src/diff.js` (comando `changed --update`), nunca editarlo a mano.
- launchd no hereda el PATH de zsh: los scripts definen PATH explícito y comprueban
  `command -v node gh claude` antes de nada.
- TCC de macOS: el Escritorio está protegido; para que el watcher funcione bajo
  launchd, `/bin/zsh` necesita "Acceso total al disco" (Ajustes → Privacidad y
  seguridad). Sin eso, el log muestra "can't open input file".
- La confirmación del usuario es el merge del PR desde el email de GitHub; estos
  scripts nunca mergean.
