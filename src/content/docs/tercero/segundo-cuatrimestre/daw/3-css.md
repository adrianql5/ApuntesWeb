---
title: "CSS"
---

# 3.1 Introducción
**CSS** significa **Cascading Style Sheets** y es el lenguaje que controla la presentación visual de una página web:
- colores,
- tipografía,
- márgenes y tamaños,
- distribución y colocación de elementos.

La idea central de CSS es separar **estructura** y **presentación**:
- **HTML** describe el contenido,
- **CSS** decide cómo se ve.

**Papel dentro de la web:** el navegador recibe el HTML, carga la hoja de estilos y aplica sus reglas para pintar el resultado final.

**Una regla CSS** siempre tiene dos partes:
- **selector**: indica a qué elementos afecta,
- **declaraciones**: indican qué propiedades cambian y con qué valor.

```css
h1 {
  color: red;            /*propiedad*/
  background: yellow;    /*valor*/
}
```

Los comentarios en CSS se escriben así:

```css
/* comentario */
```


# 3.2 Formas de usar CSS, cascada y precedencia

## 3.2.1 Formas de insertar CSS
Hay cuatro formas habituales de aplicar CSS:

**1. En línea, con `style`:** afecta solo al elemento donde aparece.

```html
<p style="color: red;">Texto</p>
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-44.png)

**2. Hoja interna, con `style`:** afecta a toda la página actual.

```html
<style>
  p {
    color: red;
  }
</style>
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-45.png)

**3. Hoja externa, con `link`:** es la forma normal de trabajo porque separa contenido y diseño y permite reutilizar estilos.

```html
<link rel="stylesheet" href="hoja.css" />
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-46.png)

**4. Importación desde CSS, con `@import`:** útil para modularizar hojas.

```css
@import "base.css";
@import url("tipografia.css");
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-47.png)

**Regla práctica:** como norma general, la mejor opción es la hoja externa. El estilo en línea debe reservarse para casos puntuales.

CSS también puede cargarse según el contexto de visualización:

```html
<link rel="stylesheet" media="screen" href="hoja.css" />
<link rel="stylesheet" media="print" href="impresion.css" />
```


## 3.2.2 Cascada: cómo decide CSS qué regla gana
Cuando varias reglas afectan al mismo elemento, CSS no las aplica todas con el mismo peso. Decide el resultado final mediante este orden:

1. **Origen e importancia** del estilo.
2. **Especificidad** del selector.
3. **Orden de aparición**: si todo lo anterior empata, gana la última regla.

En la cascada intervienen tres orígenes principales:
- estilos del navegador (**user-agent**),
- estilos del usuario,
- estilos del autor.

La prioridad general es:

**Navegador -> Usuario -> Autor -> Autor + `!important` -> Usuario + `!important` -> Navegador + `!important`**

Dentro de los estilos del autor, la jerarquía práctica suele entenderse así:
- estilo en línea,
- `#id`,
- `.clase`, `[atributo]`, `:pseudoclase`,
- etiqueta o pseudoelemento.

Ejemplos rápidos:
- `p` es menos específico que `.destacado`,
- `.destacado` es menos específico que `#principal`,
- `#principal p` es más específico que `p`.

**Idea clave:** si una regla es más específica, normalmente gana aunque aparezca antes. Si ambas tienen la misma especificidad, gana la última.

También conviene conocer estos valores especiales:
- `inherit`: toma el valor del padre,
- `initial`: vuelve al valor inicial de la propiedad,
- `unset`: se comporta como heredado o inicial según la propiedad,
- `revert`: intenta volver al valor de una capa anterior de la cascada.


# 3.3 Selectores CSS

## 3.3.1 Cómo pensar un selector
Un selector responde, en esencia, a una o varias de estas preguntas:
- **qué elemento es**,
- **qué identidad tiene**,
- **qué relación guarda con otros**,
- **en qué estado está**.

Por eso los selectores se entienden mejor si se agrupan por función, no como una lista suelta.


## 3.3.2 Selectores básicos
**Universal:** `*` selecciona todos los elementos.

```css
* {
  box-sizing: border-box;
}
```

**Por etiqueta:** selecciona todas las etiquetas de ese tipo.

```css
h1 {
  color: navy;
}
```

**Por clase:** sirve para estilos reutilizables.

```css
.destacado {
  color: tomato;
}
```

**Por id:** apunta a un elemento único dentro de la página.

```css
#principal {
  max-width: 900px;
}
```

Reglas prácticas:
- una etiqueta puede tener varias clases,
- un `id` debe ser único en la página,
- para estilos reutilizables se prefieren las clases.

Ejemplo en HTML:

```html
<div class="tarjeta destacada" id="principal"></div>
```


## 3.3.3 Selectores por relación
Aquí lo importante no es solo el elemento, sino **dónde está** o **junto a qué aparece**.

**Descendiente:** selecciona elementos dentro de otros, aunque haya niveles intermedios.

```css
article p {
  line-height: 1.6;
}
```

**Hijo directo:** solo selecciona hijos inmediatos.

```css
nav > a {
  text-decoration: none;
}
```

**Hermano adyacente:** selecciona el primer hermano que aparece justo después.

```css
h1 + p {
  margin-top: 0;
}
```

**Hermanos posteriores:** selecciona todos los hermanos siguientes del mismo nivel.

```css
h2 ~ p {
  color: #444;
}
```

Diferencia clave:
- `article p` = cualquier `p` dentro de `article`,
- `article > p` = solo `p` hijos directos de `article`.


## 3.3.4 Selectores por atributos y pseudoclases
**Por atributo:** seleccionan por la presencia o contenido de un atributo.

```css
a[href*="usc"] {
  color: green;
}
```

**Pseudoclases:** representan estados o posiciones especiales.

```css
a:hover
input:focus
li:first-child
```

Se usan para cosas como:
- paso del ratón,
- foco del teclado,
- primer o último hijo,
- elementos visitados o activos.


## 3.3.5 Agrupación, combinación y lectura correcta
**Agrupación:** evita repetir la misma regla.

```css
h1, h2, h3 {
  font-family: sans-serif;
}
```

**Combinación:** permite afinar mucho.

```css
p.big
#principal .destacado
article > p:first-child
```

Cómo leerlos:
- `p.big` = párrafos con clase `big`,
- `#principal .destacado` = elementos con clase `destacado` dentro de `#principal`,
- `article > p:first-child` = el primer `p` hijo directo de `article`.

**Resumen práctico para examen:**
- usa **clases** para estilos reutilizables,
- usa **id** para algo único,
- usa relaciones (`>`, espacio, `+`, `~`) cuando el contexto importa,
- recuerda que selector y especificidad están directamente relacionados.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-49.png)

# 3.4 Herencia y modelo de caja

## 3.4.1 Herencia en CSS
Algunas propiedades se heredan automáticamente y otras no.

**Se heredan con frecuencia:** propiedades de texto como tipografía, color o altura de línea.

**No se heredan normalmente:** propiedades de layout y caja, como:
- `margin`,
- `padding`,
- `border`,
- `background`,
- dimensiones,
- posicionamiento.

Si una propiedad no se hereda de forma natural, se puede forzar con `inherit`:

```css
hijo {
  color: inherit;
}
```

**Idea clave:** la herencia es muy importante en tipografía, pero mucho menos en layout.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-50.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-51.png)


## 3.4.2 Modelo de caja
Todo elemento HTML se representa como una **caja**. Sus partes básicas son:
- **contenido**,
- **padding**,
- **border**,
- **margin**,
- **outline**.

Cómo pensar cada zona:
- `padding`: aire interior,
- `margin`: separación exterior,
- `border`: límite visible,
- `outline`: remarcado adicional, útil por ejemplo en foco o accesibilidad.

El `background` se pinta detrás del contenido y del `padding`.

Las etiquetas en línea no se comportan igual que las de bloque: tienen más limitaciones en anchura, altura y separación vertical.

**Colapso de márgenes:** algunos márgenes verticales entre bloques pueden colapsar, de modo que no se suman, sino que prevalece el mayor.

![](image-1.png|697)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-2.png)


## 3.4.3 Propiedades importantes del modelo de caja
**Dimensiones:** `width`, `height`, `min-width`, `max-width`, `min-height`, `max-height`.

Ejemplo típico:

```css
.contenedor {
  width: 100%;
  max-width: 900px;
}
```

**Espaciado:** `padding` y `margin` admiten sintaxis abreviada.

```css
padding: 16px;
margin: 0 auto;
```

**Borde:** se puede definir de forma abreviada o por lados.

```css
border: 2px solid #333;
border-left: 4px solid tomato;
border-radius: 12px;
```

**Fondo:** `background` permite definir color o imagen de fondo.

**Desbordamiento:** `overflow` controla qué ocurre si el contenido no cabe.
- `visible`: sobresale,
- `hidden`: recorta,
- `scroll`: siempre muestra barras,
- `auto`: las muestra solo si hacen falta.

**Transparencia y visibilidad:**
- `opacity` va de `0` a `1`,
- `visibility: hidden` oculta visualmente, pero el elemento sigue ocupando espacio.


## 3.4.4 `box-sizing`
`box-sizing` decide cómo se calculan `width` y `height`.

- `content-box`: el ancho y alto solo corresponden al contenido,
- `border-box`: el ancho y alto ya incluyen `padding` y `border`.

En la práctica, `border-box` suele ser más cómodo porque hace los tamaños más predecibles.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```


# 3.5 `div`, `span` y `display`

## 3.5.1 `div` y `span`
**`div`:** contenedor genérico de bloque. Se usa cuando no existe una etiqueta semántica mejor.

**`span`:** contenedor genérico en línea. Se usa para marcar una parte concreta del texto o del contenido inline sin romper la línea.

**Idea clave:** no aportan significado semántico; sirven sobre todo para agrupar y aplicar estilo.


## 3.5.2 `display`
`display` controla cómo se representa visualmente un elemento.

Los valores más básicos son:
- `none`: desaparece y deja de ocupar espacio en el renderizado,
- `inline`: se comporta como contenido en línea,
- `block`: ocupa una línea completa,
- `inline-block`: se coloca en línea, pero permite controlar mejor ancho y alto.

```css
.oculto {
  display: none;
}
```

```css
.boton {
  display: inline-block;
}
```

**Idea clave:** `display` cambia el comportamiento visual del elemento, no su significado HTML.


# 3.6 Posicionamiento y layout clásico

## 3.6.1 Flujo normal
Si no se modifica nada, el navegador coloca los elementos siguiendo el flujo natural del documento:
- los bloques van uno debajo de otro,
- los elementos en línea van dentro del texto.

Todo el posicionamiento en CSS parte de este flujo normal.


## 3.6.2 Tipos de posicionamiento
**`static`:** es el valor por defecto. El elemento queda donde le corresponde por flujo normal.

**`relative`:** el elemento sigue ocupando su hueco normal, pero puede desplazarse respecto a esa posición.

**`absolute`:** el elemento sale del flujo y se coloca respecto a su contenedor posicionado más cercano. Si no existe, toma como referencia el bloque contenedor inicial.

**`fixed`:** el elemento sale del flujo y queda fijado a la ventana del navegador.

**`sticky`:** se comporta como normal hasta cierto punto del scroll y luego queda "pegado".

Las propiedades que suelen acompañar al posicionamiento son:
- `top`,
- `right`,
- `bottom`,
- `left`,
- `z-index`.

**`z-index`** controla el orden de apilado cuando varios elementos se superponen.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-52.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-3.png)


## 3.6.3 `float` y `clear`
`float` fue muy importante antes de Flexbox y Grid.

Su efecto básico es desplazar un elemento a la izquierda o derecha y permitir que el contenido en línea lo rodee.

Hoy su uso principal es:
- texto alrededor de imágenes,
- mantenimiento o comprensión de layouts antiguos.

`clear` evita que un elemento quede al lado de flotantes anteriores.

**Idea de examen:** `float` existe y conviene conocerlo, pero ya no es la herramienta principal para maquetar.


## 3.6.4 Layout fijo, líquido y responsivo
**Layout fijo:** usa anchuras absolutas, por ejemplo `width: 800px;`. Mantiene siempre el mismo ancho, aunque la pantalla cambie.

**Layout líquido:** usa medidas relativas para adaptarse mejor al ancho disponible.

**Layout responsivo:** adapta diseño, proporciones y colocación según el dispositivo o tamaño de pantalla.

La aproximación moderna es **mobile first**:
- primero se diseña para pantallas pequeñas,
- después se amplía para pantallas mayores.


# 3.7 Viewport, media queries y puntos de ruptura

## 3.7.1 Viewport
En diseño responsivo suele usarse esta metaetiqueta:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Su función es hacer que el navegador móvil interprete correctamente el ancho real del dispositivo y el zoom inicial.


## 3.7.2 Media queries
Las reglas `@media` permiten aplicar CSS solo cuando se cumple una condición.

```css
@media screen and (max-width: 1200px) {
  body {
    font-size: 15px;
  }
}
```

Con `@media` se pueden comprobar, entre otras cosas:
- ancho y alto del viewport,
- orientación (`portrait` o `landscape`),
- resolución,
- tipo de medio (`screen`, `print`, etc.).

Palabras clave habituales:
- `not`: niega la condición,
- `only`: restringe la regla a un contexto concreto,
- `and`: combina condiciones.

**Idea clave:** las media queries permiten reorganizar columnas, espacios, tipografía o navegación según el tamaño disponible.


## 3.7.3 Puntos de ruptura
Los **breakpoints** o puntos de ruptura son anchos a partir de los cuales cambia el layout.

Valores orientativos muy citados:
- `320px`,
- `480px`,
- `768px`,
- `992px`,
- `1200px`.

No son una ley fija: sirven como referencia para pensar cuándo conviene cambiar el diseño.


# 3.8 Tipografía en CSS

## 3.8.1 Propiedades tipográficas esenciales
**`font-family`:** define la familia tipográfica y conviene incluir alternativas de respaldo.

```css
body {
  font-family: Verdana, Geneva, Arial, sans-serif;
}
```

Familias genéricas habituales:
- `sans-serif`,
- `serif`,
- `monospace`,
- `cursive`,
- `fantasy`.

**`@font-face`:** permite cargar tipografías externas y asignarles un nombre.

```css
@font-face {
  font-family: miFuente;
  src: url(nombreFuente);
}
```

**`font-size`:** controla el tamaño del texto. Unidades típicas:
- `px`: tamaño fijo,
- `%` y `em`: dependen del contexto,
- `rem`: depende del elemento raíz,
- `vw`: depende del ancho del viewport.

**`font-weight`:** grosor del texto.

**`font-style`:** estilo como `italic` u `oblique`.

**`line-height`:** separación entre líneas; es clave para la legibilidad.

**`text-align`:** alineación del texto.

**`text-decoration`:** subrayado, tachado y otras decoraciones.

**`text-transform`:** mayúsculas, minúsculas o capitalización visual.

**`color`:** color del texto; puede definirse por nombre, `rgb()` o hexadecimal.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-56.png)


## 3.8.2 Idea práctica de tipografía
La tipografía afecta no solo a la apariencia, sino también al espacio que ocupa el contenido. Por eso influye directamente en el layout.

Reglas útiles:
- usa `rem` cuando quieras tamaños más consistentes,
- cuida `line-height` para mejorar lectura,
- no confundas cambiar el aspecto con cambiar el contenido real: `text-transform` solo modifica la presentación.


# 3.9 Layout responsivo y técnicas modernas

## 3.9.1 Flexible grids tradicionales
Antes de Flexbox y Grid, la responsividad se resolvía con:
- `float`,
- anchos relativos en porcentaje.

La fórmula típica era:

```text
width = 100 x target / context
```

Ejemplo:
- si una columna debía medir `300px` dentro de un contenedor de `960px`,
- su ancho relativo era `31,25%`.

**Ventaja:** funcionaba.

**Problema:** era más frágil, menos claro y más difícil de mantener que las técnicas modernas.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-57.png)


## 3.9.2 CSS Multicol
Multicol divide el contenido de un contenedor en varias columnas automáticas.

```css
.contenedor {
  column-count: 3;
}
```

Sirve bien para:
- texto continuo,
- artículos,
- maquetación tipo periódico o revista.

Su limitación es clara: no ofrece el mismo control de layout que Flexbox o Grid.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-58.png)


## 3.9.3 Flexbox
Flexbox está pensado para trabajar en **una dimensión**:
- o en fila,
- o en columna.

Se activa así:

```css
.contenedor {
  display: flex;
}
```

Hay dos ideas que conviene recordar:
- **eje principal**: lo define `flex-direction`,
- **eje secundario**: es el perpendicular.

Propiedades importantes del contenedor:
- `flex-direction`,
- `flex-wrap`,
- `flex-flow`,
- `justify-content`,
- `align-items`,
- `align-content`.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-66.png)
**wrap vs nowrap** (nowrap->flex-shrink)

Cómo pensar las más importantes:
- `justify-content` reparte elementos en el eje principal,
- `align-items` alinea elementos en el eje secundario,
- `align-content` solo importa cuando hay varias líneas por `wrap`.

Propiedades importantes de los ítems:
- `flex-grow`,
- `flex-shrink`,
- `flex-basis`,
- `flex`,
- `align-self`.

Ejemplo sencillo:

```css
.menu {
  display: flex;
  gap: 16px;
  justify-content: center;
}
```

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

**Cuándo usar Flexbox:**
- cuando el problema principal sea alinear,
- cuando quieras repartir elementos en una fila,
- cuando quieras apilar una columna,
- cuando necesites centrar algo con facilidad.

**Resumen:** Flexbox = **una dimensión**.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-60.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-61.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-62.png)


## 3.9.4 CSS Grid
Grid está pensado para trabajar en **dos dimensiones** a la vez:
- filas,
- columnas.

Se activa así:

```css
.layout {
  display: grid;
}
```

**Idea clave:** en Grid no piensas solo en una fila o una columna, sino en una **rejilla completa**.

**Propiedades principales del contenedor:**
- `grid-template-columns`,
- `grid-template-rows`,
- `grid-template-areas`,
- `gap`.

**Columnas y filas:** permiten definir la estructura general del contenedor.

```css
.layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto 1fr;
  gap: 16px;
}
```

La unidad `fr` reparte el espacio disponible de forma proporcional:

```css
grid-template-columns: 1fr 1fr;
grid-template-columns: 2fr 1fr;
```

Interpretación:
- `1fr 1fr` = dos columnas iguales,
- `2fr 1fr` = la primera ocupa el doble que la segunda.

**Colocación de los ítems:** se puede indicar en qué filas y columnas cae cada elemento.

```css
.destacado {
  grid-column: 1 / 3; /*empieza en la 1 y termina en la 3 (ocupa 2 columnas)*/
  grid-row: 1 / 3; /*empieza en la 1 y termina en la 3 (ocupa 2 filas)*/
}
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-67.png)

**Áreas:** Grid permite nombrar zonas completas del layout, lo que hace muy legible la maquetación.

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

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-68.png)

**Ejemplo muy útil de Grid responsivo:**

```css
.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}
```

Aquí:
- `auto-fit` intenta meter tantas columnas como quepan,
- `minmax(220px, 1fr)` impide que una columna baje de `220px` y le permite crecer si sobra espacio.

**Cuándo usar Grid:**
- cuando quieras controlar filas y columnas a la vez,
- cuando necesites una rejilla clara,
- cuando el layout completo de la página importe,
- cuando quieras definir áreas como cabecera, lateral, contenido y pie.

**Resumen:** Grid = **dos dimensiones**.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-63.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-64.png)


## 3.9.5 Cuándo usar cada técnica
**Flexible grids tradicionales:** útiles para entender cómo se resolvía la responsividad antes de Flexbox y Grid.

**Multicol:** mejor para texto continuo dividido en columnas.

**Flexbox:** mejor para alinear y repartir elementos en una sola dimensión.

**Grid:** mejor para maquetar una rejilla completa con filas y columnas.

Regla práctica:
- si piensas en **una fila o una columna**, probablemente necesitas **Flexbox**,
- si piensas en **filas y columnas a la vez**, probablemente necesitas **Grid**,
- si piensas en **texto continuo en varias columnas**, probablemente necesitas **Multicol**.


# 3.10 Frameworks CSS y Bootstrap

## 3.10.1 Librerías y frameworks CSS
Un framework CSS es una biblioteca de estilos y clases ya preparadas para acelerar el desarrollo.

Ventajas:
- ahorran tiempo,
- ofrecen una base consistente,
- facilitan compatibilidad y responsividad,
- reducen trabajo repetitivo.

Inconvenientes:
- pueden introducir código innecesario,
- limitan parte del control visual,
- hacen más fácil acabar con diseños poco personalizados.


## 3.10.2 Bootstrap
Bootstrap es uno de los frameworks CSS más conocidos para desarrollo web responsivo.

Su idea general se apoya en:
- enfoque **mobile first**,
- contenedores,
- filas,
- rejilla de 12 columnas,
- utilidades ya preparadas para espaciado, color y componentes.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-69.png)

Para usarlo normalmente hacen falta:
- la hoja CSS,
- el bundle JavaScript cuando se usan componentes interactivos.

**Contenedores principales:**
- `.container`: ancho máximo variable según breakpoint,
- `.container-fluid`: ancho completo,
- variantes por breakpoint como `.container-sm`, `.container-md`, `.container-lg`, etc.

**Sistema de layout:** Bootstrap trabaja con:
- contenedor,
- `row`,
- columnas `col-*`.

Ejemplo conceptual:

```html
<div class="container">
  <div class="row">
    <div class="col-md-4">A</div>
    <div class="col-md-8">B</div>
  </div>
</div>
```

Interpretación:
- en pantallas medianas o superiores, la primera columna ocupa 4 de 12,
- la segunda ocupa 8 de 12,
- por debajo de ese breakpoint, pueden apilarse.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-71.png)

**Espaciado en Bootstrap:** se basa en utilidades de `margin` y `padding`.

La idea general es:
- `m` para margin,
- `p` para padding,
- sufijos para lados y breakpoints,
- tamaños de `0` a `5` y `auto`.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-70.png)

**Qué conviene recordar para examen:** Bootstrap no sustituye a CSS, pero acelera mucho la construcción de interfaces responsivas.

Si se trabaja con Bootstrap 5, una idea útil es que ya no depende de jQuery para sus componentes JavaScript.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-72.png)


## 3.10.3 Validación y compatibilidad
Para comprobar sintaxis CSS se puede usar el validador del W3C:

```text
http://jigsaw.w3.org/css-validator
```

También conviene conocer los prefijos históricos de navegador:
- `-webkit-`,
- `-moz-`,
- `-ms-`,
- `-o-`.

Su importancia actual es menor que en etapas anteriores de CSS3, pero pueden aparecer en código antiguo o en documentación heredada.
