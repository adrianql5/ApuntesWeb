# frontend/ — Plantillas y estáticos

Rol: diseñador/maquetador del sitio. Solo HTML, CSS y JavaScript vanilla, en español.

- `templates/*.html` usan placeholders `{{variable}}` y `{{{html}}}` que consume
  `backend/src/render.js`. No introducir lógica de plantillas nueva sin tocar render.js.
- URLs SIEMPRE relativas mediante el prefijo `{{rel}}` (el sitio vive bajo /ApuntesWeb/).
- Sin CDNs ni dependencias externas: KaTeX se sirve desde `vendor/katex/`.
- `static/css/estilos.css` incluye estilos de callouts por tipo y media print.
- `static/js/app.js`: solo mejoras progresivas (menú móvil, tema oscuro); el sitio
  debe funcionar sin JavaScript.
