---
title: "Análisis Sintáctico"
---

# 3.1 Nociones Generales

El flujo de la fase de análisis es:

```text
programa fuente
→ analizador léxico
→ secuencia de componentes léxicos
→ analizador sintáctico
→ árbol sintáctico
→ analizador semántico
```

La idea clave es:

- el **análisis léxico** reconoce tokens;
- el **análisis sintáctico** comprueba cómo se combinan esos tokens;
- el **análisis semántico** comprueba si esa estructura tiene sentido en el lenguaje.


## 3.1.1 Gramáticas Independientes del Contexto

Una gramática independiente del contexto se define como una 4-tupla:

$$
G=(\Sigma,V,S,P)
$$

donde:

- $\Sigma$ es el conjunto de **símbolos terminales**.
- $V$ es el conjunto de **símbolos no terminales** o variables sintácticas.
- $S \in V$ es el **símbolo inicial**.
- $P$ es el conjunto de **producciones**, de la forma:

$$
A \rightarrow \alpha
$$

con $A \in V$ y $\alpha \in (V \cup \Sigma)^*$.

Observación: en algunos apuntes también se escribe $G=(NT,T,P,S)$; es la misma idea, cambiando la notación.

La máquina teórica asociada al reconocimiento de los lenguajes independientes del contexto es el **autómata a pila**.

En este tema se usa además el símbolo **`$`** para indicar **fin de cadena**.


## 3.1.2 Tipos de Analizadores Sintácticos

### Analizadores descendentes

Construyen el árbol **de arriba hacia abajo**:

- parten del símbolo inicial;
- expanden no terminales aplicando producciones;
- intentan generar la cadena de entrada.

### Analizadores ascendentes

Construyen el árbol **de abajo hacia arriba**:

- parten de la cadena de entrada;
- detectan fragmentos que coinciden con partes derechas de producciones;
- los **reducen** al no terminal correspondiente hasta llegar al símbolo inicial.

### Ejemplo

Sea la gramática:

$$
id \rightarrow letra \mid id\ letra \mid id\ digito
$$

$$
letra \rightarrow a \mid b \mid \cdots \mid z
$$

$$
digito \rightarrow 0 \mid 1 \mid \cdots \mid 9
$$

La cadena `st2` puede analizarse de dos maneras.

**Análisis descendente:**

```text
id
⇒ id digito
⇒ id letra digito
⇒ letra letra digito
⇒ s letra digito
⇒ s t digito
⇒ s t 2
```

**Análisis ascendente:**

```text
st2
⇐ letra t2
⇐ id t2
⇐ id letra 2
⇐ id 2
⇐ id digito
⇐ id
```

La primera derivación genera la cadena desde el símbolo inicial; la segunda reduce la cadena hasta ese símbolo inicial.


## 3.1.3 Forma de Backus-Naur (BNF) y EBNF

La **BNF** es la notación clásica para describir gramáticas; la **EBNF** añade mecanismos de abreviación.

### Metasímbolos básicos de BNF

- `::=` define una producción.
- `|` indica alternativas.
- `<>` identifica no terminales.

Ejemplos:

```bnf
<condicional_simple> ::= if <condicion> then <sentencia>
<op_aritmetica_entera> ::= + | - | * | div | mod
<programa> ::= program <declaraciones> begin <sentencias> end.
```

### Metasímbolos de EBNF

- `[]` indica que algo es **opcional**.
- `{}` indica **repetición**.
- `" "` se usa para distinguir metasímbolos de terminales literales.

Ejemplos:

```bnf
<sentencia_if> ::= if <expresion> then <sentencia> [ else <sentencia> ] endif;
<id> ::= <letra> { <letra> | <digito> }
<regla> ::= <id> "::=" <expresion>
```

La regla:

```bnf
<id> ::= <letra> { <letra> | <digito> }
```

es equivalente a:

```bnf
<id> ::= <letra> | <id> <letra> | <id> <digito>
```


## 3.1.4 BNF Visual

La notación BNF visual suele presentarse así:

1. Los terminales se escriben sin `<>`.
2. Los no terminales también se escriben sin `<>`, pero por contexto se sabe qué son.
3. Se usa `→` en lugar de `::=`.

Ejemplo:

```text
sentencia_if → if expresion then sentencia [ else sentencia ] endif;
```


# 3.2 Diseño de una Gramática

Al diseñar una gramática para un lenguaje de programación hay cuatro ideas centrales:

1. **Recursividad**
2. **Ambigüedad**
3. **Asociatividad**
4. **Precedencia**


## 3.2.1 Recursividad

Los lenguajes de programación permiten construir un número ilimitado de programas. Por tanto, no es viable describirlos mediante una casuística finita sin reutilización. La **recursividad** resuelve este problema: permite generar infinitas cadenas mediante un número finito de reglas.

Decimos que una gramática es recursiva si un no terminal vuelve a aparecer en alguna derivación propia:

$$
A \Rightarrow^+ \alpha A \beta
$$

Ejemplo:

```bnf
<sentencia> ::= begin <sentencia> { ; <sentencia> } end
<sentencia> ::= <asignacion> | <llamada_funcion> | <sentencia_repetitiva> | <sentencia_condicional>
```

La recursividad permite, por ejemplo, bloques con sentencias anidadas sin imponer una cota artificial.


## 3.2.2 Ambigüedad

Una gramática es **ambigua** si existe al menos una cadena con **dos o más árboles de derivación distintos**.

Esto es un problema porque una misma entrada puede interpretarse estructuralmente de formas distintas, y eso puede llevar a generar código diferente.

### Ejemplo clásico con operadores

```bnf
<expresion> ::= <expresion> + <expresion>
              | <expresion> * <expresion>
              | ( <expresion> )
              | - <expresion>
              | id
```

Con esta gramática, la cadena `id+id*id` admite al menos dos derivaciones:

```text
(1)
<expresion>
⇒ <expresion> + <expresion>
⇒ id + <expresion>
⇒ id + <expresion> * <expresion>
⇒ id + id * <expresion>
⇒ id + id * id
```

```text
(2)
<expresion>
⇒ <expresion> * <expresion>
⇒ <expresion> + <expresion> * <expresion>
⇒ id + <expresion> * <expresion>
⇒ id + id * <expresion>
⇒ id + id * id
```

Una derivación interpreta primero la suma y la otra primero la multiplicación.

### Ejemplo del `else` colgante

Sea la gramática:

```bnf
<sentencia> ::= if <expresion> then <sentencia>
              | if <expresion> then <sentencia> else <sentencia>
```

Para el fragmento:

```text
if (expr1) then
    if (expr2) then
        sentencia1;
    else
        sentencia2;
```

aparecen dos interpretaciones:

1. El `else` se asocia al `if` interno.
2. El `else` se asocia al `if` externo.

La interpretación habitual en los lenguajes de programación es la primera: el `else` se asocia con el `if` más cercano que todavía no tenga `else`.

### Aclaración importante

La **factorización por la izquierda** ayuda al análisis predictivo, pero **no elimina por sí sola la ambigüedad**. De hecho, el propio material propone después un ejercicio donde la gramática ya factorizada sigue siendo ambigua.


### Ejercicio 6

Sea la gramática:

```bnf
<sentencia> ::= if <expresion> then <sentencia> <else> | <expresion>
<else> ::= else <sentencia> | ε
<expresion> ::= expresion
```

Se pide demostrar que es una gramática ambigua.


## 3.2.3 Factorización por la izquierda

Cuando dos producciones de un mismo no terminal empiezan igual, un analizador descendente no puede decidir qué regla tomar mirando solo el prefijo común.

Ejemplo:

```bnf
<sentencia> ::= if <expresion> then <sentencia>
              | if <expresion> then <sentencia> else <sentencia>
```

La solución es retrasar la decisión extrayendo el prefijo común:

```bnf
<sentencia> ::= if <expresion> then <sentencia> <else>
<else> ::= else <sentencia> | ε
```

En general, si tenemos:

$$
A \rightarrow \alpha \beta_1 \mid \alpha \beta_2 \mid \cdots \mid \alpha \beta_n \mid \gamma
$$

podemos transformar en:

$$
A \rightarrow \alpha A' \mid \gamma
$$

$$
A' \rightarrow \beta_1 \mid \beta_2 \mid \cdots \mid \beta_n
$$

Si en las nuevas alternativas vuelve a existir un prefijo común, se repite el proceso.


## 3.2.4 Asociatividad

La **asociatividad** decide cómo se agrupan operadores del mismo nivel de precedencia.

### Asociatividad por la derecha

Se evalúa de derecha a izquierda:

```text
a = b = c ≡ a = (b = c)
```

Se modela con **recursividad por la derecha**:

```bnf
<asignacion> ::= id = <asignacion> | id
```

### Asociatividad por la izquierda

Se evalúa de izquierda a derecha:

```text
a + b + c ≡ (a + b) + c
```

Se modela con **recursividad por la izquierda**:

```bnf
<expresion> ::= <expresion> + id | id
```


## 3.2.5 Precedencia

La **precedencia** fija qué operadores deben agruparse antes que otros.

Cuando en una expresión intervienen varios operadores, si no se impone precedencia, la gramática suele ser ambigua.

Se puede incorporar la precedencia:

- usando un no terminal por nivel de precedencia;
- o separando producciones según el operador.

Un operador tiene **menor precedencia** cuanto más cerca aparece su regla de la regla inicial.

### Ejemplo

Queremos:

- suma y resta con precedencia 1;
- multiplicación y división con precedencia 2;
- potenciación con precedencia 3;
- potenciación asociativa por la derecha;
- paréntesis con precedencia máxima.

Una gramática adecuada es:

```bnf
<expresion> ::= <expresion> + <expr_mult>
              | <expresion> - <expr_mult>
              | <expr_mult>

<expr_mult> ::= <expr_mult> * <expr_exp>
              | <expr_mult> / <expr_exp>
              | <expr_exp>

<expr_exp> ::= <valor> ^ <expr_exp> | <valor>

<valor> ::= ( <expresion> ) | id
```

La estructura de la gramática ya impone:

- primero paréntesis;
- después exponentes;
- después multiplicaciones y divisiones;
- después sumas y restas.


### Ejercicio 7

Sea la gramática anterior. Se pide construir el árbol de derivación para:

1. `2 + (2 - 2) / 2 * (2 - 2) / (2 - 2)`
2. `2 + 2 - 2 / 2 * 2 - 2 / 2 - 2`


# 3.3 Análisis Sintáctico Descendente

El análisis sintáctico descendente construye una derivación desde el símbolo inicial hacia la cadena de entrada.

En su forma más simple trabaja mediante:

1. **Avance**: se aplica una producción y el análisis progresa.
2. **Retroceso**: si una elección falla, se vuelve atrás para probar otra.

Para controlar este proceso se usa una **pila**. El analizador intenta emparejar el símbolo en la cima con el componente léxico actual de la entrada.


## 3.3.1 Ejemplo básico de ASD con retroceso

Queremos comprobar si `w = cad` pertenece a la gramática:

```text
S → cAd
A → ab | a
```

La idea es:

1. Partir de `S`.
2. Expandir hasta obtener terminales.
3. Comparar contra la entrada.
4. Si una expansión falla, retroceder y probar otra.

La cadena `cad` sí pertenece al lenguaje porque:

```text
S ⇒ cAd ⇒ cad
```

si se elige la producción `A → a`.


## 3.3.2 Implementación recursiva simple

Una forma natural de implementar un analizador descendente es crear **una función por no terminal**.

Por ejemplo, para la regla:

```bnf
<expr> ::= <term> + <expr> | <term>
```

una implementación esquemática sería:

```c
bool expresion() {
    if (!termino()) return false;

    if (TOKEN == '+' || TOKEN == '-') {
        TOKEN = sig_comp_lexico();
        if (TOKEN == '$') return false;
        if (!expresion()) return false;
    }

    return true;
}
```

La idea es que cada función reconoce la parte del lenguaje asociada a su no terminal.


## 3.3.3 Inconvenientes del ASD con retroceso

Los métodos totalmente recursivos con backtracking no suelen ser recomendables porque:

1. Son lentos.
2. Pueden explorar muchas alternativas antes de concluir.
3. Si la entrada no pertenece al lenguaje, es difícil señalar con precisión dónde está el error.
4. Si se va generando código durante el análisis, un retroceso obliga a deshacer trabajo ya realizado.

Por eso interesan los analizadores **predictivos**, que intentan evitar el retroceso.


## 3.3.4 Recursividad por la izquierda

La recursividad por la izquierda es peligrosa para el análisis descendente, porque puede provocar un **bucle infinito**.

Ejemplo:

```text
S → cAd
A → Aad | a
```

Si al expandir `A` siempre aplicamos `A → Aad`, nunca llegamos a consumir entrada antes de volver a encontrar `A`.

### Eliminación de recursividad inmediata por la izquierda

Si una gramática contiene:

$$
A \rightarrow A\alpha_1 \mid A\alpha_2 \mid \cdots \mid A\alpha_n \mid \beta_1 \mid \beta_2 \mid \cdots \mid \beta_m
$$

con las $\beta_i$ no recursivas por la izquierda, se transforma en:

$$
A \rightarrow \beta_1 A' \mid \beta_2 A' \mid \cdots \mid \beta_m A'
$$

$$
A' \rightarrow \alpha_1 A' \mid \alpha_2 A' \mid \cdots \mid \alpha_n A' \mid \varepsilon
$$

### Ejemplo

Aplicado a:

```text
S → cAd
A → Aad | a
```

tenemos:

- $\alpha = ad$
- $\beta = a$

y queda:

```text
S → cAd
A → aA'
A' → adA' | ε
```

### Recursividad indirecta por la izquierda

El procedimiento anterior solo elimina la recursividad **inmediata**. Si la recursividad aparece a través de otras producciones, primero hay que sustituir.

Ejemplo:

```text
S → Aa | b
A → Ac | Sd | ε
```

Aquí hay recursividad por la izquierda en la secuencia:

```text
S → Aa
A → Sd
```

Sustituyendo `Sd` por su definición:

```text
S → Aa | b
A → Ac | Aad | bd | ε
```

Ahora sí podemos eliminar la recursividad inmediata. Como:

- $\alpha = c \mid ad$
- $\beta = bd \mid ε$

obtenemos:

```text
S → Aa | b
A → bdA' | A'
A' → cA' | adA' | ε
```


### Ejercicio 8

Sea la gramática:

```bnf
<expresion> ::= <expresion> + <termino> | <termino>
<termino> ::= <termino> <factor> | <factor>
<factor> ::= <factor> * | <valor>
<valor> ::= a | b
```

Se pide eliminar la recursividad por la izquierda.


## 3.3.5 Analizador descendente predictivo

La idea es evitar retrocesos y **predecir** qué producción debe aplicarse en cada momento.

Supongamos:

- entrada `c_1 c_2 ... c_i ... c_n`;
- el componente léxico actual es `c_i`;
- el no terminal a expandir es `A`;
- las producciones de `A` son:

$$
A \rightarrow \alpha_1 \mid \alpha_2 \mid \cdots \mid \alpha_n
$$

Si cada alternativa puede distinguirse por el símbolo terminal con el que empieza, el analizador puede elegir sin retroceso.

Ejemplo:

```bnf
<sentencia> ::= if <expresion> then <sentencia>
              | while <expresion> do <sentencia>
              | begin <sentencia> end
```

Cada alternativa comienza con un terminal distinto: `if`, `while`, `begin`.

### Gramáticas LL(k)

Estas ideas llevan a las gramáticas **LL(k)**:

1. `L`: lectura de izquierda a derecha.
2. `L`: derivación más a la izquierda.
3. `k`: número de componentes léxicos de anticipación.

En este curso interesan las **LL(1)**.

Una gramática LL(1):

- no puede tener recursividad por la izquierda;
- no debe obligar a elegir entre dos alternativas con el mismo símbolo de anticipación.

### Importante

Eliminar recursividad por la izquierda y factorizar por la izquierda son **condiciones necesarias**, pero **no suficientes** para que una gramática sea LL(1). La verificación real se hace con los conjuntos `PRIMEROS`, `SIGUIENTES` y la tabla de análisis.

### Ejemplo

Obtener una gramática LL(1) equivalente a:

```text
A → Aa | bB
B → bc | bb | b
```

Eliminamos la recursividad por la izquierda en `A`:

```text
A → bBA'
A' → aA' | ε
```

Factorizamos `B`:

```text
B → bB'
B' → c | b | ε
```

Y aun así no basta con afirmar que ya sea LL(1); hay que comprobarlo con la tabla.


## 3.3.6 Conjuntos de predicción

Los conjuntos de predicción son:

1. `PRIMEROS`
2. `SIGUIENTES`

Sirven para decidir qué producción aplicar en un analizador predictivo.


### Conjunto PRIMEROS

Sea $X \in (V \cup \Sigma)$. `PRIMEROS(X)` es el conjunto de terminales, incluyendo opcionalmente `ε`, que pueden aparecer al principio de alguna cadena derivable de `X`.

$$
PRIMEROS(X)=\{\,v \mid X \Rightarrow^* v\beta,\ v \in \Sigma,\ \beta \in \Sigma^*\,\}
$$

#### Reglas para calcular `PRIMEROS(X)`

1. Si `X` es terminal `a`, entonces:

$$
PRIMEROS(X)=\{a\}
$$

2. Si existe `X → ε`, entonces:

$$
\varepsilon \in PRIMEROS(X)
$$

3. Si `X` es no terminal y existe una producción:

$$
X \rightarrow Y_1Y_2\cdots Y_k
$$

se añaden a `PRIMEROS(X)` los terminales de `PRIMEROS(Y_j)` siempre que todos los símbolos anteriores $Y_1,\dots,Y_{j-1}$ puedan derivar a `ε`.

4. Si todos los $Y_j$ pueden derivar a `ε`, entonces también:

$$
\varepsilon \in PRIMEROS(X)
$$

#### Reglas para calcular `PRIMEROS(X_1X_2\cdots X_n)`

1. Añadir `PRIMEROS(X1) - {ε}`.
2. Si `ε ∈ PRIMEROS(X1)`, añadir `PRIMEROS(X2) - {ε}`.
3. Repetir el proceso mientras aparezca `ε`.
4. Si todos pueden derivar a `ε`, entonces `ε` pertenece al conjunto.

#### Ejemplo

Para la gramática:

```bnf
<expresion> ::= <termino> <expresion'>
<expresion'> ::= + <termino> <expresion'> | ε
<termino> ::= <factor> <termino'>
<termino'> ::= * <factor> <termino'> | ε
<factor> ::= ( <expresion> ) | id
```

se obtiene:

$$
PRIMEROS(<expresion>)=PRIMEROS(<termino>)=PRIMEROS(<factor>)=\{(,id\}
$$

$$
PRIMEROS(<expresion'>)=\{+, \varepsilon\}
$$

$$
PRIMEROS(<termino'>)=\{*, \varepsilon\}
$$

Y para la cadena `<termino'><expresion'>id`:

$$
PRIMEROS(<termino'><expresion'>id)=\{*,+,id\}
$$


### Conjunto SIGUIENTES

Sea `A` un no terminal. `SIGUIENTES(A)` es el conjunto de terminales que pueden aparecer **inmediatamente a la derecha** de `A` en alguna derivación.

$$
SIGUIENTES(A)=\{\,v \mid S \Rightarrow^+ \alpha A v \beta,\ v \in \Sigma\,\}
$$

Si `A` puede quedar al final de la cadena derivada, entonces:

$$
\$ \in SIGUIENTES(A)
$$

#### Reglas para calcular `SIGUIENTES(A)`

1. Si `A` es el símbolo inicial `S`, entonces añadir `$`.
2. Para cada regla `B → αAβ`, añadir `PRIMEROS(β) - {ε}` a `SIGUIENTES(A)`.
3. Para cada regla `B → αAβ`, si `β ⇒* ε`, añadir `SIGUIENTES(B)` a `SIGUIENTES(A)`.
4. Para cada regla `B → αA`, añadir `SIGUIENTES(B)` a `SIGUIENTES(A)`.

#### Ejemplo

Para la gramática anterior:

$$
SIGUIENTES(<expresion>)=SIGUIENTES(<expresion'>)=\{),\$\}
$$

$$
SIGUIENTES(<termino>)=SIGUIENTES(<termino'>)=\{+,),\$\}
$$

$$
SIGUIENTES(<factor>)=\{+,*,),\$\}
$$


## 3.3.7 Tabla de análisis sintáctico descendente

Con `PRIMEROS` y `SIGUIENTES` se construye una tabla `T[A,a]`:

- filas: no terminales;
- columnas: terminales y `$`;
- contenido: la producción que debe aplicarse;
- celdas vacías: error.

### Regla de construcción

Para cada producción:

$$
A \rightarrow \alpha
$$

1. Para cada terminal `a ∈ PRIMEROS(α)`, añadir `A → α` en `T[A,a]`.
2. Si `ε ∈ PRIMEROS(α)`, entonces para cada `b ∈ SIGUIENTES(A)` añadir `A → α` en `T[A,b]`.

Una gramática es **LL(1)** si en cada celda aparece como máximo una producción.

### Ejemplo de tabla LL(1)

Usando la gramática:

```text
E  → T E'
E' → + T E' | ε
T  → F T'
T' → * F T' | ε
F  → (E) | id
```

la tabla queda:

| No terminal | `id` | `+` | `*` | `(` | `)` | `$` |
| --- | --- | --- | --- | --- | --- | --- |
| `E` | `E → T E'` |  |  | `E → T E'` |  |  |
| `E'` |  | `E' → + T E'` |  |  | `E' → ε` | `E' → ε` |
| `T` | `T → F T'` |  |  | `T → F T'` |  |  |
| `T'` |  | `T' → ε` | `T' → * F T'` |  | `T' → ε` | `T' → ε` |
| `F` | `F → id` |  |  | `F → (E)` |  |  |

Esta tabla no tiene conflictos, así que la gramática es LL(1).




## 3.3.8 Procedimiento de análisis predictivo

El analizador predictivo dirigido por tabla usa:

- una **pila** con terminales y no terminales;
- una **tabla LL(1)**;
- la cadena de entrada terminada en `$`.

### Algoritmo

1. Inicializar la pila con `S$`.
2. Añadir `$` al final de la entrada.
3. Sea `X` la cima de la pila y `a` el siguiente símbolo de entrada.
4. Actuar según el caso:

   1. Si `X = a = $`, aceptar.
   2. Si `X = a ≠ $`, desapilar y avanzar en la entrada.
   3. Si `X` es terminal y `X ≠ a`, error.
   4. Si `X` es no terminal y `T[X,a]` está vacía, error.
   5. Si `X` es no terminal y `T[X,a] = X → X_1X_2...X_n`, desapilar `X` y apilar la parte derecha.

### Aclaración práctica

Para que `X_1` quede en la cima y sea lo siguiente en analizar, la parte derecha se apila en **orden inverso**: primero `X_n`, luego `X_{n-1}`, ..., hasta `X_1`.

### Ejemplo: análisis de `id+id`

Con la gramática del ejemplo anterior:

| Pila | Entrada | Acción |
| --- | --- | --- |
| `$E` | `id+id$` | Aplicar `E → T E'` |
| `$E'T` | `id+id$` | Aplicar `T → F T'` |
| `$E'T'F` | `id+id$` | Aplicar `F → id` |
| `$E'T'id` | `id+id$` | Avanzar |
| `$E'T'` | `+id$` | Aplicar `T' → ε` |
| `$E'` | `+id$` | Aplicar `E' → +TE'` |
| `$E'T+` | `+id$` | Avanzar |
| `$E'T` | `id$` | Aplicar `T → F T'` |
| `$E'T'F` | `id$` | Aplicar `F → id` |
| `$E'T'id` | `id$` | Avanzar |
| `$E'T'` | `$` | Aplicar `T' → ε` |
| `$E'` | `$` | Aplicar `E' → ε` |
| `$` | `$` | Cadena aceptada |


## 3.3.9 Recapitulación sobre LL(1)

Las gramáticas LL(1) permiten análisis de complejidad:

$$
O(n)
$$

No toda gramática es LL(1), pero a veces puede transformarse mediante:

1. Eliminación de la recursividad por la izquierda.
2. Eliminación de la ambigüedad.
3. Factorización por la izquierda.

La eliminación de la ambigüedad no tiene una receta general: suele exigir **rediseñar** la gramática.


## 3.3.10 Gestión de errores en ASD

En un analizador descendente predictivo pueden ocurrir dos tipos de error:

1. En la cima de la pila hay un **terminal** distinto del token actual.
2. En la cima hay un **no terminal** y la celda correspondiente de la tabla está vacía.

El compilador debe informar del error e intentar continuar el análisis.


## 3.3.11 Conjuntos de sincronización

La recuperación por **conjuntos de sincronización** funciona así:

1. Se detecta un error.
2. El analizador entra en modo de recuperación.
3. Va descartando símbolos de entrada hasta encontrar uno perteneciente al conjunto de sincronización.
4. En ese momento puede desapilar el no terminal conflictivo y continuar.

La calidad de la recuperación depende de cómo se elijan esos conjuntos.

### Estrategias habituales

1. Para un no terminal `A`, usar `SIGUIENTES(A)`.
2. Añadir símbolos que inician construcciones de nivel superior.
3. Añadir también `PRIMEROS(A)` cuando interese reanudar al comienzo de esa construcción.
4. Si una producción puede generar `ε`, tomarla por omisión.
5. Si el error es por no emparejar un terminal, se puede suponer que faltaba ese terminal, emitir un mensaje y continuar.

### Idea del ejemplo del tema

Para la gramática de expresiones, el PDF sugiere rellenar ciertas celdas vacías con `sinc` usando `SIGUIENTES`, de forma que el analizador pueda saltar hasta `)`, `$` o el terminal adecuado y continuar.


# 3.4 Análisis Sintáctico Ascendente

El análisis sintáctico ascendente parte de la cadena de entrada y trata de reconstruir la derivación en sentido inverso.

La estrategia general es:

1. Leer la entrada de izquierda a derecha.
2. Detectar fragmentos que coincidan con partes derechas de producciones.
3. **Reducir** esos fragmentos al no terminal correspondiente.
4. Repetir hasta llegar al símbolo inicial o detectar error.

En otras palabras, el árbol sintáctico se construye **de las hojas a la raíz**.


## 3.4.1 Ejemplo básico de reducción

Sea la gramática:

```text
S → aABe
A → Abc | b
B → d
```

La cadena `abbcde` puede analizarse como:

```text
abbcde ⇐ aAbcde ⇐ aAde ⇐ aABe ⇐ S
```


## 3.4.2 Desplazamiento y reducción

Los analizadores ascendentes suelen trabajar con una pila y dos operaciones básicas:

1. **Desplazamiento**: mover el siguiente símbolo de entrada a la pila.
2. **Reducción**: sustituir en la pila una parte derecha reconocida por su no terminal.

### Ejemplo

Con la gramática:

```text
E → E + E
E → E * E
E → (E)
E → id
```

para analizar `id+id*id` aparecen decisiones del tipo:

- reducir `id` a `E`;
- desplazar `+`;
- más adelante, decidir entre reducir `E+E` o desplazar `*`.

Esa duda es exactamente la que resolverán las tablas LR.


## 3.4.3 Gramáticas LR(k)

En el análisis ascendente por desplazamiento-reducción se usan gramáticas **LR(k)**:

1. `L`: lectura de izquierda a derecha.
2. `R`: construcción de una derivación por la derecha en orden inverso.
3. `k`: número de símbolos de anticipación.

Para cada gramática LR(k) con `k > 1` puede construirse una LR(1) equivalente, por lo que normalmente se trabaja con `k = 1`.

Las gramáticas LR(1):

- son no ambiguas;
- describen más lenguajes que las gramáticas LL(1);
- incluyen a las LL(1) como caso particular.

Tipos principales:

1. **SLR(1)**: Simple LR, construcción más sencilla.
2. **LR(1)**: más potentes, pero más costosas.
3. **LALR(1)**: compromiso entre las dos anteriores.

En este tema se estudian las **SLR(1)**.


## 3.4.4 Gramática aumentada

Para construir un analizador LR se usa la **gramática aumentada**:

si la gramática original tiene símbolo inicial `S`, se añade artificialmente:

$$
S' \rightarrow S\$
$$

Cuando el análisis llega a reducir mediante esta producción aumentada, la entrada se acepta.


## 3.4.5 Elementos LR(0)

Un **elemento LR(0)** es una producción con una marca `·` en algún punto de su parte derecha.

La marca separa:

- lo ya reconocido;
- lo que aún falta por reconocer.

Ejemplo, para la producción:

```text
A → B - D
```

los elementos posibles son:

```text
A → ·B-D
A → B·-D
A → B-·D
A → B-D·
```

Su interpretación es:

- `A → ·B-D`: todavía no se reconoció nada.
- `A → B·-D`: ya se reconoció `B`.
- `A → B-·D`: ya se reconoció `B-`.
- `A → B-D·`: ya se reconoció toda la parte derecha; ahora podría reducirse.

Para una producción `A → ε`, el único elemento es:

```text
A → ·
```


## 3.4.6 Función `clausura(I)`

La función `clausura(I)` se aplica a un conjunto de elementos `I` y devuelve un conjunto ampliado que representa todas las situaciones equivalentes en ese punto del análisis.

### Regla de construcción

1. Todo elemento de `I` pertenece a `clausura(I)`.
2. Si en `clausura(I)` aparece un elemento de la forma:

```text
A → α·Bβ
```

y existe una producción:

```text
B → γ
```

entonces se añade:

```text
B → ·γ
```

Se repite hasta que no puedan añadirse más elementos.

### Intuición

Si aparece `A → α·Bβ`, significa que ya se reconoció una cadena derivable de `α` y que ahora se espera algo derivable de `Bβ`. Por tanto, hay que incorporar todas las maneras posibles de empezar a derivar `B`.

### Ejemplo

Para la gramática:

```text
E' → E$
E  → E+T | T
T  → T*F | F
F  → (E) | id
```

si partimos de:

```text
I = { E' → ·E$ }
```

la clausura se construye por pasos:

1. Añadimos `E → ·E+T` y `E → ·T`.
2. Como aparece `·T`, añadimos `T → ·T*F` y `T → ·F`.
3. Como aparece `·F`, añadimos `F → ·(E)` y `F → ·id`.

Así:

```text
I0 = clausura(I) = {
  E' → ·E$,
  E  → ·E+T,
  E  → ·T,
  T  → ·T*F,
  T  → ·F,
  F  → ·(E),
  F  → ·id
}
```


## 3.4.7 Función `Ir_a(I,X)`

La función `Ir_a(I,X)` se aplica a:

- un conjunto de elementos `I`;
- un símbolo gramatical `X`.

Devuelve la clausura del conjunto de elementos que resulta de avanzar el punto sobre `X`.

Formalmente:

si en `I` aparece:

```text
A → α·Xβ
```

entonces en `Ir_a(I,X)` aparecerá:

```text
A → αX·β
```

y después se aplica clausura.

### Intuición

`Ir_a(I,X)` representa el estado al que se llega cuando, estando en `I`, se reconoce el símbolo `X`.

### Ejemplo

Con `I0` anterior:

```text
I1 = Ir_a(I0,E) = {
  E' → E·$,
  E  → E·+T
}
```

```text
I2 = Ir_a(I0,T) = {
  E → T·,
  T → T·*F
}
```

```text
I3 = Ir_a(I0,F) = {
  T → F·
}
```

```text
I4 = Ir_a(I0,'(') = {
  F → (·E),
  E → ·E+T,
  E → ·T,
  T → ·T*F,
  T → ·F,
  F → ·(E),
  F → ·id
}
```

```text
I5 = Ir_a(I0,id) = {
  F → id·
}
```


## 3.4.8 Colección canónica LR(0)

La **colección canónica LR(0)** es el conjunto de todos los estados posibles del autómata LR, es decir, de todos los conjuntos distintos de elementos que se obtienen aplicando `clausura` e `Ir_a`.

### Procedimiento

1. Construir la gramática aumentada.
2. Tomar:

```text
I0 = clausura(S' → ·S$)
```

3. Calcular `Ir_a(I,X)` para todos los símbolos posibles `X`.
4. Repetir el proceso con los nuevos conjuntos hasta que no aparezcan estados nuevos.

### Ejemplo completo

Continuando el ejemplo anterior, además de `I0` a `I5` se obtienen:

```text
I6 = Ir_a(I1,+) = {
  E → E+·T,
  T → ·T*F,
  T → ·F,
  F → ·(E),
  F → ·id
}
```

```text
I7 = Ir_a(I2,*) = {
  T → T*·F,
  F → ·(E),
  F → ·id
}
```

```text
I8 = Ir_a(I4,E) = {
  F → (E·),
  E → E·+T
}
```

```text
I9 = Ir_a(I6,T) = {
  E → E+T·,
  T → T·*F
}
```

```text
I10 = Ir_a(I7,F) = {
  T → T*F·
}
```

```text
I11 = Ir_a(I8,)) = {
  F → (E)·
}
```

Cada `I_j` se interpreta como un estado del autómata LR.

### Tabla de transiciones (`Ir_a`)

Para el ejemplo:

| Estado | `id` | `+` | `*` | `(` | `)` | `$` | `E` | `T` | `F` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `0` | `5` |  |  | `4` |  |  | `1` | `2` | `3` |
| `1` |  | `6` |  |  |  |  |  |  |  |
| `2` |  |  | `7` |  |  |  |  |  |  |
| `3` |  |  |  |  |  |  |  |  |  |
| `4` | `5` |  |  | `4` |  |  | `8` | `2` | `3` |
| `5` |  |  |  |  |  |  |  |  |  |
| `6` | `5` |  |  | `4` |  |  |  | `9` | `3` |
| `7` | `5` |  |  | `4` |  |  |  |  | `10` |
| `8` |  | `6` |  |  | `11` |  |  |  |  |
| `9` |  |  | `7` |  |  |  |  |  |  |
| `10` |  |  |  |  |  |  |  |  |  |
| `11` |  |  |  |  |  |  |  |  |  |


## 3.4.9 Tabla de acciones SLR(1)

La gran pregunta es: ¿cuándo desplazar y cuándo reducir?

La respuesta se codifica en una **tabla de acciones**.

### Procedimiento de construcción

1. Construir la colección canónica LR(0): `I0, I1, ..., In`.
2. Si en `Ij` hay un elemento:

```text
A → α·aβ
```

con `a` terminal e `Ir_a(Ij,a)=Ik`, entonces:

```text
accion[j,a] = desplazar e ir a k
```

3. Si en `Ij` hay un elemento:

```text
A → α·
```

entonces para todo `s ∈ SIGUIENTES(A)`:

```text
accion[j,s] = reducir A → α
```

4. Si en `Ij` está:

```text
S' → S·$
```

entonces:

```text
accion[j,$] = aceptar
```

5. Las celdas vacías indican error.

### Ejemplo

Con la numeración:

```text
(1) E → E + T
(2) E → T
(3) T → T * F
(4) T → F
(5) F → (E)
(6) F → id
```

la tabla SLR(1) es:

| Estado | `id` | `+` | `*` | `(` | `)` | `$` | `E` | `T` | `F` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `0` | `d5` |  |  | `d4` |  |  | `1` | `2` | `3` |
| `1` |  | `d6` |  |  |  | `OK` |  |  |  |
| `2` |  | `r2` | `d7` |  | `r2` | `r2` |  |  |  |
| `3` |  | `r4` | `r4` |  | `r4` | `r4` |  |  |  |
| `4` | `d5` |  |  | `d4` |  |  | `8` | `2` | `3` |
| `5` |  | `r6` | `r6` |  | `r6` | `r6` |  |  |  |
| `6` | `d5` |  |  | `d4` |  |  |  | `9` | `3` |
| `7` | `d5` |  |  | `d4` |  |  |  |  | `10` |
| `8` |  | `d6` |  |  | `d11` |  |  |  |  |
| `9` |  | `r1` | `d7` |  | `r1` | `r1` |  |  |  |
| `10` |  | `r3` | `r3` |  | `r3` | `r3` |  |  |  |
| `11` |  | `r5` | `r5` |  | `r5` | `r5` |  |  |  |

Aquí:

- `dn` significa **desplazar** e ir al estado `n`;
- `rn` significa **reducir** por la regla `n`;
- `OK` significa **aceptar**.

### Interpretación del estado 9

El conjunto:

```text
I9 = {
  E → E + T·,
  T → T·*F
}
```

mezcla dos ideas:

1. `E → E + T·` permite reducir por la regla `(1)` con `SIGUIENTES(E) = {+, ), $}`.
2. `T → T·*F` obliga a desplazar `*` e ir al estado `7`.


## 3.4.10 Procedimiento de análisis SLR(1)

El analizador usa:

- una pila de **estados**;
- la tabla `accion`;
- la tabla `Ir_a` o `goto`;
- la entrada.

### Algoritmo

1. Inicializar la pila con el estado `0`.
2. Sea `i` el estado en la cima y `a` el símbolo actual de entrada.
3. Consultar `accion[i,a]`.

   1. Si es `dn`, desplazar la entrada, ir al estado `n` y apilarlo.
   2. Si es `rn`, reducir por la regla `A → β`.
      Si `|β| = m`, desapilar `m` estados. Si ahora `h` es la nueva cima, apilar `Ir_a(h,A)`.
   3. Si es `aceptar`, terminar con éxito.
   4. Si está vacía, error.

### Ejemplo: análisis de `id*id+id$`

| Estados | Símbolos reconocidos | Entrada | Acción |
| --- | --- | --- | --- |
| `0` |  | `id*id+id$` | Desplazar e ir a `5` |
| `05` | `id` | `*id+id$` | Reducir con `(6) F → id`; ir a `Ir_a(0,F)=3` |
| `03` | `F` | `*id+id$` | Reducir con `(4) T → F`; ir a `Ir_a(0,T)=2` |
| `02` | `T` | `*id+id$` | Desplazar e ir a `7` |
| `027` | `T*` | `id+id$` | Desplazar e ir a `5` |
| `0275` | `T*id` | `+id$` | Reducir con `(6) F → id`; ir a `Ir_a(7,F)=10` |
| `02710` | `T*F` | `+id$` | Reducir con `(3) T → T*F`; ir a `Ir_a(0,T)=2` |
| `02` | `T` | `+id$` | Reducir con `(2) E → T`; ir a `Ir_a(0,E)=1` |
| `01` | `E` | `+id$` | Desplazar e ir a `6` |
| `016` | `E+` | `id$` | Desplazar e ir a `5` |
| `0165` | `E+id` | `$` | Reducir con `(6) F → id`; ir a `Ir_a(6,F)=3` |
| `0163` | `E+F` | `$` | Reducir con `(4) T → F`; ir a `Ir_a(6,T)=9` |
| `0169` | `E+T` | `$` | Reducir con `(1) E → E+T`; ir a `Ir_a(0,E)=1` |
| `01` | `E` | `$` | Aceptar |


## 3.4.11 Conflictos en tablas SLR(1)

Una gramática es SLR(1) si en cada celda de la tabla aparece **como máximo una acción**.

Si esto no ocurre, hay conflicto.

### Tipos de conflicto

1. **Desplazamiento-reducción**
   Aparecen simultáneamente una acción de desplazar y otra de reducir.

2. **Reducción-reducción**
   Aparecen simultáneamente dos posibles reducciones.

En la práctica:

- ante un conflicto desplazamiento-reducción, algunos generadores eligen por defecto desplazar;
- ante un conflicto reducción-reducción, lo razonable suele ser rediseñar la gramática.


### Ejercicio 10

Sea la gramática:

```bnf
<sentencia> ::= = <valorizq> [ <corchete> ]
<valorizq> ::= id1 | id2
<corchete> ::= <corchete> + <valorizq> | <valorizq>
```

Se pide:

1. Obtener la colección canónica de conjuntos de elementos LR(0).
2. Generar la tabla SLR(1). ¿Es una gramática SLR(1)?
3. Analizar la cadena `=id1[id1+id2]`.

### Solución ejercicio 10

Tomamos la siguiente notación:

```text
S  = <sentencia>
V  = <valorizq>
C  = <corchete>
```

Gramática aumentada:

```text
S' → S$
(1) S → = V [ C ]
(2) V → id1
(3) V → id2
(4) C → C + V
(5) C → V
```

#### a) Colección canónica de elementos LR(0)

```text
I0 = clausura({S' → ·S$}) = {
  S' → ·S$,
  S  → ·=V[C]
}
```

```text
I1 = Ir_a(I0,S) = {
  S' → S·$
}
```

```text
I2 = Ir_a(I0,=) = {
  S → =·V[C],
  V → ·id1,
  V → ·id2
}
```

```text
I3 = Ir_a(I2,V) = {
  S → =V·[C]
}
```

```text
I4 = Ir_a(I2,id1) = {
  V → id1·
}
```

```text
I5 = Ir_a(I2,id2) = {
  V → id2·
}
```

```text
I6 = Ir_a(I3,[) = {
  S → =V[·C],
  C → ·C+V,
  C → ·V,
  V → ·id1,
  V → ·id2
}
```

```text
I7 = Ir_a(I6,C) = {
  S → =V[C·],
  C → C·+V
}
```

```text
I8 = Ir_a(I6,V) = {
  C → V·
}
```

```text
I9 = Ir_a(I7,]) = {
  S → =V[C]·
}
```

```text
I10 = Ir_a(I7,+) = {
  C → C+·V,
  V → ·id1,
  V → ·id2
}
```

```text
I11 = Ir_a(I10,V) = {
  C → C+V·
}
```

Transiciones:

```text
I0 --S--> I1
I0 --=--> I2

I2 --V--> I3
I2 --id1--> I4
I2 --id2--> I5

I3 --[--> I6

I6 --C--> I7
I6 --V--> I8
I6 --id1--> I4
I6 --id2--> I5

I7 --]--> I9
I7 --+--> I10

I10 --V--> I11
I10 --id1--> I4
I10 --id2--> I5
```

#### Conjuntos SIGUIENTES

Son necesarios para construir la tabla SLR(1):

```text
SIGUIENTES(S) = {$}
SIGUIENTES(C) = {+, ]}
SIGUIENTES(V) = {[, +, ]}
```

Justificación breve:

- `S` es el símbolo inicial.
- En `S → =V[C]`, detrás de `V` aparece `[` y detrás de `C` aparece `]`.
- En `C → C+V`, detrás del primer `C` aparece `+` y `V` queda al final, así que hereda `SIGUIENTES(C)`.
- En `C → V`, `V` hereda `SIGUIENTES(C)`.

#### b) Tabla SLR(1)

| Estado | `=` | `id1` | `id2` | `[` | `]` | `+` | `$` | `S` | `V` | `C` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `0` | `d2` |  |  |  |  |  |  | `1` |  |  |
| `1` |  |  |  |  |  |  | `OK` |  |  |  |
| `2` |  | `d4` | `d5` |  |  |  |  |  | `3` |  |
| `3` |  |  |  | `d6` |  |  |  |  |  |  |
| `4` |  |  |  | `r2` | `r2` | `r2` |  |  |  |  |
| `5` |  |  |  | `r3` | `r3` | `r3` |  |  |  |  |
| `6` |  | `d4` | `d5` |  |  |  |  |  | `8` | `7` |
| `7` |  |  |  |  | `d9` | `d10` |  |  |  |  |
| `8` |  |  |  |  | `r5` | `r5` |  |  |  |  |
| `9` |  |  |  |  |  |  | `r1` |  |  |  |
| `10` |  | `d4` | `d5` |  |  |  |  |  | `11` |  |
| `11` |  |  |  |  | `r4` | `r4` |  |  |  |  |

Conclusión: **sí es una gramática SLR(1)**, porque no aparece ningún conflicto desplazamiento-reducción ni reducción-reducción.

#### c) Análisis de la cadena `=id1[id1+id2]`

Entrada:

```text
= id1 [ id1 + id2 ] $
```

Usando la tabla anterior:

| Pila de estados | Entrada | Acción |
| --- | --- | --- |
| `0` | `=id1[id1+id2]$` | `d2` |
| `02` | `id1[id1+id2]$` | `d4` |
| `024` | `[id1+id2]$` | `r2: V → id1`, ir a `Ir_a(2,V)=3` |
| `023` | `[id1+id2]$` | `d6` |
| `0236` | `id1+id2]$` | `d4` |
| `02364` | `+id2]$` | `r2: V → id1`, ir a `Ir_a(6,V)=8` |
| `02368` | `+id2]$` | `r5: C → V`, ir a `Ir_a(6,C)=7` |
| `02367` | `+id2]$` | `d10` |
| `0236710` | `id2]$` | `d5` |
| `02367105` | `]$` | `r3: V → id2`, ir a `Ir_a(10,V)=11` |
| `023671011` | `]$` | `r4: C → C + V`, ir a `Ir_a(6,C)=7` |
| `02367` | `]$` | `d9` |
| `023679` | `$` | `r1: S → =V[C]`, ir a `Ir_a(0,S)=1` |
| `01` | `$` | `OK` |

La cadena queda **aceptada**.


## 3.4.12 Gestión de errores en analizadores SLR(1)

En un analizador SLR(1), hay error cuando desde el estado actual de la cima de la pila no existe ninguna acción definida para el símbolo actual de entrada.

En ese instante:

- la pila representa el **contexto a la izquierda** del error;
- la parte no consumida de la entrada representa el **contexto a la derecha**.

La recuperación intenta modificar la pila y/o la entrada hasta reenganchar el análisis.

### Métodos mencionados en el tema

1. **Métodos heurísticos**
   Consisten en programar rutinas específicas para determinadas celdas de error.

2. **Método de análisis de transiciones**
   Se baja por la pila hasta encontrar un estado `d` tal que exista `Ir_a(d,A)` para algún no terminal `A`. Después se descartan símbolos de entrada hasta hallar uno que pueda seguir a `A` según la gramática. Entonces se apila `Ir_a(d,A)` y se continúa.


# 3.5 Bibliografía

1. A. V. Aho, R. Sethi, J. D. Ullman. *Compiladores. Principios, técnicas y herramientas*. Addison Wesley, 1990.
2. M. Alfonseca, M. de la Cruz, A. Ortega, E. Pulido. *Compiladores e intérpretes: teoría y práctica*. Pearson Educación, 2006.