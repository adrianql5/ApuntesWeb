---
title: "Gramáticas Independientes del Contexto"
---

Copyright (c) 2025 Adrián Quiroga Linares Lectura y referencia permitidas; reutilización y plagio prohibidos

Una **gramática** es un conjunto de reglas que nos permite generar todas las palabras válidas de un lenguaje. Es como un "recetario" para crear frases correctas.

# 4.1 Clasificación de Gramáticas 
Una gramática se define como: $G = (NT, T, P, S)$.

- **$NT$ (o $V$):** Variables no terminales (Mayúsculas, ej: $A, B$).
- **$T$:** Terminales (minúsculas, ej: $a, b$).
- **$P$:** Producciones (Reglas $\text{Izquierda} \to \text{Derecha}$).
- **$S$:** Axioma inicial.

Chomsky clasificó las gramáticas en 4 niveles (del 0 al 3). **La regla de oro:** A mayor número, más restricciones tiene la gramática y menos potente es.

## 4.1.1 Tipo 0: No Restringida (Recursivamente Enumerable)
- **Definición:** $x \to y$
    - $x \in (NT/T)^+$ (La izquierda debe tener _algo_, no puede ser vacío).
    - $y \in (NT/T)^*$ (La derecha puede ser cualquier cosa o vacío).

- **Explicación Práctica:**
    - En la izquierda puedes tener mezclas de variables y terminales (ej: $aAb \to \dots$).
    - Puedes borrar símbolos, añadir cosas de la nada o acortar la cadena.
    - Esta gramática genera **Lenguajes Recursivamente Enumerables** y son reconocidos por la **Máquina de Turing**


## 4.1.2 Tipo 1: Sensible al Contexto
- **Definición:** $\alpha \to \beta$ tal que $|\alpha| \le |\beta|$
    - Formalmente se ve así: $\alpha = z_1 \mathbf{x} z_2$ y $\beta = z_1 \mathbf{y} z_2$.
    - Significa que la variable $\mathbf{x}$ se transforma en $\mathbf{y}$ solo si está rodeada por el contexto $z_1$ y $z_2$.
    - $z_1, z_2 \in T^*$, $x \in NT$ e $y \in (NT/T)^+$ 

- **Explicación Práctica:**
    - La longitud de lo de la derecha ($\beta$) siempre es **mayor o igual** que lo de la izquierda ($\alpha$). Nunca se acorta la cadena (excepto quizás para borrar el axioma inicial).
    - Necesitas "vecinos" específicos para activar el cambio.
    - Esta gramática genera **Lenguajes Sensibles al Contexto** y son reconocidos por el **Autómata Linealmente Acotado** (una versión de la Máquina de Turing que tiene una cinta de memoria finita/limitada)


## 4.1.3 Tipo 2: Independiente del Contexto (GIC / CFG)
- **Definición:** $x \to y$
    - $x \in NT$ (¡OJO! La izquierda **siempre** es una sola Variable/Mayúscula).
    - $y \in (NT/T)^*$ (La derecha es cualquier combinación).

- **Explicación Práctica:**    
    - Es una **sustitución simple**. No importa qué haya al lado de la variable, si ves una $A$, puedes cambiarla por su regla.
    - Ejemplo: $A \to aBc$.
    - Esta gramática genera **Lenguajes Independientes del Contexto** y son reconocidos por el **Autómata con Pila (PDA)**.


## 4.1.4 Tipo 3: Regular
- **Definición:** $\alpha \to \beta$
    - $\alpha \in NT$ (Izquierda es una sola Variable).
    - $\beta$ tiene varias formas:
	    - $\beta \in aB$
	    - $\beta \in Ba$
	    - $\beta \in b$
	- $B \in NT$
	- $a \in T^+$
	- $b \in T^*$

- **Explicación Práctica:**    
    - Es una "cola india". La cadena va creciendo linealmente.
    - Se divide en dos subtipos (que **NO** se pueden mezclar en la misma gramática):
        1. **Lineal por la Derecha:** $A \to aB$ o $A \to a$. (La variable siempre al final).
        2. **Lineal por la Izquierda:** $A \to Ba$ o $A \to a$. (La variable siempre al principio).
	- Esta gramática genera **Lenguajes Regulares** y son reconocidos por los **Autómatas Finitos** (DFA o NFA), que son máquinas sin memoria auxiliar, limitadas a reconocer patrones lineales.

Relación de Conjuntos:
$$T3 \subset T2 \subset T1 \subset T0$$


# 4.4 Lenguaje de una Gramática Independiente del Contexto
$$L(G) = \{ w ∈ T^* | S ⇒* w \}$$

Se lee así: _"El lenguaje $L$ generado por la gramática $G$ es el conjunto de cadenas $w$..."_
1. **$w \in T^*$**:
    - Esto impone la condición principal: la cadena resultante $w$ debe estar formada **únicamente por símbolos Terminales** ($T$).
    - El asterisco ($*$) es el **Cierre de Kleene**, que significa "cualquier combinación de terminales".
    - **¿Por qué es importante?** Porque durante la derivación intermedia puedes tener cosas como $aSb$ (que mezcla terminales y variables). La fórmula te dice que eso **no** es parte del lenguaje final todavía; solo lo es cuando desaparecen todas las letras mayúsculas (Variables).

2. **$\mid$**:    
    - Significa "tal que" o "que cumplen la condición de que...".
    
3. $S \Rightarrow * w$:
    - **$S$**: Debes empezar obligatoriamente desde el **Símbolo Inicial**.
    - **$\Rightarrow^*$**: La flecha doble con asterisco significa **"se deriva en cero o más pasos"**. Es decir, no importa si tardas 1 paso o 1.000 pasos en llegar.
    - **$w$**: Debes llegar a la palabra final.


**Ejemplo:**
```
S → aSb | ε
T = {a, b}
```

**Derivaciones:**
- S ⇒ ε → palabra: "" (cadena vacía)
- S ⇒ aSb ⇒ ab → palabra: "ab"
- S ⇒ aSb ⇒ aaSbb ⇒ aabb → palabra: "aabb"
- S ⇒ aSb ⇒ aaSbb ⇒ aaaSbbb ⇒ aaabbb → palabra: "aaabbb"

**L(G) = {aⁿbⁿ | n ≥ 0} = {ε, ab, aabb, aaabbb, ...}**


# 4.5 Árboles de Derivación vs Derivaciones
**Derivar** es el proceso de construir una cadena de texto válida (una palabra) aplicando las reglas de la gramática paso a paso.

Se empieza con el **Símbolo Inicial** (generalmente llamado $S$) y se van sustituyendo las variables (letras mayúsculas) por lo que dictan las reglas (producciones) hasta que solo quedan **terminales** (letras minúsculas o símbolos finales que ya no se pueden cambiar).

Es básicamente un juego de **"buscar y reemplazar"**:
- **Entrada:** El símbolo inicial $S$.
- **Acción:** Eliges una variable presente en tu cadena actual, buscas una regla que le aplique y la sustituyes.
- **Fin:** Cuando ya no quedan variables (letras mayúsculas), has terminado la derivación.


Es importante distinguir entre el **proceso** y la **estructura**.
1. **Derivación (Texto):** Es la secuencia de pasos paso a paso.
    - $S \Rightarrow aA \Rightarrow abB \Rightarrow abb$

2. **Árbol de Derivación (Gráfico):** Es la estructura jerárquica.
    - Raíz: $S$.
    - Hojas: La palabra final ($a, b, b$).
    - Nodos: Variables intermedias.



Gramática:
1. $E \rightarrow E + E$
2. $E \rightarrow E * E$
3. $E \rightarrow id$ (donde 'id' es un número o variable)

**Objetivo:** Generar el árbol para la cadena: **$id + id * id$**

Empezamos con el símbolo inicial $E$.

Miramos nuestra cadena objetivo ($id + id * id$). Vemos que hay una suma principal (o una multiplicación, depende de cómo decidamos estructurarlo, pero asumamos la suma primero para este ejemplo).

Aplicamos la regla $E \rightarrow E + E$.
- De la raíz $E$ salen tres hijos: $E$, $+$ y $E$.

Ahora tenemos:
- Un $E$ a la izquierda.
- Un $+$ en el medio (ya es terminal, se queda quieto).
- Un $E$ a la derecha.

Miramos la cadena objetivo: la primera parte es solo id. Así que al $E$ de la izquierda le aplicamos la regla $E \rightarrow id$.

Para la segunda parte, necesitamos id \* id. Así que al $E$ de la derecha no lo convertimos en id directamente, sino que le aplicamos la regla de multiplicación: $E \rightarrow E * E$

Ahora el árbol ha crecido. Los nuevos $E$ que creamos para la multiplicación se convierten cada uno en `id` usando la regla $E \rightarrow id$.


# 4.6 Ambigüedad
**Definición de Examen:** Una gramática es ambigua si existe **al menos una cadena** que tiene **dos o más árboles de derivación distintos**. Pueden tener derivaciones distintas y no ser ambiguas, por ejemplo: 
1. $S \rightarrow AB$
2. $A \rightarrow a$
3. $B \rightarrow b$

Queremos generar la cadena: **$ab$** Podemos hacerlo con dos "derivaciones" diferentes (cambiando el orden en que sustituimos las letras):

**Derivación 1 (Por la izquierda):**
1. $S \Rightarrow AB$
2. $S \Rightarrow \textbf{a}B$ (Sustituyo A primero)
3. $S \Rightarrow a\textbf{b}$ (Sustituyo B después)

**Derivación 2 (Por la derecha):**
1. $S \Rightarrow AB$
2. $S \Rightarrow A\textbf{b}$ (Sustituyo B primero)
3. $S \Rightarrow \textbf{a}b$ (Sustituyo A después)

¿Son derivaciones diferentes?
SÍ. La lista de pasos es distinta. En una escribí la 'a' antes y en la otra escribí la 'b' antes.

¿Son árboles diferentes?
NO. Si dibujas el árbol, el resultado es idéntico en ambos casos:
- La raíz es $S$.
- De $S$ salen dos ramas: $A$ y $B$.
- De $A$ cuelga una $a$.
- De $B$ cuelga una $b$.

**Caso típico:** Operaciones matemáticas sin paréntesis ni precedencia.
- `3 + 4 * 5` $\to$ ¿Es `(3+4)*5` o `3+(4*5)`? Si la gramática permite ambos árboles, es mala (ambigua).


# 4.7 Protips para ejercicios
## Patrón 1: El Espejo y la Cebolla (Palíndromos y $a^n b^n$)
Si necesitas que el principio coincida con el final, o que la cantidad de letras del principio sea igual a la del final, usas la **recursividad envolvente**.

La Regla de Oro:
$$S \to x \ S \ y$$
Esto genera $x$ a la izquierda y $y$ a la derecha, sincronizados.

**Ejemplo Práctico Palídromo:**
1. Si añado una 'a' al principio, debo añadir una 'a' al final: $S \to aSa$
2. Si añado una 'b' al principio, debo añadir una 'b' al final: $S \to bSb$
3. ¿Cómo termino? Con el centro. Puede ser 'a', 'b', o vacío ($\varepsilon$): $S \to a \mid b \mid \varepsilon$

> **Gramática final:** $S \to aSa \mid bSb \mid a \mid b \mid \varepsilon$

## Patrón 2: Ecuaciones Lineales ($k = i + j$ o $k = i + 2j$)
Estos ejercicios te piden relacionar contadores.
- **Truco:** Traduce la ecuación a **"quién consume a quién"**.
- **Orden:** Fíjate MUY bien en el orden de las letras en el alfabeto ($a^i b^j c^k$).

**Caso A:** Suma simple ($k = i + j$ en $a^i b^j c^k$)
Significa que por cada 'a' hay una 'c', Y por cada 'b' hay una 'c'. Pero las 'a' están lejos de las 'c'.
- Solución: Anidamiento. Tratamos la cadena como $a^i (b^j c^j) c^i$.
- Las 'a' envuelven a todo el bloque de 'b' y 'c'.
- Las 'b' se emparejan con las 'c' del medio.

Caso B: Multiplicación ($k = i + 2j$ en $a^i b^j c^k$)
- Interpretación:
    - Por cada 1 'a', genero 1 'c'. (Exterior)
    - Por cada 1 'b', genero 2 'c's. (Interior)

- Diseño:
    1. Estado inicial ($S$): Genera 'a' izquierda y 'c' derecha. Cuando acaben las 'a', pasamos al bloque central ($B$).
 $$S \to aSc \mid B$$
    2. Estado central ($B$): Genera 'b' izquierda y dos 'c' derecha.
$$B \to bBcc \mid \varepsilon$$

## Patrón 3: La "O" Lógica (Unión de Casos)
Si ves un "o", una coma, o condiciones alternativas ($i=j$ o $j=k$), **NO** intentes hacerlo todo en una sola regla. Divide y vencerás.

**Estrategia:** El símbolo inicial solo sirve para elegir camino.
$$S \to S_1 \mid S_2$$

**Ejemplo** ($a^i b^j c^k$ donde $i=j$ O $j=k$):
- Camino 1 ($S_1$): $i=j$ (y $k$ va por libre). Cadena tipo $a^n b^n c^m$.
    - Empareja 'a' y 'b'. La 'c' se genera aparte libremente.
    - $S_1 \to X C$
    - $X \to aXb \mid \varepsilon$ (pareja a-b)
    - $C \to cC \mid \varepsilon$ (c libre)

- Camino 2 ($S_2$): $j=k$ (y $i$ va por libre). Cadena tipo $a^m b^n c^n$.
    - La 'a' va libre al principio. Luego empareja 'b' y 'c'.
    - $S_2 \to A Y$
    - $A \to aA \mid \varepsilon$ (a libre)
    - $Y \to bYc \mid \varepsilon$ (pareja b-c)


## Patrón 4: Desigualdades (El Truco del "Sobra Algo")
Las gramáticas no saben hacer "mayor que". Solo saben hacer "igual". **Truco Matemático:**
- $k > i$ $\rightarrow$ significa $k = i + m$ (donde $m \geq 1$). 
- Es decir: "Hay tantas 'k' como 'i', y luego **sobran** más 'k'".

**Ejemplo** ($a^i (b+c)^k$  donde $k > i$): Vamos a simplificar $(b+c)$ llamándolo $X$. La estructura es $a^i X^k$.
1. Parte equilibrada: Por cada 'a', pongo una $X$.
2. Parte sobrante: Añado más $X$ al final (o al lado de las $X$).
$$S \to aSX \mid A \quad \text{(Emparejo a con X)}$$
$$A \to XA \mid X \quad \text{(Genero las X sobrantes, al menos una)}$$
$$X \to b \mid c \quad \text{(Defino qué es X)}$$

**Truco para "Distinto"** ($\neq$). "Distinto" significa "Mayor que" O "Menor que".
$$S \to S_{mayor} \mid S_{menor}$$
Haces dos gramáticas (como en el Patrón 4) y las unes.

## Patrón 5: Desorden y Mezcla (Conteo N(a) = N(b))
Aquí NO hay orden $a^i b^j$. Las letras pueden estar mezcladas "aababb...". Esto se resuelve con **Inserción Relativa**.

**Regla Maestra para** $N(a) = N(b)$: Si quiero mantener el equilibrio, donde ponga una 'a', debo poner una 'b'. Pero como no hay orden, la 'b' puede ir antes, después, o alrededor.

La forma estándar segura es:
$$S \to aSbS \mid bSaS \mid SS \mid \varepsilon$$

Significado: Si pongo 'a', debo "deber" una 'b' (el estado S intermedio se encarga de resolver esa deuda).

**Ejemplo** ($N(0) = N(1) + 1$): Esto es: "Equilibrado + un 1 extra".
- Definimos un equilibrio perfecto $B$ (mismo nº de 0 y 1).
$$B \to 0B1B \mid 1B0B \mid \varepsilon$$ (Ojo: simplificado para el concepto, a veces se requiere más rigor con $SS$).

- Estado Inicial: Es el equilibrio $B$, pero forzando un '0' extra en algún sitio.
$$S \to B \ 0 \ B$$


# 4.7 Simplificación de Gramáticas (GIC)
Antes de pasar a formas normales, **siempre** debes limpiar la gramática en este orden estricto:

### 1. Eliminar Producciones $\varepsilon$ (Vacías)
Si $A \to \varepsilon$, entonces $A$ es "anulable".
Método:
1. Busca todas las variables que pueden volverse $\varepsilon$ (directa o indirectamente).
2. Si tienes $S \to Ab$, y $A$ es anulable, añade una nueva regla $S \to b$ (versión donde $A$ desaparece).
3. Borra las reglas $A \to \varepsilon$ originales (salvo si $S \to \varepsilon$ es necesario para el lenguaje)

### 2. Eliminar Producciones Unitarias ($A \to B$)
Reglas que solo cambian el nombre de la variable sin añadir terminales.
Método:
1. Si $A \to B$ y $B \to \text{algo}$, entonces añade $A \to \text{algo}$.
2. Borra $A \to B$.

### 3. Eliminar Símbolos Inútiles
Se hace en dos pasadas:
1. **No Generadores:** Variables que entran en bucle y nunca llegan a terminales ($A \to aA$). Bórralas.
2. **Inalcanzables:** Variables a las que no puedes llegar empezando desde $S$. Bórralas.

Un símbolo $X$ es generador si $X ⇒*w$ . Un símbolo X es alcanzable si existe una derivación $S⇒* \alpha X \beta$ para algún $\alpha$ y $\beta$. Todo símbolo útil es generador y alcanzableeeeeeeeeee.


**Ejemplo que usa los pasos 1 y 2:**
![](/ApuntesWeb/images/tercero/primer-cuatrimestre/talf/imagenes/Pasted%20image%2020251208135015.png)


# 4.8 Formas Normales (FNC-Chomsky)
**Objetivo:** Estandarizar la gramática para que todas las reglas sean "cortas" y binarias. Es fundamental para el algoritmo CYK (análisis sintáctico).

**Solo se permiten 2 tipos de reglas:**
1. $A \to BC$ (Dos variables).
2. $A \to a$ (Un terminal).

### Algoritmo de Conversión a FNC (Práctico)
Supongamos que ya has simplificado la gramática (paso 4.8).

**Paso 1:** Terminales solitarios en reglas mixtas. Si tienes $S \to aB$, eso está prohibido (mezcla terminal y variable).
- Crea una variable nueva: $X_a \to a$.
- Cambia la regla a: $S \to X_a B$.

**Paso 2:** Acortar cadenas largas. Si tienes $S \to ABC$ (3 variables), es demasiado largo.
- Rompe la cadena creando variables intermedias.
- $S \to AZ$
- $Z \to BC$

Ejemplo Rápido:
Original: $S \to aS b$
1. Crear variables para terminales: $X_a \to a$, $X_b \to b$.
2. Sustituir: $S \to X_a S X_b$.
3. Romper cadena de 3:
    - $S \to X_a Y$
    - $Y \to S X_b$


Resultado FNC:
$$\begin{aligned} S &\to X_a Y \\ Y &\to S X_b \\ X_a &\to a \\ X_b &\to b \end{aligned}$$

# 4.9 Forma Normal de Greibach (FNG)
La **FNG** es otra forma de estandarizar gramáticas (como la de Chomsky), pero con una filosofía distinta: **"Producir letra a letra"**.

Imagina una máquina expendedora. En la **FNG**, cada vez que la gramática hace un movimiento (aplica una regla), está **obligada** a soltar exactamente **una moneda (símbolo terminal)** y quedarse con el cambio (variables).

La regla siempre tiene esta forma:

$$A \to a\alpha$$

- $A$: Variable actual.
- $a$: **Un solo terminal** (la moneda que suelta).
- $\alpha$: Una cadena de cero o más variables (el cambio que te queda por procesar).

**Ejemplo:** $S \to \textbf{a}AB$ (Soltó una 'a', le queda procesar A y B).

Una cadena de longitud $n$ tiene una derivación de $n$ pasos. Un analizador sintáctico descendente parará a profundidad $n$ y nunca habrá recursividad por la izquierda.