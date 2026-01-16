---
title: "Lenguajes Regulares"
---

Copyright (c) 2025 Adrián Quiroga Linares Lectura y referencia permitidas; reutilización y plagio prohibidos

Las **Expresiones Regulares (ER)** son una forma declarativa de describir lenguajes. Si el Autómata es la máquina que valida, la ER es la "fórmula" que genera las cadenas.

Aquí tienes la versión mejorada y ampliada. He integrado los datos teóricos (construcción inductiva, propiedades distributivas y variantes de clausura) pero manteniendo el enfoque pragmático para que te sirva de "chuleta" de estudio.

# 3.1 Operadores de las ER (Sintaxis y Jerarquía)
Para "leer" una Expresión Regular (ER) sin equivocarte, debes respetar la jerarquía.
**Los 3 Operadores Fundamentales:**
1. **Cierre de Kleene / Estrella ($*$):** Repetición de 0 a $\infty$ veces.
    - _Definición formal:_ $$L^* = \bigcup_{i=0}^{\infty} L^i = L^0 \cup L^1 \cup L^2 \dots$$
    - _En cristiano:_ $\{\varepsilon, L, LL, LLL, \dots\}$

2. **Concatenación ($\cdot$ o implícito):** Secuenciación.    
    - $LM$: Una cadena de $L$ pegada a una de $M$.

3. **Unión ($+$ ó $|$):** Selección (O lógica).    
    - $L+M$: Cadenas que pertenecen a $L$ **o** pertenecen a $M$.

> [!WARNING]
> 
> Jerarquía de Precedencia (¡Memoriza esto!)
> 
> El orden de evaluación estricto es:
> 
> 1. **$*$ (Estrella):** Lo más fuerte. Se pega a lo que tiene inmediatamente a la izquierda.
>     
> 2. **$\cdot$ (Concatenación):** Lo siguiente en fuerza.
>     
> 3. **$+$ (Unión):** Lo más débil. Separa la expresión en bloques grandes.
>     
> 
> **Ejemplo de examen:** $a + bc^*$ 
> - ¿Qué se repite? Solo la $c$.
> - Luego se concatena $b$ con $c^*$.
> - Al final, tienes dos opciones: o la cadena $a$, o la cadena formada por $bc^*$.     

# 3.2 Construcción de ER (Definición Inductiva)
En teoría te pueden preguntar: _"Defina formalmente una ER"_. No te inventes nada, usa esta estructura recursiva:
1. **Base (Los ladrillos):**
    - $\varepsilon$ es una ER (representa el lenguaje $\{\varepsilon\}$).
    - $\emptyset$ es una ER (representa el lenguaje vacío $\{\}$).
    - Cualquier símbolo $a$ del alfabeto es una ER (representa $\{a\}$).

2. **Paso Inductivo (El cemento):**    
    - Si $E$ y $F$ son ER, entonces también lo son:
        - $E + F$ (Unión)
        - $EF$ (Concatenación)
        - $E^*$ (Cierre)
        - $(E)$ (Paréntesis para agrupar)


# 3.3 El "Cheat Sheet" del Álgebra de ER
Usa estas identidades para simplificar expresiones monstruosas en los ejercicios.

## A. Identidades y Elementos Nulos
- Identidad de la Unión ($\emptyset$):
    $L + \emptyset = L$ (Sumar nada, se queda igual).

- Identidad de la Concatenación ($\varepsilon$):    
    $L\varepsilon = \varepsilon L = L$ (Pegar "vacío" no alarga la cadena).

- Elemento Nulo de la Concatenación ($\emptyset$):    
    $L\emptyset = \emptyset L = \emptyset$ (Si un tramo del puente se cae, no cruzas el río).


## B. Propiedades Aritméticas
- **Conmutativa (SOLO Unión):** $L + M = M + L$.
    - _¡OJO!:_ La concatenación **NO** es conmutativa ($LM \neq ML$). "Casa" $\neq$ "Saca".

- **Asociativa:**    
    - $(L+M)+N = L+(M+N)$
    - $(LM)N = L(MN)$

- **Distributiva (Factorización):** Vital para sacar factor común.    
    - Por izquierda: $L(M+N) = LM + LN$
    - Por derecha: $(M+N)L = ML + NL$

- **Idempotencia:**    
    - $L + L = L$ (No sumas cantidades, unes conjuntos. Decir "rojo o rojo" es "rojo").


## C. Propiedades de los Cierres (Estrella y Más)
Aquí es donde suelen pillar en los test.
1. **Doble Estrella:** $(L^*)^* = L^*$ (Repetir repeticiones sigue siendo repetir).

2. **Cierre Positivo ($^+$):** $L^+ = LL^*$.    
    - Significa "1 o más veces" (excluye $\varepsilon$ si $L$ no lo contenía).

3. **Opcionalidad ($?$):** $L? = L + \varepsilon$.    
    - Significa "0 o 1 vez" (aparece o no aparece).

4. **Descomposición:** $L^* = L^+ + \varepsilon$.

5. **Casos Límite:**    
    - $\emptyset^* = \varepsilon$ (El conjunto de 0 repeticiones de nada es la cadena vacía).
    - $\varepsilon^* = \varepsilon$


> [!INFO] ¿Por qué $\emptyset^* = \varepsilon$?
> 
> La operación estrella ($*$) se define como la unión de todas las potencias de un lenguaje, empezando obligatoriamente por el cero:
> 
> $$L^* = L^0 \cup L^1 \cup L^2 \dots$$
> 
> 1. **La Regla de Oro:** Por definición universal, **cualquier lenguaje** elevado a la potencia 0 es $\{\varepsilon\}$ (la cadena vacía).
>     
> 2. **El Resto:** Como no puedes sacar símbolos de un conjunto vacío, $\emptyset^1, \emptyset^2 \dots$ son todos $\emptyset$.
>     
> 
> **La Suma:** $\{\varepsilon\} \cup \emptyset \cup \emptyset \dots = \mathbf{\{\varepsilon\}}$


# 3.4 Trampas Típicas de Examen
1. **Confundir $\emptyset$ con $\varepsilon$:**
    - $\varepsilon$ es una cadena (longitud 0). Es como una caja vacía.
    - $\emptyset$ es un lenguaje (tamaño 0). Es no tener ni caja.
    - Recuerda: $\emptyset^* = \varepsilon$.

2. **El error de la distribución del asterisco:**    
    - $(a+b)^* \neq a^* + b^*$.
    - $(a+b)^*$ mezcla as y bs libremente (ej: $abaabb$).
    - $a^* + b^*$ te obliga a elegir: o todo as, o todo bs.

3. **Olvidar el orden en la concatenación:**    
    - Si tienes $ab + ac$, puedes sacar factor común $a(b+c)$.
    - Pero si tienes $ba + ca$, el factor común va a la derecha: $(b+c)a$.


# 3.5 Conversión de Autómatas Finitos a ER
> **Método:** Eliminación de Estados.

La idea es desmantelar el autómata estado por estado hasta que solo quede una "super-flecha" del inicio al final con la Expresión Regular completa.

**Algoritmo:**
1. **Limpieza:** Elimina los **estados sumideros** (o "de muerte") que no llegan a ningún lado. Al quitarlo, debes "recablear" las conexiones para no perder información (ver la "Regla del Puente" abajo). **Si son finales no los borres**.
2. Resultado Final:
	- Si el estado inicial es también final: Te quedará 1 solo estado.
	- Si son distintos: Te quedarán 2 estados.
	- _Nota:_ Si hay múltiples estados finales, calcula la ER para cada uno por separado (ignorando que los otros son finales) y únelas con un $+$ al final.


## Regla del puente
Cuando eliminas un estado intermedio ($q$), cualquier camino que pasaba por él debe convertirse en una flecha directa.

Si tienes: **$A \to q \to B$**
- Y $q$ tiene un bucle sobre sí mismo ($K$).
- La nueva flecha directa $A \to B$ será:
$$Etiqueta_{nueva} = (Entrada) \cdot (Bucle)^* \cdot (Salida)$$

- Si ya existía una flecha directa de $A$ a $B$ con valor $Directo$, se suma:
 $$Total = Directo + (Entrada \cdot Bucle^* \cdot Salida)$$

## 1 Solo estado (Inicial = Final)
Si el autómata se reduce a un solo estado con uno o varios bucles.
$$L=R*$$

**R:** La unión de todas las expresiones de los bucles en el estado ($r_1 + r_2 + \dots$).

![](/ApuntesWeb/images/tercero/primer-cuatrimestre/talf/imagenes/Pasted%20image%2020251020172701.png)


## 2 Estados (Inicial $\neq$ Final)
Te queda el estado Inicial ($q_0$) y el Final ($q_f$), con flechas de ida, vuelta y bucles propios.
$$L=(R*+SU*T)*SU*$$

- $(R*+SU*T)*$ : Es todo lo que puedes hacer empezando y acabando en el inicio.
    - O giras en el inicio ($R$).
    - O vas al final, giras allí y vuelves ($S \cdot U^* \cdot T$).
    - Todo esto repetido las veces que quieras ($^*$).

- **$S U^*$**: Una vez te cansas de dar vueltas en el inicio, **viajas al final ($S$)** y puedes quedarte girando allí ($U^*$) para terminar.

![](/ApuntesWeb/images/tercero/primer-cuatrimestre/talf/imagenes/Pasted%20image%2020251020172650.png)

Esto es equivalente a escribir:
$$L=(R+SU*T)*SU*$$
Porque podemos aplicar esta propiedad para simplificar: $(L^*)^* = L^*$

## Ejemplo complejo
![](/ApuntesWeb/images/tercero/primer-cuatrimestre/talf/imagenes/Pasted%20image%2020251207213850.png)

>[!Nota]
> Cuando hice el ejercicio de arriba se me fue la pinza. En $ER_1$ donde pone un $+$ es una multiplicación y lo mismo en $ER_2$. $ER_1=(1+(00*10*11*0))*(00*1*)0*$. 

# 3.6 Conversión de ER  a Autómatas Finitos
Empleando estas reglas se puede construir un AFD con transiciones epsilon, suelen quedar autómatas gigantescos. Se puede simplificar después o también hay casos donde es obvio el autómata que reconocen

$$R+S:L(R)+L(S)$$
![](/ApuntesWeb/images/tercero/primer-cuatrimestre/talf/imagenes/Pasted%20image%2020251020172713.png)

$$RS:L(R)(S)$$
![](/ApuntesWeb/images/tercero/primer-cuatrimestre/talf/imagenes/Pasted%20image%2020251020172723.png)

$$R*:L(R*)$$
![](/ApuntesWeb/images/tercero/primer-cuatrimestre/talf/imagenes/Pasted%20image%2020251020172732.png)

**Ejemplo:**

![](/ApuntesWeb/images/tercero/primer-cuatrimestre/talf/imagenes/Pasted%20image%2020251207214613.png)

# 3.7 Lema del Bombeo para Lenguajes Regulares
>[!Nota]
>Esto en prácticas no lo dimos, y ns si cae en el final o no pero en anteriores finales lo pregunta. Y claro no se si en la teórica lo dijo porque ir a la teórica nunca fue opción.

Sea $L$ un lenguaje regular. Entonces existe un número entero $p \geq 1$ tal que cualquier cadena $w$ perteneciente a $L$ con longitud $|w| \ge p$ puede dividirse en tres partes, $w = xyz$, cumpliendo las siguientes tres condiciones:
- **$|y| > 0$** (o lo que es lo mismo, $y \neq \epsilon$): La parte central no puede estar vacía.
- **$|xy| \le p$**: La parte que se repite ocurre dentro de los primeros $p$ caracteres.
- **Para todo $k \ge 0$, la cadena $xy^kz \in L$**: Podemos repetir la parte $y$ tantas veces como queramos (o borrarla con $k=0$) y la cadena resultante seguirá perteneciendo al lenguaje.

Podemos pensarlo como:
- **$x$ (El prefijo):** El camino desde el inicio hasta antes de entrar al bucle.
- **$y$ (El bucle):** La parte de la cadena que hace que el autómata de una vuelta y regrese al mismo estado. Por eso puedes repetirla ($k$ veces) y el autómata sigue feliz en ese bucle.
- **$z$ (El sufijo):** El camino desde que sales del bucle hasta el estado final.

El Lema del Bombeo no garantiza que el lenguaje sea regular, porque aunque lo cumpla podría no serlo. Lo que es seguro es que si no lo cumple, no es regular.


Ejemplo: $L = \{ a^i b^j \mid j = 2i \}$. Eso implica que $N_b = 2 \cdot N_a$ y a mayores se debe de respetar el orden. Normalmente nos darán algo así: 
- $x = a^{(n/2)-1}$ (Aporta $\frac{n}{2}-1$ aes, 0 bes).
- $y = abb$ (Aporta 1 a, 2 bes).
- $z = b^{n-2}$ (Aporta 0 aes, $n-2$ bes).

Y nos dirán que probemos con varios $k$ si se cumple o no. Si por ejemplo usamos $k=2$
$$w' = a^{(n/2)-1} \cdot (abb) \cdot (abb) \cdot b^{n-2}$$
Ya podemos apreciar simple vista que va a fallar porque tenemos $abbabb$ lo cual no cumple el orden, por ello no tenemos un lenguaje regular. Pero si nos dicen que $k=0$ tendríamos
$$w' = x \cdot z$$
$$w' = a^{(n/2)-1} \cdot b^{n-2}$$

Y aprovechamos $N_b = 2 \cdot N_a$ para sustituir:
$$2 \cdot (\frac{n}{2} - 1) = n - 2$$

Vemos que el lema del bombeo no falla, pero esto no significa que sea regular.