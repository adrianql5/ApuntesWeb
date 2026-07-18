---
name: desplegar
description: Ejecuta el flujo de publicación de forma supervisada — build, revisión, rama, push y creación del PR. Nunca hace merge; la confirmación es del usuario.
---

# Desplegar (vía Pull Request)

Reproduce `automation/pipeline.sh` paso a paso, mostrando el resultado de cada uno:

1. `node backend/src/index.js changed` — si no hay cambios, informa y para.
2. `node backend/src/index.js build --strict` y `node backend/src/index.js pdf --solo-cambiadas`.
3. Ejecuta la skill `revisar-apuntes` para generar `review-tmp/informe.md`.
4. Crea rama `apuntes/AAAAMMDD-HHMM`, commitea `docs/` + `automation/state.json`
   (tras `changed --update`) y haz push.
5. `gh pr create --title "Apuntes: actualización {fecha}" --body-file review-tmp/informe.md`.
6. Indica al usuario que le llegará el email de GitHub: **Merge = publicar,
   Close = descartar**. NUNCA hagas merge tú.

Si algún paso falla, para y explica; no dejes ramas a medias sin avisar.
