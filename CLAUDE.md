# ApuntesWeb

Sitio estático (español) con apuntes de Ingeniería Informática, publicado en
https://adrianql5.github.io/ApuntesWeb/ vía GitHub Pages.

- Las fuentes son bóvedas de Obsidian en el Desktop, listadas en `apuntes.config.json`.
  Este repo NO contiene los apuntes fuente, solo el generador y la salida.
- Build: `node backend/src/index.js build` (corre en local; CI solo publica).
- `docs/` es 100 % generada: NUNCA editarla a mano.
- Despliegue: siempre vía PR (skill `desplegar` o `automation/pipeline.sh`); el merge
  del PR es la confirmación del usuario y dispara GitHub Actions → Pages.
- Estructura: `backend/` (generador Node), `frontend/` (plantillas y estáticos),
  `automation/` (job diario + pipeline), `plantillas/` (contenido canónico).
