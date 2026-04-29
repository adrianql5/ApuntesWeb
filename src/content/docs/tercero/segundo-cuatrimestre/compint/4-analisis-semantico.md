---
title: "Análisis Semántico"
---

# 4.1 Introducción

La **semántica** de un lenguaje de programación es el conjunto de reglas que especifica el significado de cualquier sentencia **sintácticamente correcta**.

El **análisis semántico** puede hacerse:

- como una fase independiente;
- o en paralelo con el análisis sintáctico.

Su salida es una representación automática en forma de **código intermedio**, independiente de la máquina de ejecución, que pasa a las fases de síntesis de la compilación.


# 4.2 Objetivos del tema

1. Entender cómo funcionan las tareas del analizador semántico.
2. Saber asociar atributos y reglas semánticas a un árbol sintáctico.
3. Saber construir y evaluar un grafo de dependencias.
4. Conocer los tipos de código intermedio que suele generar el analizador semántico.
5. Ser capaces de traducir un árbol sintáctico sencillo a código intermedio.


# 4.3 Lugar del análisis semántico en el compilador

La estructura global mostrada en el tema es:

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-10.png)

La compilación queda dividida en dos grandes partes:

- **fase de análisis**: análisis léxico, sintáctico y semántico;
- **fase de síntesis**: optimización y generación de código.

La **tabla de símbolos** da soporte al análisis semántico y sigue siendo útil en fases posteriores.


# 4.4 Preliminares
Cada símbolo de la gramática adquiere un significado concreto según el **contexto** en el que aparece en el código fuente.

Para poder expresar ese significado es necesario:
- ampliar la gramática;
- añadir **atributos** a los símbolos;
- añadir **acciones semánticas** a las reglas sintácticas.

La semántica puede especificarse mediante:
- **lenguajes especiales de especificación**, por ejemplo `VDM` para `PL/1`, `Anna` para `Ada`, `Gypsy` o `HDM`;
- **gramáticas de atributos**, que son el enfoque desarrollado en este tema.

Un **atributo** es cualquier ítem de información añadido al árbol de derivación durante el análisis semántico.


## 4.5 Gramáticas de atributos
Una **gramática de atributos** es una gramática independiente del contexto a la que se le añade un sistema de atributos. Ese sistema está formado por:

1. Un conjunto de **atributos semánticos** asociados a cada símbolo de la gramática.
2. Un conjunto de **acciones semánticas** distribuidas a lo largo de las reglas de sustitución.

Si `a` es un atributo del símbolo `X`, se escribe:

$$
X.a
$$

Una **acción semántica** es un algoritmo asociado a una regla de la gramática cuyo objetivo es calcular el valor de alguno de los atributos de los símbolos que intervienen en esa regla.


## 4.6 Ejemplo de gramática de atributos

Sea la gramática:

```bnf
D → T L ;
T → int | real
L → L , id | id
```

Una posible gramática de atributos es:

```text
D → T L ;
{ L.tipo = T.tipo; }

T → int
{ T.tipo = entero; }

T → real
{ T.tipo = real; }

L → Ld , id
{ Ld.tipo = L.tipo; insertarTS(id, L.tipo); }

L → id
{ insertarTS(id, L.tipo); }
```

Idea del ejemplo:

- `T.tipo` se sintetiza a partir de `int` o `real`;
- ese tipo se propaga a `L`;
- cada identificador se inserta en la **tabla de símbolos** con el tipo correspondiente.


# 4.7 Propagación de atributos

La **propagación** es el cálculo del valor de un atributo en función del valor de otros atributos. Eso define una **relación de dependencia** entre los atributos que aparecen en el árbol de análisis.

### Ejemplo visual del tema

Para la declaración:

```text
int var1, var2, var3
```

usando la gramática anterior:

- `T.tipo` toma el valor `entero` al reconocer `int`;
- `D` transmite ese tipo a la lista `L`;
- la lista lo va heredando recursivamente hacia sus sublistas;
- finalmente `var1`, `var2` y `var3` se insertan en la tabla de símbolos como enteros.

La figura del PDF representa esta idea con flechas que muestran cómo el tipo va recorriendo el árbol desde el nodo donde se calcula hasta los nodos donde se necesita.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-12.png)


# 4.8 Traducción dirigida por la sintaxis

La propagación se realiza siguiendo el **árbol de derivación** devuelto por el análisis sintáctico, e incluso puede desarrollarse al mismo tiempo.

Según los símbolos que intervienen en una acción semántica, hay dos tipos de atributos:

## Atributos sintetizados

Son atributos asociados a **no terminales de la parte izquierda** de una regla de sustitución. Se calculan a partir de los nodos hijos del subárbol en que aparecen. La información recorre el árbol **verticalmente**, desde abajo hacia arriba.

Esquema general:

$$
A.at = f(a_1.at, a_2.at, \ldots, a_n.at)
$$
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-13.png)


## Atributos heredados

Son atributos asociados a **símbolos de la parte derecha** de una sustitución. Se calculan a partir de los atributos del nodo padre y de los nodos hermanos dentro del mismo subárbol. La información recorre el árbol **horizontalmente** o desde el padre hacia los hijos.

Esquema general:

$$
a_2.at = f(A.at, a_1.at, \ldots, a_n.at)
$$


# 4.9 Grafo de dependencias

La propagación debe hacerse respetando el orden implícito de dependencia entre atributos: no se puede evaluar una regla semántica antes de conocer todos los atributos de los que depende.

Ese orden se representa mediante un **grafo de dependencias acíclico y dirigido**.

Si una dependencia tiene la forma:

$$
b = f(c_1, c_2, \ldots, c_n)
$$

entonces:

- el grafo tiene un nodo para cada atributo;
- se dibuja un arco desde cada `c_i` hacia `b`.

La evaluación se hace así:

1. Se evalúan primero los nodos que no tienen arcos entrantes.
2. Se marcan como calculados.
3. Se evalúan después los nodos cuyos arcos de entrada vienen sólo de nodos ya marcados.
4. Se continúa hasta que no queden nodos por evaluar.

En la práctica, esto equivale a una evaluación guiada por dependencias.


# 4.10 Verificación de tipos

La **verificación de tipos** asegura que el tipo de cada construcción del código fuente coincide con lo previsto en el diseño de la gramática.

Un **sistema de tipos** es un conjunto de reglas que asigna tipos a las distintas construcciones del código fuente:

- primero a los tipos básicos: entero, real, carácter, etc.;
- después a expresiones de tipos más complejas: matrices, estructuras, punteros, funciones, etc.

Estas reglas se incorporan al árbol de análisis sintáctico de forma parecida a como se incorporan las reglas de asignación y propagación de atributos.

## Clasificaciones importantes

### Tipificación fuerte y débil

- Un lenguaje **fuertemente tipificado** es aquel en el que no es posible un error de tipos en tiempo de ejecución.
  Ejemplos dados en el tema: `Lisp`, `Java`, `Perl`, `Python`.
- Un lenguaje **débilmente tipificado** es aquel en el que se puede usar un valor de un tipo como si fuese de otro.
  Ejemplo dado en el tema: `C`.

### Tipificación estática y dinámica

- La **tipificación estática** verifica los tipos sobre el código fuente, en tiempo de compilación.
  Ejemplos: `C++`, `D`, `Go`, `Kotlin`, `Java`.
- La **tipificación dinámica** verifica los tipos sólo en tiempo de ejecución.
  Ejemplos: `Python`, `Javascript`, `Julia`, `R`, `MATLAB`.

Estas dos clasificaciones no son lo mismo: una habla de la **fortaleza** del sistema de tipos y la otra del **momento** en que se verifica.


# 4.11 Ejemplo completo de verificación de tipos

Sea la gramática:

```bnf
<asignacion> ::= <variable> = <expresion>
<expresion> ::= <expresion> <operador> <expresion> | numero
<variable> ::= identificador
<operador> ::= + | -
```

El tema construye una gramática de atributos para realizar **sumas y restas de enteros y reales** y la aplica a la entrada:

```text
velocidad = 3 + 2.5
```

## Acciones semánticas

```text
<asignacion> ::= <variable> = <expresion>
{ variable.valor = expresion.valor;
  variable.tipo = expresion.tipo; }

<expresion> ::= <expresioni> <operador> <expresiond>
{ operador.tipo = MayorTipo(expresioni.tipo, expresiond.tipo);
  expresion.tipo = operador.tipo;

  if (operador.tipo = 'real' AND expresioni.tipo = 'entero')
    expresioni.valor = float(expresioni.valor);

  if (operador.tipo = 'real' AND expresiond.tipo = 'entero')
    expresiond.valor = float(expresiond.valor);

  switch (operador.tipo) {
    'entero': expresion.valor = OpEntera(operador.clase, expresioni.valor, expresiond.valor); break;
    'real':   expresion.valor = OpReal(operador.clase, expresioni.valor, expresiond.valor); break;
  }
}

<expresion> ::= numero
{ expresion.valor = numero.valor;
  expresion.tipo = numero.tipo; }

<variable> ::= identificador
<operador> ::= + { operador.clase = '+'; }
<operador> ::= - { operador.clase = '-'; }
```

## Funciones auxiliares

- `MayorTipo(tipo1, tipo2)` devuelve `real` si alguno de los operandos es real; en caso contrario devuelve `entero`.
- `OpEntera(op, v1, v2)` ejecuta `+` o `-` sobre enteros.
- `OpReal(op, v1, v2)` ejecuta `+` o `-` sobre reales.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-14.png)

## Qué ocurre en `velocidad = 3 + 2.5`

1. El número `3` sintetiza:
   `valor = 3`, `tipo = E`.
2. El número `2.5` sintetiza:
   `valor = 2.5`, `tipo = R`.
3. `MayorTipo(E, R)` devuelve `R`.
4. Como el tipo final es real, el operando entero `3` se convierte a real antes de operar.
5. La expresión sintetiza:
   `valor = 5.5`, `tipo = R`.
6. La asignación hace que la variable `velocidad` reciba:
   `valor = 5.5`, `tipo = R`.

- **verde**: atributo heredado;
- **naranja**: atributo sintetizado.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-15.png)

## 4.12 Ejercicio 11

El tema propone el siguiente ejercicio:

```bnf
F → .L
L → L B | B
B → 0 | 1
```

Se pide:

1. Usando **sólo atributos sintetizados**, ampliar la gramática para calcular el valor decimal de la fracción binaria representada.
2. Mostrar el árbol de análisis aumentado para la cadena `.101`.

Ejemplo indicado:

```text
.101  →  F.val = 0,625
```


# 4.13 Generación de código intermedio

Una **representación intermedia** es una estructura de datos que representa el código fuente durante su traducción a código objeto.

Observaciones importantes del tema:

- el árbol de análisis sintáctico junto con la tabla de símbolos ya es una representación intermedia válida;
- aun así, esa representación se parece poco a un código ejecutable;
- la **notación postfija** también se usa con frecuencia como representación intermedia para traducir expresiones;
- en este tema se propone una representación obtenida al **linealizar** el árbol sintáctico: el **código de tres direcciones**.

Existen muchos tipos de códigos de tres direcciones, todos pensados para algún tipo de **máquina virtual**.


# 4.14 Código de tres direcciones

El código de tres direcciones se define como una secuencia de instrucciones de la forma:

```text
x := y op z
```

donde:

- `op` representa un operador aritmético, lógico, etc.;
- `x`, `y` y `z` pueden ser símbolos definidos por el programador, variables temporales generadas por el compilador, constantes, etc.

Esta representación obliga a:

- descomponer expresiones complejas;
- transformar sentencias de control en instrucciones sencillas.

Es una representación **linealizada de izquierda a derecha** del árbol sintáctico, asignando **nombres temporales** a los nodos internos.

Las instrucciones de tres direcciones se generan mediante reglas semánticas y el uso de un atributo **`.codigo`**.

La traducción de código de tres direcciones a código máquina suele ser bastante sencilla.

## Ejemplos de traducción de expresiones

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-16.png)


## 4.15 Formas básicas de instrucción en código de tres direcciones

Para representar construcciones de alto nivel hacen falta varias clases de instrucciones:

1. **Asignación con operador binario**

```text
x := y op z
```

2. **Asignación con operador unitario**

```text
x := op y
```

Aquí `op` puede ser opuesto, negación, desplazamiento o conversión de tipo.

3. **Copia**

```text
x := y
```

4. **Salto incondicional**

```text
goto E
```

5. **Salto condicional**

```text
if x oprel y goto E
```

6. **Llamadas a procedimientos y retorno**

```text
param x1
...
param xn
call p, n
return y
```

7. **Asignaciones con índices**

```text
x := y[i]
x[i] := y
```

8. **Direcciones y punteros**

```text
x := &y
x := *y
*x := y
```

Observación importante: un conjunto de operadores pequeño facilita la implementación sobre la máquina objeto, pero si ese conjunto es demasiado limitado puede obligar a generar secuencias muy largas para ciertas construcciones del lenguaje fuente.


# 4.16 Ejemplo de traducción de control a código de tres direcciones

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-17.png)

La idea es:

- si `x <= 0`, se salta al final (`L1`);
- si entra en el bloque, inicializa `fact`;
- el bucle `repeat ... until` se convierte en una etiqueta de entrada (`L2`) y un salto condicional al final;
- se usan temporales como `t2` y `t3` para descomponer operaciones.


## 4.17 Implementaciones del código intermedio

El código intermedio suele almacenarse como una **lista enlazada de registros**, donde cada registro representa una instrucción.

El tema presenta dos implementaciones:

### Cuádruples

Un cuádruple es un registro con cuatro campos:

```text
(op, result, arg1, arg2)
```

Ejemplo:

```text
x = y + z  →  (suma, x, y, z)
```

Si una instrucción no usa todos los campos, los que sobran quedan vacíos.

### Triples

Un triple simplifica la representación haciendo que cada instrucción represente una variable temporal implícita. Usa sólo tres campos:

```text
(op, arg1, arg2)
```

Ejemplo:

```text
x = y + z
01 (suma, y, z)
02 (asigna, x, (01))
```


## 4.18 Ejemplo del tema con cuádruples y triples

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-18.png)

En los **triples**, las referencias a resultados intermedios se hacen por **posición**.


## 4.19 Triples indirectos

Los **cuádruples** tienen una ventaja sobre los triples cuando la optimización reorganiza código: si cambian las posiciones de los triples, hay que actualizar todas sus referencias.

Para evitar este problema se introducen los **triples indirectos**:

- se mantiene una **lista de punteros** a triples;
- la optimización se hace sobre esa lista de punteros;
- así no hace falta modificar las posiciones reales de los triples.

La figura del PDF ilustra esta idea con una lista del estilo:

```text
(1) → (100)
(2) → (101)
(3) → (102)
(4) → (103)
(5) → (104)
(6) → (105)
```

apuntando a los triples almacenados por separado.


## 4.20 Ideas clave para estudiar

- El análisis semántico añade **significado** a estructuras ya reconocidas sintácticamente.
- La herramienta central del tema son las **gramáticas de atributos**.
- Los atributos pueden ser **sintetizados** o **heredados**.
- El orden de evaluación se controla con un **grafo de dependencias**.
- La **verificación de tipos** comprueba compatibilidades y puede implicar conversiones.
- La salida habitual del análisis semántico es una forma de **código intermedio**.
- El **código de tres direcciones** linealiza el árbol sintáctico usando temporales.
- El código intermedio puede representarse con **cuádruples**, **triples** o **triples indirectos**.
