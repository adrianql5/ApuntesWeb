Copyright (c) 2025 Adrián Quiroga Linares Lectura y referencia permitidas; reutilización y plagio prohibidos 

**Concepto Intuitivo:** Imagina un Autómata Finito (AFN) que lleva una mochila llena de platos.

- Puede leer la entrada.
- Puede **mirar** el plato de arriba de la pila.
- Dependiendo de lo que ve y lee, puede **quitar platos (pop)** o **poner platos nuevos (push)**.

Esta "mochila" (memoria LIFO) le permite contar y comparar, algo que un autómata finito simple no puede hacer (ej: saber si hay el mismo número de 'a' que de 'b').

# 5.1 Definición
Un autómata con pila (AP) es un AFN con transiciones Ɛ y con una pila en la que se puede almacenar una cadena de símbolos de pila. El AP puede recordar una cantidad infinita de información. Reconoce Lenguajes Independientes del Contexto.

Un AP se define matemáticamente así:
$$P = (Q, Σ, Γ, δ, q₀, Z₀, F)$$

Diferencias clave con el autómata finito:
1. **$\Gamma$ (Alfabeto de Pila):** Símbolos que podemos guardar en la memoria. Puede ser diferente al de entrada ($\Sigma$).
2. **$Z_0$ (Fondo de Pila):** El símbolo que está en la pila antes de empezar nada. Nos avisa de que "la pila está vacía".
3. $\delta$ (Función de Transición): La "ley" del movimiento.
$$\delta : Q \times (\Sigma \cup \{\varepsilon\}) \times \Gamma \to P(Q \times \Gamma^*)$$
    - **Input:** Estado actual + Símbolo entrada (o $\varepsilon$) + **Símbolo en la CIMA de la pila**.
    - **Output:** Nuevo estado + **Cadena para reemplazar la cima**.


# 5.2 Mecánica de Transición (Cómo leer los arcos)
Esta es la parte vital para los ejercicios prácticos. En los diagramas verás arcos con la etiqueta:
$$a, \ A \to \gamma$$

Esto se lee: **"Leo, Saco $\to$ Meto"**.
1. **Leo ($a$):** Leo el símbolo 'a' de la cinta de entrada.
2. **Saco ($A$):** Compruebo si $A$ está en la **cima** de la pila y lo extraigo (pop).
3. **Meto ($\gamma$):** Escribo la cadena $\gamma$ en la cima de la pila (push).

**Casos Prácticos de "Meto" ($\gamma$):**
- **Apilar (Push):** $a, Z_0 \to AZ_0$
    - _Explicación:_ Saco $Z_0$ y meto $A$ seguido de $Z_0$. Efecto neto: $A$ queda encima de $Z_0$.

- **Desapilar (Pop):** $a, A \to \varepsilon$
    - _Explicación:_ Saco $A$ y meto... nada ($\varepsilon$). Efecto neto: Borro $A$.

- **Cambiar (Swap):** $a, A \to B$
    - _Explicación:_ Saco $A$ y meto $B$.

- **No tocar (Peep):** $a, A \to A$
    - _Explicación:_ Saco $A$ y vuelvo a meter $A$. La pila se queda igual.


# 5.3 Tipos de Aceptación
Un AP puede decir "OK" de dos formas. En los ejercicios te especificarán cuál usar.

## Aceptación por Estado Final ($F$)
- **Condición:** La entrada se ha terminado ($w = \varepsilon$) **Y** el autómata está en un estado $q \in F$.
- **La pila:** No importa lo que tenga dentro (puede estar llena de basura).
- **Uso:** Es lo más parecido a los autómatas normales.

## Aceptación por Pila Vacía ($\emptyset$)
- **Condición:** La entrada se ha terminado ($w = \varepsilon$) **Y** la pila está totalmente vacía (ni siquiera queda $Z_0$).
- **El estado:** No importa en qué estado termine.
- **Uso:** Muy común en análisis sintáctico (compiladores).

> **Conversión:** Todo lenguaje aceptado por pila vacía puede ser aceptado por estado final y viceversa. Son equivalentes en poder.


# 5.4 Protips
##  Patrón 1: "El Acumulador" (Sumar cosas)
**Cuándo usarlo:** Ecuaciones tipo $k > i + j$ o $k = i + j$.
**Lógica:** Tienes dos variables que "suman" y una que "resta".

- **Fase 1 (Entrada 'a'):** Apilas 'a'.
- **Fase 2 (Entrada 'b'):** Sigues apilando (pero ojo, como tienes la restricción, apila 'b' o sigue apilando 'a' si te dejan. Aquí dice "alfabeto de pila = alfabeto entrada", así que apila 'b').
- **Fase 3 (Entrada 'c'):** Desapilas todo. Primero las 'b' y luego las 'a'.
- **Resultado:** Si al acabar de leer 'c' la pila se vacía, eran iguales. Si sobra pila, $i+j$ era mayor. Si falta pila, $k$ era mayor.

## Patrón 2: "La Deuda" (El orden da igual / Sopa de letras)
**Cuándo usarlo:** Ejercicios donde el orden es libre ($N(a) = N(b)$ entrando en cualquier orden) o ecuaciones complejas ($i+k = j+m$).

**Lógica:** La pila representa el Balance.
- Define dos bandos: **Positivos** (los que suman) y **Negativos** (los que restan).
- **Regla de Oro:**
    - Si leo un símbolo y la pila tiene al del **bando contrario**: **DESAPILO** (se cancelan, como materia y antimateria).
    - Si leo un símbolo y la pila tiene al de **mi bando** o está vacía ($Z_0$): **APILO** (aumento mi deuda).

## Patrón 3: "El 2x1" (Proporciones)
**Cuándo usarlo:** $N(a) = 2N(b)$ o $3k = i$.
**Lógica:**
- Opción A (Apilar doble): Por cada 'a' que lees, metes **dos** 'a' en la pila. Luego las 'b' borran de una en una.
- Opción B (Desapilar doble): Metes las 'a' normales. Cuando llegan las 'b', cada 'b' elimina **dos** 'a' de la pila (necesitas un estado intermedio auxiliar para hacer el "doble pop").
- Hay que tener una forma de marcar números negativos también

## Patrón 4: "El Multiverso" (La Unión / Ó)
**Cuándo usarlo:** "Cadenas que cumplen $X$ ó cumplen $Y$".
**Lógica:** El estado inicial ($q_0$) no lee nada. Lanza dos transiciones $\lambda$ (o $\epsilon$) hacia dos caminos distintos.
- Camino 1: Resuelve el problema $X$.
- Camino 2: Resuelve el problema $Y$.
- El autómata "adivina" qué camino tomar.


## Patrón 5: "Álgebra Simple" (Reorganizar ecuaciones)
**Cuándo usarlo:** Ecuaciones con restas como $k = i - j$ o $k - i < j$.
**Truco:** Los autómatas odian restar, pero aman sumar. Pasa todo a positivo.
- Si te dan $k = i - j$ $\rightarrow$ Transfórmalo en **$i = k + j$**.
    - Significa: Las 'a' (i) deben ser iguales a la suma de 'b' (j) + 'c' (k).
    - Estrategia: Apila las 'a'. Las 'b' borran 'a'. Las 'c' borran las 'a' que queden.
