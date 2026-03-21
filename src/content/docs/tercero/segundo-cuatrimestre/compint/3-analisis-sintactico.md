---
title: "Análisis Sintáctico"
---

# 3.1 Nociones Generales
El **análisis sintáctico** es la segunda fase del proceso de compilación. Su función es comprobar que la secuencia de componentes léxicos producida por el analizador léxico tiene una **estructura válida** según la gramática del lenguaje. El analizador sintáctico construye además una representación interna en forma de **árbol sintáctico**.

El flujo general es:
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260219111312.png)

La idea clave es esta:
- el **léxico** reconoce palabras o tokens;    
- el **sintáctico** comprueba cómo se combinan esos tokens.

## 3.1.1 Gramáticas Independientes del Contexto
Una gramática independiente del contexto se define como una 4-tupla::
$$G=(NT,T,P,S)$$

- $NT$ (o $V$): Variables no terminales (Mayúsculas, ej: $A, B$).
- $T$: Terminales (minúsculas, ej: $a,b$).
- $P$: Producciones (Reglas $Izquierda→Derecha$).
- $S$: Axioma inicial.

La máquina teórica adecuada para reconocer lenguajes independientes del contexto es el **autómata a pila**. Además, en este tema se introduce el símbolo **`$`** para indicar fin de cadena.

## 3.1.2 Tipos de Analizadores Sintácticos

### Analizadores descendentes
Construyen el árbol **de arriba hacia abajo**, desde la raíz hasta las hojas. La idea es:
- empezar en el símbolo inicial.
- ir sustituyendo no terminales por las partes derechas de las producciones.

### Analizadores ascendentes
Construyen el árbol **de abajo hacia arriba**, desde las hojas hasta la raíz. La idea es:
- partir de la cadena de entrada;
- ir reconociendo fragmentos que coinciden con partes derechas;
- reducirlos al no terminal correspondiente.

Con la gramática:
$$id→letra∣id letra∣id digito$$
$$letra→a∣b∣⋯∣z$$
$$digito→0∣1∣⋯∣9$$
la cadena `st2` puede analizarse:
- **descendentemente**, generando la cadena desde `id`;
- **ascendentemente**, reduciendo `st2` hasta llegar a `id`.

Descendente:
```
id
⇒ id digito
⇒ id letra digito
⇒ letra letra digito
⇒ s t 2
``` 

![](Pasted image 20260219112200.png|310)


Descendente:
```
st2
⇐ letra t2
⇐ id t2
⇐ id letra 2
⇐ id digito
⇐ id
```

![](Pasted image 20260219112656.png|313)


## 3.1.3 Notación BNF y BNF extendida
La **BNF** y la **EBNF** son notaciones para escribir gramáticas de manera compacta y legible. **Metasímbolos habituales:**
- `::=` define una regla.
- `|` expresa alternativas.
- `<>` marca no terminales.
- `[]` indica opcionalidad.
- `{}` indica repetición de cero o más veces.
- `" "` distingue símbolos terminales literales.

```
<condicional_simple> ::= if <condicion> then <sentencia>
<op_aritmetica_entera> ::= + | - | * | div | mod
<id> ::= <letra> { <letra> | <digito> }
```


## 3.1.4 BNF visual
1. Los símbolos terminales se marcan en negrita. 
2. Se eliminan los símbolos `<>` de los no terminales. 
3. Se utiliza el símbolo `→` en lugar de `::=`

```
sentencia_if → if expresion then sentencia [ else sentencia ] endif;
``` 


# 3.2 Diseño de una Gramática
Al diseñar una gramática hay que cuidar cuatro ideas fundamentales: **recursividad, ambigüedad, asociatividad y precedencia**.


## 3.2.1 Recursividad
La recursividad permite describir un número infinito de construcciones con un número finito de reglas. Una gramática es recursiva si, al reescribir un no terminal, este vuelve a aparecer en alguna derivación:
$$A⇒^+αAβ$$
Los lenguajes de programación permiten crear programas arbitrariamente largos. Sin recursividad habría que escribir infinitas reglas.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260219114725.png)

Esto permite bloques con una o varias sentencias.


## 3.2.2 Ambigüedad
Una gramática es **ambigua** si existe al menos una cadena que puede obtenerse mediante **dos árboles de derivación distintos**.

**¿Por qué es un problema?** Si una misma sentencia admite dos árboles sintácticos, el compilador puede interpretarla de dos formas distintas, y eso puede llevar a generar código diferente.

```
<expresion> ::= <expresion> + <expresion>
              | <expresion> * <expresion>
              | (<expresion>)
              | - <expresion>
              | id
```

Con esta gramática, `id+id*id` puede derivarse de dos maneras distintas. Una interpretación agrupa antes la suma y otra antes la multiplicación.


![](Pasted image 20260219115009.png|673x402)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260219115040.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260219115055.png)


## 3.2.3 Factorización por la izquierda
Si dos producciones de un mismo no terminal empiezan igual, un analizador descendente no sabe qué regla elegir al principio.

La solución es **retrasar la decisión**. La **factorización por la izquierda** consiste en reescribir las reglas para extraer el factor común. Esto permite que el analizador reconozca primero la parte idéntica y posponga la elección de la variante hasta haber leído lo suficiente.

Antes:
```
<sentencia> ::= if <expresion> then <sentencia>
              | if <expresion> then <sentencia> else <sentencia>
```

Después:
```
<sentencia> ::= if <expresion> then <sentencia> <else>
<else> ::= else <sentencia> | ε
```

Si tenemos:

$$A→αβ_1​∣αβ_2​∣⋯∣αβn_​∣γ$$

se transforma en:
$$A→αA′∣γ$$
$$A′→β_1​∣β_2​∣⋯∣β_n​$$
rve para facilitar el análisis descendente predictivo y evitar indecisiones tempranas.


## 3.2.4 Asociatividad
La asociatividad indica cómo se agrupan operaciones repetidas del mismo nivel.

### Asociatividad por la derecha
Se evalúa de derecha a izquierda.
```
a = b = c ≡ a = (b = c)
```

### Asociatividad por la izquierda
Se evalúa de izquierda a derecha.
```
a + b + c ≡ (a + b) + c
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260222171115.png)

Un operador asociativo por la **derecha** se modela con **recursividad por la derecha**:
```
<asignacion> ::= id = <asignacion> | id
``` 

Un operador asociativo por la **izquierda** se modela con **recursividad por la izquierda**:
```
<expresion> ::= <expresion> + id | id
```

## 3.2.5 Precedencia
La precedencia fija qué operadores se aplican antes que otros.

Se puede incorporar la precedencia utilizando:
- una variable sintáctica por nivel de precedencia;
- o una producción por operador.

Además, un operador tiene **menor precedencia** cuanto más cerca esté su regla de la regla inicial.

**Ejemplo:** Deseamos una gramática asociativa por la izquierda, con la suma y la resta con precedencia 1, la multiplicación y la división con precedencia 2, la potenciación con precedencia 3 asociativa por la derecha, y el paréntesis con precedencia máxima.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260222171255.png)


# 3.3 Análisis sintáctico descendente
El análisis sintáctico descendente intenta construir la derivación desde el símbolo inicial hacia la entrada.

**Idea general:**
- Se parte del axioma inicial.
- Se intenta expandir no terminales hasta obtener la cadena de entrada.
- Se compara lo generado con los tokens reales.

En su versión más simple puede haber:
- **avance**, cuando una decisión es correcta;
- **retroceso**, cuando se toma una producción errónea y hay que volver atrás.


Para gestionar este proceso utilizamos una pila, donde almacenamos los símbolos de cada sustitución. Intentaremos emparejar el símbolo que hay en la cima de la pila con la entrada actual.
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260222173839.png)

**Problemas del retroceso:**
Los métodos con backtracking no suelen ser recomendables porque:
- son lentos;
- pueden probar muchas posibilidades;
- dificultan detectar el punto exacto del error;
- complican la generación de código durante el análisis.

Por eso interesan los analizadores **predictivos**, que no retroceden.


## 3.3.1 Recursividad por la izquierda
La recursividad por la izquierda es muy peligrosa en análisis descendente porque puede producir un bucle infinito.

Si una gramática tiene:
$$A→Aα1​∣Aα_2​∣⋯∣Aα_n​∣β_1​∣β_2​∣⋯∣β_m​$$
se transforma en:
$$A→β_1​A′∣β_2​A′∣⋯∣βm_​A′$$
$$A′→α_1​A′∣α_2​A′∣⋯∣α_n​A′∣ε$$



![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260222174038.png)


![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260222174248.png)

El método anterior elimina la recursividad inmediata, esto es, en la misma derivación. Si la recursividad aparece en derivaciones posteriores debemos encontrar el elemento conflictivo y sustituirlo por su definición.

![](image.png|651|676x111)
Existe recursividad por la izquierda en la aplicación de las reglas de sustitución$S → Aa$ y $A → Sd$. Sustituimos $Sd → Aad | bd$. Y aplicamos el método anterior:
![](image-1.png|676x82)



## 3.3.2 Analizador descendente predictivo
Un analizador predictivo elige la producción correcta **sin retroceder**, mirando el token actual de entrada.

Cuando solo necesita mirar **un token por adelantado**, hablamos de gramáticas **LL(1)**.
- **L**: lectura de izquierda a derecha.
- **L**: derivación más a la izquierda.
- **1**: un símbolo de anticipación.

**Requisitos típicos de una gramática LL(1):**
- no tener recursividad por la izquierda;
- no tener alternativas conflictivas;
- permitir decidir la producción con un solo token de entrada.

**Utilidad:**
Las gramáticas LL(1) son muy útiles porque permiten analizadores:
- simples;
- rápidos;
- sin backtracking;
- fáciles de implementar a mano.


![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-2.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-3.png)

## 3.3.3 Conjuntos de predicción
Estos conjuntos permiten decidir qué producción usar en un analizador predictivo.

### Conjunto PRIMEROS
`PRIMEROS(X)` contiene los terminales con los que puede **empezar** una cadena derivada de `X`.

Si:
```
F → id | (E)
```

entonces:
```
PRIMEROS(F) = { id, ( }
```
porque cualquier derivación de `F` empieza por `id` o por `(`.

**Reglas Básicas:**
- Si `X` es terminal, entonces `PRIMEROS(X)=X`.
- Si `X → ε`, entonces `ε ∈ PRIMEROS(X)`.
- Si `X → Y1Y2...Yk`, se añaden los terminales que puedan empezar por `Y1`; si `Y1` puede derivar a `ε`, se mira `Y2`, etc.
- Si todos pueden derivar a `ε`, entonces `ε ∈ PRIMEROS(X)`.

**Para una cadena:**
Para `X1X2...Xn`:
- se añaden los terminales de `PRIMEROS(X1)` salvo `ε`;
- si `ε ∈ PRIMEROS(X1)`, se añaden los de `PRIMEROS(X2)`, etc.;
- si todos pueden dar `ε`, entonces la cadena también tiene `ε` en PRIMEROS.


**Ejemplo:**
```
<expresion> ::= <termino> <expresion’>
<expresion’> ::= + <termino> <expresion’> | ε
<termino> ::= <factor> <termino’>
<termino’> ::= * <factor> <termino’> | ε
<factor> ::= (<expresion>) | id
```
se tiene:
- `PRIMEROS(<expresion>) = PRIMEROS(<termino>) = PRIMEROS(<factor>) = {(, id}`
- `PRIMEROS(<termino>) = {(, id}`
- `PRIMEROS(<factor>) = {(, id}`
- `PRIMEROS(<expresion’>) = {+, ε}`
- `PRIMEROS(<termino’>) = {*, ε}`




### Conjunto Siguientes
`SIGUIENTES(A)` es el conjunto de terminales que pueden aparecer **inmediatamente a la derecha** de un no terminal `A` en alguna derivación. Si `A` puede quedar al final, entonces `$` pertenece a su conjunto SIGUIENTES.

**Reglas básicas**
- Si `A` es el símbolo inicial, entonces `$ ∈ SIGUIENTES(A)`.
- Si hay una producción `B → αAβ`, se añade `PRIMEROS(β) - {ε}` a `SIGUIENTES(A)`.
- Si `β` puede derivar a `ε`, entonces se añade `SIGUIENTES(B)` a `SIGUIENTES(A)`.
- Si `A` aparece al final en `B → αA`, se añade `SIGUIENTES(B)` a `SIGUIENTES(A)`.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-6.png)
Para la gramática anterior:
- `SIGUIENTES(<expresion>) = {), $}`
- `SIGUIENTES(<expresion’>) = {), $}`
- `SIGUIENTES(<termino>) = {+, ), $}`
- `SIGUIENTES(<termino’>) = {+, ), $}`
- `SIGUIENTES(<factor>) = {+, *, ), $}`


### 3.3.4 Tabla de análisis sintáctico
Con `PRIMEROS` y `SIGUIENTES` se construye una tabla `T[A,a]` que indica qué producción aplicar según:
- el no terminal que está en la pila;
- el token actual de la entrada.

Para cada producción `A → α`:
- si `a ∈ PRIMEROS(α)`, se mete `A → α` en `T[A,a]`;
- si `ε ∈ PRIMEROS(α)`, entonces para cada `b ∈ SIGUIENTES(A)` se mete `A → α` en `T[A,b]`.


![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/image-7.png)

- si `a ∈ PRIMEROS(α)`, se mete `A → α` en `T[A,a]`;