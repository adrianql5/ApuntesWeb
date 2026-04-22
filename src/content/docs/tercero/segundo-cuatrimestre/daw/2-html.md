---
title: "HTML"
---

# 2.1 Introducción
## 2.1.1 Qué es la Web y qué papel juega HTML
La Web se define como un **conjunto de documentos residentes en diferentes máquinas, relacionados mediante hiperenlaces**.

En este contexto:
- el **servidor web** pertenece al **backend**,
- el **navegador** pertenece al **frontend**,
- el **frontend** de un sitio web es todo aquello con lo que el usuario interactúa.


**HTML** sirve para estructurar el contenido que va a visualizar el navegador. En la práctica docente también se resume así:
1. estructurar los contenidos de una página web,
2. enlazar páginas web,
3. mostrar elementos multimedia,
4. visualizar los contenidos de la página en un navegador.


## 2.1.2 HTML: definición y origen
**HTML** significa **HyperText Markup Languaje**. Fue propuesto en 1989 y sus ideas base son:
- **Universalidad**
- **Lenguaje de marcas** → uso de etiquetas
- **Hipertexto** → documentos conectados mediante enlaces

Además:
- el concepto de **lenguaje de marcas** se asocia a **Tunnicliffe (1967)**,
- el concepto de **hipertexto** se asocia a **Ted Nelson (1965)**.

La **página** es el documento que incluye el contenido a m12caostrar.


## 2.1.3 Navegador, renderizado y servidor web
## El navegador
El navegador es la herramienta que interpreta el código HTML escrito en la página web. Es el programa cliente.

El **motor de renderizado** de un navegador web es la parte encargada de tomar el contenido (HTML, XML, imágenes, etc.) y la información de formato (CSS, etc.) para crear una representación visual de la página.

- Antes de 1993 los navegadores incluían poca funcionalidad.
- En 1993 Marc Andreessen desarrolla Mosaic en la NCSA.
- En 1994 surge Netscape, con extensiones HTML propias.
- Microsoft responde con Internet Explorer.
- En 1994 se crea el consorcio **W3C** con Tim Berners-Lee para poner orden y establecer estándares.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-9.png)

### El servidor web
El servidor web es el programa encargado de recibir las peticiones desde el lado cliente y servir contenido estático correspondiente a ficheros HTML, CSS, JavaScript y/o imágenes.

El **motor HTTP** es la parte del servidor encargada de recibir solicitudes HTTP/HTTPS, interpretarlas, determinar rutas, gestionar cabeceras, métodos y estados, y enviar la respuesta.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-10.png)


## 2.1.4 URL y publicación de una página web
Una URL como:

```text
http://www.lawebdepepe.com/index.html
```

se descompone en:
- `http://` → protocolo
- `www.lawebdepepe.com` → nombre del sitio web
- `laweb` → ruta hasta raíz
- `index.html` → fichero HTML

### Formas de publicación
- inserción en servidor web propio,
- hosting.

### Dominio e instituciones asociadas
- **ICANN** → Internet Corporation for Assigned Names and Numbers.
- **WHOIS** → directorio con información técnica y de contacto de los propietarios de dominios.
- **DNRD** → Domain Name Registration Data.



# 2.2 Historia y versiones de HTML

## 2.2.1 Historia del HTML

### Hitos principales
- **1989**: Tim Berners-Lee y Robert Cailliau presentan en el CERN la propuesta WorldWideWeb (W3).
- **1991**: se publica “HTML Tags”, primer documento formal con 22 etiquetas.
- **1993**: primera propuesta oficial para convertir HTML en estándar por parte del IETF, que no fructifica.
- **1996**: el W3C publicará los diferentes estándares HTML.
- **2004**: Apple, Mozilla y Opera crean WHATWG para relanzar la estandarización ante la pasividad del W3C.
- **Enero 2008**: primer Working Draft de HTML 5.0.
- **Diciembre 2012**: primera Candidate Recommendation de HTML 5.0.
- **Julio 2014**: el W3C comienza a discutir los Web Components, que permiten crear etiquetas personalizadas.

## 2.2.2 Proceso de estandarización y versiones
**HTML 1.0 y 2.0**
- No hay lugar para adornos.
- Texto plano con hiperenlaces.

**HTML 3.0**
- aparecen nuevas etiquetas propietarias,
- posibilidad de contenidos enriquecidos mediante colores e imágenes,
- guerra de navegadores.

**HTML 3.2**
- se estandarizan extensiones propietarias, incluyendo algunas y eliminando otras,
- se anima a los creadores de navegadores a seguir dichos estándares.

**HTML 4.0**
- separación entre contenido, estructura y formato mediante CSS.

**HTML 4.01**
- todo elemento de línea tiene que estar dentro de un elemento de bloque.

**XHTML 1.0**
- busca mantener la estructura XML,
- las etiquetas que abren necesariamente han de cerrarse.

**HTML 5.0**
- menor compatibilidad con versiones obsoletas,
- facilita el desarrollo de nuevos navegadores,
- incorpora nuevas etiquetas.

## 2.2.3 Tipos de versiones: estricta, transitoria y marcos
**Estricta**
Solo se permite el uso de las etiquetas actualmente aprobadas.

**Transitoria**
Permite el uso de etiquetas no aprobadas.

**Conjunto** **de** **marcos**
- permite el uso de etiquetas no aprobadas,
- permite el uso de marcos, desaconsejados por el W3C en la actualidad.


# 2.4 Estructura de un documento HTML

## 2.4.1 Estructura básica
Estructura base:

```html
<!DOCTYPE ...>
<html>
<head>
  <title>Programación Básica en Internet</title>
</head>
<body>
  <h1>Bienvenidos a la página web de PBI</h1>
  <p>Esta es la página web de la asignatura ...</p>
</body>
</html>
```

Las etiquetas básicas de documento son:
- `html`
- `head`
- `title`
- `body`


## 2.4.2 Para qué sirve cada etiqueta básica
- **`html`**: raíz del documento; envuelve toda la página y siempre debe existir.
- **`head`**: cabecera técnica; contiene metadatos, título, CSS, scripts y otra información no visible como contenido principal.
- **`title`**: texto de la pestaña del navegador; conviene usarlo siempre y que sea descriptivo porque también influye en SEO.
- **`body`**: cuerpo visible; aquí va todo lo que ve el usuario: texto, imágenes, enlaces, tablas, formularios, etc.


## 2.4.3 DOCTYPE y validación
### DOCTYPE en HTML 4.01

**Estricta**
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

**Transitoria**
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
```

**Conjunto de marcos**
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">
```

### DOCTYPE en XHTML 1.0

**Estricta**
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

**Transitoria**
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```

**Conjunto de marcos**
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
```

### Validación
El W3C proporciona mecanismos para validar páginas. En la diapositiva se cita:

```text
http://validator.w3.org
```

**`<!DOCTYPE ...>`**  
**Sirve para:** indicar al navegador qué tipo de documento HTML está interpretando.  
**Cuándo usarla:** siempre al principio del documento; en HTML5 se usa la versión simplificada.


## 2.4.4 Codificación de caracteres
HTML pretende ser un documento de texto universal, por lo que es necesario declarar el conjunto de símbolos utilizados mediante la etiqueta `meta` dentro de `head`.

Ejemplo clásico:

```html
<meta http-equiv="content_type" content="text/html; charset=[encoding]">
```

### Encoding
En la presentación se menciona como ejemplo `iso-8859-1` para español, pero se indica que esos valores están obsoletos y que se recomienda usar **UTF-8**.

Ejemplo recomendado:

```html
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
```

En HTML5 la declaración se simplifica a:
```html
<meta charset="utf-8">
```

**`meta`** resume la información técnica del documento y va dentro de `head`: codificación, descripción, palabras clave, viewport o directivas para robots.


# 2.5 SEO básico y robots

## 2.5.1 Conseguir que nos visiten: SEO básico en HTML
Dado que existen más de 2 billones de páginas web y se siguen creando miles cada día, las diapositivas indican varias formas de favorecer las visitas:
- uso de palabras clave en el `<title>`,
- uso de palabras clave en encabezados como `<h1>`,
- uso de palabras clave en las etiquetas `alt` de imagen,
- uso de etiquetas meta con `keywords`,
- uso de etiquetas meta con `description`,
- envío del sitio web a un motor de búsqueda como Google.

**Ejemplo:**
```html
<meta name="keywords" content="html, web, daw">
<meta name="description" content="Apuntes de HTML para DAW">
```

## 2.5.2 Directivas para robots de búsqueda
Se pueden indicar directivas mediante metaetiquetas para controlar cómo indexan los buscadores. La tabla presentada incluye:
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-12.png)

### Ejemplo
```html
<meta name="robots" content="noindex, nofollow" />
```

### Robots citados
- Googlebot → Google
- MSNBot → Microsoft

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-13.png)


# 2.6 Elementos HTML, sintaxis y jerarquía
## 2.6.1 Herramientas de análisis
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-14.png)

## 2.6.2 Elementos HTML: marcas, contenidos y jerarquía
Las páginas web están organizadas en **elementos**, y un elemento se entiende como:

**ELEMENTOS = MARCAS + CONTENIDOS**

En el esquema visual del material práctico se distinguen:
- etiqueta de apertura,
- nombre del atributo,
- valor del atributo,
- contenido,
- etiqueta de cierre.

### Tipos de elementos
Hay tres tipos:
- **elementos de documento**: estructuran una página web, por ejemplo `html`, `head`, `body`,
- **elementos de bloque**: definen el aspecto de un bloque de contenido, por ejemplo `h1`, `p`,
- **etiquetas de línea**: definen el aspecto concreto de un contenido dentro de un bloque, por ejemplo `a`, `img`.

### Comentarios y sintaxis general
**Comentarios**

```html
<!-- ... -->
```

**Etiquetas**

```html
<tag atr="...">...</tag>
<tag/>
<tag>
```

La diapositiva indica:
- `<tag/>` es estilo XHTML,
- `<tag>` es estilo HTML5,
- el lenguaje **no es sensible a mayúsculas/minúsculas**.


### Bloque vs línea
- **Etiquetas de bloque**: rompen línea antes y después; tienen ancho y alto.
- **Etiquetas de línea**: no rompen el texto; no tienen ancho y alto.

Además, desde HTML 4.01, toda etiqueta de línea debe estar dentro de una etiqueta de bloque.

### Jerarquía de etiquetas HTML
El material práctico incluye un esquema jerárquico donde `html` es el elemento raíz y bajo él aparecen `head` y `body`, que a su vez contienen otros elementos y atributos.

**`<!-- ... -->`** sirve para dejar comentarios internos del código. Es útil para documentar, separar bloques o anotar recordatorios, pero no se muestra en la página.



# 2.7 Etiquetas de estructura y semántica

## 2.7.1 Etiquetas básicas y semánticas

### Básicas

- `html`
- `head`
- `title`
- `body`


### Avanzadas para estructurar `body`
El material práctico y las diapositivas de HTML5 citan:
- `header`
- `nav`
- `main`
- `section`
- `article`
- `aside`
- `footer`


En las diapositivas de HTML5 también aparecen:
- `figure`
- `figcaption`

## 2.7.2 Para qué sirve cada una
- **`header`**: cabecera de una página o sección; suele contener título, logo o presentación inicial.
- **`nav`**: agrupa enlaces de navegación relevantes.
- **`main`**: contiene el contenido principal y normalmente aparece una sola vez por página.
- **`section`**: divide el contenido en bloques temáticos con sentido propio.
- **`article`**: representa contenido independiente y reutilizable, como noticias o posts.
- **`aside`**: añade contenido complementario o lateral.
- **`footer`**: cierra una página o sección con información final.
- **`figure`**: agrupa contenido visual o ilustrativo.
- **`figcaption`**: añade el pie descriptivo de un `figure`.



# 2.8 Etiquetas de texto y contenido básico

## 2.8.1 Etiquetas de bloque: encabezados, párrafos, enlaces y citas
Etiquetas mostradas:
- `h1` ... `h6`
- `p`
- `a`
- `blockquote`


### Ejemplo

```html
<html>
 <head>
  <title>Mi primera página web</title>
 </head>
 <body>
  <h1>Este es el encabezamiento</h1>
  <p>Aquí incluyo el texto que acompaña al encabezamiento</p>
  <h2>Aquí encabezo una sección</h2>
  <p>
    Este es el texto de la sección, donde referencio a la
    página <a href="laotra.html">La otra página</a>
  </p>
  <blockquote>
    Además podemos marcar de forma especial algunas partes del texto
  </blockquote>
 </body>
</html>
```

### Uso de cada etiqueta
- **`h1` ... `h6`**: crean la jerarquía de encabezados; `h1` es el nivel principal y `h6` el más bajo.
- **`p`**: representa un párrafo de texto corrido.
- **`a`**: crea enlaces a páginas, archivos o zonas internas.
- **`blockquote`**: marca citas extensas separadas del texto normal.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-23.png)

## 2.8.2 Etiquetas de línea: formato inline y texto literal
Etiquetas mostradas:
- `strong`
- `em`
- `q`
- `br`
- `pre`


### Uso
- `strong` → negrita
- `em` → cursiva o énfasis
- `q` → comillas
- `br` → salto de línea
- `pre` → texto literal respetando formato


### Ejemplo
```html
<p>
  Aquí incluyo el texto.
  Puedo incluir <strong>negrita</strong>,
  <em>cursiva</em> y
  <q>comillas</q>.
  También tengo salto <br/> de línea.
</p>

<pre>
Finalmente,
tengo la opción de escribir
de forma literal
</pre>
```

### Uso recomendado de cada etiqueta
- **`strong`**: indica especial importancia, no solo negrita visual.
- **`em`**: marca énfasis dentro de una frase.
- **`q`**: introduce una cita breve en línea.
- **`br`**: inserta un salto de línea dentro del mismo bloque; no sustituye a un párrafo.
- **`pre`**: conserva espacios y saltos, útil para texto literal o ejemplos.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-22.png)

# 2.9 Enlaces, listas, imágenes y tablas

## 2.9.1 Enlaces con `a`

La etiqueta `a` sirve para enlazar páginas o posiciones internas.

### Enlace externo

```html
<a href="http://www.usc.es">externa</a>
```

### Enlace interno en la misma página

```html
<a href="mipagina.html#otroParrafo">misma página</a>
```

### Punto de anclaje

```html
<a id="otroParrafo">referenciada</a>
```

La diapositiva añade que normalmente se referencian cabeceras.

En el material práctico también se diferencia entre:
- **enlace interno**: a una página del mismo sitio,
- **enlace externo**: a una página de otro sitio.

- **`href`**: indica el destino del enlace, ya sea una página, archivo, correo o ancla interna.
- **`id`**: identifica un elemento de forma única; se usa mucho en anclajes, CSS, JavaScript y asociación con `label`.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-21.png)

## 2.9.2 Listas
### Tipos de listas
- **Listas ordenadas (`ol`)**: el orden lo fijan números o letras.
- **Listas no ordenadas (`ul`)**: no fijan orden; los elementos aparecen con símbolo.
- **Listas de definición (`dl`)**: no fijan orden; presentan definiciones sin símbolo al comienzo.

### Lista ordenada
Etiquetas:
- `ol`
- `li`

Ejemplo:
```html
<ol>
  <li>Primer elemento</li>
  <li>Segundo elemento</li>
  <li>etc.</li>
</ol>
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-20.png)

### Lista no ordenada
Etiquetas:
- `ul`
- `li`

Ejemplo:

```html
<ul>
  <li>Primer elemento</li>
  <li>Segundo elemento</li>
  <li>etc.</li>
</ul>
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-19.png)

### Lista de definición
Etiquetas:
- `dl`
- `dt`
- `dd`

Ejemplo:

```html
<dl>
  <dt>Primera definición</dt>
  <dd>Texto de la definición</dd>
  <dt>Segunda definición</dt>
  <dd>Texto de la definición</dd>
</dl>
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-18.png)
### Uso de cada etiqueta
- **`ol`**: lista ordenada; úsala cuando el orden importe.
- **`ul`**: lista no ordenada; úsala cuando solo quieras enumerar elementos.
- **`li`**: cada elemento de una lista `ol` o `ul`.
- **`dl`**: lista de definiciones o pares término-descripción.
- **`dt`**: término o concepto dentro de `dl`.
- **`dd`**: definición o descripción asociada a `dt`.


## 2.9.3 Imágenes con `img`
La etiqueta `img` permite insertar imágenes. En un ejemplo se usan formatos GIF y JPEG.

### Ejemplo básico

```html
<p>GIF <img src="imagen.gif"></p>
<p>JPEG <img src="imagen.jpg"></p>
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-17.png)

### Formatos citados
- JPEG / JPG → Lossy → ideal para fotografías
- PNG → Lossless → soporta transparencia alfa
- GIF → Lossless + animación → limitado a 256 colores
- SVG → vectorial → escalable, ideal para iconos
- ICO → bitmap → común para favicons
- BMP → bitmap → soportado, pero poco eficiente

### Nuevos formatos

**WebP**
- desarrollado por Google,
- compresión con y sin pérdidas superior a JPEG o PNG con calidad equivalente,
- soporta transparencia,
- soporta animaciones.

**AVIF**
- desarrollado por AOMedia,
- compresión superior a WebP con calidad equivalente,
- soporta transparencia,
- soporta animaciones.

**AOMedia** se define como un consorcio tecnológico formado por empresas como Google, Apple, Mozilla, Netflix, Amazon, Microsoft, Cisco y otras.

### Recomendación práctica del profesor
- fotos → **AVIF**
- logos, UI, iconos simples → **WebP o PNG**
- animaciones → **WebP o AVIF**
- compatibilidad total con dispositivos antiguos → **JPEG + PNG**


### Atributo `loading`

Ejemplo:

```html
<img src="imagen.gif" loading="lazy">
```

El atributo `loading` indica si el navegador debe cargar la imagen inmediatamente o aplazar su carga. Valores:
- `eager` → carga inmediata
- `lazy` → carga diferida


### Otros atributos vistos en prácticas
En la práctica también aparece:

```html
<img src="/images/chrome.gif" alt="Google Chrome" width="33" height="32" />
```

Es decir, además de `src`, se usan `alt`, `width` y `height`.

### Uso de `img` y sus atributos
- **`img`**: inserta una imagen que forma parte del contenido.
- **`src`**: indica el recurso que se carga.
- **`alt`**: describe la imagen; conviene usarlo siempre salvo en decorativas puras.
- **`width` y `height`**: reservan espacio y ayudan a la estabilidad visual.
- **`loading="lazy"`**: retrasa la carga de imágenes fuera de pantalla para mejorar rendimiento.


## 2.9.4 Tablas
Etiquetas:
- `table`
- `tr`
- `th`
- `td`
- `caption`

### Ejemplo básico

```html
<table>
  <caption>Tabla I</caption>
  <tr>
    <th>Nombre</th>
    <th>Apellidos</th>
  </tr>
  <tr>
    <td>Antonio</td>
    <td>Pérez García</td>
  </tr>
</table>
```

### Idea estructural
- cada tabla empieza con `table`,
- cada fila empieza con `tr`,
- cada dato empieza con `td`.

**Ejemplo muy simple:**

```html
<table border="1">
  <tr>
    <td>100</td>
  </tr>
</table>
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-16.png)

### Uso de cada etiqueta
- **`table`**: crea una tabla de datos reales; no debe usarse para maquetar.
- **`tr`**: fila de la tabla.
- **`th`**: celda de cabecera.
- **`td`**: celda de datos.
- **`caption`**: título o contexto general de la tabla.


# 2.10 Simplificaciones y semántica en HTML5

## 2.10.1 Simplificaciones de HTML5
HTML5 simplifica la sintaxis en varios puntos:

- nuevo DOCTYPE:

```html
<!DOCTYPE html>
```

- nueva declaración de conjunto de caracteres:

```html
<meta charset="utf-8">
```

- flexibilidad con mayúsculas/minúsculas y comillas en atributos:

```html
id="daw"
id=daw
ID="daw"
```

La diapositiva recuerda que en HTML 4 se usaba:

```html
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
```

## 2.10.2 Etiquetas semánticas de HTML5
Se introducen nuevas etiquetas con denominación semántica:

- `header`
- `footer`
- `section`
- `article`
- `aside`
- `nav`
- `figure`
- `figcaption`

La idea visual mostrada es que en HTML4 se abusaba de `div`, mientras que HTML5 aporta etiquetas con significado estructural.


# 2.11 Multimedia y otras etiquetas HTML5

## 2.11.1 Multimedia y otros recursos en HTML5
Las diapositivas incluyen:
- `audio`
- `video`
- `track`
- `canvas`
- `iframe`

### Formatos de vídeo citados
- MP4 (H.264) → muy alto soporte
- WebM (VP8/VP9) → soporte alto
- Ogg/Theora → bueno
- MP4 (H.265) → parcial
- AV1 → amplio pero parcial
- AVI / WMV / FLV → nulo

La nota indica que entre paréntesis están los códecs usados.

### Ejemplo de vídeo

```html
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/webm">
  <source src="movie.ogg" type="video/mp4">
  Este navegador no soporta la etiqueta vídeo.
</video>
```

La diapositiva indica que se suelen poner dos fuentes para evitar problemas de compatibilidad entre navegadores.

### Atributos del vídeo
- `controls` → añade controles de arranque, pausa y volumen
- `autoplay` → arranca automáticamente al cargar la página
- `muted` → arranca con el sonido muteado


### Uso de cada etiqueta
- **`audio`**: inserta sonido reproducible.
- **`video`**: inserta vídeo reproducible.
- **`track`**: añade subtítulos o pistas de texto, clave para accesibilidad.
- **`canvas`**: sirve de superficie para dibujar con JavaScript.
- **`iframe`**: incrusta otra página o recurso externo.
- **`source`**: ofrece varias fuentes del mismo recurso multimedia para mejorar compatibilidad.


## 2.11.2 Otras etiquetas HTML5
Se citan:
- `details`
- `summary`
- `mark`
- `meter`
- `time`
- `progress`

### Ejemplo mental de `details`
La diapositiva muestra que `details` permite ocultar contenido desplegable y `summary` actúa como el texto visible que se pulsa para abrir o cerrar la sección.

### Uso de cada etiqueta
- **`details`**: crea un bloque desplegable para contenido opcional.
- **`summary`**: texto visible que abre o cierra `details`.
- **`mark`**: resalta texto relevante.
- **`meter`**: representa una medida dentro de un rango conocido.
- **`time`**: añade significado semántico a fechas y horas.
- **`progress`**: muestra el progreso de una tarea.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-15.png)


# 2.12 Formularios
## 2.12.1 Idea general

Los formularios permiten realizar aplicaciones interactivas proporcionando un mecanismo para recopilar información del usuario.

La creación de formularios tiene dos partes:
- realizar una acción con la información solicitada (`form`),
- crear la estructura donde se solicita o incluye la información (`input`, `textarea`, `select`).    


## 2.12.2 Etiqueta `form`
La etiqueta `form` define la acción que se realizará una vez enviado el formulario al servidor y el modo en que la información será enviada.

Ejemplo:

```html
<form name="Pedido" action="programa_servidor" method="get">
```

Atributos principales:
- `action` → acción a realizar en el servidor
- `method` → mecanismo de envío: `get` o `post`

En la imagen adicional de formularios también se recalca que `form` usa los atributos `name`, `method` y `action`.

**`form`**  
**Sirve para:** agrupar controles de entrada y enviarlos al servidor.  
**Cuándo usarla:** siempre que el usuario tenga que introducir datos y enviarlos.

**`action`**  
**Sirve para:** indicar a qué recurso o programa se envían los datos.  
**Cuándo usarlo:** en formularios que realmente se procesan.

**`method`**  
**Sirve para:** indicar cómo se envían los datos.  
**Cuándo usarlo:** `get` para consultas o búsquedas sencillas; `post` para envíos de datos más sensibles o extensos.


## 2.12.3 Etiqueta `input`
La etiqueta `input` permite crear diferentes elementos gráficos para la captura de información.

Estructura general:

```html
<input type="..." name="..." value="..." otras_propiedades>
```

`type` indica el tipo de control: button, text, password, submit, reset, hidden, file, checkbox, etc. Además, cada tipo tiene métodos asociados para responder a eventos.

### `type="button"`
Botón estándar que realiza una acción al hacer clic.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-24.png)

Eventos asociados:
- `onBlur`
- `onFocus`
- `onClick`

**Uso:** botón genérico.  
**Cuándo usarlo:** cuando el comportamiento dependa de JavaScript y no del envío normal del formulario.


### `type="text"`

Caja de texto simple en una línea, sin retornos de carro.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-25.png)

Eventos:
- `onBlur`
- `onFocus`
- `onClick`
- `onChange`
- `onSelect`

**Uso:** entrada de texto breve.  
**Cuándo usarlo:** nombres, títulos, búsquedas, usuario, etc.


### `type="password"`
Texto no visible al usuario.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-26.png)

Eventos:
- `onBlur`
- `onFocus`
- `onClick`
- `onChange`
- `onSelect`

**Uso:** entrada de contraseñas o datos ocultos visualmente.  
**Cuándo usarlo:** en accesos, autenticación o campos sensibles.


### `type="hidden"`

Campo oculto útil para enviar información al servidor sin mostrarla al usuario.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-27.png)

**Uso:** enviar datos invisibles.  
**Cuándo usarlo:** identificadores, tokens o datos auxiliares que no deben editarse directamente en la interfaz.


### `type="submit"`

Botón de envío del formulario.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-28.png)

Eventos:
- `onBlur`
- `onFocus`
- `onClick`

**Uso:** enviar el formulario.  
**Cuándo usarlo:** cuando quieras activar el procesamiento de los datos introducidos.


### `type="reset"`

Restaura los valores iniciales del formulario.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-29.png)

Eventos:
- `onBlur`
- `onFocus`
- `onClick`

**Uso:** volver al estado inicial de los controles.  
**Cuándo usarlo:** cuando tenga sentido permitir limpiar o restaurar el formulario.


### `type="file"`

Permite seleccionar archivos locales para subir al servidor.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-30.png)

Eventos:
- `onBlur`
- `onFocus`
- `onClick`
- `OnChange`

**Uso:** selección de archivos.  
**Cuándo usarlo:** en subidas de documentos, imágenes o adjuntos.


### `type="checkbox"`
Permite seleccionar varias opciones mediante recuadros.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-31.png)

Eventos:
- `onBlur`
- `onFocus`
- `onClick`

**Uso:** selección múltiple.  
**Cuándo usarlo:** cuando el usuario pueda marcar varias opciones a la vez.


### `type="radio"`
Permite seleccionar entre opciones de forma excluyente.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-32.png)

Eventos:
- `onBlur`
- `onFocus`
- `onClick`

**Uso:** selección única dentro de un grupo.  
**Cuándo usarlo:** cuando solo deba elegirse una opción.


### `type="image"`
Permite enviar al servidor las coordenadas sobre la imagen en las que se ha pulsado.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-33.png)

Nota importante:
- al servidor llegan los valores `coord.x` y `coord.y`.


**Uso:** botón de envío basado en imagen.  
**Cuándo usarlo:** cuando quieras que el botón visual sea una imagen y te interese incluso la posición pulsada.


## 2.12.4 `textarea`
Permite enviar al servidor cadenas de caracteres en formato multilínea.

Ejemplo:

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-34.png)

Eventos:
- `onKeyDown`
- `onKeyPress`
- `onKeyUp`


**`textarea`**  
**Sirve para:** introducir texto largo en varias líneas.  
**Cuándo usarla:** comentarios, descripciones, mensajes o textos amplios.


## 2.12.5 `select` y `option`
`select` permite crear listas desplegables seleccionables por teclado o ratón.

Ejemplo:

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-36.png)

Nota:
```html
<select multiple name="...">
```

permite seleccionar múltiples elementos.

**`select`**  
**Sirve para:** ofrecer una lista de opciones al usuario.  
**Cuándo usarla:** cuando el usuario tenga que elegir una o varias opciones prefijadas.

**`option`**  
**Sirve para:** representar cada opción de un `select`.  
**Cuándo usarla:** dentro de listas desplegables o listas múltiples.


## 2.12.6 Formularios HTML5

### `label`

`label` permite asociar un texto indicativo a una etiqueta `input`.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-37.png)

**`label`**  
**Sirve para:** asociar un texto descriptivo a un control de formulario.  
**Cuándo usarla:** siempre que haya inputs, porque mejora accesibilidad y usabilidad.


### `range`
Permite crear un control gráfico tipo scroll para seleccionar un rango de valores.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-38.png)

**`type="range"`**  
**Sirve para:** elegir un valor dentro de un intervalo.  
**Cuándo usarlo:** en edades, niveles, volumen, porcentajes o escalas.


### `datalist`

Permite crear listas de valores por defecto que ayudan al usuario.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-39.png)

**`datalist`**  
**Sirve para:** ofrecer sugerencias asociadas a un `input`.  
**Cuándo usarla:** cuando el usuario pueda escribir libremente, pero convenga sugerir valores frecuentes.


### `fieldset` y `legend`

Permiten crear secciones diferenciadas dentro de un formulario.

Ejemplo:

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-40.png)

**`fieldset`**  
**Sirve para:** agrupar controles relacionados dentro de un formulario.  
**Cuándo usarla:** cuando haya bloques temáticos como datos personales, dirección, preferencias, etc.

**`legend`**  
**Sirve para:** poner título a un `fieldset`.  
**Cuándo usarla:** cuando el grupo de controles necesite nombre o contexto.


### `date`, `week`, `month`
Permiten seleccionar fechas por días, semanas o años en un elemento gráfico.

Ejemplos:

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-41.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-42.png)


**`type="date"`**  
**Sirve para:** seleccionar una fecha concreta.  
**Cuándo usarlo:** cumpleaños, reservas, citas o formularios con fechas.

**`type="week"`**  
**Sirve para:** seleccionar una semana del año.  
**Cuándo usarlo:** planificación semanal, turnos o calendarios por semanas.

**`type="month"`**  
**Sirve para:** seleccionar un mes.  
**Cuándo usarlo:** informes mensuales, periodos o filtros por mes.


### `color`

Permite seleccionar un color a partir de una paleta.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-43.png)

**`type="color"`**  
**Sirve para:** elegir un color visualmente.  
**Cuándo usarlo:** configuraciones de tema, personalización o edición gráfica simple.



# 2.13 Otras mejoras atribuidas a HTML5

Las diapositivas añaden:
- nuevos atributos,
- nuevos atributos para `input` de formulario,
- acceso mejorado a elementos DOM mediante JavaScript,
- nuevas APIs nativas y eliminación de necesidad de plugins.