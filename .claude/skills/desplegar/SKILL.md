---
name: desplegar
description: Ejecuta el flujo de publicación de forma supervisada — build, commit en main y push (GitHub Actions publica en Pages).
---

# Desplegar (push a main)

Reproduce `automation/pipeline.sh` paso a paso, mostrando el resultado de cada uno:

1. Comprueba que el repo está limpio, cambia a `main` y haz `git pull --ff-only`.
2. `node backend/src/index.js changed` — si no hay cambios, informa y para. Si alguna
   nota cambiada se editó hace menos de 30 min, avisa de que podría estar a medias y
   pregunta antes de seguir.
3. `node backend/src/index.js build --strict` y `node backend/src/index.js pdf --solo-cambiadas`.
4. `node backend/src/index.js changed --update`, commitea `docs/` + `automation/state.json`
   en `main` con "Apuntes: actualización {fecha}" y haz push.
5. Si el push falla, `git reset --hard` al commit anterior para que `state.json` no
   registre como publicado algo que no llegó a GitHub.

Si algún paso falla, para y explica.
