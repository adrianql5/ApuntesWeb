---
title: "Máquinas de Turing"
---

Copyright (c) 2025 Adrián Quiroga Linares Lectura y referencia permitidas; reutilización y plagio prohibidos 

# 6.1 Concepto Fundamental
Una **Máquina de Turing (MT)** es un modelo matemático de computación que consisten en un autómata con una capacidad de memoria ilimitada en forma de una cinta infinita.

A diferencia de los autómatas finitos o de pila, la MT puede mover su cabezal de lectura/escritura tanto a la izquierda como a la derecha, y puede modificar los símbolos de la cinta.

![](/ApuntesWeb/images/tercero/primer-cuatrimestre/talf/imagenes/Pasted%20image%2020251208153329.png)


# 6.2 Definición
Una MT se define formalmente como $M=(Q, \Sigma, \Gamma, \delta, q_{0}, B, F)$.
- **$Q$ (Conjunto de estados):** Los estados finitos internos de la máquina.
- **$\Sigma$ (Alfabeto de entrada):** Los símbolos que forman la cadena inicial. Es un subconjunto de $\Gamma$ y **no** incluye el blanco ($B$).
- **$\Gamma$ (Alfabeto de la cinta):** Todos los símbolos que pueden aparecer en la cinta. Incluye a $\Sigma$ y al símbolo blanco.
- **$\delta$ (Función de transición):** El "cerebro" de la máquina. Define qué hacer en cada paso.
- **$q_{0}$ (Estado inicial):** Donde comienza el cómputo ($q_{0} \in Q$).
- **$B$ (Símbolo Blanco):** Representa una celda vacía en la cinta infinita. Pertenece a $\Gamma$ pero no a $\Sigma$.
- **$F$ (Estados finales):** Conjunto de estados de aceptación.

# 6.3 Funcionamiento y Transiciones
La función de transición se define como $\delta: Q \times \Gamma \rightarrow Q \times \Gamma \times \{I, D\}$. Esto significa que, dado un estado actual y un símbolo leído en la cinta, la máquina realiza tres acciones simultáneas:

1. **Escribe** un nuevo símbolo en la celda actual.
2. **Cambia** a un nuevo estado.
3. **Mueve** la cabeza una posición a la Izquierda ($I/L$) o a la Derecha ($D/R$).

**Ejemplo de lectura:** Si $\delta(q_{1}, a) = (q_{5}, b, R)$, significa: "Si estoy en el estado $q_1$ y leo una 'a', escribo una 'b', paso al estado $q_5$ y me muevo a la derecha".

# 6.4 Aceptación y Parada
Una MT opera paso a paso hasta que ocurre una de estas situaciones:

**Criterio de Aceptación:**
- La MT acepta una cadena $w$ si, partiendo de la configuración inicial, llega a un **estado final** $q_f \in F$.    
- **Importante:** A diferencia de los autómatas finitos, **no es necesario leer toda la entrada** para aceptar; basta con alcanzar un estado final.
- Se asume que la máquina se detiene al llegar a un estado final (no hay transiciones definidas desde ahí).

**Rechazo y Bucles:** 
Si la cadena no pertenece al lenguaje ($w \notin L(M)$), pueden pasar dos cosas:
1. La máquina se para en un estado **no final** (porque no hay transición definida).
2. La máquina entra en un **bucle infinito** y nunca se para.

![](/ApuntesWeb/images/tercero/primer-cuatrimestre/talf/imagenes/Pasted%20image%2020251208154716.png)


# 6.5 Protips
Normalmente te recomiendo que dibujes la situación inicial y vayas pensando que necesita hacer tu máquina para llegar al final y después esa idea o razonamiento lo transcribas en forma de autómata. 

 1. **El "Ping-Pong"** **(Zig-Zag):** Casi todos los ejercicios se resuelven yendo a buscar algo a la derecha, marcándolo, y volviendo a la izquierda a buscar el siguiente. No intentes hacerlo todo en una pasada.

- **Tachar, no borrar:** No "elimines" símbolos (dejando huecos en blanco $B$) a menos que quieras mover toda la cadena. Lo normal es TACHAR (usar el símbolo auxiliar x de tu alfabeto $\Gamma$).
    - _Ejemplo:_ Para contar un '1', cámbialo por una 'x'. Así sabes que ya lo has contado.

- **La Cinta es tu Memoria:** No tienes variables como int contador = 0. Tu contador es lo que hay escrito en la cinta. Si quieres saber si el número es par o impar, tienes que recorrerlo y comprobarlo físicamente.

- **Los Blancos ($B$) son Muros:** Úsalos para saber dónde empieza y termina tu dato. Si te sales del $B$, estás en el vacío.


# 6.6 Variaciones de la Máquina de Turing
Existen modificaciones al modelo estándar. Es fundamental saber que **ninguna de estas variaciones aumenta la potencia computacional** de la MT; todas son equivalentes a la MT estándar.
1. **Opción de no-movimiento:** La cabeza puede quedarse quieta ($E$) en lugar de moverse.
2. **Cinta semiinfinita:** La cinta tiene un comienzo por la izquierda pero es infinita a la derecha.
3. **MT Multicinta:** Tiene varias cintas independientes con sus propios cabezales. Útil para algoritmos complejos, pero simulable por una MT de una sola cinta.
4. **MT No Determinista:** La función de transición puede tener múltiples opciones para una misma entrada ($\delta$ devuelve un conjunto de posibles movimientos). Se puede simular con una MT determinista


# 6.7 Máquina de Turing Universal
Una MTU es una máquina "reprogramable".
- Toma como entrada la **codificación de otra máquina M** y una cadena **w**.
- Es capaz de simular el comportamiento de $M$ sobre $w$.
- Es el modelo teórico de los ordenadores de propósito general actuales: el hardware (MTU) ejecuta software (descripción de M).


# 6.8 Tesis de Church-Turing
Esta tesis establece una equivalencia entre "algoritmo" y "Máquina de Turing".
- Afirma que cualquier problema que pueda ser resuelto por un algoritmo (computable) puede ser resuelto por una MT.
- No se ha encontrado ningún modelo de computación más potente que la MT.