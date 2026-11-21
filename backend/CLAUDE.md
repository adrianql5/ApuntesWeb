# backend/ — Generador estático

Rol: mantenedor del generador Node.js (ESM, sin frameworks) que convierte las bóvedas
de Obsidian en el sitio de `docs/`.

- Pipeline en `src/`: `scanner` → `markdown` → `render` → `assets` → `pdf`.
- CLI: `node src/index.js scan | build [--strict] | pdf [--solo-cambiadas] | changed [--update] | clean`.
- Markdown Obsidian: mates `$..$`/`$$..$$` (KaTeX en servidor), callouts `>[!Tipo]`,
  embeds `![[imagen.png|tamaño]]` con nombre desnudo (resolución: asignatura primero,
  luego índice global de la bóveda).
- Cualquier soporte de sintaxis nueva va SOLO en `src/markdown.js`.
- Rutas de bóvedas: solo desde `apuntes.config.json`, nunca hardcodeadas.
- URLs de salida siempre relativas; slugs ASCII vía `src/slug.js`.
- PDFs: imágenes comprimidas solo para el PDF (caché en /tmp, originales intactos);
  >45 MB → partes `<id>-parte-N.pdf`. `pdf` debe correr ANTES de `build`, que enlaza
  las partes que encuentre en `docs/pdf/`.
