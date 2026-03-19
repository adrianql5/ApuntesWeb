# ApuntesWeb

Sitio estático de apuntes de Ingeniería Informática pensado para publicar contenido en GitHub Pages sin depender de backend.

## Qué tecnologías usa este proyecto

### Astro

Astro es el framework base del proyecto. Sirve para construir una web estática a partir de archivos y componentes, generando HTML listo para publicar.

Aquí se usa porque:

- encaja muy bien con sitios de documentación y contenido;
- permite compilar todo a estático, que es justo lo que necesita GitHub Pages;
- mantiene el proyecto relativamente simple: contenido en ficheros, build y despliegue.

### Starlight

Starlight es la capa de documentación que va encima de Astro. Aporta navegación, sidebar, tabla de contenidos, búsqueda y estructura de docs.

Aquí se usa porque:

- evita tener que construir desde cero toda la navegación de apuntes;
- organiza bien contenido jerárquico por curso, cuatrimestre y asignatura;
- ya resuelve cosas importantes como layout de documentación, sidebar y buscador.

### CSS propio

El estilo visual del sitio está en `src/styles/custom.css`.

Se usa CSS manual porque:

- permite controlar la apariencia sin meter otra herramienta adicional;
- hace más fácil retocar la estética del sitio sin depender de un sistema de diseño externo;
- reduce complejidad frente a añadir Tailwind, Sass u otra capa extra.

### Python

Python se usa para la ingesta de apuntes y para tareas auxiliares.

Archivos principales:

- `ingest.py`: copia notas Markdown e imágenes al árbol del proyecto.
- `scripts/prune_unused_images.py`: detecta y opcionalmente borra imágenes que ya no se usan.

Se usa Python porque:

- para mover archivos, reescribir rutas y normalizar contenido es directo y mantenible;
- evita meter scripts más largos y más incómodos en shell o JavaScript sólo para tareas de importación.

### KaTeX, `remark-math` y `rehype-katex`

Estas dependencias sirven para renderizar fórmulas matemáticas escritas en Markdown.

Se usan porque:

- los apuntes incluyen notación matemática;
- permiten escribir fórmulas en texto y renderizarlas en la web durante la build.

### Sharp

`sharp` se usa como dependencia de procesamiento de imágenes dentro del ecosistema de Astro.

En la práctica sirve para que Astro pueda manejar imágenes estáticas de forma correcta en build.

## Estructura importante

```text
.
├── astro.config.mjs
├── ingest.py
├── package.json
├── public/
│   └── images/
├── scripts/
│   └── prune_unused_images.py
└── src/
    ├── assets/
    ├── content/
    │   └── docs/
    ├── pages/
    └── styles/
```

## Para qué sirve cada parte principal

- `astro.config.mjs`: configuración global de Astro y Starlight, incluyendo `site`, `base`, sidebar y plugins de Markdown.
- `src/content/docs/`: contenido de los apuntes y páginas índice.
- `src/styles/custom.css`: apariencia visual del sitio.
- `public/images/`: imágenes copiadas durante la ingesta.
- `src/pages/404.astro`: página 404 personalizada.
- `ingest.py`: entrada principal para importar apuntes al proyecto.

## Flujo normal de trabajo

### 1. Ingestar una carpeta de apuntes

```bash
npm run ingest -- 3-TEORIA-1-CUATRI
```

### 2. Levantar el proyecto en local

```bash
npm run dev
```

### 3. Construir para producción

```bash
npm run build
```

## Comandos útiles

```bash
# Simular una ingesta sin escribir archivos
npm run ingest:dry -- 3-TEORIA-1-CUATRI

# Ver imágenes no usadas
npm run assets:check

# Borrar imágenes no usadas
npm run assets:prune
```

## Cómo funciona la ingesta

La ingesta está pensada para coger una carpeta de apuntes en Markdown y adaptarla al árbol del sitio.

Hace lo siguiente:

- detecta curso y cuatrimestre a partir del nombre de la carpeta origen;
- copia Markdown a `src/content/docs/<curso>/<cuatrimestre>/<asignatura>/`;
- copia imágenes a `public/images/<curso>/<cuatrimestre>/<asignatura>/`;
- reescribe rutas de imágenes para que funcionen en la web;
- añade frontmatter si falta;
- convierte algunos formatos de notas importadas al formato que entiende mejor Starlight.

## Cómo se despliega la aplicación

El despliegue se hace en GitHub Pages con GitHub Actions.

Workflow:

- archivo: `.github/workflows/deploy.yml`
- evento: `push` a la rama `main`, o ejecución manual

Pasos del workflow:

1. clona el repositorio;
2. instala Node 20;
3. ejecuta `npm ci`;
4. ejecuta `npm run build`;
5. sube `dist/` como artefacto;
6. publica ese artefacto en GitHub Pages.

## Por qué la configuración de Astro lleva `site` y `base`

En `astro.config.mjs` están definidos:

- `site: 'https://adrianql5.github.io/ApuntesWeb'`
- `base: '/ApuntesWeb'`

Esto es necesario porque la web no se publica en la raíz del dominio, sino dentro del subpath `/ApuntesWeb`. Sin esa configuración, los CSS, scripts e imágenes se romperían al desplegar en GitHub Pages.
