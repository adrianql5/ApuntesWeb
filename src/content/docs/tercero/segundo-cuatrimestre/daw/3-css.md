---
title: "CSS"
---

# 3.1 Introducción
## 3.1.1 Qué es CSS y qué papel cumple
**CSS** significa **Cascading Style Sheets** y es el mecanismo que permite añadir **estilo** a las páginas web. En este contexto, el estilo incluye:
- colores,
- formatos,
- posicionamiento de los elementos de la página.

Su idea fundamental es **separar contenido y presentación**:
- **HTML** estructura el contenido,
- **CSS** decide cómo se ve ese contenido.

**Qué efecto produce esto en la web:** permite cambiar el aspecto completo de una página sin tocar su estructura HTML.

**Ejemplo mental:** dos páginas con el mismo HTML pueden verse completamente distintas si usan hojas CSS diferentes.


## 3.1.2 CSS dentro de la arquitectura web
Dentro de la arquitectura web, el navegador solicita recursos al servidor mediante HTTP, y entre esos recursos puede estar el fichero CSS. La página HTML llega al navegador y este aplica después las reglas CSS para mostrar el resultado visual final.

**Qué significa esto en la práctica:** cuando abres una página, el navegador no solo lee el HTML, también carga la hoja de estilos y la usa para pintar:
- tamaños,
- márgenes,
- colores,
- distribución,
- tipografías,
- etc.


## 3.1.3 La cascada de CSS
Antes de llegar a los estilos escritos por el autor, CSS contempla tres capas principales:
- estilos del navegador (**user-agent**),
- estilos del usuario final,
- estilos del autor.

La precedencia general indicada en las diapositivas es:

**Navegador → Usuario → Autor → Autor + `!important` → Usuario + `!important` → Navegador + `!important`**

También se indica que con los valores `initial`, `unset` y `revert` se pueden alterar estas precedencias.

### Qué efecto produce la cascada
Cuando varias reglas afectan al mismo elemento, **no se aplican todas por igual**. CSS decide cuál gana según:
- el origen del estilo,
- la importancia (`!important`),
- la especificidad,
- el orden de aparición.

**Ejemplo mental:** si una regla pone el texto azul y otra lo pone rojo sobre el mismo elemento, no se mezclan: una gana y la otra pierde.


## 3.1.4 Estructura de una regla CSS
Toda regla CSS consta de dos partes:
- **selector**: determina qué elementos quedan afectados,
- **declaración**: una o más parejas propiedad/valor que indican qué hacer.

Ejemplo de estructura:
```css
h1 {
  color: red;
  background: yellow;
}
```

Aquí:
- `h1` es el selector,
- `color` y `background` son propiedades,
- `red` y `yellow` son valores.

### Comentarios en CSS
Los comentarios se escriben así:

```css
/* comentario */
```


# 3.2 Formas de insertar CSS y precedencia

## 3.2.1 Formas de insertar CSS
Hay cuatro formas habituales:

### 1. CSS en línea con `style`
Va dentro de la propia etiqueta HTML.

```html
<p style="color: red;">Esta es la página web de la asignatura</p>
```

- Solo afecta a ese elemento.
- Sirve para cambios muy concretos o pruebas rápidas.
- No conviene abusar porque mezcla HTML y presentación.

### 2. Hoja interna con `style`
Se escribe dentro de `head`.

```html
<style>
  h1 {
    font-family: sans-serif;
  }
  p {
    color: red;
  }
</style>
```

- Afecta a toda la página actual.
- Es útil si una única página necesita estilos propios.

### 3. Hoja externa con `link`
Es la forma normal de trabajo.

```html
<link rel="stylesheet" href="hoja.css" />
```

- Separa estructura y diseño.
- Reutiliza estilos en varias páginas.
- Facilita mantenimiento y organización.

### 4. Importar CSS con `@import`
Permite cargar una hoja desde otra hoja CSS.

```css
@import "hoja1.css";
@import url("hoja3.css");
```

- Útil para modularizar.
- Se suele preferir `link` como punto de entrada principal por claridad y rendimiento.


## 3.2.2 Precedencia entre estilos del autor
Dentro de los estilos del autor, la prioridad general es:
1. estilo en línea,
2. hoja interna o externa,
3. en empate, gana la regla que aparece más abajo.

Además, manda la **especificidad**:
- `p` es menos específico que `.destacado`,
- `.destacado` es menos específico que `#principal`,
- `#principal p` es más específico que `p`.

Regla práctica:
- si dos reglas son igual de específicas, gana la última;
- si una regla es más específica, suele ganar aunque aparezca antes.


# 3.3 Selectores CSS

## 3.3.1 Tipos de selectores
CSS permite seleccionar elementos con distintos niveles de precisión.

### Selectores más usados
- **Universal**: `* { }` afecta a todo; útil para reglas globales.
- **Por etiqueta**: `h1 { }` afecta a todas las etiquetas de ese tipo.
- **Por clase**: `.nombre { }` sirve para reutilizar estilos en muchos elementos.
- **Por id**: `#nombre { }` apunta a un único elemento.

En HTML:

```html
<div class="tarjeta destacada" id="principal"></div>
```

Reglas clave:
- una etiqueta puede tener varias clases,
- una etiqueta solo debe tener un `id`,
- el `id` debe ser único en la página.

### Selectores por relación
- **Hijo directo**: `li > a { }` solo selecciona `a` hijos directos de `li`.
- **Descendiente**: `p a { }` selecciona `a` dentro de `p`, aunque haya niveles intermedios.
- **Hermano adyacente**: `h1 + p { }` selecciona el primer `p` justo después de `h1`.
- **Hermanos posteriores**: `h1 ~ p { }` selecciona todos los `p` hermanos que estén después.

### Otros selectores útiles
- **Por atributo**: `a[href*="usc"] { }` selecciona enlaces cuyo `href` contiene ese texto.
- **Pseudoclases**: `a:hover`, `input:focus`, `li:first-child`; sirven para estados o posiciones especiales.
- **Agrupación**: `div, .blue { color: blue; }` evita repetir reglas.
- **Combinación**: `p.big`, `article > p` o `article p` permiten afinar mucho qué elementos cambian.

Resumen mental:
- usa **clases** para estilos reutilizables,
- usa **id** para algo único,
- usa relaciones (`>`, espacio, `+`, `~`) cuando lo importante no es solo el elemento, sino dónde está.


# 3.4 Herencia y hojas según contexto
## 3.4.1 Herencia en CSS

Algunas propiedades se heredan automáticamente y otras no.

**Se heredan automáticamente:**
- tipografía,
- color del texto,
- listas,
- tablas.

**No se heredan automáticamente:**
- layout (`margin`, `padding`, etc.),
- fondo,
- dimensiones,
- bordes.

### Forzar la herencia con `inherit`

Se puede forzar usando `inherit` como valor de una propiedad.

**Qué efecto produce:** el hijo toma expresamente el valor del padre en esa propiedad.

**Ejemplo mental:** si el contenedor tiene un borde y a un hijo le pones `border: inherit`, el hijo hereda ese borde aunque normalmente no lo heredaría.

**`inherit`**  
**Sirve para:** obligar a una propiedad a tomar el valor del elemento padre.  
**Cuándo usarlo:** cuando necesites heredar manualmente una propiedad que no se hereda sola.


## 3.4.2 Hojas de estilo según dispositivo o contexto
CSS permite definir hojas distintas:
- según dispositivo: `screen`, `print`, `handheld`, etc.,
- asociadas a estilos de sitio o página,
- asociadas a estilos alternativos.

Ejemplos:

```html
<link rel="stylesheet" media="screen" href="hoja.css" />
<link rel="alternate stylesheet" href="hoja.css" title="nombre" />
```

**Qué efecto produce:** no siempre se aplica la misma hoja.

**Para qué sirve:** por ejemplo, para imprimir con un diseño distinto al de pantalla.

**`media`**  
**Sirve para:** indicar en qué medio o contexto debe aplicarse una hoja de estilos.  
**Cuándo usarlo:** para pantalla, impresión o situaciones concretas de visualización.


# 3.5 Modelo de caja

## 3.5.1 Idea general
Cada etiqueta HTML se comporta como una **caja**. Las partes que aparecen en el modelo son:
- contenido,
- background,
- padding,
- border,
- outline,
- margin.

Las etiquetas en línea pierden propiedades relacionadas con dimensiones.

![](image-1.png|697)


### Qué significa cada parte
- **Contenido**: la zona donde aparece la información real.
- **Background**: el fondo pintado detrás del contenido y del padding.
- **Padding**: espacio interior entre contenido y borde.
- **Border**: borde visible que delimita la caja.
- **Margin**: espacio exterior que separa esta caja de otras.
- **Outline**: contorno extra alrededor del borde; sirve para remarcar sin comportarse exactamente igual que el `border`.

Regla mental rápida:
- si quieres aire **dentro**, usa `padding`;
- si quieres separación **fuera**, usa `margin`;
- si quieres un límite visible, usa `border`;
- si quieres remarcar un elemento sin tocar su borde principal, usa `outline`.


### Colapso de márgenes
Las diapositivas muestran que ciertos márgenes verticales pueden colapsar y el resultado no es suma completa, sino el mayor de los dos márgenes.

**Qué efecto produce:** dos bloques apilados verticalmente no siempre suman ambos márgenes; a veces queda solo el más grande.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-2.png)

## 3.5.2 Propiedades del modelo de caja
Las propiedades modificables indicadas son:
- `width`, `max-width`, `min-width`,
- `height`, `max-height`, `min-height`,
- `padding`,
- `border`,
- `margin`,
- `outline`,
- `background`,
- `overflow`,
- `opacity`,
- `visibility`.

Además:
- `overflow` puede valer `visible`, `hidden`, `scroll`, `auto`,
- `opacity` va de `0.0` a `1.0`,
- `visibility` puede ser `visible` u `hidden`.

### Dimensiones
- **`width` y `height`**: fijan ancho y alto.
- **`max-width` y `min-width`**: ponen límites de crecimiento o reducción; son muy útiles en responsive.

Ejemplo típico:

```css
.contenedor {
  width: 100%;
  max-width: 900px;
}
```

### Espaciado interior y exterior
**`padding`** añade espacio interior. Se puede escribir de varias formas:

```css
padding: 16px;            /* 4 lados */
padding: 12px 24px;       /* arriba/abajo, izquierda/derecha */
padding: 8px 16px 24px;   /* arriba, lados, abajo */
padding: 8px 12px 16px 20px; /* arriba, derecha, abajo, izquierda */
```

**`margin`** añade espacio exterior:

```css
margin: 16px;
margin: 0 auto;           /* centrar bloques con ancho definido */
margin-top: 24px;
```

### Varias formas de usar `border`
`border` no es una sola idea: puedes usarlo de varias maneras según lo que quieras conseguir.

**1. Borde completo con shorthand**

```css
border: 2px solid #333;
```

Es la forma más rápida. Resume:
- grosor,
- estilo,
- color.

**2. Bordes por lado**

```css
border-top: 3px solid #222;
border-right: 0;
border-bottom: 1px dashed #999;
border-left: 4px solid tomato;
```

Sirve cuando no quieres marcar toda la caja, sino solo un lado.

**3. Controlar solo una parte del borde**

```css
border-width: 1px 2px;
border-style: solid dashed;
border-color: #444 #bbb;
```

Útil si quieres variar grosores, estilos o colores sin repetir todo.

**4. Bordes redondeados**

```css
border: 1px solid #ccc;
border-radius: 12px;
```

Muy común en tarjetas, botones, inputs y avatares.

**5. Borde solo inferior, muy típico en formularios**

```css
border: none;
border-bottom: 2px solid #333;
```

Da un aspecto más ligero que una caja completa.

**Estilos frecuentes de borde**
- `solid`: línea continua.
- `dashed`: línea discontinua.
- `dotted`: puntos.
- `double`: doble línea.
- `none`: sin borde.

**Cómo pensar `border`, `outline` y `box-shadow`**
- `border`: forma parte visual de la caja.
- `outline`: remarcar enfoque o accesibilidad.
- `box-shadow`: profundidad o énfasis sin dibujar un borde clásico.

### Fondo y contenido que se desborda
- **`background`**: define color o imagen de fondo.
- **`overflow`**: controla qué pasa si el contenido no cabe.

```css
overflow: visible;
overflow: hidden;
overflow: scroll;
overflow: auto;
```

Resumen:
- `visible`: sobresale,
- `hidden`: recorta,
- `scroll`: siempre muestra barras,
- `auto`: solo si hacen falta.

### Transparencia y visibilidad
- **`opacity`**: va de `0` a `1` y hace el elemento más o menos transparente.
- **`visibility`**: lo oculta visualmente, pero sigue ocupando espacio; no es lo mismo que `display: none`.


## 3.5.3 `box-sizing`
CSS3 introduce la propiedad `box-sizing` con dos valores:
- `content-box`: `padding` y `border` no entran en el cálculo de `width` y `height`,
- `border-box`: `padding` y `border` sí entran en el cálculo.

### Qué efecto produce
- **`content-box`**: `width: 400px` significa 400px de contenido, y luego se suman padding y borde.
- **`border-box`**: `width: 400px` significa 400px totales contando contenido, padding y borde.

Por eso `border-box` suele ser más cómodo: los tamaños resultan más predecibles.

Configuración muy habitual:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

Regla práctica:
- si te lías al calcular anchos, usa `border-box`;
- si quieres el modelo clásico de CSS puro, usa `content-box`.


# 3.6. `div`, `span` y `display`
## 3.6.1 `div` y `span`

### `div`

`div` permite agrupar conjuntos de etiquetas y que es una etiqueta de bloque.

**Qué efecto produce:** crea un contenedor de bloque que sirve para agrupar contenido.

**Para qué sirve:** para aplicar estilos comunes o estructurar secciones.

**Nota importante:** con la llegada de HTML5, se recomienda restringir su uso a los casos en que realmente sea necesario.

**`div`**  
**Sirve para:** agrupar contenido en un contenedor de bloque genérico.  
**Cuándo usarlo:** cuando no exista una etiqueta semántica mejor y necesites estructura o estilo común.


### `span`

`span` permite diferenciar contenidos “en línea” iguales y es una etiqueta de línea.

**Qué efecto produce:** permite cambiar una parte concreta del texto sin romper la línea.

**Para qué sirve:** para aplicar estilos a fragmentos pequeños dentro de un bloque.

**`span`**  
**Sirve para:** envolver una parte de texto o contenido inline sin romper la línea.  
**Cuándo usarlo:** para dar estilo o identificar fragmentos pequeños dentro de párrafos u otros elementos.


## 3.6.2 `display`
La propiedad `display` especifica la forma en que el navegador renderiza un elemento. 
- `display: none`,
- `display: inline`,
- `display: block`,
- `display: inline-block`.

### `display: none`

**Qué efecto produce:** el elemento desaparece de la visualización y de su renderizado.

**Para qué sirve:** para ocultar elementos completamente.


### `display: inline`

**Qué efecto produce:** transforma un bloque en elemento de línea.

**Visualmente:** se coloca en la misma línea que otros y no rompe línea.


### `display: block`

**Qué efecto produce:** transforma un elemento de línea en uno de bloque.

**Visualmente:** ocupa una línea completa y permite manejar mejor ancho/alto.


### `display: inline-block`

**Qué efecto produce:** el elemento se comporta en línea, pero conserva propiedades de ancho y alto.

**Para qué sirve:** muy útil cuando quieres varios elementos en la misma fila pero con tamaño controlado.

**`display`**  
**Sirve para:** cambiar la forma visual en que se representa un elemento.  
**Cuándo usarlo:** cuando necesites alterar su comportamiento de bloque, línea, desaparición, etc.


# 3.7 Posicionamiento y layout clásico

## 3.7.1 Posicionamiento en CSS

Las diapositivas explican que CSS modifica el flujo normal de la página mediante varias formas de posicionamiento. Se citan:
- `static`,
- `absolute`,
- `fixed`,
- `relative`,
- `sticky`,
- `float`,
- `relative float`,
- propiedades como `left`, `right`, `top`, `bottom`, `z-index`, `clear`.

### Flujo normal

Por defecto, los elementos son distribuidos por el navegador siguiendo el flujo natural del fichero fuente.

**Qué significa:** si no haces nada especial, los bloques van uno debajo de otro y los elementos en línea van dentro del texto.


### `position: static`

Es el valor por defecto. El elemento se coloca donde le corresponde según el flujo natural.

**Efecto visual:** no hay desplazamiento especial.


### `position: relative`

El elemento se coloca relativo a la posición que tendría en el flujo natural y **permanece en el flujo**.

**Qué efecto produce:** puedes moverlo con `top`, `left`, etc., pero su hueco original sigue existiendo.

**Para qué sirve:** para pequeños ajustes sin romper del todo la estructura.


### `position: absolute`

El elemento se coloca relativo a su contenedor padre y **sale del flujo**.

**Qué efecto produce:** ya no ocupa su sitio normal; se superpone o recoloca independientemente.

**Para qué sirve:** para situar elementos en coordenadas concretas.

**Muy importante:** como sale del flujo, el resto de elementos actúan como si no estuviera ahí.


### `position: fixed`

El elemento se coloca relativo a la ventana del navegador y **sale del flujo**.

**Qué efecto produce:** se queda fijo aunque se haga scroll.

**Para qué sirve:** para menús, botones flotantes o cabeceras fijas.


### `position: sticky`

**Idea práctica:** se comporta como un elemento normal hasta cierto punto del scroll, y luego queda “pegado”.


### `float`

El posicionamiento flotante hace que el elemento flote, elevándose sobre la página, y el resto de elementos de bloque acuden a tapar el hueco; los elementos de línea lo rodean.

**Qué efecto produce:** un bloque puede irse a la izquierda o derecha y el texto lo rodea.

**Para qué sirve:** tradicionalmente se usó mucho para layouts y para colocar imágenes con texto alrededor.


### `relative float`

Flotante pero partiendo de posición relativa.


### Propiedades asociadas al posicionamiento

**`top`, `right`, `bottom`, `left`**  
Desplazan el elemento según el modelo de posicionamiento usado.

**`z-index`**  
Controla qué elemento queda por delante o por detrás cuando se superponen.

**`clear`**  
Sirve para evitar que un elemento quede al lado de flotantes anteriores.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-3.png)

## 3.7.2 Layout fijo, líquido y responsivo

### Qué es el layout

El **layout** es la forma en que se disponen los diferentes elementos de una página.

### Layout fijo

Se fija de forma absoluta el tamaño de las cajas, independientemente del tamaño de la ventana. Ejemplo típico:

```css
width: 800px;
```

**Qué efecto produce:** la página mantiene anchura fija.

**Problema:** en pantallas pequeñas aparecen scrolls; en grandes puede sobrar espacio.

### Layout líquido

No fija un tamaño único y el navegador adapta el tamaño de los elementos al ancho disponible y al contenido.

Se citan, por ejemplo:

```css
margin-left: auto;
margin-right: auto;
```

**Qué efecto produce:** el contenido se adapta más al ancho de la ventana.

### Diseño responsivo

El diseño responsivo permite que una página se adapte a diferentes tamaños de dispositivo. La aproximación actual es:
- crear primero un diseño simple, de una sola columna,
- pensado para móviles,
- y después aplicar cambios para pantallas más grandes.

Esto se llama **mobile first design**.


# 3.8 Viewport, media queries y puntos de ruptura

## 3.8.1 Viewport y metaetiqueta de responsividad

HTML5 permite controlar el viewport con:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Qué hace cada parte

- `width=device-width`: fija el ancho según el dispositivo,    
- `initial-scale=1.0`: fija el zoom inicial.

**Qué efecto produce:** la página no se comporta como una versión “encogida” de escritorio, sino como un diseño adaptado al ancho real del móvil.

**`meta name="viewport"`**  
**Sirve para:** controlar cómo interpreta el navegador móvil el ancho y el zoom inicial de la página.  
**Cuándo usarla:** prácticamente siempre en diseño web responsivo.


## 3.8.2 Media queries

Las reglas `@media` permiten definir bloques CSS distintos según el dispositivo o sus características.

Estructura general:

```css
@media not|only mediatype and (mediafeature) {
  CSS
}
```

### Elementos de la sintaxis
- `not`: invierte el significado,
- `only`: previene navegadores antiguos,
- `and`: combina condiciones.


### Qué se puede comprobar
- ancho y alto del viewport,
- ancho y alto del dispositivo,
- orientación (`landscape` o `portrait`),
- resolución.

### Ejemplo de uso
Las diapositivas muestran reglas como:

```css
@media screen and (max-width: 1200px) {
  body {
    ...
  }
}
```

**Qué efecto produce:** a partir de cierto tamaño, cambian estilos.

**Para qué sirve:** para reorganizar columnas, tipografías, espacios o colores según la pantalla.

**`@media`**  
**Sirve para:** aplicar CSS condicional según características del medio o dispositivo.  
**Cuándo usarlo:** en diseño responsivo, impresión o adaptaciones por tamaño y orientación.


## 3.8.3 Puntos de ruptura
Los puntos de ruptura son dimensiones a partir de las cuales se planifica el cambio del layout.

Tamaños típicos citados:
- `min-width: 320px` → móviles pequeños,
- `min-width: 480px` → pequeños dispositivos y mayoría de móviles,
- `min-width: 768px` → mayoría de tablets,
- `min-width: 992px` → ordenadores con pantallas pequeñas,
- `min-width: 1200px` → ordenadores con pantallas grandes.

**Qué efecto produce:** permite decidir en qué ancho cambian columnas, tamaños, menús, etc.


# 3.9 Tipografía en CSS

## 3.9.1 Propiedades tipográficas principales

### `font-family`

Sirve para definir la familia tipográfica. Ejemplo:

```css
body {
  font-family: Verdana, Geneva, Arial, sans-serif;
}
```

Las familias citadas son:
- `sans-serif`,
- `serif`,
- `monospace`,
- `cursive`,
- `fantasy`.

Y se listan ejemplos como Arial, Verdana, Georgia, Times New Roman, Courier New, Comic Sans, Impact, etc.

**Qué efecto produce:** cambia el aspecto visual del texto.

**Para qué sirve:** para adaptar legibilidad, estilo y tono visual.

### Fuentes externas con `@font-face`
Las diapositivas indican:
- crear una regla `@font-face`,
- indicar nombre a usar y URL de la fuente.

Ejemplo estructural:

```css
@font-face {
  font-family: miFuente;
  src: url(nombreFuente);
}
```

**Qué efecto produce:** permite usar tipografías no instaladas por defecto.

**`@font-face`**  
**Sirve para:** cargar una fuente personalizada y asignarle un nombre utilizable en CSS.  
**Cuándo usarlo:** cuando el diseño requiere tipografías específicas no estándar.


### `font-size`
Se muestran tres formas: porcentajes, `em` y `px`.

Además, se indica que con `rem` la referencia es siempre el elemento raíz y no le afecta la herencia.

**Qué efecto produce:** controla el tamaño del texto.

**Importante para layout:** el tamaño de letra afecta directamente a cuánto ocupa el contenido.


### Tipografía responsiva

Se indica el uso de `vw`, donde `1vw` es el 1% del ancho del viewport.

También aparece el uso de `rem` y `calc(...)` en ejemplos de tipografía responsiva.

**Qué efecto produce:** la fuente cambia con el tamaño de pantalla.


### `font-weight`

Valores citados:
- `light`,
- `normal`,
- `bold`,
- `bolder`,
- otros.

**Qué efecto produce:** hace el texto más fino o más grueso.


### `font-style`

Valores citados:
- `italic`,
- `oblique`.

**Qué efecto produce:** inclina el texto.


### `text-decoration`
Valores citados:
- `none`,
- `underline`,
- `overline`,
- `line-through`,
- `blink` (deprecated).

**Qué efecto produce:** añade o elimina decoraciones del texto.


### `text-align`
Valores citados:
- `left`,
- `right`,
- `center`,
- `justify`.

**Qué efecto produce:** alinea el texto dentro de su caja.


### `line-height`
Ejemplo dado:

```css
body {
  line-height: 1.6em;
}
```

**Qué efecto produce:** aumenta o reduce el espacio entre líneas.

**Para qué sirve:** muy importante en legibilidad.


### `text-transform`
Valores citados:
- `lowercase`,
- `uppercase`,
- `capitalize`.

**Qué efecto produce:** cambia mayúsculas/minúsculas visualmente sin tocar el texto original.


### `color`
Las diapositivas indican cuatro formas:
- por nombre,
- `rgb(r, g, b)`,
- `#rrggbb`,
- `rgb(r%, g%, b%)`.    

**Qué efecto produce:** cambia el color del texto.


# 3.10 Imágenes, botones, listas y tablas en CSS

## 3.10.1 Imágenes en CSS

### Fondo con `background-image`

Ejemplo dado:

```css
body {
  background-image: url(image.gif);
  background-repeat: no-repeat;
  background-position: top left;
}
```

**Qué efecto produce:** la imagen se usa como fondo, no como contenido HTML.


### Nuevas opciones citadas para imágenes
Se listan:
- `border`,
- `border-radius`,
- `box-shadow`,
- `filter`,
- `transform`,
- `object-fit`.

**Qué efecto produce cada una, a nivel general:**
- `border`: añade borde,
- `border-radius`: redondea esquinas,
- `box-shadow`: añade sombra,
- `filter`: aplica efectos visuales,
- `transform`: transforma la imagen,
- `object-fit`: ajusta cómo encaja dentro de su caja.


## 3.10.2 Botones en CSS
Las diapositivas citan propiedades habituales para botones:
- `border`,
- `background-color`,
- `color`,
- `padding`,
- `text-align`,
- `text-decoration`,
- `font-size`,
- `cursor`,
- `transition-duration`,
- `box-shadow`.

**Qué efecto produce esto en la web:** permite que un botón pase de verse como un control básico del navegador a verse personalizado y coherente con el diseño.


## 3.10.3 Listas en CSS
Se indica el uso de:
- `display: inline`,
- `list-style: none`,
- `position: relative` para listas horizontales,
- `list-style-type` con valores como `disc`, `circle`, `square`, `none`.

### Qué efecto produce
- `display: inline` hace que los elementos de lista vayan en línea,
- `list-style: none` elimina los marcadores,
- `list-style-type` cambia el tipo de viñeta.

**Para qué sirve:** por ejemplo, para menús de navegación horizontales.


## 3.10.4 Rollover y pseudoclases de enlaces
Las diapositivas llaman **rollover** al cambio de aspecto cuando el ratón pasa por encima o cuando el enlace ha sido visitado. Se citan cinco posibilidades:
- `a:link`,
- `a:hover`,
- `a:focus`,
- `a:active`,
- `a:visited`.

También aparecen en la práctica ejemplos de `a:link`, `a:visited`, `a:active` y `a:hover`.

### Qué efecto produce cada una
- `:link` → estilo del enlace no visitado,
- `:hover` → estilo cuando el ratón pasa por encima,
- `:focus` → estilo cuando se selecciona con teclado,
- `:active` → estilo durante el clic,
- `:visited` → estilo del enlace ya visitado.


**Para qué sirve:** para dar feedback visual al usuario.

## 3.10.5 Tablas en CSS
Las diapositivas citan propiedades para tablas:
- márgenes por lado,
- `border`,
- `caption-side`,
- estilo de `caption`,
- padding y borde para `td` y `th`.

### Qué efecto produce
- los márgenes separan la tabla de otros elementos,
- `border` dibuja el contorno,
- `caption-side` coloca el título arriba o abajo,    
- el padding en celdas mejora legibilidad.


# 3.11 Layout responsivo y técnicas modernas

## 3.11.1 Flexible grids tradicionales
Antes de Flexbox y Grid, la responsividad se hacía de forma convencional con:
- uso de `float`,
- anchos relativos usando la fórmula `width = 100 x target / context`.

Ejemplo citado:
- `width: 31,25%` porque `300 / 960 = 0,3125`.

**Qué efecto produce:** las columnas se adaptan proporcionalmente al ancho disponible.

**Problema:** era más complejo y frágil que los sistemas modernos.


## 3.11.2 Tecnologías modernas de layout

Las diapositivas indican tres tecnologías actuales:
- **Multicol**,
- **Flex Container**,
- **Grid**.


## 3.11.3 CSS Multicol
Es el método más antiguo de los modernos. Consiste en indicar al navegador en cuántas columnas dividir un contenedor mediante `column-count`.

Ejemplo conceptual:

```css
.contenedor {
  column-count: 3;
}
```

### Qué efecto produce
El navegador reparte el contenido del contenedor en varias columnas automáticamente.

**Para qué sirve:** para texto continuo, artículos o bloques tipo revista.

**Limitación:** no da un control tan fino de layout como Flex o Grid.

**`column-count`**  
**Sirve para:** dividir el contenido de un contenedor en varias columnas automáticas.  
**Cuándo usarlo:** en texto continuo, maquetación tipo periódico o revista.


## 3.11.4 Flex Container / Flexbox
Flexbox está pensado para ordenar elementos en **una sola dimensión**: o en fila o en columna.

El contenedor se crea con:

```css
display: flex;
```

### Idea clave de Flexbox
Piensa siempre en dos ejes:
- **eje principal**: lo marca `flex-direction`;
- **eje secundario**: el perpendicular.

Si usas `flex-direction: row`, el eje principal es horizontal.  
Si usas `flex-direction: column`, el eje principal pasa a ser vertical.

### Propiedades más importantes del contenedor
- **`flex-direction`**: `row`, `column`, `row-reverse`, `column-reverse`.
- **`flex-wrap`**: `nowrap`, `wrap`, `wrap-reverse`.
- **`flex-flow`**: combina `flex-direction` y `flex-wrap`.
- **`justify-content`**: reparte elementos en el eje principal.
- **`align-items`**: alinea elementos en el eje secundario.
- **`align-content`**: reparte varias líneas cuando hay `wrap`.

### Cómo pensar las propiedades clave
**`justify-content`** mueve o reparte elementos en el eje principal:

```css
justify-content: flex-start;
justify-content: center;
justify-content: flex-end;
justify-content: space-between;
justify-content: space-around;
justify-content: space-evenly;
```

**`align-items`** alinea los ítems en el eje secundario:

```css
align-items: stretch;
align-items: flex-start;
align-items: center;
align-items: flex-end;
align-items: baseline;
```

**`align-content`** solo tiene efecto cuando hay varias líneas por `wrap`.

### Propiedades útiles en los ítems flex
- **`flex-grow`**: cuánto crece un ítem si sobra espacio.
- **`flex-shrink`**: cuánto se encoge si falta espacio.
- **`flex-basis`**: tamaño base inicial.
- **`flex`**: shorthand de `grow shrink basis`.
- **`align-self`**: permite que un ítem concreto se alinee distinto al resto.

Ejemplos:

```css
.item {
  flex: 1;          /* todos ocupan el mismo ancho disponible */
}

.principal {
  flex: 2;          /* ocupa el doble que los demás */
}

.destacado {
  align-self: flex-start;
}
```

### Formas típicas de usar Flexbox
**1. Menú o fila horizontal**

```css
.menu {
  display: flex;
  gap: 16px;
}
```

**2. Centrar horizontal y verticalmente**

```css
.centro {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

**3. Apilar elementos en columna**

```css
.columna {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
```

**4. Tarjetas que saltan de línea**

```css
.tarjetas {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.tarjeta {
  flex: 1 1 220px;
}
```

Esto significa: cada tarjeta intenta medir `220px`, pero puede crecer o encogerse.

### Cuándo usar Flexbox
Usa Flexbox cuando pienses:
- "quiero estos elementos en una fila",
- "quiero esta columna bien alineada",
- "quiero centrar algo",
- "quiero repartir espacio entre varios bloques".

**Resumen importante:** Flexbox = **una dimensión**.


## 3.11.5 CSS Grid
Grid está pensado para trabajar en **dos dimensiones** a la vez: filas y columnas.

El contenedor se crea con:

```css
display: grid;
```

### Idea clave de Grid
A diferencia de Flexbox, aquí no piensas solo en una fila o una columna, sino en una **rejilla** completa.

Es ideal para:
- layouts generales de página,
- galerías,
- tarjetas en varias columnas,
- zonas como cabecera, menú, lateral, contenido y pie.

### Propiedades principales del contenedor
- **`grid-template-columns`**: define columnas.
- **`grid-template-rows`**: define filas.
- **`grid-template-areas`**: dibuja el layout con nombres.
- **`gap`** o `grid-gap`: separa celdas.

### Propiedades de los ítems
- **`grid-column`**: indica en qué columnas cae un ítem.
- **`grid-row`**: indica en qué filas cae.
- **`grid-area`**: permite colocarlo en un área con nombre.

### Unidad `fr`
`fr` reparte el espacio disponible de forma proporcional.

```css
grid-template-columns: 1fr 1fr;
grid-template-columns: 2fr 1fr;
```

Interpretación:
- `1fr 1fr` = dos columnas iguales,
- `2fr 1fr` = la primera ocupa el doble que la segunda.

### Formas típicas de usar Grid
**1. Dos o tres columnas fijas o proporcionales**

```css
.layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}
```

**2. Sidebar + contenido**

```css
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 24px;
}
```

**3. Grid responsive sin media query compleja**

```css
.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}
```

Esta es una de las formas más útiles de Grid:
- `auto-fit` intenta meter tantas columnas como quepan,
- `minmax(220px, 1fr)` dice que cada columna no baje de `220px` y, si sobra espacio, crezca.

**4. Layout por áreas**

```css
.pagina {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-areas:
    "header header"
    "aside main"
    "footer footer";
  gap: 16px;
}

header { grid-area: header; }
aside  { grid-area: aside; }
main   { grid-area: main; }
footer { grid-area: footer; }
```

Esto deja muy claro el diseño visual incluso antes de ver el HTML.

**5. Hacer que un ítem ocupe varias celdas**

```css
.destacado {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
```

Sirve para tarjetas grandes, banners o módulos destacados.

### Cuándo usar Grid
Usa Grid cuando pienses:
- "quiero controlar filas y columnas a la vez",
- "quiero una rejilla clara",
- "quiero un layout completo de página",
- "quiero tarjetas responsive en varias columnas".

**Resumen importante:** Grid = **dos dimensiones**.


## 3.11.6 Flexbox vs Grid vs Multicol
### Multicol
Divide texto o contenido continuo en columnas automáticas. Es mejor para maquetación tipo periódico o revista.

### Flexbox
Úsalo cuando el problema principal sea alinear o repartir elementos en una fila o en una columna.

### Grid
Úsalo cuando el problema principal sea organizar una rejilla con filas y columnas al mismo tiempo.

Regla práctica de examen:
- si piensas en **una fila o una columna**, probablemente es **Flexbox**;
- si piensas en **una rejilla completa**, probablemente es **Grid**;
- si piensas en **texto continuo dividido en columnas**, probablemente es **Multicol**.


## 3.11.7 Imágenes responsivas
Las diapositivas muestran dos enfoques:
- solución tradicional: `img { max-width: 80%; }`,
- solución actual: uso de `picture` y `source` para servir distintas imágenes según tamaño.

**Qué efecto produce:** la imagen se adapta al dispositivo.

**Muy importante:** la solución moderna busca ahorrar ancho de banda.


# 3.12 Frameworks y utilidades CSS

## 3.12.1 Librerías y frameworks CSS

Las diapositivas los definen como bibliotecas de reglas CSS `propiedad: valor` predefinidas, apoyadas en el atributo `class` de HTML.

### Ventajas

- facilitan compatibilidad entre navegadores,    
- facilitan responsividad entre dispositivos,
- simplifican el desarrollo,
- garantizan cierto grado de fiabilidad y eficacia.

### Inconvenientes

- se importa código innecesario,
- se incrementa el ancho de banda,
- se pierde cierto control,
- se limitan las posibilidades del diseño.


## 3.12.2 Bootstrap

Bootstrap es un framework implementado para el desarrollo web responsivo, especialmente diseñado para móviles. Fue creado por Mark Otto y Jacob Thornton en Twitter y liberado en 2011 en GitHub.

### Archivos necesarios

Para usar Bootstrap, según las diapositivas, hacen falta:
- `bootstrap.css`,
- `bootstrap.js`.

También se muestra integración por descarga local o por CDN, y se indica el uso actual de Bootstrap 5.

### Bootstrap 5

Las diapositivas remarcan:
- es la versión más nueva,
- tiene nuevos componentes,
- es más rápida,
- más responsive,
- no es compatible con Internet Explorer 11 e inferiores,
- usa JavaScript nativo en lugar de jQuery.

### Contenedores Bootstrap

Bootstrap usa el paradigma **mobile first design** y se apoya en:
- la metaetiqueta viewport,
- clases contenedoras específicas.

Se citan:
- `.container`,
- `.container-XX`,
- `.container-fluid`.

**`.container`**  
Fija un `max-width` según el punto de ruptura.

**`.container-XX`**  
También fija `max-width`, pero dependiendo del sufijo.

**`.container-fluid`**  
Mantiene ancho al 100% en todos los puntos de ruptura.

**Qué efecto produce visualmente:** controla cuánto ocupa el contenido horizontalmente en cada tamaño de pantalla.

### Espaciados Bootstrap

Los contenedores tienen relleno y margen. La nomenclatura indicada es:
- `{propiedad}{lados}-{tamaño}` para xs,
- `{propiedad}{lados}-{punto-ruptura}{tamaño}` para sm, md, lg, xl, xxl.

**Propiedad:**
- `m` → margin,
- `p` → padding.


**Lados:**
- `t`, `b`, `l`, `r`, `x`, `y`, o vacío para los 4 lados.

**Tamaño:**
- `0` a `5`,
- `auto`.

**Qué efecto produce:** permite ajustar espacios rápidamente con clases ya hechas.

### Layout Bootstrap

Bootstrap usa un sistema de rejilla de hasta 12 columnas basado en flexbox. Los pasos son:
- crear un contenedor,
- crear filas (`row`),
- añadir columnas (`col-*-*`).

La sintaxis `col-*-*` se explica como:
- `device` → dispositivo / punto de ruptura,
- `colWidth` → ancho en columnas, hasta 12.

**Qué efecto produce:** una misma disposición puede verse en varias columnas en pantallas grandes y apilarse en móviles.


## 3.12.3 Validación CSS
Las diapositivas citan el validador:

```text
http://jigsaw.w3.org/css-validator
```

**Para qué sirve:** para comprobar si la sintaxis CSS es correcta.


## 3.12.4 Prefijos de navegador en CSS3
Se mencionan algunos prefijos dependientes del navegador:
- `-moz-` → Firefox,
- `o-` → Opera,
- `-webkit-` → Safari y Chrome,
- `-ms-` → Internet Explorer.

**Qué significa esto:** algunas propiedades nuevas podían requerir variantes específicas según navegador.


# 3.13 Ideas clave para entender layout y colocación

## 3.13.1 Lo esencial que debes tener claro
**Todo elemento es una caja.**  
Antes de pensar en diseño, piensa siempre en:
- contenido,
- padding,
- border,
- margin.

**El flujo normal manda.**  
Si no tocas nada:
- los bloques van uno debajo de otro,
- los elementos en línea van dentro del texto.

**`display` cambia la naturaleza visual.**
- `block` rompe línea,
- `inline` no rompe línea,
- `inline-block` mezcla comportamiento en línea con tamaño controlable,
- `none` elimina visualmente.

**`position` cambia cómo se recoloca un elemento.**
- `static` → normal,
- `relative` → se mueve respecto a su sitio,
- `absolute` → se saca del flujo y se coloca por coordenadas,
- `fixed` → se fija a la ventana,
- `sticky` → se pega al hacer scroll.


**`float` fue importante, pero hoy no es la opción principal para layout moderno.**  
Sirvió para layouts antiguos y para rodear imágenes con texto.

**Para el modelo de caja, piensa así:**
- `padding` = aire interior,
- `margin` = separación exterior,
- `border` = límite visible,
- `outline` = remarcar,
- `box-sizing: border-box` = tamaños más fáciles de controlar.

**Flexbox sirve para alinear y repartir en una dimensión.**  
Úsalo cuando pienses: “quiero estos elementos en fila”, “quiero esta columna ordenada” o “quiero centrar esto”.

**Grid sirve para estructurar en dos dimensiones.**  
Úsalo cuando pienses en filas y columnas a la vez, o en cabecera, menú, contenido, lateral y pie.

**La responsividad no es opcional.**  
Se consigue con:
- viewport,
- medidas relativas,
- media queries,
- layouts adaptables,
- enfoque mobile first.



# 3.14. Resumen claro para examen
- CSS da estilo a la web: colores, formato y posicionamiento.
- Una regla CSS = selector + declaraciones.
- CSS puede insertarse en línea, interno o externo.
- Gana el estilo según cascada, especificidad y orden.
- `class` se reutiliza; `id` debe ser único.
- El modelo de caja se compone de contenido, padding, border y margin.
- `padding` mete aire dentro; `margin` separa por fuera; `border` delimita.
- `display` cambia cómo se renderiza un elemento.
- `position` modifica su colocación respecto al flujo normal.
- Responsive design = adaptar la web a distintos tamaños.
- `@media` aplica CSS según características del dispositivo.
- Flexbox trabaja en una dimensión: fila o columna.
- Grid trabaja en dos dimensiones: filas y columnas.
- Bootstrap aporta una rejilla responsive y clases ya preparadas.