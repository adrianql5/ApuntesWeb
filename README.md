# ApuntesWeb

Sitio estático de apuntes de Ingeniería Informática construido con Astro + Starlight.

## Flujo normal

1. Ingestar una carpeta de apuntes.
```bash
npm run ingest -- 3-TEORIA-1-CUATRI
```

2. Levantar el proyecto en local.
```bash
npm run dev
```

3. Construir para producción.
```bash
npm run build
```

## Comandos útiles

```bash
# Simular una ingesta sin escribir archivos
npm run ingest:dry -- 3-TEORIA-1-CUATRI

# Mantener las páginas índice actuales y solo copiar notas
npm run ingest -- 3-TEORIA-1-CUATRI --no-clean

# Regenerar el index.mdx del cuatrimestre importado
npm run ingest -- 3-TEORIA-1-CUATRI --rebuild-indexes

# Ver imágenes no usadas
npm run assets:check

# Borrar imágenes no usadas
npm run assets:prune
```

## Qué tocar normalmente

- `src/content/docs/`: apuntes y páginas índice.
- `src/styles/custom.css`: tema visual del sitio.
- `ingest.py`: copia apuntes Markdown al árbol de contenido.
- `scripts/prune_unused_images.py`: detecta y elimina imágenes huérfanas de `public/images`.

## Cómo funciona la ingesta

- Detecta el curso y cuatrimestre a partir del nombre de la carpeta.
- Copia Markdown a `src/content/docs/<curso>/<cuatrimestre>/<asignatura>/`.
- Copia imágenes a `public/images/<curso>/<cuatrimestre>/<asignatura>/`.
- Convierte enlaces de imágenes de Obsidian y Markdown a rutas web del proyecto.
- Añade frontmatter si el archivo no lo tenía.
- No regenera índices salvo que lo pidas explícitamente con `--rebuild-indexes`.

## Estructura mínima

```text
.
├── astro.config.mjs
├── ingest.py
├── public/
│   └── images/
├── scripts/
│   └── prune_unused_images.py
└── src/
    ├── content/
    │   └── docs/
    ├── pages/
    └── styles/
```

## Despliegue

El workflow de GitHub Pages está en `.github/workflows/deploy.yml`.
Con `push` a `main` se construye el sitio y se publica automáticamente.
