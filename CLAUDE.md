# ApuntesWeb

Sitio estático (español) con apuntes de Ingeniería Informática, publicado en
https://adrianql5.github.io/ApuntesWeb/ vía GitHub Pages.

- Las fuentes son bóvedas de Obsidian en el Desktop, listadas en `apuntes.config.json`.
  Este repo NO contiene los apuntes fuente, solo el generador y la salida.
- Build: `node backend/src/index.js build` (corre en local; CI solo publica).
- `docs/` es 100 % generada: NUNCA editarla a mano.
- Despliegue: `automation/pipeline.sh` (job diario o skill `desplegar`) commitea en
  `main` y hace push cuando la bóveda lleva ≥30 min sin tocarse; el push dispara
  GitHub Actions → Pages. Sin PRs.
- Erratas de lectores: botón ✎ junto a cada párrafo → GitHub Issue (plantilla
  `.github/ISSUE_TEMPLATE/errata.md`); la web marca los párrafos con Issues abiertos.
- Estructura: `backend/` (generador Node), `frontend/` (plantillas y estáticos),
  `automation/` (job diario + pipeline), `plantillas/` (contenido canónico).
