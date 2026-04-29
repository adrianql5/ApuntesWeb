---
title: "JavaScript"
---

# 1. Introducción

JavaScript es un **lenguaje de programación interpretado** creado en **1995 por Brendan Eich en Netscape** para añadir interactividad a páginas web abiertas con Netscape Navigator 2.0. Su nombre original fue **Mocha**, después pasó a llamarse **JavaScript** mediante acuerdo con Sun Microsystems, y **no es Java**. En **1997** comenzó su estandarización en **ECMA** con el nombre **ECMAScript**; más adelante también se convirtió en estándar ISO. Con su aparición se populariza el **HTML dinámico (DHTML)**.

## 1.1 Entorno de ejecución e integración con HTML

JavaScript puede ir embebido en el HTML o enlazado desde un fichero externo `.js`. El navegador lo interpreta normalmente en el **lado cliente** al descargar la página. Hoy también puede ejecutarse en servidor con **Node.js**, pero ese uso no forma parte de este tema.

Idea práctica: sin JavaScript la página muestra contenido; con JavaScript puede reaccionar, validar y modificar el DOM.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-74.png)

Los navegadores usan motores JavaScript propios.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-73.png)

La integración con HTML se hace mediante la etiqueta `script`:

```html
<!-- Interno -->
<script>
  console.log("Hola");
</script>

<!-- Externo -->
<script src="codigo.js"></script>
```

También es habitual colocarlo al final del `body` para que el HTML principal cargue antes y el script encuentre ya creados los elementos sobre los que va a actuar:

```html
<body>
  <button id="saludar">Saludar</button>
  <script src="app.js"></script>
</body>
```

## 1.2 Incompatibilidades históricas y nacimiento del DOM estándar

Microsoft desarrolló para Internet Explorer dos variantes propias:

- **JScript**, similar a ECMAScript pero con diferencias en el modelo de objetos.
- **VBScript**, incompatible con navegadores distintos de IE y con sintaxis basada en Visual Basic.

Estas incompatibilidades llevaron al **W3C** a definir el **HTML DOM** para unificar criterios.

El **DOM (Document Object Model)** es el mecanismo estándar para acceder a documentos HTML, XML y SVG, permitiendo que programas y scripts modifiquen su contenido, estructura y estilo. El W3C distingue tres partes:

- **Core DOM**: modelo estándar para cualquier documento estructurado.
- **XML DOM**: modelo estándar para documentos XML.
- **HTML DOM**: modelo estándar para documentos HTML.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-75.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-76.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-78.png)

## 1.3 Objetos principales del navegador y del HTML DOM

Aunque no todos forman parte del árbol de nodos, se usan continuamente junto al DOM:

| Objeto | Para qué sirve |
| --- | --- |
| `window` | Objeto global del navegador; representa la ventana o pestaña actual y contiene a `document`. |
| `document` | Representa el documento HTML cargado; permite buscar, crear, modificar o borrar nodos. |
| `location` | Contiene la URL actual; permite leerla o redirigir. |
| `history` | Permite moverse por el historial del navegador. |
| `navigator` | Da información sobre navegador y dispositivo. |
| `screen` | Ofrece datos de la pantalla. |
| `frames` | Permite acceder a marcos o `iframe` si existen. |

```js
console.log(window.innerWidth);
console.log(document.title);
console.log(location.href);
history.back();
console.log(navigator.userAgent);
console.log(screen.width);
```

`document` es una instancia de la clase `HTMLDocument`.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-80.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-81.png)

## 1.4 Árbol HTML DOM y efectos que permite

`document` representa el propio documento que se muestra en la ventana del navegador. La transformación automática del HTML a árbol DOM sigue estas reglas:

- Cada **etiqueta HTML** genera un nodo de elemento.
- El **texto** contenido en la etiqueta genera un nodo hijo de texto.
- Si una etiqueta está dentro de otra, sus nodos quedan como hijos del nodo contenedor.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-82.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-83.png)

Gracias al DOM, JavaScript puede:

- cambiar etiquetas HTML;
- cambiar atributos HTML;
- cambiar estilos CSS;
- eliminar etiquetas y atributos;
- añadir etiquetas y atributos;
- reaccionar a eventos HTML;
- crear nuevos eventos.

## 1.5 Selección de elementos y acceso al contenido

Para acceder a elementos individuales, los métodos más usados son:

| Método | Devuelve |
| --- | --- |
| `getElementById(nombre)` | El elemento cuyo `id` coincide con el parámetro. |
| `querySelector(selectorCSS)` | El primer elemento que coincide con el selector CSS indicado. |

```js
const cabecera = document.getElementById("cabecera");
const primerDestacado = document.querySelector(".daw");
const primerEnlaceDelMenu = document.querySelector("nav a");
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-86.png)

Las propiedades más usadas para acceder al contenido son:

| Propiedad | Uso |
| --- | --- |
| `nodeValue` | Contenido del nodo actual. |
| `innerHTML` | Contenido HTML de los hijos del nodo actual. |
| `textContent` | Contenido de texto de los hijos del nodo actual. |

```js
const caja = document.getElementById("caja");

caja.innerHTML = "<strong>Hola</strong>";
// renderiza HTML real

caja.textContent = "<strong>Hola</strong>";
// muestra literalmente <strong>Hola</strong>
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-87.png)

Para identificar nodos también se usan:

- `nodeName`: nombre del nodo.
- `nodeType`: tipo del nodo.
- `nodeValue`: valor del nodo.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-88.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-89.png)

## 1.6 Acceso a colecciones: `NodeList` y `HTMLCollection`

Para acceder a conjuntos de elementos se usan, entre otros, estos métodos:

| Método | Devuelve |
| --- | --- |
| `getElementsByClassName(nombre)` | `HTMLCollection` con todos los elementos cuya clase coincide. |
| `getElementsByName(nombre)` | `HTMLCollection` con los elementos cuyo atributo `name` coincide. |
| `getElementsByTagName(etiqueta)` | `HTMLCollection` con los elementos de esa etiqueta. |
| `querySelectorAll(selectorCSS)` | `NodeList` con todos los nodos que coinciden con el selector CSS. |

`NodeList` representa una colección de **nodos** y `HTMLCollection` una colección de **elementos HTML**.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-90.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-91.png)

Puntos comunes:

- se parecen a arrays;
- tienen `length`;
- permiten acceso por índice.

Diferencias importantes:

- `HTMLCollection` puede acceder por nombre, `id` o índice;
- `NodeList` accede solo por índice;
- `NodeList` puede contener nodos de texto o atributos, no solo elementos;
- una colección puede ser **viva** y otra **estática**.

Resumen útil: `querySelectorAll()` suele devolver colección estática y `getElementsBy...()` suele devolver colección viva.

```js
const estaticos = document.querySelectorAll(".item");
const vivos = document.getElementsByClassName("item");
```

Si después se añade un nuevo `.item`, normalmente `vivos` lo detecta y `estaticos` no.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-92.png)

## 1.7 Crear, eliminar y recorrer nodos

El DOM ofrece métodos para crear y borrar contenido:

- `createElement()`: crea un nuevo nodo de elemento.
- `createTextNode()`: crea un nodo de texto.
- `appendChild()`: inserta un nodo hijo.
- `removeChild()`: elimina un nodo hijo.

```js
const p = document.createElement("p");
const texto = document.createTextNode("Nuevo párrafo");

p.appendChild(texto);
document.body.appendChild(p);

// Eliminarlo después
document.body.removeChild(p);
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-93.png)

Para moverse por el árbol se usan estas referencias:

| Propiedad | Uso |
| --- | --- |
| `parentNode` | Nodo padre del nodo actual. |
| `previousSibling` / `nextSibling` | Nodo hermano anterior o siguiente. |
| `firstChild` / `lastChild` | Primer o último nodo hijo. |
| `firstElementChild` | Primer hijo que es elemento HTML. |
| `childNodes` | Todos los nodos hijos. |
| `children` | Solo los elementos hijos. |

`childNodes` incluye texto, comentarios o `script`; `children` solo incluye elementos HTML.

```js
const caja = document.getElementById("caja");

console.log(caja.childNodes); // incluye textos y saltos de línea
console.log(caja.children);   // solo elementos HTML
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-94.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-95.png)

## 1.8 Atributos y estilos desde JavaScript

Para consultar atributos:

| Acceso | Qué devuelve |
| --- | --- |
| `element.attributes` | Colección de atributos tipo `NamedNodeMap`. |
| `element.getAttribute(nombre)` | Valor del atributo como `string`. |
| `element.getAttributeNames()` | Array con los nombres de los atributos. |
| `element.getAttributeNode(nombre)` | El nodo atributo correspondiente. |

Para modificarlos:

- `element.hasAttribute(nombre)`: comprueba si existe;
- `element.setAttribute(nombre, valor)`: modifica o crea el atributo;
- `element.removeAttribute(nombre)`: elimina el atributo.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-96.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-97.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-98.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-99.png)

En estilos:

- `element.style` accede a los estilos en línea del elemento;
- `window.getComputedStyle(element)` accede al conjunto completo de estilos calculados.

Ambos devuelven objetos `CSSStyleDeclaration`.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-100.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-101.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-103.png)
![](image-104.png|623)

## 1.9 Eventos en el DOM y APIs del navegador

Un evento ocurre cuando el usuario interactúa con teclado o ratón, cambia el tamaño de la ventana, se carga la página, etc. Cuando sucede, se lanza una función programable. La información del evento se guarda en un objeto de la clase `Event`.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-105.png)

Las tres formas clásicas de asociar eventos son:

| Forma | Idea clave |
| --- | --- |
| Atributos HTML | Ejemplo: `onclick="funcion()"`; es la forma antigua y no se recomienda. |
| Manejadores DOM | Ejemplo: `element.onclick = funcion;`; solo permite una función por evento. |
| `addEventListener` | Forma actual y recomendada; permite varias funciones para el mismo evento. |

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-106.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-107.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-108.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-109.png)

Cuando el evento ocurre en un elemento anidado, se propaga:

- hacia fuera si se trabaja en **bubble mode**;
- de fuera hacia dentro si se usa **capturing mode**.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-112.png)

El objeto evento se recibe como parámetro en la función manejadora y permite acceder, por ejemplo, a `e.type` y `e.target`.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-113.png)

JavaScript también dispone de muchas APIs sobre su núcleo:

- **APIs de navegador**: integradas en el navegador;
- **APIs de terceros**: obtenidas desde la web, por ejemplo Facebook, Twitter, Google Maps o YouTube.

Entre las APIs HTML5 mostradas en el tema:

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-115.png)

- **Geolocation**: obtiene latitud y longitud del usuario si este da permiso; se usa mediante `navigator.geolocation`.
- **localStorage** y **sessionStorage**: almacenamiento local alternativo a cookies.
- **console**: API de depuración; el método más usado es `console.log()`.

```js
localStorage.setItem("nombreDato", "valorDato");
console.log(localStorage.getItem("nombreDato"));

sessionStorage.clave = "valor";
console.log(sessionStorage.clave);
```

```js
console.log("Mensaje de depuración");
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-116.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-117.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-118.png)

# 2. Sintaxis Básica

## 2.1 Reglas generales

JavaScript:

- es **sensible a mayúsculas y minúsculas**;
- admite comentarios con `//` y `/* ... */`;
- suele escribirse terminando cada línea con `;`.

Resumen útil: `miVariable` y `mivariable` no son lo mismo.

```js
let nombre = "Ana";
// let Nombre = "Luis"; // sería otra variable distinta

// Comentario de una línea
/*
  Comentario
  de varias líneas
*/
```

## 2.2 Variables y ámbito

La declaración clásica se hace con `var`; con ES6 aparecen `let` y `const`, que hoy se prefieren. El tipo se determina al inicializar la variable.

```js
var edad = 20;
let curso = 2;
const centro = "DAW";
```

Respecto al ámbito:

- una variable **global** es accesible desde cualquier punto del script;
- una variable **local** solo es accesible dentro de la función donde se define.

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

## 2.3 Tipos de datos, conversión y operadores

Tipos citados en el tema:

- `string`
- `number`
- `boolean`
- `Object`
- `Null`

Para saber el tipo se usa `typeof(variable)`.

La conversión puede ser:

- **implícita**, por coerción automática;
- **explícita**, con funciones como `parseInt()`, `parseFloat()` o `toString()`.

```js
console.log("5" + 2);            // "52"
console.log(parseInt("25", 10)); // 25
console.log(parseFloat("3.14")); // 3.14
console.log((123).toString());   // "123"
```

Operadores principales:

- aritméticos: `+`, `-`, `*`, `/`, `++`, `--`, `%`;
- lógicos: AND, OR, NOT;
- relacionales: `==`, `!=`, `>`, `>=`, `<`, `<=`, `===`, `!==`;
- bit a bit: `&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`;
- asignación: `=`, `+=`, `-=`, `*=`, `/=` y similares;
- otros: concatenación con `+`, ternario `?:` y acceso con `.`.

Diferencia importante:

- `==` compara con conversión de tipo;
- `===` compara valor y tipo.

```js
console.log(5 == "5");   // true
console.log(5 === "5");  // false
```

## 2.4 `Math` y estructuras de control

Las operaciones matemáticas suelen hacerse con el objeto `Math`. En el tema aparecen métodos como:

- `log`, `exp`, `sqrt`, `pow`, `abs`, `floor`, `ceil`, `round`, `random`;
- `sin`, `cos`, `tan`, `asin`, `acos`, `atan`;
- `max`, `min`.

Constantes destacadas:

- `E`
- `LN2`
- `LN10`
- `LOG2E`
- `LOG10E`
- `PI`
- `SQRT2`
- `SQRT1_2`

```js
console.log(Math.sqrt(25));   // 5
console.log(Math.floor(4.8)); // 4
console.log(Math.random());   // número entre 0 y 1
console.log(Math.PI);         // 3.14159...
```

Estructuras de control básicas:

```js
if (nota >= 5) {
  console.log("Aprobado");
} else {
  console.log("Suspenso");
}

for (let i = 0; i < 3; i++) {
  console.log(i);
}

for (const dato in objeto.valor) {
  console.log(dato);
}

while (contador < 5) {
  contador++;
}

do {
  contador++;
} while (contador < 5);

switch (dia) {
  case 1:
    console.log("Lunes");
    break;
  default:
    console.log("Otro día");
}
```

## 2.5 Funciones

Las funciones pueden definirse de varias formas:

- **declaradas**:

```js
function sumar(a, b) {
  return a + b;
}
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-119.png)

- **como expresión**:

```js
const restar = function (a, b) {
  return a - b;
};
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-120.png)

- **autoinvocadas**:

```js
(function () {
  console.log("Se ejecuta al definirse");
})();
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-121.png)

- **callbacks**, es decir, funciones pasadas como argumento a otra función:

```js
function calcular(a, b, callback) {
  const resultado = a + b;
  callback(resultado);
}

calcular(2, 3, function (dato) {
  console.log(dato);
});
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-122.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-123.png)

Dentro de funciones siguen existiendo variables locales y globales:

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-124.png)

Además, el paso de parámetros puede comportarse así:

- tipos primitivos, como números o cadenas: **por valor**;
- objetos, incluidos los arrays: **por referencia**.

```js
function cambiar(obj) {
  obj.nombre = "Pepe";
}

const alumno = { nombre: "Ana" };
cambiar(alumno);
console.log(alumno.nombre); // Pepe
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-125.png)

## 2.6 Objetos, arrays y cadenas

Los objetos pueden crearse de forma tradicional con `new`:

```js
function Alumno(nombre) {
  this.nombre = nombre;
}

const a1 = new Alumno("Lucía");
```

O con la forma actual recomendada, usando literales con `{}`:

```js
const alumno = {
  nombre: "Lucía",
  curso: 2
};

alumno.curso = 3;
delete alumno.curso;
```

También pueden incluir métodos:

```js
const alumno = {
  nombre: "Lucía",
  saludar() {
    return "Hola " + this.nombre;
  }
};
```

Las funciones son objetos y disponen, entre otros, de:

- `arguments`
- `arguments.length`
- `toString()`

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-126.png)

Los arrays son objetos con métodos y propiedades propios. Aunque pueden crearse con `new Array()`, la forma recomendada es `[]`.

Métodos y propiedades citados:

- `length`
- `join`
- `reverse`
- `sort`
- `concat`
- `slice`

```js
const notas = [7, 5, 9];

console.log(notas.length);    // 3
console.log(notas.join("-")); // "7-5-9"
console.log(notas.slice(1));  // [5, 9]
```

Las cadenas se gestionan mediante el objeto `String` y se recomienda instanciarlas directamente, no con `new`.

Métodos citados:

- `fromCharCode`
- `charCodeAt`
- `indexOf`
- `lastIndexOf`
- `substr`
- `slice`
- `substring`
- `toLowerCase`
- `toUpperCase`

```js
const texto = "JavaScript";

console.log(texto.indexOf("Script")); // 4
console.log(texto.slice(0, 4));       // "Java"
console.log(texto.toUpperCase());     // "JAVASCRIPT"
```

## 2.7 Programación orientada a eventos y fechas

Entre los eventos básicos citados en el tema aparecen:

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

```js
input.addEventListener("focus", function () {
  console.log("El campo ha recibido el foco");
});
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-127.png)

Las fechas y horas se gestionan con el objeto `Date`. El tema muestra constructores, métodos `get...` y `set...`, sus equivalentes UTC y conversiones como `toUTCString()` y `toGMTString()`.

```js
const hoy = new Date();

console.log(hoy.getFullYear());
console.log(hoy.getMonth()); // enero = 0
console.log(hoy.getDate());
```

# 3. JavaScript ES6

## 3.1 Qué cambia con ES6

En **2015**, ECMAScript recibió una revisión importante llamada **ES6** o **ECMAScript 6**. Los navegadores modernos la soportan y, desde entonces, el estándar ha seguido evolucionando con revisiones anuales más pequeñas.

## 3.2 `let`, `const` y operador spread

Comparación rápida:

| Declaración | Ámbito de bloque | Redeclaración en el mismo bloque | Reasignación |
| --- | --- | --- | --- |
| `var` | No | Sí | Sí |
| `let` | Sí | No | Sí |
| `const` | Sí | No | No |

Hoy se suele usar `let` para variables y `const` para valores que no van a reasignarse.

```js
if (true) {
  var a = 1;
  let b = 2;
}

console.log(a); // 1
// console.log(b); // error
```

El operador **spread** `...` permite expandir un iterable, por ejemplo un array, en una lista de argumentos.

```js
const numeros = [4, 9, 2];

console.log(Math.max(...numeros)); // 9

const copia = [...numeros];
```

## 3.3 Iteración y funciones en ES6

`for...of` recorre **valores** de estructuras iterables como arrays, strings o mapas; `for...in` recorre **claves o índices**.

```js
const texto = "hola";

for (const letra of texto) {
  console.log(letra);
}

for (const indice in texto) {
  console.log(indice);
}
```

En funciones, ES6 incorpora:

- **parámetros por defecto**:

```js
function saludar(nombre = "invitado") {
  return "Hola " + nombre;
}
```

- **número indefinido de parámetros** mediante `...`:

```js
function sumarTodo(...valores) {
  return valores.reduce((acc, n) => acc + n, 0);
}
```

- **funciones arrow** para expresiones compactas:

```js
const doble = x => x * 2;
const sumar = (a, b) => a + b;
const saludarRapido = () => "Hola";
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-128.png)


## 3.4 Clases, `Map`, `Set` y `Symbol`

ES6 introduce `class` como forma moderna de definir clases. El acceso sigue haciéndose con `.`; la herencia se realiza con `extends` y `super()`. Los atributos no son privados por defecto, sino públicos.

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

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-129.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-130.png)

Nuevos tipos y estructuras:

- **`Map`**: pares clave-valor; admite objetos como claves

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-131.png)

- **`Set`**: conjunto de valores únicos

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-132.png)

- **`Symbol`**: tipo de dato con valor único, útil para propiedades especiales.

```js
const mapa = new Map();
mapa.set("nombre", "Ana");
console.log(mapa.get("nombre"));

const conjunto = new Set([1, 2, 2, 3]);
console.log(conjunto); // Set(3) {1, 2, 3}

const id = Symbol("id");
const usuario = { [id]: 10 };
```

## 3.5 Nuevos métodos y módulos

En strings:
- `includes()`: devuelve true si la string contiene una cadena dada
- `startsWith()`: devuelve true si la string comienza con una cadena dada
- `endsWith()`: devuelve true si la string finaliza con una cadena dada

En arrays:
- `from()`: devuelve un array desde un objeto iterable
- `keys()`: devuelve un iterador con los índices del array
- `find()`: devuelve el primer elemento del array que verifica una función
- `findIndex()`: devuelve el índice del array que verifica una función de testeo

También se mencionan nuevas utilidades para `Math`, `Number` y métodos globales como `isFinite()` e `isNaN()`.

```js
console.log("JavaScript".includes("Script")); // true
console.log("JavaScript".startsWith("Java")); // true
console.log(Array.from("hola"));              // ["h", "o", "l", "a"]
console.log([4, 7, 9].find(n => n > 5));     // 7
```

Los **módulos** son ficheros con funciones y/o clases relacionadas. En las importaciones se distingue:

- importación de nombres exportados;
- importación por defecto;
- renombrado con `as`;
- combinación de un `default` con varios exportados no `default`.

Para usarlos en HTML hay que indicar `type="module"` y servir la página desde un servidor.

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

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-133.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-134.png)


# 4. Expresiones Regulares

## 4.1 Concepto, definición y `RegExp`

Las expresiones regulares permiten definir el patrón de una cadena y usarlo como mecanismo de comprobación. Son especialmente útiles para validar datos antes de enviarlos al servidor.

Pueden definirse de dos maneras:

- con barras: `/patron/opciones`;
`let miER=/[A-Z/i` 

- con el constructor `RegExp("patron", "opciones")`.
`let miER = new RegExp("[A-Z]", "i"])` 

Opciones:
- `i`: ignora mayúsculas y minúsculas;
- `g`: búsqueda global;
- `m`: búsqueda multilínea.

La clase `RegExp` aporta, entre otros:
- métodos 
	- `exec()`: testea coincidencias con una cadena de texto y devuelve la primera coincidencia
	- `test()`: testea coincidencias con una cadena de texto, devuelve true o false
	- `toString()`: devuelve el valor de la ER en formato de cadena

- propiedades 
	- `global`: testea si el modificador g está activado
	- `ignoreCase`: teste si el modificador i está activado
	- `lastIndex`: especifica la posición en que comienza la siguiente coincidencia
	- `multiline`: testea si el modificador m está activado
	- `source`: devuelve el valor de la ER en formato cadena.


## 4.2 Patrones, operadores y precedencia
Tipos de patrones:

- cuantificadores;
- caracteres de escape;
- clases o conjuntos de caracteres;
- caracteres de posición o marcado;
- alternancias;
- agrupaciones;
- referencias inversas;
- patrones misceláneos.

Patrones concretos:

| Patrón | Significado |
| --- | --- |
| `*` | Cero o más veces. |
| `+` | Una o más veces. |
| `?` | Cero o una vez. |
| `\` | Carácter de escape. |
| `[conjunto]` | Cualquiera de los caracteres del conjunto. |
| `\b` | Final de palabra. |
| `\B` | No final de palabra. |
| `^` | Comienzo de cadena o línea. |
| `$` | Final de cadena o línea. |
| `|` | Alternancia. |
| `(patron)` | Agrupación. |
| `(?:...)`, `(?=...)`, `(?!...)` | Subpatrones y búsquedas condicionadas. |
| `{n}`, `{n,}`, `{n,m}` | Repeticiones controladas. |
| `\d`, `\w`, `\W`, `\n`, `\r`, `\t`, `\f`, `\v`, `\s` | Abreviaturas frecuentes. |

Precedencia:

1. `\`
2. `( )`, `[ ]`
3. `*`, `+`, `{n}`, `{n,}`, `{n,m}`
4. `^`, `$`
5. `|`

## 4.3 Ejemplos y métodos de `String` que usan regex

Ejemplo simple de validación de email con `test()`:

```js
const email = "ana@correo.com";
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log(regexEmail.test(email)); // true
```

Ejemplo de extracción de usuario y dominio con `exec()`:

```js
const regexPartes = /^([^@]+)@(.+)$/;
const resultado = regexPartes.exec("ana@correo.com");

console.log(resultado[1]); // ana
console.log(resultado[2]); // correo.com
```

Métodos del objeto `String` que trabajan con expresiones regulares:
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-136.png)

```js
const texto = "DAW 2026";

console.log(texto.match(/\d+/));            // ["2026"]
console.log(texto.replace(/\d+/, "2027"));  // "DAW 2027"
console.log("a,b,c".split(/,/));            // ["a", "b", "c"]
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-137.png)

## 4.4 Validación con JavaScript y con HTML5

La validación con JavaScript puede interceptar el envío del formulario y obligar a corregir datos usando `preventDefault()`, expresiones regulares, `alert()`, `focus()` y `select()`.

```js
formulario.addEventListener("submit", function (e) {
  if (nombre.value.trim() === "") {
    e.preventDefault();
    alert("El nombre es obligatorio");
    nombre.focus();
  }
});
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-138.png)

HTML5 incorpora validación básica sin programarla toda en JavaScript. En el tema aparecen:

- `type="email"`;
- comportamiento similar para `url` y `number`;
- atributo `pattern` para introducir una expresión regular;
- atributo `required` para obligar a rellenar un campo.

```html
<input type="email" required>
<input type="text" pattern="[A-Za-z]{3,}">
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-139.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-140.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-141.png)


# 5. jQuery

## 5.1 Qué es, por qué usarlo e integración con HTML

jQuery es una **librería escrita en JavaScript**, creada por **John Resig** y presentada en enero de 2006 en BarCamp NYC. Es software libre y de código abierto. Permite:

- simplificar la interacción con documentos HTML;
- manipular el DOM;
- manejar eventos;
- desarrollar animaciones;
- trabajar con AJAX.

Puede integrarse:

- descargando `jquery.js`;
- o enlazándolo desde un CDN.

```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
```

Sus ventajas frente al DOM nativo, según el tema, son:

- selecciones más simples;
- posibilidad de aplicar varios métodos sobre la misma selección;
- mejor comportamiento entre navegadores;
- manejo de eventos más sencillo;
- animaciones adicionales.

## 5.2 Sintaxis y selectores

La sintaxis general es:

`$(selector).action()`

Aquí:

- `$` es la forma abreviada de `jQuery()`;
- el selector funciona con sintaxis CSS;
- el resultado es un objeto jQuery sobre el que se aplican métodos.

```js
$("#mensaje").text("Hola desde jQuery");
```

Para esperar a que el DOM esté listo se usa `ready()` o su versión abreviada:

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-142.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-143.png)


```js
$(function () {
  console.log("DOM listo");
});
```

Selectores específicos citados en el tema:
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-144.png)


## 5.3 Métodos jQuery más usados

Acceso y modificación de contenido:

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-145.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-146.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-147.png)


Manipulación de nodos:

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-148.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-149.png)

Atributos y estilos:

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-150.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-151.png)


Formularios:
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-152.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-153.png)


Recorrido del árbol DOM:
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-154.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-155.png)

Iteración y filtrado:

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-156.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-157.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-158.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-159.png)

Orden y posición en la selección:

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-160.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-161.png)

Dimensiones:

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-162.png)

Posición:
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-163.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-164.png)


Animación:
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-165.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-166.png)


## 5.4 Eventos en jQuery

jQuery puede responder a eventos tanto con llamadas directas como `$("p").click(...)` como con la forma moderna `.on()`, incorporada en la versión 1.7.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-167.png)

`on()` se usa con dos parámetros:

- el evento;
- la función que responde.

```js
$("#btn").on("click", function () {
  $("#mensaje").text("Has pulsado");
});
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-168.png)

Las funciones manejadoras reciben un objeto evento con propiedades como:
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-169.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-170.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-171.png)
Y métodos como:

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-172.png)

Tipos de eventos agrupados en el tema:

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-173.png)


# 6. Ficheros de Datos

## 6.1 XML
Su nombre deriva de **eXtensible Markup Languaje**. Es un lenguaje de marcas, mantenido por W3C. Es útil para describir información estructurada. Facilitan el intercambio de información entre usuarios no humanos.

**Archivos de propiedades:**
- Tienen jerarquía plana
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-174.png)

- No admiten repetición de valores
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-176.png)

Un archivo XML, permite expresar estructuras jerárquicas, mediante el uso de etiquetas.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-177.png)

**XML vs HTML:**
- XML distingue entre mayúsculas y minúsculas
- En XML, siempre ha de incluirse el marcador final
- En XML, los elementos con un único marcados han de acabar con "/>"
- En XML, los valores de los atributos pueden ir encerrados entre comillas dobles o simples, pero ha de abrirse y cerrarse en el mismo tipo de comillas
- En XML, todos los atributos tienen que tener un valor

**Estructura de un XML**
- Encabezado (opcional, recomendado) `<?xml version="1.0" enconding="UTF-8"?>` 
- Definición del tipo de documento (opcional) `<!DOCTYPE web-app PUBLIC "-//Sun Microsystems, Inc.//DTD Web Application 2.2//EN" http://java.sun.com/j2ee/dtds/web-app_2_2.dtd>` 
- Cuerpo (incluye elementos hijos, texto o ambas cosas)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-181.png)

**Consejos:**
- Evitar el contenido mixto (texto y elementos, al mismo nivel).
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-182.png)

- Utilizar atributos únicamente para modificar la interpretación de un valor, no para especificar valores.
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-183.png)


## 6.2 XML DOM
Existe también un modelo de documento para XML, que facilita su acceso. En Javascript se pueden instanciar objetos de la clase XML DOM con métodos y propiedades que permiten el acceso a las diferentes partes de un documento XML.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-184.png)

Existe también un modelo de documento para XML, que facilita su acceso. Los navegadores tienen clases accesibles mediante Javascript que devuelven objetos de la clase XMLDocument con métodos y propiedades que permiten el acceso a las diferentes partes de un documento XML.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-185.png)

Los objetos de la clase XMLDocument heredan métodos y propiedades de otras clases DOM. Entre los métodos y propiedades más interesantes a este nivel, estarían:
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-186.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-187.png)

Existe también un modelo de documento para XML, que facilita su acceso. En Javascript existen objetos de la clase XML DOM con métodos y propiedades que permiten el acceso a las diferentes partes de un documento XML.
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-188.png)

Existe también un modelo de documento para XML, que facilita su acceso. En Javascript existen objetos de la clase XML DOM con métodos y propiedades que permiten el acceso a las diferentes partes de un documento XML.
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-189.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-190.png)


## 6.3 JSON
Su nombre deriva de **JavaScript Objet Notation**. Formato para almacenamiento/intercambio de datos, creado inicialmente en el ámbito de JavaScript, pero extendido al múltiples lenguajes en la actualidad.

Es sencillo de manejar por máquinas y humanos. A efectos de JavaScript es un objeto convertible en cadena de texto para intercambio entre servidores.

**Formato básico:** se construye a partir de dos estructuras básicas
- Una **colección de pares nombre/valor:** dependiendo del lenguaje se implementa como: objeto, registro, estructura, diccionario, tabla hash, ...
- Una **lista ordenada de valores:** en la mayor parte de los lenguajes se implementa como array, vector o lista.

En JavaScript las dos estructuras son:
- Objetos {cadena:valor, cadena:valor, ....}
- Arrays [valor, valor ....]

Siendo los valores cadenas, números, objetos, arrays, booleanos o null
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-191.png)

**Transformar objetos JS  en cadenas JSON:**
`var miCadenaJSON = JSON. stringify(miObj)`

**Transformas cadenas JSON en objetos JS:**
`var miObjeto= JSON.parse(miCadenaJSON)`

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-192.png)


## 6.4 XML vs JSON
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-193.png)

**Similitudes:**
- Autodescriptivos
- Jerárquicos
- Analizables (parseables)
- Tratables por el método XMLHttpRequest de JavaScript

**Diferencias:**
- XML tiene que ser analizado por un analizador (parser) XML. JSON puede utilizar funciones JavaScript estándar
- JSON no usa etiquetas
- JSON es más rápido, tanto en lectura como en escritura
- JSON puede utilizar arrays



# 7. Ajax

## 7.1 MPA vs SPA
- **Multi-Page Application (MPA):** es el sitio web tradicional. Cada página es una petición específica a un servidor que devuelve tanto en imágenes como en contenido, un fichero HTML completo que se corresponde con la página que hemos pedido.
- **Single Page Application (SPA):** es una única página HTML que de manera dinámica, sobreescribe el contenido de la misma en lugar de cargar una nueva.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-194.png)


# 7.2 JavaScript vs AJAX
Procesamiento **síncrono** vs **asíncrono**. 

Cuando un navegador encuentra una etiqueta `<script>` en una página la procesa de inmediato, deteniendo la carga del resto de la página: **Procesamiento síncrono**.

**Problema:** si en el `<script>`  hay una parte que requiere la carga de datos externos, el proceso de carga se detiene a la espera de esos datos externos.

AJAX permite realizar cargas de forma **asíncrona**. Si la información solicitada para recargar no está presente no la procesa de inmediato y continúa con la carga del resto de la página: **Procesamiento asíncrono**


**AJAX:** Asyncronous JavaScript +XML. Nace en febrero de 2005 de la mano de Jesse James Garret. AJAX permite:
- Actualizar una página web, sin recargarla
- Hacer peticiones de datos a un servidor, después de que la página esté cargada
- Recibir datos de un servidor, después de que la página esté cargada
- Enviar datos a un servidor, en background
- Desarrollos SPA.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-195.png)


AJAX utiliza una combinación de:
- Un objeto `XMLHttpRequest` construido dentro de un navegador
- JavaScript y HTML DOM para mostrar los datos en el navegador

`XMLHttpRequest`: objeto javaScript diseñado por Microsoft y actualmente estándar de W3C. Es utilizado para insertar datos en la página sin recarga de la misma. Creación
 ```js
 let miXML = new XMLHttpRequest()
 ```


# 7.3 XMLHttpRequest
El objeto `XMLHttpRequest`

**Métodos:**
- `abort()`: cancela solicitud
- `getAllResponseHeaders()`: devuelve información de cabecera
- `getResponseHeader()`: devuelve información de cabecera específica
- `open(methos, url, async, user, psw)`: especifica el tipo de solicitud
- `send()`: envía solicitud al servidor, en modo `GET`
- `send(string)`: envía solicitud al servidor en modo `POST`
- `setRequestHeader()`: añade un par etiqueta/valor a la cabecera para envío

**Atributos:**
- `onreadystatechange`: define una función para ser llamada cuando el readyState cambie
- `onload`: define una función **callback** para ser llamada cuando la petición es recibida
- `readyState`: almacena el estado de `XMLHttpRequest`
- `responseText`: retorna respuesta en formato de texto
- `responseXML`: retorna respuesta en formato de XML
- `status`: retorna respuesta en formato de la solicitud
- `statusText`: retorna el estado de la solicitud
- `onreadystatechange`: define una función **callback** para ser llamada cuando el **readyState** cambie

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-196.png)


``` js
let miHttp = new XMLHttpRequest(); //Crear el objeto
miHttp.onreadystatechange = mifunction(){...}; //Definir la función
miHttp.onload = mifunction(){...};
miHttp.open("GET", "miFile"); //Abrir el objeto
miHttp.send(); //Enviar una petición al servidor
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-197.png)


**AJAX mediante objeto XMLHttpRequest**
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-198.png)

**AJAX mediante el objeto XMLHttpRequest + CallBack**
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-199.png)


# 7.4 Promesas
Una **promesa** es un objeto utilizado para representar la terminación o el fracaso en la ejecución de una operación asíncrona. En la práctica, una promesa es un objeto devuelto al cual se adjuntan funciones callback, cuya ejecución depende del éxito o fracaso de la operación asícrona.

Método `then()`: método que recibe 2 argumentos consistentes en funciones callback relativas al éxito o fracaso de una promesa

`p.then(siExito[, siFracaso])`

En la práctica la llamada a la función que realiza la acción asícrona, quedaría:
`FuncionTareAsincrona(parámetros).then(siExito, siFracaso)` 

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-200.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-201.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-202.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-203.png)


# 7.5 JQuery
Utiliza el método `load()` para bajar  datos desde el servidor e insertarlos en el objetos jQuery seleccionado

`.load(url, [data, function(response, status, xhr)])`
- `url`: URL de los datos a cargar
- `data`: datos enviados al servidor junto a la petición
- `function(response, status, xhr)`: 
	- `response`: contiene los datos, resultado de la petición
	- `status`: contiene el estado, resultado de la petición
	- `xhr`: contiene el objeto XMLHttpRequest


![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-204.png)



# 7.6 API Fetch
Tradicionalmente AJAX se implementaba mediante el objeto `XMLHttpRequest`. Esta opción tenía un par de desventajas:
- Diferencias en la implementación entre distintos fabricantes de navegadores o entre versiones del mismo navegador
- Trabaja con callbacks, lo que tiende a generar un código más desorganizado

La solución tradicional pasaba por utilizar herramientas de terceros, como la librería jQuery.

**Fetch** es una interfaz estándar que permite el desarrollo del frontend basado en AJAX. Utiliza promesas en lugar de callbacks, lo que facilita la organización del código asíncrono.

El método `fetch()` es un método global del navegador, accesible como `window.fetch(url)` o simplemente `fetch(url)`.

`fetch(url)` trae al cliente el contenido de la URL y devuelve una **promesa** que resuelve en un objeto de la clase **Response**, tanto si la respuesta HTTP es correcta como si no lo es.

**Métodos habituales de `Response`:**

| Método | Acción |
| --- | --- |
| `.text()` | Devuelve una promesa que resuelve con una representación en texto de los datos recibidos |
| `.json()` | Devuelve una promesa que resuelve con una representación en JSON de los datos recibidos |
| `.formData()` | Devuelve una promesa que resuelve con una representación en pares clave/valor de los datos recibidos |
| `.bytes()` | Devuelve una promesa que resuelve con los datos recibidos en bytes |

**Propiedades habituales de `Response`:**

| Propiedad | Valor |
| --- | --- |
| `.status` | Código de estado de la respuesta |
| `.ok` | Booleano que indica si la respuesta fue exitosa (`200` a `299`) |
| `.headers` | Objeto de cabeceras asociado a la respuesta |
| `.url` | URL de la respuesta |

**Esquema básico con callbacks nombrados:**

```js
const p = fetch("miUrl");
p.then(responseCallBack);

function responseCallBack(response) {
  const p1 = response.text();
  p1.then(muestraTextoCallBack);
}

function muestraTextoCallBack(txt) {
  // Código para mostrar el texto almacenado en txt
}
```

**Versión encadenada equivalente:**

```js
fetch("miUrl")
  .then((response) => response.text())
  .then((txt) => muestraTexto(txt));
```

**Ejemplo: cargar texto**

Versión convencional:

```js
function cargaTexto() {
  const miP = fetch("fileTXT.txt");
  miP.then(ajaxOK);
}

function ajaxOK(response) {
  const miP1 = response.text();
  miP1.then(muestraTexto);
}

function muestraTexto(txt) {
  document.getElementById("demo").innerHTML = txt;
}

cargaTexto();
```

Versión con funciones flecha:

```js
function cargaTexto() {
  fetch("fileTXT.txt")
    .then((response) => response.text())
    .then((txt) => muestraTexto(txt));
}

function muestraTexto(txt) {
  document.getElementById("demo").innerHTML = txt;
}

cargaTexto();
```

**Ejemplo: cargar JSON**

Archivo `fileJSON.json`:

```json
{
  "Registros": [
    { "Nombre": "Pedro", "Ciudad": "Santiago", "Pais": "España" },
    { "Nombre": "Pablo", "Ciudad": "León", "Pais": "España" }
  ]
}
```

Código:

```js
function cargaJSON() {
  fetch("fileJSON.json")
    .then((response) => response.json())
    .then((jsonObj) => muestraJSON(jsonObj));
}

function muestraJSON(jsonObj) {
  let txt = "<ul>";

  for (const registro of jsonObj.Registros) {
    txt += `<li>${registro.Nombre} -> ${registro.Ciudad}</li>`;
  }

  txt += "</ul>";
  muestraTexto(txt);
}

function muestraTexto(txt) {
  document.getElementById("demo").innerHTML = txt;
}

cargaJSON();
```

**Ejemplo: cargar XML**

```js
function cargaXML() {
  fetch("fileXML.xml")
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const xmlObj = parser.parseFromString(data, "application/xml");
      muestraXML(xmlObj);
    });
}

function muestraXML(xmlObj) {
  const tags = xmlObj.getElementsByTagName("RECTOR");
  let txt = "<ul>";

  for (const tag of tags) {
    txt += `<li>${tag.textContent}</li>`;
  }

  txt += "</ul>";
  muestraTexto(txt);
}

function muestraTexto(txt) {
  document.getElementById("demo").innerHTML = txt;
}

cargaXML();
```

> `fetch()` no rechaza la promesa por un `404` o un `500`; para tratar esos casos como error conviene comprobar `response.ok`.