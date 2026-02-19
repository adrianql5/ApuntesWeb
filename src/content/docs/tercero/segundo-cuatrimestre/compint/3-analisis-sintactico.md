---
title: "Análisis Sintáctico"
---

# 3.1 Nociones Generales
En el **análisis sintáctico** se comprueba que cada programa escrito en código fuente obedece a las reglas de la gramática.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260219111312.png)

## 3.1.1 Gramáticas Independientes del Contexto
Lo mismo que vimos en TALF. Una gramática se define como: $G=(NT,T,P,S)$.

- $NT$ (o $V$): Variables no terminales (Mayúsculas, ej: $A, B$).
- $T$: Terminales (minúsculas, ej: $a,b$).
- $P$: Producciones (Reglas $Izquierda→Derecha$).
- $S$: Axioma inicial.

La máquina apropiada para el reconocimiento de lenguajes independientes del contexto es el **autómata a pila**. En este tema introduciremos el símbolo **$** para indicar el fin de cadena.

## 3.1.2 Tipos de Analizadores Sintácticos
Una **analizador sintáctico** analiza el código fuente como una secuencia de componentes léxicos (símbolos terminales), y construye una representación interna en forma de árbol sintáctico. Podemos hablar de dos tipos de analizadores:
1. **Descendentes:** parten de la raíz del árbol. Aplican las reglas de la gramática, sustituyendo la parte izquierda de una regla por su parte derecha, y generando el árbol sintáctico de arriba hacia abajo.
2. **Ascendentes:** el árbol se construye de abajo hacia arriba, de las hojas a la raíz. Para ello, aplica las reglas de la gramática reduciendo la parte derecha de una producción por su parte izquierda, subiendo por los nodos hasta llegar a la raíz, el símbolo inicial S.


Sea la siguiente gramática:
$id → letra | id letra | id digito$
$letra → a|b|…|z$ 
$digito → 0|1|…|9$

 El análisis descendente aplicado a la cadena $st2$ resulta: 
 $id ⇒ \text{id digito} ⇒ \text{id letra digito} ⇒ \text{letra letra digito} ⇒ \text{s letra digito} ⇒ \text{st digito} ⇒ st2$
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260219112200.png)


El análisis ascendente aplicado a la cadena $st2$ resulta:

$st2 ⇐ \text{letra t2} ⇐ \text{id t2} ⇐ \text{id letra 2} ⇐ \text{id 2 }⇐ \text{id digito} ⇐ id$

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260219112656.png)


## 3.1.3 Forma de Backus-Naur (BNF) extendida
Es la notación más común para formalizar gramáticas. Los metasímbolos más comunes que utiliza son:
- **`::=` (Definiciones):** Indica que el símbolo a la izquierda se define mediante la expresión de la derecha.
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260219113129.png)

- **`|` (Disyunción):** Representa una alternativa o una elección (operación lógica "O").
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260219113250.png)

- **`<>` (Símbolos no terminales):** Elementos que pueden ser desglosados en reglas o símbolos más básicos.
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260219113317.png)

- **`[]` (Símbolos opcionales):** Indica que el contenido puede aparecer **cero o una** vez.
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260219113338.png)

- **`{}` (Repetición):** Indica que los símbolos pueden aparecer **cero, una o más** veces.
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260219113353.png)

- **`“ ”` (Terminales):** Se utiliza para distinguir los símbolos terminales (literales) de los metasímbolos.
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260219113409.png)

## 3.1.4 Forma de Backus-Naur (BNF) visual
1. Los símbolos terminales se marcan en negrita. 
2. Se eliminan los símbolos `<>` de los no terminales. 
3. Se utiliza el símbolo `→` en lugar de `::=`

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260219113600.png)

# 3.2 Diseño de una Gramática
Cuando se desarrolla un nuevo lenguaje de programación, se debe diseñar una nueva gramática que describirá las características del lenguaje. Algunos aspectos que deben ser discutidos en el diseño de una nueva gramática son:
- **Recursividad.** Lo que permite reducir el número de reglas sintácticas.
- **Ambigüedad.** Se ha de evitar: proporciona una gramática a menudo más intuitiva, pero permite generar distintos códigos objeto para el mismo código fuente.
- **Asociatividad.** Se deben proporcionar reglas de asociatividad para las distintas expresiones del lenguaje.
- **Precedencia.** Determina el orden en el que se realizarán las distintas operaciones del lenguaje.

## 3.2.1 Recursividad
Los lenguajes de programación permiten generar un número ilimitado de programas, lo que obliga a utilizar un método de generación sin realizar una casuística interminable. La recursividad permite generar un número infinito de programas mediante una **gramática finita**. Una gramática es **recursiva** si al reescribir un no terminal, éste vuelve a aparecer en una o más derivaciones $A \rightarrow ^+ \alpha A\beta$ 

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260219114725.png)

## 3.2.2 Ambigüedad
Una gramática es ambigua si genera al menos una cadena mediante dos o más árboles de derivación diferentes. Se debe evitar la ambigüedad, ya que pudiendo utilizar distintos árboles sintácticos para generar una misma sentencia, el **código generado podrá ser distinto** en distintas ejecuciones del compilador.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260219114955.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260219115009.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260219115040.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/compint/imagenes/Pasted%20image%2020260219115055.png)



alta probabilidad dde eliminar recursividad por la izquierda