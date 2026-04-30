---
title: "Generación y Optimización de Código"
---

# 5.1 Fundamentos de la generación de código

## 5.1.1 Introducción

La fase de **generación y optimización de código** toma como entrada:

- la **representación intermedia**;
- la **tabla de símbolos**.

Y produce como salida:

- un **programa destino** semánticamente correcto y, en la medida de lo posible, **óptimo**.

Además, se contempla una **fase adicional de optimización**.

Idea importante del tema:

- muchos subproblemas implicados son **NP-completos**;
- por eso, en la práctica se recurre a **heurísticas**.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-19.png)


## 5.1.2 Tareas principales del generador de código

Las tres tareas principales son:

1. **Selección de instrucciones**.
2. **Repartición y asignación de registros**.
3. **Ordenamiento de instrucciones**.

El tema distingue dos criterios:

- **criterio básico**: generar **código correcto**;
- **criterio secundario**: generar **código de calidad**.


## 5.1.3 Entrada del generador de código

La entrada al generador de código debe cumplir estas condiciones:

- la representación intermedia debe ser de **nivel bajo**;
- la corrección de errores **sintácticos y semánticos** ya debe estar hecha;
- deben haberse comprobado los **tipos de datos**;
- si hacen falta, ya deben estar introducidos los **operadores de conversión de tipo**.

Es decir: el generador de código no debería encargarse de arreglar errores semánticos, sino de traducir una representación ya validada.


## 5.1.4 El programa destino

El PDF menciona tres tipos de sistemas, y por tanto de lenguajes máquina:

- **RISC**;
- **CISC**;
- **basados en pilas**.


## 5.1.5 Selección de instrucciones

La complejidad de la selección de instrucciones depende de:

- el **nivel** de la representación intermedia;
- el **conjunto de instrucciones** de la máquina destino;
- la **calidad deseada** del código generado.

La técnica mencionada en el tema es el uso de:

- **plantillas de código**.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-20.png)


## 5.1.6 Asignación de registros

La **asignación óptima de registros** es un problema **NP-completo**.

Además, el hardware influye en la decisión. El PDF cita como ejemplo:

- la existencia de **dobles registros de propósito específico** para multiplicar o dividir.


## 5.1.7 Orden de evaluación

El orden en que se evalúan expresiones e instrucciones importa por tres razones:

- para **reducir** el número de registros necesarios;
- para **mejorar el rendimiento**;
- para **explotar el paralelismo** a nivel de instrucciones, hilos o núcleos.


## 5.1.8 El lenguaje destino usado en el tema

El tema fija una máquina destino sencilla con estas características:

- `n` registros: `R0`, `R1`, ..., `Rn-1`;
- direccionamiento por **bytes**;
- operandos **enteros**.

### Tipos de instrucciones

```text
LD r, x
LD r1, r2
ST x, r
ADD r1, r2, r3
BR L
Bcond r, L
```

### Modos de direccionamiento

Se recogen estos modos:

1. **Nombre de dirección en memoria** de una variable `x`.
2. **Indexado** `a(r)`: contenido de `a + contenido(r)`.
3. **Indexado** `100(r)`.
4. **Indirecto** `*r`.
5. **Indirecto** `*100(r)`: contenido de `contenido(100 + contenido(r))`.
6. **Inmediato** `#100`.

Además, los comentarios se escriben como:

```text
//
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-21.png)

## 5.1.9 Mejora de la calidad del código

El tema recuerda que la calidad del código puede medirse con distintos costes:

- **tiempo de compilación**;
- **tamaño del código compilado**;
- **tiempo de ejecución**;
- **consumo de energía**.

La idea de un código realmente **óptimo** es difícil porque:

- implica combinar varios subproblemas **NP-completos**;
- en la práctica se vuelve a usar **heurísticas**.

### Coste de una instrucción

El PDF menciona dos maneras de medirlo:

- en el Aho: **número de palabras** de la instrucción;
- como alternativa: **número de accesos a memoria**.


## 5.1.10 Direcciones en el código destino

El tema distingue **direcciones lógicas o virtuales** para:

- **código**;
- **datos estáticos**;
- **heap** o **montículo**;
- **stack** o **pila**.

También menciona dos formas de asignación de llamadas a rutinas:

- **asignación estática**;
- **asignación en stack**.

En estas diapositivas el PDF sólo señala la clasificación y remite al Aho para el desarrollo.


# 5.2 Optimización local y grafos de flujo

## 5.2.1 Bloques básicos y grafos de flujo

Los **grafos de flujo** son una representación gráfica del código intermedio:

- sus **nodos** son bloques básicos;
- sus **flechas** indican el orden de ejecución posible entre bloques.

Son útiles para:

- caracterizar el código;
- aplicar técnicas de mejora de calidad **dentro** de un bloque;
- aplicar técnicas de optimización **entre** bloques.

### Definición de bloque básico

Un **bloque básico** es una secuencia de instrucciones tal que:

- el flujo de control entra sólo por la **primera** instrucción;
- no hay saltos a la parte media del bloque;
- el control sale del bloque sin detenerse ni bifurcarse, salvo quizá en la **última** instrucción.


## 5.2.2 Algoritmo para obtener bloques básicos

La diapositiva del **algoritmo 8.5** ilustra este código:

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-22.png)

**Líderes** las instrucciones:
- `1`;
- `2`;
- `3`;
- `10`;
- `12`;
- `13`.

Eso coincide con la regla habitual:
- la primera instrucción del programa es líder;
- toda **destinación de salto** es líder;
- toda instrucción que **sigue a un salto** es líder.

Por tanto, el programa queda dividido en bloques básicos así:

```text
B1 = [1]
B2 = [2]
B3 = [3..9]
B4 = [10..11]
B5 = [12]
B6 = [13..17]
```


## 5.2.3 Información de siguiente uso

Una variable está **viva** en una instrucción si se utiliza posteriormente por otra instrucción.

El tema menciona el **algoritmo 8.7** para determinar:

- si una variable está viva o no;
- cuál es su **siguiente uso**.

### Ejemplo del PDF

Bloque básico:

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-23.png)

para cada instrucción y cada variable `a, b, c, x, y, z`:

- si está **viva** (`v`) o **no viva** (`nv`);
- la posición de su **siguiente uso**.

Por ejemplo, a la altura de la instrucción `1`, la tabla indica:

- `a`, `b`, `c` y `x` están vivas;
- `y` y `z` no están vivas todavía;
- los siguientes usos relevantes son `b` y `x` en `1`, `a` y `c` en `2`.

La idea importante es que esta información se calcula **hacia atrás** y es fundamental para decidir:

- si conviene conservar un valor en un registro;
- si puede sobrescribirse;
- si habrá que almacenarlo otra vez en memoria.


## 5.2.4 Grafos de flujo

Un **grafo de flujo** tiene:

- un nodo por cada bloque básico;
- una flecha si hay un posible salto desde el final de un bloque al inicio de otro;
- una flecha si dos bloques van seguidos y el primero no termina en salto incondicional;
- nodos adicionales de **entrada** y **salida**.

La figura del PDF, construida a partir del ejemplo anterior, muestra:

- un bloque de entrada;
- los bloques `B1` a `B6`;
- un nodo de salida;
- ciclos internos debidos a saltos como `if j <= 10 goto (3)` y `if i <= 10 goto (2)` o `if i <= 10 goto (13)`.

Idea clave:

- **en los bloques básicos** se pueden hacer cambios importantes a nivel local;
- **entre bloques básicos** se aplican técnicas de optimización de más alcance.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-24.png)


## 5.2.5 Ciclos

Es especialmente importante identificar los **ciclos** porque:

- consumen la mayor parte del **tiempo de ejecución**.

Según el criterio dado en la diapositiva, un conjunto de nodos forma un ciclo si:

1. hay un **nodo de entrada único**;
2. cada nodo tiene una **ruta no vacía** y completamente dentro del ciclo que va a la entrada.
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-25.png)

## 5.2.6 Optimización de bloques básicos con DAG

Para optimizar un bloque básico, el tema propone su representación mediante un **DAG** (`directed acyclic graph`).

La construcción se resume así:

1. Un nodo para cada **valor inicial** de las variables.
2. Un nodo para cada **instrucción**, cuyos hijos son las definiciones más recientes de sus operandos.
3. Cada nodo de instrucción se etiqueta con el **operador** y con la lista de **variables actualizadas** por él.
4. Algunos nodos se marcan como **nodos salida**, es decir, sus variables están vivas al salir del bloque.


## 5.2.7 Búsqueda de subexpresiones locales comunes

Una **subexpresión local común** es una expresión que calcula un valor ya calculado antes en el mismo bloque básico.

### Ejemplo 1

Código original:

```text
a = b + c
b = a - d
c = b + c
d = a - d
```

Aquí aparece dos veces la expresión:

```text
a - d
```

La representación DAG permite detectar esa repetición.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-26.png)

### Ejemplo 2

Código:

```text
a = b + c
b = b - d
c = c + d
e = b + c
```

La figura sugiere la idea importante de este segundo ejemplo:

- no basta con que la expresión escrita sea parecida;
- hay que comprobar que los operandos siguen siendo las **mismas definiciones**.

Como `b` y `c` cambian, la última `b + c` no es necesariamente la misma subexpresión que la primera.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-27.png)


## 5.2.8 Eliminación de código muerto

La **eliminación de código muerto** consiste en quitar:

- nodos que no tienen **variables vivas adjuntas**.

Si un valor se calcula pero no contribuye a ninguna variable viva a la salida del bloque, ese cálculo puede eliminarse.


## 5.2.9 Uso de identidades algebraicas

El tema recoge cuatro familias de simplificaciones:

1. **Identidades aritméticas**.
2. **Reducción por fuerza local**.
3. **Plegado de constantes**.
4. **Conmutatividad y asociatividad**, con precaución.

La advertencia de “cuidado” recuerda que estas transformaciones no siempre son inocuas si:

- cambian el orden de evaluación;
- aparecen efectos laterales;
- hay problemas de precisión o semántica del lenguaje.


## 5.2.10 Representación de referencias a arrays

### Ejemplo 1
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-28.png)

```text
x = a[i]
a[j] = y
z = a[i]
```

La idea es que la asignación:

```text
a[j] = y
```

puede invalidar la reutilización directa del valor leído antes en `a[i]`.

Por tanto, tras una escritura en un array, hay que ser prudente con las lecturas anteriores almacenadas en el DAG.

### Ejemplo 2
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-29.png)

```text
b = 12 + a
x = b[i]
b[j] = y
```

Aquí aparece además la cuestión de **aliasing**:

- `b` representa una dirección derivada de `a`;
- una escritura a través de `b[j]` puede afectar a valores previamente leídos desde esa misma región.


## 5.2.11 Asignaciones de punteros y llamadas a procedimientos

El PDF destaca dos reglas importantes:

1. El operador `=*` (`x = *p`) debe **aceptar todos los nodos** que se encuentran asociados como argumentos.
2. El operador `*=` (`*q = y`) **elimina todos los nodos construidos hasta ahora** en el DAG.

La razón es el problema de aliasing:

- una lectura indirecta puede depender de muchos valores posibles;
- una escritura indirecta puede invalidar gran parte de la información optimizada.

El PDF añade como casos particulares:

```text
p = &x
*p = y
```


## 5.2.12 Reensamblado de bloques básicos a partir del DAG

Una vez optimizado el DAG, hay que reconstruir código lineal.

La diapositiva indica:

- hay **5 reglas** para el reensamblado;
- si un nodo tiene **más de una variable viva** adjunta, hay que introducir **instrucciones de copia**.

### Ejemplo

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-30.png)

Código inicial:

```text
a = b + c
b = a - d
c = b + c
d = a - d
```

Si `b` **no está viva**, el bloque puede reensamblarse como:

```text
a = b + c
d = a - d
c = d + c
```

Si `b` **sí está viva**, hay que conservar también su valor:

```text
a = b + c
d = a - d
b = d
c = b + c
```

La diferencia está en que un mismo nodo del DAG representa el valor asociado a `b` y `d`, pero si ambas variables deben sobrevivir, hace falta una copia explícita.


# 5.3 Un generador de código simple

## 5.3.1 Enfoque básico

El enfoque básico del tema es:

```text
Carga + Operación + Almacenamiento
```

También se analiza el uso de los registros.

### Descriptores

Se utilizan dos tipos de descriptores:

1. **Descriptor de registro**:
   para cada registro, almacena las variables cuyo valor actual contiene.
2. **Descriptor de direcciones**:
   para cada variable, almacena las posiciones en las que puede encontrarse, normalmente en la tabla de símbolos.


## 5.3.2 Algoritmo de generación de código

El algoritmo de generación de código:

- usa una función llamada **`obtenReg`** para elegir registros para cada instrucción de tres direcciones;
- al final de cada bloque básico, genera **almacenamientos** para las variables vivas;
- actualiza los **descriptores de registros y direcciones**.

La diapositiva siguiente sólo añade que `obtenReg` se basa en:

- reglas de selección de un registro para cada variable.

No desarrolla más detalle en el propio PDF.


## 5.3.3 Ejemplo de generación de código con descriptores
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-31.png)


Código de tres direcciones:

```text
t = a - b
u = a - c
v = t + u
a = d
d = v + u
```

La diapositiva muestra esta traducción al lenguaje destino:

```text
t = a - b
LD R1, a
LD R2, b
SUB R2, R1, R2

u = a - c
LD R3, c
SUB R1, R1, R3

v = t + u
ADD R3, R2, R1

a = d
LD R2, d

d = v + u
ADD R1, R3, R1

salida
ST a, R2
ST d, R1
```

Qué ilustra el ejemplo:

- se intenta **reutilizar** registros con valores que aún sirven;
- los descriptores se van actualizando tras cada operación;
- al final se almacenan en memoria las variables vivas de salida, aquí `a` y `d`.


# 5.4 Generación eficiente de expresiones

## 5.4.1 Generación de código óptimo para expresiones

El PDF trata el caso de la **asignación de registros cuando hay un número fijo de ellos**.

La idea central son los **números de Ershov**.

### Significado de los números de Ershov

Indican cuántos registros se necesitan para evaluar un nodo del árbol de expresión:

- **sin almacenar** valores intermedios.

### Ejemplo

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-32.png)

Expresión:

```text
(a - b) + e * (c + d)
```

Descompuesta como:

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-33.png)

```text
t1 = a - b
t2 = c + d
t3 = e * t2
t4 = t1 + t3
```

En el árbol etiquetado de la diapositiva:

- las hojas `a`, `b`, `c`, `d`, `e` tienen etiqueta `1`;
- `t1` tiene etiqueta `2`;
- `t2` tiene etiqueta `2`;
- `t3` tiene etiqueta `2`;
- la raíz `t4` tiene etiqueta `3`.

Interpretación:

- la expresión completa puede evaluarse sin temporales en memoria usando **3 registros**.


## 5.4.2 Generación desde árboles etiquetados

Para generar código sin almacenar temporales:

- se usa el número de registros indicado por la **etiqueta de la raíz**;

### Ejemplo

Para la misma expresión etiquetada, la diapositiva muestra este código:

```text
LD R3, d
LD R2, c
ADD R3, R2, R3
LD R2, e
MUL R3, R2, R3
LD R2, b
LD R1, a
SUB R2, R1, R2
ADD R3, R2, R3
```

La idea es:

- evaluar primero una subexpresión completa usando los registros disponibles;
- mantener su resultado en un registro;
- evaluar después la otra;
- combinar ambas al final sin necesidad de guardar temporales en memoria.


## 5.4.3 Evaluación con registros insuficientes

Si no hay suficientes registros, entonces:

- es necesario introducir **instrucciones de almacenamiento**;
- el PDF remite al **algoritmo 8.26**.

### Ejemplo del PDF

Sobre la misma expresión, la diapositiva muestra un código donde aparece un temporal almacenado:

```text
LD R2, d
LD R1, c
ADD R2, R1, R2
LD R1, e
MUL R2, R1, R2
ST t3, R2
LD R2, b
LD R1, a
SUB R2, R1, R2
LD R1, t3
ADD R3, R2, R1
```

Lo importante del ejemplo es que:

- primero se calcula una subexpresión;
- su resultado se **guarda en memoria** (`ST t3, R2`);
- más adelante se **recupera** (`LD R1, t3`);
- esto permite continuar la evaluación aunque el número de registros disponibles no baste para mantener todos los intermedios a la vez.


## 5.4.4 Ideas clave para estudiar

- La generación de código parte de una representación intermedia ya **correcta**.
- Los objetivos prácticos son: **corrección**, **calidad** y **coste razonable** de compilación.
- Los grandes subproblemas son:
  - selección de instrucciones;
  - asignación de registros;
  - orden de evaluación.
- La calidad del código se mide por:
  - tiempo de compilación;
  - tamaño;
  - tiempo de ejecución;
  - energía.
- La representación por **bloques básicos** y **grafos de flujo** es esencial para optimizar.
- La información de **variable viva** y **siguiente uso** guía la gestión de registros.
- Los **DAG** permiten:
  - detectar subexpresiones comunes;
  - eliminar código muerto;
  - aplicar simplificaciones algebraicas;
  - reensamblar el bloque optimizado.
- Arrays, punteros y llamadas a procedimientos complican la optimización por problemas de **aliasing**.
- Un generador simple usa descriptores y una función tipo **`obtenReg`**.
- Los **números de Ershov** indican cuántos registros hacen falta para evaluar expresiones sin almacenar temporales.
- Si los registros no bastan, hay que **guardar y recargar** resultados intermedios.