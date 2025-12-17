# 🎓 ApuntesWeb - Visualizador de Apuntes Universitarios

Sitio web estático para visualizar apuntes de Ingeniería Informática organizados por curso y asignatura.

## 📁 Estructura del Proyecto

```
ApuntesWeb/
├── ingest.py              # Script de ingesta de archivos
├── astro.config.mjs       # Configuración de Astro
├── package.json           # Dependencias
├── public/                # Archivos estáticos
└── src/
    ├── content/
    │   └── docs/          # ➡️ Los apuntes se copian aquí
    │       ├── index.mdx
    │       ├── segundo/
    │       │   ├── primer-cuatrimestre/
    │       │   └── segundo-cuatrimestre/
    │       └── tercero/
    │           └── primer-cuatrimestre/
    └── styles/
        └── custom.css     # Estilos personalizados
```

## 🚀 Inicio Rápido

### 1. Ejecutar el Script de Ingesta

Primero, copia tus apuntes a la estructura del proyecto:

```bash
# Vista previa (sin hacer cambios)
python3 ingest.py --dry-run

# Ejecutar la copia
python3 ingest.py
```

**Opciones:**
- `--source-dir RUTA`: Directorio donde están las carpetas de origen (default: `~/Escritorio`)
- `--dry-run`: Simula la copia sin hacer cambios reales

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

Abre http://localhost:4321 en tu navegador.

### 4. Construir para Producción

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`.

## 📂 Estructura de Carpetas de Origen

El script busca las siguientes carpetas en `~/Escritorio`:

```
~/Escritorio/
├── 2-TEORIA-1-CUATRI/     # Segundo curso, primer cuatrimestre
│   ├── AED/
│   ├── BASES DE DATOS/
│   ├── POO/
│   ├── REDES/
│   └── SISTEMAS OPERATIVOS/
├── 2-TEORIA-2-CUATRI/     # Segundo curso, segundo cuatrimestre
│   ├── AQRCOMP/
│   ├── BDII/
│   ├── COGA/
│   ├── DESOFT/
│   ├── SOII/
│   └── XEFE/
└── 3-TEORIA-1-CUATRI/     # Tercer curso, primer cuatrimestre
    ├── ASR/
    ├── IA/
    ├── COMDIS/
    ├── ENSO/
    └── TALF/
```

## 🔧 Reglas del Script de Ingesta

El script aplica las siguientes reglas:

| Regla | Descripción |
|-------|-------------|
| ✅ Solo `.md` | Solo copia archivos Markdown |
| ❌ Ignora `*_PDF` | Carpetas con sufijo `_PDF` son ignoradas |
| ❌ Ignora `README.md` | Archivos README no se copian |
| ❌ Ignora `LICENSE` | Archivos de licencia no se copian |
| ❌ Ignora `TO-DO.md` | Archivos de tareas no se copian |
| ❌ Ignora `Sin título*` | Archivos sin título no se copian |

## 🎨 Personalización

### Colores

Edita `src/styles/custom.css` para cambiar los colores:

```css
:root {
  --sl-color-accent: #2b6cb0;      /* Color principal */
  --sl-color-accent-high: #4299e1;  /* Color claro */
  --sl-color-accent-low: #1a365d;   /* Color oscuro */
}
```

### Sidebar

Modifica `astro.config.mjs` para cambiar la estructura de navegación.

## 📚 Tecnologías

- **[Astro](https://astro.build/)** - Framework web
- **[Starlight](https://starlight.astro.build/)** - Tema de documentación
- **Python 3** - Script de ingesta

## 🌐 Despliegue en GitHub Pages

El proyecto incluye un workflow de GitHub Actions para despliegue automático.

### Pasos para desplegar:

1. **Crear repositorio en GitHub** (ej: `ApuntesWeb`)

2. **Verificar configuración** en `astro.config.mjs`:
   ```javascript
   site: 'https://TU-USUARIO.github.io',
   base: '/NOMBRE-REPO',
   ```

3. **Inicializar Git y subir**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/NOMBRE-REPO.git
   git push -u origin main
   ```

4. **Configurar GitHub Pages**:
   - Ve a Settings → Pages
   - Source: **GitHub Actions**

5. El sitio estará disponible en: `https://TU-USUARIO.github.io/NOMBRE-REPO/`

---

> 💡 **Tip**: Usa `Ctrl + K` para buscar contenido rápidamente en el sitio.
