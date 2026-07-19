# ApuntesWeb

Apuntes de Ingeniería Informática publicados en
**https://adrianql5.github.io/ApuntesWeb/**.

Los apuntes se escriben en bóvedas de Obsidian en local; este repo contiene el
generador estático (backend), las plantillas del sitio (frontend), la salida
generada (`docs/`, lo que publica GitHub Pages) y la automatización de despliegue.

## Cómo funciona

```
Bóvedas Obsidian (Desktop)
        │  node backend/src/index.js build + pdf   (local)
        ▼
      docs/  ──commit──▶ rama apuntes/… ──gh pr create──▶ PR
                                                           │  email de GitHub
                                                           ▼
                                             Merge desde Gmail = confirmar
                                                           │
                                                           ▼
                                        GitHub Actions → GitHub Pages
```

- **backend/**: generador Node.js a medida. Convierte markdown Obsidian (LaTeX,
  callouts, embeds `![[...]]`) a HTML con KaTeX renderizado en servidor, copia las
  imágenes referenciadas y genera un PDF por asignatura con Chrome (puppeteer-core).
- **frontend/**: plantillas HTML + CSS + JS vanilla. URLs relativas (el sitio vive
  bajo `/ApuntesWeb/`), sin CDNs.
- **automation/**: cada día a las 21:00, un LaunchAgent comprueba con git si hay
  notas modificadas en las bóvedas; si las hay ejecuta el pipeline: build →
  revisión de ortografía/coherencia con Claude (solo notas modificadas) → PR con el
  informe en el cuerpo. GitHub envía el email; **merge = publicar, close = descartar**.
- **docs/**: salida generada y commiteada. GitHub Actions la publica en Pages en
  cada push a `main`.

## Comandos

```sh
node backend/src/index.js scan                 # inspecciona las bóvedas, estadísticas
node backend/src/index.js build [--strict]     # genera el sitio en docs/
node backend/src/index.js pdf [--solo-cambiadas]
node backend/src/index.js changed [--update]   # notas modificadas desde la última revisión
automation/pipeline.sh                         # flujo completo de publicación (¡crea PR!)
automation/pipeline.sh --dry-run               # build + revisión SIN tocar git (pruebas)
automation/install-daily.sh [--uninstall]      # instala el job diario de las 21:00 (launchd)
```

> **Requisito del job diario (macOS):** el Escritorio está protegido por TCC y los
> permisos no se heredan entre binarios bajo launchd. Por eso el job corre dentro
> de una mini-app (`ApuntesWebDiario.app`, la crea el instalador) que necesita un
> único permiso de acceso al Escritorio — macOS lo pide con un diálogo la primera
> vez. Si el log muestra `can't open input file` o `EPERM: uv_cwd`, falta ese
> permiso (Ajustes → Privacidad y seguridad → Archivos y carpetas).

Skills de Claude Code del proyecto: `revisar-apuntes`, `construir`, `desplegar`,
`normalizar-readme` (+ `frontend-design` instalada del marketplace oficial).

## Alternativa: conectar Gmail a Claude Code (opcional)

El flujo por defecto usa el email nativo de GitHub (PR → notificación → merge desde
el correo) y no necesita credenciales. Si algún día quieres que Claude redacte o lea
correos directamente, puedes conectar un servidor MCP de Gmail:

```sh
claude mcp add --transport http gmail <url-del-conector>   # conector remoto, o
claude mcp add gmail -- npx <paquete-mcp-gmail>            # servidor local
```

y autenticar con OAuth desde `/mcp` en Claude Code. Ten en cuenta que eso guarda un
token de acceso a tu correo en local; el flujo por PR no lo requiere.
