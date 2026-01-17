---
title: "Decibilidad y Complejidad"
---

Copyright (c) 2025 Adrián Quiroga Linares Lectura y referencia permitidas; reutilización y plagio prohibidos 

# 8.1 Conceptos Básicos: ¿Qué puede hacer una máquina?
Antes de medir el tiempo, medimos si es _posible_ hacerlo.
- **Función Computable:** Una función $f$ es computable si existe una Máquina de Turing (MT) que puede calcular el resultado para **todo** valor del dominio.
- **Problema Decidible:** Es un problema cuya respuesta es binaria (**SÍ/NO**).
    - Es decidible si existe una MT da la respuesta correcta (SÍ o NO) para cualquier entrada.
    - _Si la máquina se queda en bucle infinito para alguna entrada, el problema NO es decidible._


# 8.2 El Problema de la Parada (Halting Problem)
El ejemplo clásico de problema **Indecidible**.

**Planteamiento:** Queremos diseñar una "Super-Máquina" $H$ que analice a cualquier otra máquina $M$ con una entrada $w$ y nos diga si $M$ se va a colgar (bucle) o si terminará.

Definición formal de la Máquina H (si existiera): Entrada: $w_M$ (código de la máquina) y $w$ (datos).
- $q_0 w_M w \vdash^* x_1 q_y x_2$ $\rightarrow$ Si $M$ **se para** con $w$. (Salida: SÍ)
- $q_0 w_M w \vdash^* x_1 q_n x_2$ $\rightarrow$ Si $M$ **no se para** con $w$. (Salida: NO)

**Conclusión Teórica:**
- **No existe ninguna MT $H$** que pueda hacer esto para todos los casos.
- Por tanto, el Problema de la Parada es **Indecidible**.

> **Nota importante para test:** Si el problema de la parada fuera decidible, todos los Lenguajes Recursivamente Enumerables (LRE) se convertirían automáticamente en Lenguajes Recursivos (LRC). Como no lo es, LRE $\neq$ LRC.


# 8.3 Complejidad Computacional (Medir el coste)
Una vez sabemos que un problema se puede resolver, preguntamos: **¿Cuánto cuesta?**
- **Medida:** Usamos el tamaño del problema ($n$) y medimos cuánto aumenta el tiempo al crecer $n$.
- **Notación:** Usamos el orden de magnitud **O(...)** (O grande), no el tiempo exacto en segundos.
- **Tiempo T(n):** Una MT resuelve un problema en tiempo $T(n)$ si no hace más de $T(n)$ movimientos.

### Diferencia clave: El Hardware importa
En decidibilidad (teoría pura), todas las MT son iguales. En complejidad (eficiencia), **NO**. El número de cintas cambia la velocidad.

**Ejemplo: $L = \{ a^n b^n \mid n \ge 1 \}$**
- **MT Estándar (1 cinta):** Tarda $O(n^2)$. (Tiene que ir y volver muchas veces).
- **MT con 2 cintas:** Tarda $O(n)$. (Puede copiar y comparar en una sola pasada).


# 8.4 Clases de Complejidad: Determinismo vs No Determinismo
Aquí definimos qué tan difícil es un problema según el tipo de máquina.

### Definiciones de Tiempo
- **TD(T(n)):** Tiempo Determinista. Lo que tarda una MT normal (sin "magia"). Es aceptado por una MT multicinta determinista.
- **TND(T(n)):** Tiempo No Determinista. Lo que tarda una MT No Determinista (que puede "adivinar" el camino correcto). Es aceptado por una MT multicinta no determinista.
- **Regla:** $TD(T(n)) \subseteq TND(T(n))$. (El determinismo es un caso particular del no determinismo).

### Ejemplo: SAT (Satisfacibilidad)
Dada una fórmula lógica (ej: $(x_1 \lor x_2) \land \neg x_1$), ¿existe una combinación de True/False que la haga verdadera?
- **MT Determinista:** Tiene que probar todas las combinaciones. Coste exponencial: **$O(2^n)$**. 
- **MT No Determinista:** "Adivina" la combinación correcta al instante y solo verifica. Coste lineal: **$O(n)$**.


# 8.5 P vs NP (La jerarquía del mundo real)
Las siglas que definen la informática teórica moderna:

### Clase P (Polinomial)
- Lenguajes aceptados por **MT Determinista** en tiempo polinómico ($n, n^2, n^3...$).
- Son los problemas **TRATABLES** (viables de resolver).
- Fórmula: $\bigcup TD(n^i)$

### Clase NP (No-Determinista Polinomial)
- Lenguajes aceptados por **MT No Determinista** en tiempo polinómico.
- Son problemas que quizás son difíciles de _resolver_ (como SAT), pero muy rápidos de _verificar_ si te dan la solución.
- Fórmula: $\bigcup TND(n^i)$

### Relación y Tesis
1. **$P \subseteq NP$** (Todo problema fácil de resolver es fácil de verificar).    
2. **¿P = NP?** La gran pregunta del millón. No se sabe.
3. **Tesis de Cook-Karp:**
    - Clase P = Problemas Tratables.
    - Fuera de P = Problemas Intratables (requieren tanta memoria/tiempo que son inviables para $n$ grande).

# 8.6 Reducción Polinomial y NP-Completos
¿Cómo clasificamos los problemas más difíciles? Usamos la **Reducción**.

### Reducción en tiempo polinomial ($L_1$ se reduce a $L_2$)
Significa que podemos transformar cualquier input de $L_1$ en un input de $L_2$ rápidamente (tiempo polinómico).
- **Lógica:** Si $L_1$ se puede transformar en $L_2$ fácilmente, entonces $L_2$ es "igual o más difícil" que $L_1$.
- **Propiedad Clave:**
    - Si $L_1$ se reduce a $L_2$ y $L_2 \in P$ $\Rightarrow$ entonces $L_1 \in P$. (Si el difícil resulta ser fácil, el fácil también lo es).

### NP-Completo (Los "Jefes Finales")
Un lenguaje $L$ es **NP-Completo** si cumple dos condiciones:
1. Pertenece a **NP** ($L \in NP$).
2. **Cualquier** otro problema de NP se puede reducir a $L$.

Es decir, son los problemas más difíciles de toda la clase NP. Si resuelves uno de estos en tiempo polinómico (P), has resuelto todos los problemas de NP (demostrando $P=NP$).