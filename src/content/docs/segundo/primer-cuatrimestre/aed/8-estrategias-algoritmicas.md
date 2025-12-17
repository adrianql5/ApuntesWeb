---
title: "Estrategias Algorítmicas"
---

Copyright (c) 2025 Adrián Quiroga Linares Lectura y referencia permitidas; reutilización y plagio prohibidos

Escrito por **Adrián Quiroga Linares**.

Los algoritmos son herramientas esenciales para resolver problemas de manera eficiente, minimizando tanto el tiempo como los recursos necesarios. Las **estrategias algorítmicas** establecen enfoques específicos que guían el diseño de algoritmos para optimizar la resolución de problemas. En este tema, exploraremos cuatro estrategias principales: **Divide y vencerás**, **Algoritmos voraces**, **Backtracking**, y **Ramificación y poda**.

---

# 8.1 Divide y Vencerás

La estrategia divide y vencerás consiste en:

1. **Dividir el problema** en subproblemas más pequeños.
2. **Resolver los subproblemas** de manera independiente.
3. **Combinar las soluciones** de los subproblemas para resolver el problema original.

## 8.1.1 Características

- Los subproblemas deben ser independientes y más manejables que el problema original.
- La solución de los subproblemas se combina de manera eficiente.
- Si los subproblemas no pueden dividirse o no son independientes, esta estrategia no es aplicable.

## 8.1.2 Ejemplos clásicos

- **Multiplicación de enteros largos**: Divide los números en partes más pequeñas y realiza multiplicaciones parciales.
- **Multiplicación rápida de matrices**: Optimiza la cantidad de multiplicaciones requeridas, como el método de Strassen.
- **Ordenación por mezcla (Merge Sort)**: Divide el array en mitades, ordénalas por separado y combina los resultados.
- **Ordenación rápida (Quick Sort)**: Usa un pivote para dividir el array en partes menores y mayores, ordenándolas recursivamente.

## 8.1.3 Ventajas

- Divide y vencerás suele ser eficiente para problemas recursivos.
- Genera algoritmos con estructuras claras y jerárquicas.

## 8.1.4 Desafío clave

Diseñar una división efectiva y eficiente del problema. Si no es posible, la estrategia pierde utilidad.


# 8.2 Algoritmos Voraces

Los algoritmos voraces construyen una solución paso a paso, seleccionando en cada iteración la opción que parece mejor en ese momento (solución localmente óptima).

## 8.2.1 Componentes principales

1. **C**: Conjunto de candidatos disponibles para la solución.
2. **S**: Conjunto de candidatos ya seleccionados para formar la solución.
3. **R**: Conjunto de candidatos descartados.
4. **Funciones esenciales**:
    - **solución(S)**: Comprueba si SS es una solución válida.
    - **seleccionar(C)**: Escoge el mejor candidato en el conjunto CC.
    - **factible(S, x)**: Verifica si agregar xx a SS mantiene una solución válida.
    - **Insertar(S, x)**: Añade xx al conjunto SS.
    - **Objetivo(S)**: Calcula el costo o valor de la solución parcial SS.

## 8.2.2 Características

- **Eficiencia**: Tienen complejidad polinomial, lo que los hace rápidos.
- **Subóptimos**: No garantizan encontrar la solución óptima en todos los casos.
- **Aplicaciones típicas**:
    - Problemas de optimización como el _cambio de monedas_ o el _problema del viajante_ en casos simples.

#### **Ejemplo**

En el problema del cambio de monedas, el algoritmo voraz selecciona las monedas de mayor denominación posible en cada paso. Aunque puede no ser óptimo, como en el caso de denominaciones no estándar, es rápido y fácil de implementar.


# 8.3 Backtracking (Vuelta atrás)

El backtracking explora el espacio de soluciones de manera sistemática. A diferencia de los algoritmos voraces, si una solución parcial no lleva al resultado óptimo, retrocede y elimina esa opción (de ahí el término "vuelta atrás").

## 8.3.1 Componentes principales

1. **Espacio de soluciones**: Representado implícitamente como un árbol o grafo.
2. **Funciones esenciales**:
    - **s**: Solución parcial.
    - **sINICIAL**: Valor inicial de la solución parcial (usualmente vacío o no válido).
    - **nivel**: Nivel actual en el árbol de soluciones.
    - **fin**: Indica si se ha encontrado una solución.
    - **Generar(nivel, s)**: Genera una solución parcial para un nivel dado.
    - **Solución(nivel, s)**: Verifica si la solución parcial actual es válida.
    - **Criterio(nivel, s)**: Comprueba si la solución parcial puede derivar en una solución válida. Si no, se poda.
    - **MasHermanos(nivel, s)**: Determina si hay más candidatos en el nivel actual.
    - **Retroceder(nivel, s)**: Elimina un candidato y vuelve al nivel anterior.

## 8.3.2 Características

- **Eficiencia**: Ineficiente, con complejidad factorial o exponencial.
- **Garantía**: Encuentra la solución óptima si existe.
- **Aplicaciones típicas**:
    - Problemas de optimización y combinatoria, como el _problema de las n-reinas_ o el _problema del viajante_.

## 8.3.3 Mejoras posibles

La poda de ramas irrelevantes puede reducir significativamente el espacio de búsqueda.


# 8.4 Ramificación y Poda (Branch & Bound)

Es una extensión del backtracking que utiliza estrategias específicas de ramificación y poda para mejorar la eficiencia.

## 8.4.1 Diferencias clave respecto al Backtracking

1. **Ramificación**:
    - No se recorre en profundidad exclusivamente.
    - Permite estrategias más flexibles (FIFO, LIFO, etc.).
2. **Poda**:
    - Usa **cotas** para estimar los beneficios posibles desde un nodo, reduciendo el número de nodos explorados.

## 8.4.2 Cotas

- **CS (Cota Superior)**: Valor máximo que se puede alcanzar desde un nodo.
- **CI (Cota Inferior)**: Valor mínimo que se puede alcanzar desde un nodo.
- **BE (Beneficio Estimado)**: Promedio entre CS y CI, usado para decidir qué nodo explorar primero.

## 8.4.3 Estrategias de ramificación

- **LC-FIFO**: Selecciona el nodo de menor BEBE, desempate según orden de llegada.
- **MB-FIFO**: Selecciona el nodo de mayor BEBE, desempate según orden de llegada.
- **LC-LIFO**: Igual que LC-FIFO, pero desempate según último en llegar.
- **MB-LIFO**: Igual que MB-FIFO, pero desempate según último en llegar.

## 8.4.4 Funciones principales

1. **Seleccionar(LNV)**: Selecciona un nodo de la lista de nodos vivos (LNV) siguiendo la estrategia.
2. **Solución(y)**: Comprueba si el nodo yy representa una solución completa.
3. **Valor(y)**: Retorna el valor de la solución parcial en el nodo yy.

## 8.4.5 Ventajas y limitaciones

- **Mejoras**: Reduce el espacio de búsqueda respecto al backtracking tradicional.
- **Costo adicional**: Calcular cotas requiere tiempo y puede ser costoso en el peor caso.

## 8.4.6 Casos de uso

Muy efectivo para problemas de optimización combinatoria, como el _problema de asignación_ o el _problema del viajante_.


# 8.5 Conclusión

Cada estrategia tiene ventajas y limitaciones. La elección depende del problema a resolver:

- **Divide y vencerás**: Problemas recursivos y divisibles.
- **Voraces**: Optimización rápida y aproximada.
- **Backtracking**: Solución exhaustiva y garantizada.
- **Ramificación y poda**: Optimización más inteligente en problemas complejos.
