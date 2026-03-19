---
title: "JavaScript"
---

# 4.1 Qué es JavaScript

JavaScript es un **lenguaje de programación interpretado** creado originalmente en **1995 por Brendan Eich en Netscape** para añadir interactividad a páginas web abiertas con Netscape Navigator 2.0. Su nombre original fue **Mocha**, luego pasó a llamarse **JavaScript** mediante acuerdo con Sun Microsystems, y **no es Java**. En **1997** comenzó su estandarización en **ECMA** con el nombre **ECMAScript**, y posteriormente también pasó a estándar ISO. Con su aparición se introduce el concepto de **HTML dinámico (DHTML)**.

## 4.1.1 Dónde se ejecuta

JavaScript aparece embebido en el HTML o enlazado desde un fichero externo y el navegador lo interpreta en el **lado cliente** al descargar la página. Hoy existe la posibilidad de ejecutar JavaScript en servidor mediante **Node.js**, pero que eso no se trata en este tema.

Idea práctica: sin JavaScript la página muestra contenido; con JavaScript puede reaccionar, validar y cambiar el DOM.

Ejemplo:

```html
<button id="btn">Cambiar texto</button>
<p id="mensaje">Texto inicial</p>

<script>
  document.getElementById("btn").addEventListener("click", function () {
    document.getElementById("mensaje").textContent = "Texto cambiado";
  });
</script>
```

## 4.1.2 Motores JavaScript de navegadores

Las diapositivas enumeran varios motores JavaScript:

- Apple Safari → **Nitro**
    
- Google Chrome → **V8**
    
- Microsoft IE → **Chakra**
    
- Mozilla Firefox → **JägerMonkey**
    
- Opera → **Carakan**
    

# 4.2 Integración con HTML

JavaScript se ejecuta en el punto donde aparece escrito dentro del código HTML y debe ir dentro de etiquetas `script`. Puede incluirse como código interno o como fichero externo `.js`, invocado a lo largo de la página HTML. En el caso de páginas externas, se incluye con:

```html
<script src="codigo.js"></script>
```

Además, para mejorar la carga de la página, las diapositivas recomiendan colocarlo al final, antes de `</body>`.

Formas habituales:

```html
<!-- Interno -->
<script>
  console.log("Hola");
</script>

<!-- Externo -->
<script src="codigo.js"></script>
```

## 4.2.1 Qué efecto produce ponerlo al final

Si el navegador carga antes el HTML y después el JavaScript, el contenido principal aparece antes al usuario y el script suele encontrar ya creados los elementos sobre los que quiere actuar.

Ejemplo típico:

```html
<body>
  <button id="saludar">Saludar</button>
  <script src="app.js"></script>
</body>
```

# 4.3 Otros lenguajes de script e incompatibilidades históricas

Microsoft desarrolló para Internet Explorer dos versiones propias:

- **JScript**, similar a ECMAScript pero con diferencias en el modelo de objetos.
    
- **VBScript**, incompatible con navegadores distintos de IE y con sintaxis basada en Visual Basic.
    

La diferencia entre el modelo de objetos de JScript y JavaScript produjo incompatibilidades, y por ello el **W3C definió el HTML DOM** para unificar criterios.

# 4.4 DOM: Document Object Model

El **DOM** es el mecanismo estándar definido por el W3C para acceder a documentos HTML, XML y SVG, permitiendo que programas y scripts modifiquen su contenido, estructura y estilo. El W3C define tres partes separadas:

- **Core DOM** → modelo estándar para cualquier documento estructurado
    
- **XML DOM** → modelo estándar para cualquier documento XML
    
- **HTML DOM** → modelo estándar para cualquier documento HTML
    

## 4.4.1 Idea clave del DOM

El navegador transforma automáticamente las etiquetas de un documento HTML en una **estructura arborescente de nodos** accesibles mediante JavaScript.

Resumen:
- HTML fuente = texto con etiquetas.
- DOM = objetos que representan esas etiquetas en memoria.

Ejemplo:

```html
<p id="texto">Hola</p>
```

```js
const parrafo = document.getElementById("texto");
parrafo.textContent = "Hola DAW";
```

## 4.4.2 Reglas de transformación del árbol

La transformación automática de la página en árbol sigue estas reglas:

- las etiquetas HTML se transforman en nodos,
    
- el texto que contienen aparece como hijo del nodo de esa etiqueta,
    
- si una etiqueta está dentro de otra, sus nodos pasan a ser hijos de la que la contiene.

Ejemplo visual:

```html
<div>
  <p>Hola</p>
</div>
```

Se interpreta así:
- `div` es padre,
- `p` es hijo de `div`,
- `"Hola"` es hijo de `p`.
    

## 4.4.3 Etiqueta vs elemento

Las diapositivas distinguen:

- **Etiqueta** → texto literal en el HTML que lee el navegador, por ejemplo `<p>`
    
- **Elemento** → objeto del DOM creado a partir de esa etiqueta, por ejemplo `HTMLParagraphElement`
    

**Resumen muy importante:**  
La etiqueta está en el código fuente. El elemento es el objeto con el que trabaja JavaScript.

# 4.5 Objetos principales del HTML DOM

Mediante JavaScript es posible acceder a diferentes objetos relacionados con un documento HTML. `window`, `document`, `location`, `history`, `navigator`, `screen` y `frames`, y `document` es una propiedad del objeto `window`, que representa al navegador.

## 4.5.1 Objetos del navegador más usados
Aunque no todos forman parte del árbol de nodos, se usan constantemente junto al DOM:

- `window` → es el objeto global del navegador. Representa la ventana o pestaña actual y contiene a `document`.
    
- `document` → representa el documento HTML cargado. Se usa para buscar, crear, modificar o borrar nodos.
    
- `location` → contiene la URL actual. Se usa para leerla o redirigir a otra página.
    
- `history` → permite moverse por el historial del navegador.
    
- `navigator` → da información sobre el navegador y el dispositivo.
    
- `screen` → ofrece datos de la pantalla del usuario.
    
- `frames` → permite acceder a marcos o iframes si existen.
    
Ejemplos:

```js
console.log(window.innerWidth);
console.log(document.title);
console.log(location.href);
history.back();
console.log(navigator.userAgent);
console.log(screen.width);
```

## 4.5.2 Para qué sirve cada objeto principal del DOM

### `Document`

Representa toda la página HTML cargada.  
Sirve para localizar elementos, crear nuevos nodos y acceder a la estructura general del documento.

```js
const titulo = document.getElementById("titulo");
const nuevoParrafo = document.createElement("p");
```

### `Element`

Representa una etiqueta HTML concreta, como un `div`, `p`, `a` o `img`.  
Sirve para cambiar texto, atributos, clases, estilos o contenido interno.

```js
const caja = document.querySelector(".caja");
caja.textContent = "Contenido nuevo";
caja.setAttribute("data-activo", "si");
```

### `Attr`

Representa un atributo de un elemento, como `id`, `class`, `src` o `href`.  
En la práctica suele manejarse con `getAttribute`, `setAttribute` y `removeAttribute`.

```js
const imagen = document.querySelector("img");
console.log(imagen.getAttribute("src"));
imagen.setAttribute("alt", "Foto de ejemplo");
```

### `Text`

Representa un nodo de texto dentro de un elemento.  
Sirve para trabajar con el texto sin añadir etiquetas HTML.

```js
const texto = document.createTextNode("Hola DAW");
document.body.appendChild(texto);
```

### `Comment`

Representa un comentario HTML.  
No se usa mucho en ejercicios básicos, pero existe como nodo del árbol DOM.

```js
const comentario = document.createComment("Comentario interno");
document.body.appendChild(comentario);
```

### `HTMLDocument`

Es la versión específica de `Document` para documentos HTML.  
En la práctica, cuando usamos `document` en una página web estamos trabajando con un `HTMLDocument`.

```js
console.log(document.body);
console.log(document.head);
```

### `HTMLElement`

Es la clase base de los elementos HTML habituales.  
Sirve para entender que etiquetas como `div`, `p` o `button` comparten propiedades comunes como `id`, `className`, `innerHTML` o `style`.

```js
const boton = document.querySelector("button");
boton.id = "enviar";
boton.className = "btn-principal";
```

### `Style`

Permite acceder a los estilos en línea de un elemento mediante la propiedad `style`.  
Sirve para cambiar la apariencia desde JavaScript.

```js
const aviso = document.getElementById("aviso");
aviso.style.color = "red";
aviso.style.fontSize = "20px";
```

### `Event`

Representa una acción ocurrida en la página, como un clic, una pulsación de tecla o el envío de un formulario.  
Sirve para responder a la interacción del usuario.

```js
const boton = document.getElementById("btn");

boton.addEventListener("click", function (evento) {
  console.log(evento.type);
});
```

## 4.5.3 Colecciones auxiliares y cómo usarlas

### `HTMLCollection`

Colección de elementos HTML devuelta por métodos como `getElementsByTagName` o `getElementsByClassName`.  
Suele ser una colección "viva": si cambia el DOM, su contenido puede actualizarse automáticamente.

```js
const parrafos = document.getElementsByTagName("p");
console.log(parrafos[0]);
```

### `NodeList`

Lista de nodos devuelta, por ejemplo, por `querySelectorAll`.  
Se usa mucho para recorrer varios elementos a la vez.

```js
const items = document.querySelectorAll(".item");
items.forEach(function (item) {
  item.classList.add("activo");
});
```

### `NamedNodeMap`

Colección de atributos de un elemento, accesible mediante la propiedad `attributes`.  
Sirve para inspeccionar todos los atributos de una etiqueta.

```js
const enlace = document.querySelector("a");
console.log(enlace.attributes);
```

### `DOMTokenList`

Es la colección que maneja clases CSS a través de `classList`.  
Sirve para añadir, quitar, alternar o comprobar clases.

```js
const caja = document.querySelector(".caja");
caja.classList.add("visible");
caja.classList.remove("oculto");
caja.classList.toggle("destacado");
```


# 4.6 Qué puede hacer JavaScript mediante DOM

Las diapositivas resumen que con DOM JavaScript puede:

- cambiar todas las etiquetas HTML de la página,
    
- cambiar todos los atributos HTML,
    
- cambiar todos los estilos CSS,
    
- eliminar etiquetas y atributos,
    
- añadir nuevas etiquetas y atributos,
    
- reaccionar a todos los eventos HTML,
    
- crear nuevos eventos HTML.

**Qué efecto produce en la web:**  
Permite construir páginas dinámicas: contenido que cambia, formularios que validan, elementos que aparecen o desaparecen, estilos que se actualizan y comportamiento interactivo.

# 4.7 Acceso a elementos del DOM

## 4.7.1 Acceso a elementos individuales

Las diapositivas citan dos métodos principales:

- `getElementById(nombre)` → devuelve el elemento HTML cuyo atributo `id` coincide con el parámetro.
    
- `querySelector(CSS_Selector)` → devuelve el primer elemento que coincide con el selector CSS pasado.
    

**Diferencia práctica:**  
`getElementById` busca por id.  
`querySelector` permite usar selectores CSS más generales.

Ejemplos:

```js
const cabecera = document.getElementById("cabecera");
const primerDestacado = document.querySelector(".daw");
const primerEnlaceDelMenu = document.querySelector("nav a");
```

## 4.7.2 Propiedades para acceder al contenido

Las diapositivas incluyen estas propiedades:

- `nodeValue` → contenido del nodo actual
    
- `innerHTML` → contenido de los hijos del nodo actual
    
- `textContent` → contenido de texto de los hijos del nodo actual
    

### Diferencia entre `innerHTML` y `textContent`

`innerHTML` interpreta HTML.  
`textContent` solo trata texto.

Ejemplo:

```js
const caja = document.getElementById("caja");

caja.innerHTML = "<strong>Hola</strong>";
// renderiza una negrita real

caja.textContent = "<strong>Hola</strong>";
// muestra literalmente <strong>Hola</strong>
```

## 4.7.3 Propiedades de identificación del nodo

También se citan:

- `nodeName` → nombre del nodo
    
- `nodeType` → tipo del nodo actual
    
- `nodeValue` → valor del nodo actual
    

La tabla resumida de la diapositiva incluye:

- `1` → nodo elemento
    
- `2` → nodo atributo
    
- `3` → nodo texto
    
- `8` → nodo comentario
    

# 4.8 Acceso a conjuntos de elementos

Las diapositivas recogen:

- `getElementsByClassName(nombre)` → devuelve una `HTMLCollection`
    
- `getElementsByName(nombre)` → devuelve una `HTMLCollection`
    
- `getElementsByTagName(HTML_tag)` → devuelve una `HTMLCollection`
    
- `querySelectorAll(CSS_Selector)` → devuelve una `NodeList`
    

## 4.8.1 NodeList vs HTMLCollection

Se define:

- `NodeList` → colección de nodos sobre la que se puede iterar
    
- `HTMLCollection` → colección de elementos HTML
    

### Similitudes

- son listas tipo array,
    
- tienen propiedad `length`,
    
- permiten acceso por índice.
    

### Diferencias

- en `HTMLCollection` se puede acceder por nombre, id o índice,
    
- en `NodeList` solo por índice,
    
- `NodeList` puede contener nodos de atributos y texto, no solo elementos,
    
- uno puede ser “vivo” y otro estático: si el DOM cambia, un objeto vivo reconoce los nuevos elementos y uno estático no.
    

**Resumen útil de examen:**  
`querySelectorAll` suele devolver colección estática.  
`getElementsBy...` suele devolver colección viva.

Ejemplo corto:

```js
const estaticos = document.querySelectorAll(".item");
const vivos = document.getElementsByClassName("item");
```

Si luego añades un nuevo `.item`, normalmente `vivos` lo detecta y `estaticos` no.

# 4.9 Crear y eliminar nodos

El DOM define métodos para crear y borrar contenido:

- `createElement()` → inserta un nuevo nodo
    
- `createTextNode()` → inserta un nodo de texto
    
- `appendChild()` / `removeChild()` → inserta o elimina un nodo hijo
    

Permite construir contenido nuevo desde JavaScript sin que estuviera escrito previamente en el HTML.

Ejemplo completo:

```js
const p = document.createElement("p");
const texto = document.createTextNode("Nuevo párrafo");

p.appendChild(texto);
document.body.appendChild(p);

// Eliminarlo después
document.body.removeChild(p);
```

# 4.10 Referencias entre nodos

Las diapositivas citan las siguientes propiedades:

- `parentNode`
    
- `previousSibling`
    
- `nextSibling`
    
- `firstChild`
    
- `lastChild`
    
- `firstElementChild`
    
- `childNodes`
    
- `children`
    

## 4.10.1 Diferencia entre `childNodes` y `children`

Las páginas 30 y 31 muestran visualmente que:

- `childNodes` devuelve todos los nodos hijos, incluyendo texto, comentarios y script,
    
- `children` devuelve solo elementos HTML.
    

Ejemplo:

```js
const caja = document.getElementById("caja");

console.log(caja.childNodes); // incluye textos y saltos de línea
console.log(caja.children);   // solo elementos HTML
```

# 4.11 Acceso y manipulación de atributos

Para atributos, las diapositivas incluyen:

- `element.attributes` → devuelve atributos como `NamedNodeMap`
    
- `element.getAttribute()`
    
- `element.getAttributeNames()`
    
- `element.getAttributeNode()`
    

También se citan métodos para modificarlos:

- `element.hasAttribute()`
    
- `element.setAttribute()`  
    En la diapositiva aparece como `Attribute()` por errata, pero el ejemplo mostrado usa `setAttribute("href", "...")`.
    
- `element.removeAttribute()`
    

Permite leer, crear, cambiar o borrar atributos HTML como `href`, `src`, `alt`, `id`, etc.

Ejemplo:

```js
const enlace = document.querySelector("a");

console.log(enlace.getAttribute("href"));
enlace.setAttribute("href", "https://www.usc.es");
enlace.removeAttribute("target");
```

# 4.12 Acceso a estilos desde JavaScript

Las diapositivas explican que:

- `style` permite acceder al estilo del elemento seleccionado,
    
- `.style` solo retorna estilos introducidos en línea,
    
- `window.getComputedStyle(element)` permite acceder a todos los estilos aplicados al elemento,
    
- ambos devuelven objetos del tipo `CSSStyleDeclaration`.
    

## 4.12.1 Diferencia importante

`element.style` solo ve estilos inline.  
`getComputedStyle(element)` ve el estilo final resultante.

Ejemplo:

```js
const caja = document.getElementById("caja");

console.log(caja.style.color); // solo inline
console.log(getComputedStyle(caja).getPropertyValue("color")); // estilo final
```

# 4.13 Eventos en el DOM

Los eventos ocurren cuando el usuario realiza acciones con teclado o ratón, cuando cambia el tamaño de la ventana, al cargar la página, etc. Cuando un evento ocurre, se lanza una función programable. El evento se almacena en un objeto de la clase `Event`. Las diapositivas destacan:

- `.type` → tipo de evento
    
- `.target` → objeto que lo dispara
    
- `.preventDefault()` → detiene la acción por defecto
    
- `.stopPropagation()` → detiene la propagación en burbuja
    

## 4.13.1 Formas de asociar eventos

Las diapositivas muestran tres formas:

- mediante atributos HTML de eventos,
    
- mediante manejadores DOM,
    
- mediante `addEventListener` de DOM level 2.
    

### Atributos HTML de eventos

Es la forma antigua, por ejemplo `onclick="funcion()"`, y no se recomienda porque no separa JavaScript del HTML.

### Manejadores DOM

Ejemplo conceptual: `element.onclick = funcion;`  
Solo permite asociar una función por evento.

### `addEventListener`

Es la forma actual. Permite asociar varias funciones al mismo evento.

**Resumen importante:**  
La forma recomendada es `addEventListener`.

Ejemplo recomendado:

```js
const boton = document.getElementById("btn");

boton.addEventListener("click", function () {
  console.log("Primer manejador");
});

boton.addEventListener("click", function () {
  console.log("Segundo manejador");
});
```

## 4.13.2 Flujo de eventos

Cuando un evento ocurre en una etiqueta interior a otras, el evento se propaga:

- hacia las etiquetas contenedoras si es `false` → **bubble mode**
    
- o viceversa si es `true` → **capturing mode**
    

Ejemplo típico: si haces clic en un botón dentro de un `div`, puede ejecutarse el evento del botón y también el del `div`.

## 4.13.3 Acceso al objeto evento

La página 48 muestra que el acceso a los eventos se realiza a través del parámetro introducido en la función invocada por el listener. Allí se ve un ejemplo donde se muestran `e.type` y `e.target`.

Ejemplo:

```js
document.getElementById("btn").addEventListener("click", function (e) {
  console.log(e.type);   // click
  console.log(e.target); // elemento pulsado
});
```

# 4.14 APIs de JavaScript en navegador

Una **API** es un mecanismo que permite a un programa interactuar con otros programas o scripts accediendo a sus datos para crear funcionalidades complejas de forma simple. JavaScript tiene muchas APIs construidas sobre su núcleo. Las diapositivas distinguen:

- **APIs de navegador** → integradas en el navegador
    
- **APIs de terceros** → no incluidas por defecto y obtenidas desde la web, como Facebook, Twitter, Google Maps o YouTube.
    

## 4.14.1 APIs HTML5 citadas

Se mencionan:

- `geolocation`
    
- `localStorage`
    
- `sessionStorage`
    
- `history`
    
- `console`
    

## 4.14.2 Geolocation

Permite averiguar la posición del usuario en coordenadas geográficas de latitud y longitud, siempre que el usuario conceda permiso. Se implementa con el objeto `geolocation`, propiedad de `navigator`.

## 4.14.3 localStorage y sessionStorage

Permiten almacenamiento local de datos en el navegador y son un mecanismo alternativo a las cookies.

- `localStorage` → sin fecha de expiración
    
- `sessionStorage` → se pierde al cerrar la ventana del navegador
    

Hay dos formas de almacenar:

- `setItem(nombreDato, valorDato)`
    
- usando el dato como atributo, por ejemplo `localStorage.nombreDato = valorDato`
    

Y dos formas de recuperar:

- `getItem(nombreDato)`
    
- acceso como atributo, por ejemplo `localStorage.nombreDato`
    

**Qué efecto produce:**  
Permite recordar datos entre páginas o entre sesiones, como un contador, una preferencia o un nombre de usuario.

Ejemplo:

```js
localStorage.setItem("usuario", "Ana");
console.log(localStorage.getItem("usuario"));
```

## 4.14.4 Console

La API `console` permite tareas de depuración, como registrar mensajes, valores de variables o cronometrar operaciones. El método más utilizado es `console.log()`.

# 4.15 Sintaxis básica de JavaScript

Las diapositivas indican que JavaScript:

- es **sensible a mayúsculas/minúsculas**,
    
- es conveniente que todas las líneas terminen en `;`,
    
- admite comentarios con `//` y con `/* ... */`.
    

**Resumen útil:**  
`miVariable` y `mivariable` no son lo mismo.

Ejemplo:

```js
let nombre = "Ana";
// let Nombre = "Luis"; // sería otra variable distinta

// Comentario de una línea
/*
  Comentario
  de varias líneas
*/
```

# 4.16 Declaración y ámbito de variables

## 4.16.1 Con `var`

Se presenta la declaración clásica con `var`, donde el tipo lo toma al inicializarse. Las diapositivas indican que con la llegada de ES6, `var` ha sido sustituido por `let` y/o `const`.

Ejemplo comparativo:

```js
var edad = 20;
let curso = 2;
const centro = "DAW";
```

## 4.16.2 Ámbito global y local

- **Global** → accesible desde cualquier punto de la página
    
- **Local** → accesible solo dentro de la función donde se define
    

**Qué efecto produce:**  
Una variable local no puede usarse fuera de su función, mientras que una global sí.

Ejemplo:

```js
let global = "visible en todo el script";

function prueba() {
  let local = "solo dentro de la función";
  console.log(global);
  console.log(local);
}

prueba();
// console.log(local); // error
```

# 4.17 Tipos de datos y conversión

Las diapositivas indican cinco tipos:

- `string`
    
- `number`
    
- `boolean`
    
- `Object`
    
- `Null`
    

También aparece `typeof(mivariable)` para obtener el tipo.

## 4.17.1 Conversión entre tipos

Puede ser:

- **implícita** → la coerción es automática hacia cadenas
    
- **explícita** → con funciones como `parseFloat()`, `parseInt()` y `toString()`

Ejemplos:

```js
console.log("5" + 2);            // "52"
console.log(parseInt("25", 10)); // 25
console.log(parseFloat("3.14")); // 3.14
console.log((123).toString());   // "123"
```
    

# 4.18 Operadores

Las diapositivas enumeran:

- aritméticos → `+`, `-`, `*`, `/`, `++`, `--`, `%`
    
- lógicos → AND, OR, NOT
    
- relacionales → `==`, `!=`, `>`, `>=`, `<`, `<=`, `===`, `!==`
    
- bit a bit → `&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`
    
- asignación → `=`, `+=`, `-=`, `*=`, `/=`, etc.
    
- otros → concatenación con `+`, operador ternario `?:`, operador `.`
    

## 4.18.1 Diferencia importante entre `==` y `===`

La diapositiva los enumera por separado, lo que indica que no significan exactamente lo mismo.  
Para estudiar mejor:

- `==` compara con conversión de tipo
    
- `===` compara valor y tipo

Ejemplo:

```js
console.log(5 == "5");   // true
console.log(5 === "5");  // false
```
    

# 4.19 Operaciones matemáticas y constantes

Las operaciones matemáticas forman parte, en general, del objeto `Math`. Se cita el uso de métodos como:

- `log`, `exp`, `sqrt`, `pow`, `abs`, `floor`, `ceil`, `round`, `random`, `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `max`, `min`
    

También se mencionan constantes predefinidas:

- `E`
    
- `LN2`
    
- `LN10`
    
- `LOG2`
    
- `LOG10`
    
- `PI`
    
- `SQRT2`
    
- `SQRT1_2`

Ejemplos rápidos:

```js
console.log(Math.sqrt(25));   // 5
console.log(Math.floor(4.8)); // 4
console.log(Math.random());   // número entre 0 y 1
console.log(Math.PI);         // 3.14159...
```
    

# 4.20 Estructuras de control

Las diapositivas incluyen:

- `if - else`
    
- `for`
    
- `for-in`
    
- `while`
    
- `do while`
    
- `switch-case`
    
- `break`
    
- `continue`
    

## 4.20.1 Para qué sirve cada una

- `if - else` → tomar decisiones
    
- `for` → repetir con contador
    
- `for-in` → recorrer propiedades
    
- `while` → repetir mientras se cumpla una condición
    
- `do while` → ejecutar al menos una vez y luego comprobar
    
- `switch` → elegir entre varios casos
    
- `break` → salir del bucle o del switch
    
- `continue` → saltar a la siguiente iteración

Ejemplos básicos:

```js
if (nota >= 5) {
  console.log("Aprobado");
} else {
  console.log("Suspenso");
}

for (let i = 0; i < 3; i++) {
  console.log(i);
}

while (contador < 5) {
  contador++;
}

switch (dia) {
  case 1:
    console.log("Lunes");
    break;
  default:
    console.log("Otro día");
}
```
    

# 4.21 Funciones en JavaScript

Las diapositivas muestran varias formas de definir funciones.

## 4.21.1 Función declarada

Se define con la palabra `function` y se puede llamar posteriormente.

```js
function sumar(a, b) {
  return a + b;
}
```

## 4.21.2 Función como expresión

Se puede definir una función y almacenarla en una variable; en ese caso la función es anónima.

```js
const restar = function (a, b) {
  return a - b;
};
```

## 4.21.3 Función autoinvocada

Las funciones pueden autoinvocarse. Las diapositivas indican que en este caso no llevan `return`.

```js
(function () {
  console.log("Se ejecuta al definirse");
})();
```

## 4.21.4 Callback

Un **callback** es una función pasada como argumento de otra función y ejecutada por esta última. Las páginas 19 y 20 muestran visualmente la diferencia entre cálculo normal y cálculo con callback.

Permite delegar qué hacer con el resultado de una función.

Ejemplo:

```js
function calcular(a, b, callback) {
  const resultado = a + b;
  callback(resultado);
}

calcular(2, 3, function (dato) {
  console.log(dato);
});
```

## 4.21.5 Variables locales y globales dentro de funciones

La página 21 muestra visualmente cómo una función puede trabajar con variables locales y globales a la vez.

## 4.21.6 Paso por valor y por referencia

Las diapositivas indican:

- tipos primitivos, como números y cadenas → **por valor**
    
- objetos, incluyendo arrays → **por referencia**
    

Si una función modifica un objeto recibido, ese cambio puede permanecer fuera de la función.

Ejemplo:

```js
function cambiar(obj) {
  obj.nombre = "Pepe";
}

const alumno = { nombre: "Ana" };
cambiar(alumno);
console.log(alumno.nombre); // Pepe
```

# 4.22 Objetos en JavaScript

## 4.22.1 Forma tradicional con `new`

Tradicionalmente la instanciación se hacía con `new`, llamando a una función que actúa como constructor. Las propiedades del objeto pueden accederse con `.` o con `[]`.

```js
function Alumno(nombre) {
  this.nombre = nombre;
}

const a1 = new Alumno("Lucía");
```

## 4.22.2 Forma actual con `{ }`

La tendencia actual indicada en las diapositivas es usar llaves para instanciar directamente el objeto. Las propiedades son públicas, pueden modificarse directamente y también eliminarse con `delete()`.

```js
const alumno = {
  nombre: "Lucía",
  curso: 2
};

alumno.curso = 3;
delete alumno.curso;
```

## 4.22.3 Métodos en objetos

Al instanciar con `{ }`, se pueden añadir métodos dentro del propio objeto o después. La llamada se hace con `.`.

```js
const alumno = {
  nombre: "Lucía",
  saludar() {
    return "Hola " + this.nombre;
  }
};
```

## 4.22.4 Las funciones son objetos

Las funciones en JavaScript son objetos y tienen propiedades y métodos. Las diapositivas destacan:

- `arguments`
    
- `arguments.length`
    
- `toString()`
    

# 4.23 Arrays

Los arrays son objetos con métodos y propiedades propios. Tradicionalmente podían crearse con `new Array()`, pero la forma recomendada actual es con corchetes `[]`, incluso directamente con valores.

Métodos y propiedades citados:

- `length`
    
- `join`
    
- `reverse`
    
- `sort`
    
- `concat`
    
- `slice`

Ejemplos:

```js
const notas = [7, 5, 9];

console.log(notas.length);    // 3
console.log(notas.join("-")); // "7-5-9"
console.log(notas.slice(1));  // [5, 9]
```
    

# 4.24 Manejo de cadenas

Se realiza mediante el objeto string. La forma recomendada de instanciarlas es directamente, no con `new`. Se citan métodos como:

- `fromCharCode`
    
- `charCodeAt`
    
- `indexOf`
    
- `lastIndexOf`
    
- `substr`
    
- `slice`
    
- `substring`
    
- `toLowerCase`
    
- `toUpperCase`

Ejemplos:

```js
const texto = "JavaScript";

console.log(texto.indexOf("Script")); // 4
console.log(texto.slice(0, 4));       // "Java"
console.log(texto.toUpperCase());     // "JAVASCRIPT"
```
    

# 4.25 Programación orientada a eventos

Las diapositivas de sintaxis básica enumeran eventos como:

- `click`
    
- `mouseover`
    
- `mouseout`
    
- `load`
    
- `unload`
    
- `focus`
    
- `blur`
    
- `keypress`
    
- `select`
    
- `change`
    
- `submit`
    
- `reset`
    
- `error`
    
- `abort`

Ejemplo típico:

```js
input.addEventListener("focus", function () {
  console.log("El campo ha recibido el foco");
});
```
    

# 4.26 Fechas y horas

Se gestionan con el objeto `Date`. Las diapositivas muestran dos constructores y una lista amplia de métodos `get...` y `set...`, así como sus equivalentes UTC, además de conversiones como `toUTCString` y `toGMTString`.

Ejemplo:

```js
const hoy = new Date();

console.log(hoy.getFullYear());
console.log(hoy.getMonth()); // enero = 0
console.log(hoy.getDate());
```

# 4.27 ES6 o ECMAScript 6

En **2015**, ECMAScript hizo una revisión importante de JavaScript, creándose la versión denominada **ES6** o **ECMAScript 6**. Las diapositivas indican que los navegadores actualizados la soportan y que las revisiones han continuado cada año, aunque con menor intensidad.

# 4.28 `let`, `const` y diferencias con `var`

Las diapositivas comparan:

- `var` → no tiene ámbito de bloque, permite redeclaración y reasignación
    
- `let` → tiene ámbito de bloque, no permite redeclaración en el mismo bloque y sí reasignación
    
- `const` → tiene ámbito de bloque, no permite redeclaración ni reasignación
    

**Resumen clave:**  
Hoy se prefiere `let` para variables y `const` para valores que no van a reasignarse.

Ejemplo:

```js
if (true) {
  var a = 1;
  let b = 2;
}

console.log(a); // 1
// console.log(b); // error
```

# 4.29 Operador spread `...`

Permite expandir los elementos de un objeto iterable. La diapositiva lo ilustra con `Math.max(...x)`, señalando que `Math.max(x)` daría `NaN`.

Convierte un array en una lista de argumentos separados.

Ejemplos:

```js
const numeros = [4, 9, 2];

console.log(Math.max(...numeros)); // 9

const copia = [...numeros];
```

# 4.30 `for...of`

Las diapositivas destacan que `for...of` permite iterar sobre estructuras iterables como arrays, strings o mapas. Lo comparan con `for...in`, mostrando que en una cadena:

- `for...of` recorre los caracteres
    
- `for...in` recorre los índices
    

**Resumen importante:**  
`for...of` recorre valores.  
`for...in` recorre claves o índices.

Ejemplo:

```js
const texto = "hola";

for (const letra of texto) {
  console.log(letra);
}

for (const indice in texto) {
  console.log(indice);
}
```

# 4.31 Funciones en ES6

## 4.31.1 Parámetros por defecto

Se permiten valores por defecto en parámetros.

```js
function saludar(nombre = "invitado") {
  return "Hola " + nombre;
}
```

## 4.31.2 Número indefinido de parámetros

Puede usarse `...` en la definición para recibir número indefinido de parámetros.

```js
function sumarTodo(...valores) {
  return valores.reduce((acc, n) => acc + n, 0);
}
```

## 4.31.3 Funciones arrow

Las funciones arrow son funciones pequeñas que no necesitan ni llaves ni `return` cuando su cuerpo es una sola expresión. Si tienen varios argumentos o ninguno, deben llevar paréntesis; si tienen dos o más líneas, se mantienen llaves y `return`.

Escriben funciones pequeñas de forma más compacta.

Ejemplos:

```js
const doble = x => x * 2;
const sumar = (a, b) => a + b;
const saludar = () => "Hola";
```

# 4.32 Clases en ES6

ES6 introduce una nueva forma de definir el constructor de clase mediante `class`. El acceso sigue haciéndose con `.`. Se pueden añadir métodos normales o getters. La herencia se hace con `extends` y `super()` dentro del constructor de la clase hija. Las diapositivas aclaran además que los atributos no son privados por defecto, sino públicos.

Ejemplo:

```js
class Persona {
  constructor(nombre) {
    this.nombre = nombre;
  }

  saludar() {
    return "Hola " + this.nombre;
  }
}

class Alumno extends Persona {
  constructor(nombre, curso) {
    super(nombre);
    this.curso = curso;
  }
}
```

# 4.33 Mapas, conjuntos y símbolos

## 4.33.1 Map

`Map` es un tipo de dato formado por pares clave-valor y permite usar objetos como claves. Se citan métodos como `set`, `get`, `clear`, `keys` y `values`.

```js
const mapa = new Map();
mapa.set("nombre", "Ana");
console.log(mapa.get("nombre"));
```

## 4.33.2 Set

`Set` permite crear conjuntos con valores únicos. Se citan métodos como `add`, `delete`, `clear` y `values`.

```js
const conjunto = new Set([1, 2, 2, 3]);
console.log(conjunto); // {1, 2, 3}
```

## 4.33.3 Symbol

`Symbol` es un nuevo tipo de dato con valor único que permanece oculto. La diapositiva ilustra que `miClase[id]` es accesible, pero `miClase.id` no.

```js
const id = Symbol("id");
const usuario = { [id]: 10 };
```

# 4.34 Nuevos métodos ES6 para strings y arrays

En strings se citan:

- `includes()`
    
- `startsWith()`
    
- `endWith()`
    

En arrays:

- `from()`
    
- `keys()`
    
- `find()`
    
- `findIndex()`
    

También se mencionan nuevas funcionalidades para `Math`, `Number` y métodos globales como `isFinite()` e `isNaN()`.

Ejemplos:

```js
console.log("JavaScript".includes("Script")); // true
console.log("JavaScript".startsWith("Java")); // true
console.log(Array.from("hola"));              // ["h", "o", "l", "a"]
console.log([4, 7, 9].find(n => n > 5));     // 7
```

# 4.35 Módulos en ES6

Los módulos son ficheros que incluyen colecciones de funciones y/o clases con un propósito común. Se agrupan en carpetas y, aunque se ha planteado el uso de `.mjs`, no está generalizado.

## 4.35.1 Importaciones

Las diapositivas distinguen:

- importación de nombres exportados
    
- importación por defecto
    
- posibilidad de renombrar con `as`
    
- posibilidad de tener un `default` y varios no default en el mismo módulo
    

## 4.35.2 Uso en HTML

Para invocar módulos en HTML hay que incluir `type="module"` en la etiqueta `script`, y además la diapositiva subraya que para poder invocarlos hay que hacerlo **a través de servidores**. Las páginas 22 y 23 lo muestran visualmente con un módulo que exporta `suma` y un script que la importa.

Ejemplo mínimo:

```js
// utilidades.js
export function suma(a, b) {
  return a + b;
}
```

```js
// app.js
import { suma } from "./utilidades.js";
console.log(suma(2, 3));
```

```html
<script type="module" src="app.js"></script>
```

# 4.36 Expresiones regulares

Las expresiones regulares permiten definir el patrón de una cadena y usarlo como mecanismo de comprobación de información. Se justifican especialmente para comprobar que los datos enviados al servidor sean consistentes, por ejemplo validando campos obligatorios o formatos correctos.

## 4.36.1 Formas de definición

- con barras inclinadas → `/patron/opciones`
    
- con constructor `RegExp("patron", "opciones")`
    

Opciones citadas:

- `i` → ignora mayúsculas/minúsculas
    
- `g` → búsqueda global
    
- `m` → búsqueda multilínea
    

## 4.36.2 Clase RegExp

Métodos citados:

- `exec()`
    
- `test()`
    
- `toString()`
    

Propiedades citadas:

- `global`
    
- `ignoreCase`
    
- `lastIndex`
    
- `multiline`
    
- `source`
    

## 4.36.3 Tipos de patrones

Las diapositivas citan:

- cuantificadores
    
- caracteres de escape
    
- clases o conjuntos de caracteres
    
- caracteres de marcado o posición
    
- alternancias
    
- agrupaciones
    
- referencias inversas
    
- patrones misceláneos
    

## 4.36.4 Patrones concretos vistos

- `*` → cero o más veces
    
- `+` → una o más veces
    
- `?` → cero o una vez
    
- `\` → carácter de escape
    
- `[conjunto]` → cualquiera de los caracteres del conjunto
    
- `\b` → final de palabra
    
- `\B` → no final de palabra
    
- `^` → comienzo de cadena o línea
    
- `$` → final de cadena o línea
    
- `|` → alternancia
    
- `(patron)` → agrupación
    
- `(?:...)`, `(?=...)`, `(?!...)` → subpatrones y búsquedas condicionadas
    
- `{n}`, `{n,}`, `{n,m}` → repeticiones controladas
    
- `\d`, `\w`, `\W`, `\n`, `\r`, `\t`, `\f`, `\v`, `\s`
    

## 4.36.5 Precedencia

Se da esta precedencia entre operadores:

- `\`
    
- `( )`, `[ ]`
    
- `*`, `+`, `{n}`, `{n,}`, `{n,m}`
    
- `^`, `$`
    
- `|`
    

## 4.36.6 Ejemplos de email

La diapositiva incluye un ejemplo de validación de email con `test()` y otro de extracción de usuario y dominio con `exec()`. También se muestra el uso de `match()` para obtener esas partes.

Ejemplos:

```js
const email = "ana@correo.com";
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log(regexEmail.test(email)); // true
```

```js
const regexPartes = /^([^@]+)@(.+)$/;
const resultado = regexPartes.exec("ana@correo.com");

console.log(resultado[1]); // ana
console.log(resultado[2]); // correo.com
```

## 4.36.7 Métodos del objeto String que usan regex

Se citan:

- `match`
    
- `matchAll`
    
- `search`
    
- `replace`
    
- `replaceAll`
    
- `split`
    

La página 22 muestra visualmente un ejemplo con `matchAll()` que extrae tokens del texto “Escuela Técnica Superior de Ingeniería”.

Ejemplos rápidos:

```js
const texto = "DAW 2026";

console.log(texto.match(/\d+/));          // ["2026"]
console.log(texto.replace(/\d+/, "2027")); // "DAW 2027"
console.log("a,b,c".split(/,/));          // ["a", "b", "c"]
```

# 4.37 Validación con JavaScript y con HTML5

La página 23 muestra un ejemplo visual de validación mediante JavaScript de un formulario, usando `preventDefault()`, expresiones regulares, `alert`, `focus` y `select` para detener el envío y obligar a corregir campos.

Ejemplo simple:

```js
formulario.addEventListener("submit", function (e) {
  if (nombre.value.trim() === "") {
    e.preventDefault();
    alert("El nombre es obligatorio");
    nombre.focus();
  }
});
```

## 4.37.1 Validación HTML5

Las diapositivas de HTML5 indican que `input` puede validar ciertos tipos conocidos:

- `type="email"`
    
- comportamiento análogo para `url` y `number`
    

También:

- atributo `pattern` para insertar una expresión regular en `input`
    
- atributo `required` para obligar a rellenar un campo
    

**Resumen útil:**  
HTML5 ya incorpora validación básica sin necesidad de programarla toda en JavaScript.

Ejemplo:

```html
<input type="email" required>
<input type="text" pattern="[A-Za-z]{3,}">
```

# 4.38 jQuery

jQuery es una **librería de funciones escrita en JavaScript**, creada por **John Resig** y presentada en enero de 2006 en el BarCamp NYC. Es software libre y de código abierto. Permite:

- simplificación de interacción con documentos HTML,
    
- manipulación del DOM,
    
- manejo de eventos,
    
- desarrollo de animaciones,
    
- interacción mediante AJAX.
    

## 4.38.1 Integración con HTML

Puede añadirse:

- descargando `jquery.js`
    
- o referenciándolo desde un CDN, como muestra la diapositiva con Google Ajax APIs.

Ejemplo:

```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
```
    

## 4.38.2 Por qué usar jQuery

Ventajas respecto al DOM nativo:

- selecciones más simples,
    
- una selección permite aplicar distintos métodos,
    
- robustez entre navegadores,
    
- manejo de eventos más sencillo,
    
- animaciones adicionales.
    

# 4.39 Sintaxis básica de jQuery

La sintaxis general es:

`$(selector).action()`

Aquí:

- `$` es la forma abreviada de llamar al constructor `jQuery()`,
    
- el parámetro sirve para seleccionar con estilo CSS qué etiquetas HTML van a verse afectadas,
    
- el resultado es un objeto jQuery sobre el que se aplican métodos.

Ejemplo:

```js
$("#mensaje").text("Hola desde jQuery");
```
    

## 4.39.1 `ready()`

El método `ready()` informa de cuándo el DOM está listo y entonces ejecuta la función que lleva como argumento. También existe el atajo abreviado con `$(function(){ ... })`. Las páginas 8 y 9 muestran visualmente ese comportamiento.

```js
$(function () {
  console.log("DOM listo");
});
```

## 4.39.2 Selectores específicos jQuery

La diapositiva cita:

- `$(this)`
    
- `$("p:first")`
    
- `$("ul li:first-child")`
    
- `$(":button")`
    
- `$("tr:even")`
    
- `$("tr:odd")`
    

# 4.40 Métodos jQuery

## 4.40.1 Acceso y modificación de contenido

Se citan:

- `.html()`
    
- `.text()`
    
- `.replaceWith()`
    
- `.remove()`
    

**Diferencia importante:**  
`.html()` interpreta HTML.  
`.text()` solo maneja texto.

Ejemplo:

```js
$("#caja").html("<strong>Hola</strong>");
$("#caja").text("<strong>Hola</strong>");
```

## 4.40.2 Relativos a nodos

Se citan:

- `.before()`
    
- `.after()`
    
- `.prepend()`
    
- `.append()`
    
- `.remove()`
    
- `.clone()`
    
- `.unwrap()`
    
- `.detach()`
    
- `.empty()`
    
- `.add()`
    

## 4.40.3 Atributos y estilos

Se citan:

- `.attr()`
    
- `.removeAttr()`
    
- `.addClass()`
    
- `.removeClass()`
    
- `.css()`

Ejemplo:

```js
$("a").attr("target", "_blank");
$(".aviso").addClass("activo");
$(".aviso").css("color", "red");
```
    

## 4.40.4 Formularios

Se citan:

- `.val()`
    
- `.isNumeric()`

Ejemplo:

```js
const valor = $("#edad").val();
```
    

## 4.40.5 Selección de elementos del árbol DOM

Se citan:

- `.find()`
    
- `.closest()`
    
- `.parent()`
    
- `.parents()`
    
- `.children()`
    
- `.siblings()`
    
- `.next()`
    
- `.nextAll()`
    
- `.prev()`
    
- `.prevAll()`
    

## 4.40.6 Lazos

La diapositiva destaca `.each()` y añade que los ítems seleccionados son accesibles mediante `this`.

```js
$("li").each(function () {
  console.log($(this).text());
});
```

## 4.40.7 Testeo y filtrado

Se citan:

- `.filter()`
    
- `.not()`
    
- `.has()`
    
- `.is()`
    
- `.contains()`
    

## 4.40.8 Orden en selección

Se citan:

- `.eq()`
    
- `.lt()`
    
- `.gt()`  
    y se indica expresamente que `eq()` comienza a contar en 0.
    

## 4.40.9 Dimensiones

Se citan:

- `.height()`
    
- `.width()`
    
- `.innerHeight()`
    
- `.innerWidth()`
    
- `.outerHeight()`
    
- `.outerWidth()`
    
- `$(document).height()`
    
- `$(document).width()`
    
- `$(window).height()`
    
- `$(window).width()`
    

## 4.40.10 Posición

Se citan:

- `.offset()`
    
- `.position()`
    
- `.scrollLeft()`
    
- `.scrollTop()`
    

## 4.40.11 Animación

Se citan:

- `.show()`
    
- `.hide()`
    
- `.toggle()`
    
- `.fadeIn()`
    
- `.fadeOut()`
    
- `.fadeTo()`
    
- `.fadeToggle()`
    
- `.slideDown()`
    
- `.slideUp()`
    
- `.slideToggle()`
    
- `.delay()`
    
- `.stop()`
    
- `.animate()`
    

# 4.41 Eventos en jQuery

jQuery puede responder a eventos mediante funciones manejadoras. La diapositiva muestra tanto la forma directa `$("p").click(...)` como la forma moderna con `.on()`, introducida en la versión 1.7.

## 4.41.1 Método `.on()`

Se usa con dos parámetros:

- el evento,
    
- la función que responde al evento.

Ejemplo:

```js
$("#btn").on("click", function () {
  $("#mensaje").text("Has pulsado");
});
```
    

## 4.41.2 Objeto evento en jQuery

Las funciones manejadoras reciben un objeto evento con propiedades como:

- `.type`
    
- `.which`
    
- `.target.nodeName`
    
- `.pageX`
    
- `.pageY`
    

Las páginas 37 y 38 lo ilustran visualmente mostrando el tipo de evento y otros datos en pantalla.

## 4.41.3 Métodos del objeto evento

Se citan:

- `.preventDefault()`
    
- `.stopPropagation()`
    

## 4.41.4 Tipos de eventos jQuery

Las diapositivas agrupan eventos en:

- UI → `focus`, `blur`, `change`
    
- teclado → `input`, `keydown`, `keyup`, `keypress`
    
- ratón → `click`, `dblclick`, `mouseup`, `mousedown`, `mouseover`, `mousemove`, `mouseout`, `hover`
    
- formulario → `submit`, `select`, `change`
    
- documento → `ready`, `load`, `unload`
    
- navegador → `error`, `resize`, `scroll`
    

# 4.42 Resumen fuerte para examen

- JavaScript es un lenguaje interpretado creado en 1995 por Brendan Eich; no es Java.
    
- Se ejecuta en cliente dentro del navegador y puede integrarse dentro de HTML o mediante fichero externo.
    
- El DOM transforma el HTML en un árbol de nodos accesible con JavaScript.
    
- `getElementById` y `querySelector` acceden a elementos individuales; `querySelectorAll` y `getElementsBy...` a colecciones.
    
- `NodeList` y `HTMLCollection` no son exactamente lo mismo; una diferencia importante es estático frente a vivo.
    
- Se pueden crear, borrar y recorrer nodos, atributos y estilos desde JavaScript.
    
- Los eventos se manejan mejor con `addEventListener`.
    
- ES6 introduce `let`, `const`, arrow functions, clases, módulos, map, set y symbol.
    
- Las expresiones regulares sirven para validar y comprobar cadenas.
    
- HTML5 también valida con `email`, `pattern` y `required`.
    
- jQuery simplifica selección, manipulación del DOM, eventos y animaciones.
