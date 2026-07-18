---
name: construir
description: Ejecuta el build completo del sitio (y PDFs si se pide), muestra estadísticas y embeds sin resolver, y sirve docs/ en local para comprobarlo.
---

# Construir el sitio

1. Desde la raíz del repo: `node backend/src/index.js build --strict`.
   - Si falla por embeds sin resolver, lista cada uno (nota + imagen) y sugiere si
     es un typo del nombre o una imagen que falta en la bóveda.
2. Si el usuario pidió PDFs: `node backend/src/index.js pdf`.
3. Muestra las estadísticas del build (asignaturas, notas, imágenes copiadas).
4. Sirve la salida en local: `python3 -m http.server 8788 -d docs` en segundo plano
   y abre/indica `http://localhost:8788/`.
5. No commitees ni despliegues: para eso está la skill `desplegar`.
