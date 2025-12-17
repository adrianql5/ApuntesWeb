---
title: "Fundamentos del Calculo Financiero"
---

Copyright (c) 2025 Adrián Quiroga Linares Lectura y referencia permitidas; reutilización y plagio prohibidos

>[!Nota]
> Lo importante de este tema es saber teoría para el test
> 
> Saber las fórmulas del **descuento y capitalización**. 
> Saber hacer conversiones de **porcentajes**


# 5.1 Introducción
Un **capital financiero** es una **magnitud bidimensional**, lo que significa que se representa con **dos datos**:
$$\textbf{Capital financiero} = (C;\ t)$$

Donde:
- **C** → es la **cuantía** o valor del capital, expresado en **unidades monetarias** (por ejemplo, euros, dólares).
- **t** → es el **momento en el tiempo** en el que ese capital estará disponible o será exigible.

> 📌 **Ejemplo**:  
> Un capital financiero de **(1.000 €; 3 años)** significa que se recibirán (o se pagarán) **1.000 euros dentro de 3 años**.


- **Actividad económica**: Se refiere a **producir, distribuir y consumir bienes y servicios**. En otras palabras, crear riqueza.
- **Actividad financiera**: Trata de **gestionar el valor del dinero en el tiempo**. Es decir, cuándo se recibe, se entrega o se invierte un capital.


En el cálculo financiero, cuando se comparan capitales, **las decisiones se basan en la cuantía y el tiempo**. Se aplican las siguientes reglas:

1. **Si dos capitales tienen el mismo vencimiento (mismo “t”)**, se prefiere el que tenga **mayor cuantía (C)**. 
    > Ejemplo: Entre (1.000 €; 2 años) y (1.200 €; 2 años), se prefiere el segundo.

2. **Si dos capitales tienen la misma cuantía (mismo “C”)**, se prefiere el que se reciba en **menos tiempo (menor “t”)**.
    > Ejemplo: Entre (1.000 €; 1 año) y (1.000 €; 3 años), se prefiere el primero.


Estas reglas expresan el **principio fundamental de preferencia temporal del dinero**:

> **"A igual cantidad, es mejor recibir el dinero cuanto antes; a igual momento, es mejor recibir más dinero."**




# 5.2 Concepto de operación financiera

Una **operación financiera** es un **intercambio de capitales financieros** entre dos agentes económicos, que se produce en **momentos distintos del tiempo**. Este intercambio implica siempre una **prestación** (lo que se entrega primero) y una **contraprestación** (lo que se devuelve después).

En toda operación financiera hay dos participantes fundamentales (Sujetos financieros):

- **Prestamista** (**acreedor**) → Es el agente económico que **entrega** el capital en primer lugar. Está "prestando" el dinero.
    > Ejemplo: Un banco que otorga un préstamo.

- **Prestatario** (**deudor**) → Es el agente que **recibe** ese capital. Luego, tiene la obligación de **devolverlo** (con intereses o condiciones, dependiendo del acuerdo). 
    > Ejemplo: Una persona que recibe el préstamo del banco. 


Los capitales que se intercambian en una operación financiera se clasifican en dos tipos:
- **Prestación** → Es el capital (o conjunto de capitales) que **entrega el prestamista**.
    > Normalmente se entrega al principio de la operación.

- **Contraprestación** → Es el capital (o conjunto de capitales) que **devuelve el prestatario** al prestamista. 
    > Puede devolverse en uno o varios pagos, según lo acordado.


> Recuerda: Tanto la prestación como la contraprestación son **capitales financieros**, es decir, pares (C; t), con valor y fecha.


En toda operación financiera se identifican tres puntos clave relacionados con el tiempo:

- **Origen** → Es el **momento de vencimiento del primer capital** que se mueve en la operación. 
    > Generalmente coincide con el momento en que se entrega la prestación.

- **Final** → Es el **momento de vencimiento del último capital** (usualmente la última contraprestación).

- **Duración** → Es el **intervalo de tiempo** entre el origen y el final: 
$$\text{Duración} = \text{Final} - \text{Origen}$$

> **Ejemplo simplificado**:  
> Si una persona recibe un préstamo el 1 de enero de 2024 y lo devuelve completamente el 1 de enero de 2026, la **duración** de la operación es de **2 años**.


# 5.3 Leyes financieras clásicas: Capitalización y Descuento
Las **leyes financieras** permiten calcular cuánto vale un capital en distintos momentos del tiempo. 


## 5.3.1 Capitalización Simple
La **capitalización simple** consiste en calcular el **valor final** de un capital C0C_0 que se invierte o presta durante cierto tiempo a un tipo de interés fijo, **sin acumular los intereses generados**.

- Los intereses **se calculan siempre sobre el capital inicial**.
- Si el tipo de interés cambia a lo largo del tiempo, se calcula por tramos.

$$C_n = C_0 + C_0 \cdot i \cdot n = C_0 \cdot (1 + i \cdot n)$$



> A presta a B **4.000,00 €** a 12 meses, con los siguientes intereses:  
> 🔹 1 % mensual los **3 primeros meses**  
> 🔹 2 % mensual los **5 meses siguientes**  
> 🔹 3 % mensual los **últimos 4 meses**

Se calcula el interés por tramos:
$$I = 4.000 \cdot (0{,}01 \cdot 3 + 0{,}02 \cdot 5 + 0{,}03 \cdot 4) = 4.000 \cdot (0{,}03 + 0{,}10 + 0{,}12) = 4.000 \cdot 0{,}25 = 1.000$$ $$C_n = 4.000 + 1.000 = \boxed{5.000,00}$$

## 5.3.2 Capitalización compuesta
En la **capitalización compuesta**, los intereses generados **se reinvierten**: se suman al capital para generar nuevos intereses en los siguientes periodos.

$$C_n = C_0 \cdot (1 + i)^n$$

Si hay **tipos de interés variables**, se aplica tramo a tramo.


> A presta a B **10.000,00 €** a **10 meses**  
> Interés: **1 % mensual compuesto**

$$C_n = 10.000 \cdot (1{,}01)^{10} \approx 10.000 \cdot 1{,}105 = \boxed{11.050,00}$$

## 5.3.3 Descuento simple
Partimos de una **cuantía futura** $C_n$ que se espera recibir o pagar en un plazo determinado. El objetivo es calcular cuál sería su **valor actual** $C_0$, conociendo:
- el tipo de descuento simple comercial $d$,
- y la duración $n$ (en meses, trimestres, años, según el tipo).


$$C_0 = C_n - C_n \cdot d \cdot n = C_n \cdot (1 - d \cdot n)$$

- El **descuento** se calcula siempre sobre el capital de partida ($C_n$). 
- Es una **función lineal**: el descuento es proporcional al tiempo.



> A debe a B **3.000,00 €** que debe pagar dentro de **6 meses**.  
> Acuerdan cancelarla hoy con un **2,00 % de descuento simple mensual**.  
> ¿Cuánto paga hoy A?

$$C_0 = 3.000 \cdot (1 - 0{,}02 \cdot 6) = 3.000 \cdot (1 - 0{,}12) = 3.000 \cdot 0{,}88 = \boxed{2.640,00 }$$

## 5.3.4 DESCUENTO COMPUESTO
Aquí, el descuento se aplica **de forma acumulativa** (compuesta) en cada periodo.  
La fórmula para hallar el **valor actual** $C_0$ de un capital futuro $C_n$ es:

$$C_0 = C_n \cdot (1 + d)^{-n}$$
Donde:
- $d$: tipo de descuento por periodo
- $n$: número de periodos
- El descuento **no es lineal**, sino **exponencial**.



> A debe a B **3.000,00 €** dentro de **6 meses**.  
> Se aplica un descuento **compuesto del 2,00 % mensual**.

$$C_0 = 3.000 \cdot (1 + 0{,}02)^{-6} = 3.000 \cdot (1{,}02)^{-6} \approx 3.000 \cdot 0{,}885 = \boxed{2.655,00}$$

# 5.4 ¿Qué son los tipos de interés equivalentes?
A veces los intereses no se aplican una sola vez al año, sino que se aplican varias veces al año: **mensualmente, trimestralmente, semestralmente**, etc.

Entonces necesitamos saber cómo convertir un **tipo anual** a un tipo **por periodo más corto**, o viceversa. Eso es lo que hacen los **tipos de interés equivalentes**.

### **Capitalización Simple**
Aquí, **los intereses NO se acumulan**. Es una regla lineal.

- $j_m$: interés **nominal anual** (lo que se dice en términos anuales).
- $i_m$: interés **efectivo por periodo** (por mes, por trimestre...).
- $m$: número de periodos por año (12 para meses, 2 para semestres, 4 para trimestres...)

$$i_m = \frac{j_m}{m}$$

$$i_{periodo}=\frac{TIN}{\text{nº pagos por año}}$$
> TIN = Tasa Interés Nominal, que es un tipo anual **no capitalizable por sí mismo**. Solo tiene sentido si se acompaña del **número de períodos de pago**.
2
> Si el **interés nominal anual** es del 9 %, ¿cuál es el **interés mensual equivalente**?
$$i_m = \frac{9\,\%}{12} = 0{,}75\,\% \text{ mensual}$$


### **Capitalización Compuesta**
Aquí, **los intereses se acumulan**. Es más realista en el mundo financiero.

- $j_m$: interés **nominal anual convertible** (se refiere a cuánto se capitaliza en total al año, pero no incluye la acumulación compuesta).
- $i_m$: interés **efectivo por periodo**.
- $i$: interés **efectivo anual** (lo que realmente se gana/acumula al año, con capitalización).


- Para pasar de **interés por periodo $i_m$** a **efectivo anual $i$**:  
$$i = (1 + i_m)^m - 1$$

- Para pasar de **efectivo anual $i$** a **interés por periodo $i_m$**:
$$i_m = (1 + i)^{1/m} - 1$$

- Y el **interés nominal** es simplemente:
$$j_m = i_m \cdot m$$

> Si el **interés efectivo anual es del 12 %**, ¿cuál es el **interés semestral** y el **nominal anual**?

Queremos:

- $i = 12\%$
- $m = 2$ (porque son semestres)

$$i_m = (1 + 0{,}12)^{1/2} - 1 = \sqrt{1{,}12} - 1 \approx 1{,}0583 - 1 = 0{,}0583 = 5{,}83\% \text{ semestral}$$ $$j_m = i_m \cdot 2 = 5{,}83\% \cdot 2 = 11{,}66\% \text{ nominal anual}$$
## RESUMEN EN TABLA

| Régimen           | Fórmula de conversión     | ¿Acumula intereses? |
| ----------------- | ------------------------- | ------------------- |
| **Simple**        | $i_m = \frac{j_m}{m}$     | ❌ No                |
| **Compuesta** (1) | $i = (1 + i_m)^m - 1$     | ✅ Sí                |
| **Compuesta** (2) | $i_m = (1 + i)^{1/m} - 1$ | ✅ Sí                |

# 5.5 Rentas Financieras
Una **renta financiera** es una **serie de pagos** (o cobros) realizados en distintos momentos del tiempo.  
Por ejemplo, un préstamo que pagas cada mes, una pensión que recibes cada año, etc.

Se representan como pares:
- $(C_1, t_1), (C_2, t_2), ..., (C_n, t_n)$
    - donde cada $C_i$ es un capital (cantidad de dinero)
    - y $t_i$ es el momento en el que ocurre ese pago o cobro.


Elementos de una renta financiera:
1. **Término:** cada uno de los capitales que forman parte de la renta (como los 500 €, 1.000 €, etc.)
2. **Periodo:** tiempo entre pagos consecutivos.
3. **Origen:** instante en que comienza la renta (inicio del primer periodo).
4. **Fin:** momento en que termina (final del último periodo).
5. **Duración:** tiempo entre el origen y el fin.
6. **Época de valoración:** momento específico en el que se calcula el valor de la renta (ej. valor actual, valor futuro...).


## 5.5.1 Clasificación de las Rentas
**Según la cuantía de los términos:**
- **Constantes:** todos los pagos son iguales.
- **Variables:** los pagos cambian (suben o bajan).

**Según el vencimiento de los términos:**
- **Pospagables:** los pagos se hacen al final del periodo (como pagar el alquiler al final del mes).
- **Prepagables:** los pagos se hacen al inicio del periodo.


**Según el instante de valoración:**
- **Inmediatas:** se empiezan a pagar desde ya.
- **Diferidas:** comienzan más adelante.
- **Anticipadas:** comienzan antes del periodo de cálculo (o tienen una valoración adelantada).

##  5.5.2 ¿Qué valores se pueden calcular?
- **Valor Actual (VA):** cuánto vale HOY una renta que se cobrará en el futuro.
- **Valor Final (VF):** cuánto tendrás en el futuro, si empiezas a pagar o recibir hoy.
- Se calculan **usando fórmulas de capitalización compuesta**, porque el dinero pierde o gana valor en el tiempo.

EJEMPLO 2: Renta anual pospagable de 8 términos, total 15.000 €, con interés compuesto al 12 % anual

Sabemos:
- Es **constante** y **pospagable**
- 8 pagos anuales iguales → $R$
- Interés efectivo anual: 12 % → $i = 0{,}12$
- Valor total: 15.000 € (esto puede ser el VA o VF, dependiendo del contexto)

Si se pide el **valor actual (VA)** y **valor final (VF)**, usamos fórmulas:

Valor Actual (renta pospagable):

$$VA = R \cdot \frac{1 - (1 + i)^{-n}}{i}$$

Valor Final (VF):
$$VF = R \cdot \frac{(1 + i)^n - 1}{i}$$


EJEMPLO 3: Renta prepagable de 6 términos de 2.000 €, al 1,25 % periodal
- $R = 2.000$
- $n = 6$
- $i = 0{,}0125$
- Es **constante** y **prepagable**

Valor Actual (renta prepagable):
$$VA = R \cdot \left( \frac{1 - (1 + i)^{-n}}{i} \right) \cdot (1 + i)$$

Y el **valor final (VF)**:
$$VF = R \cdot \left( \frac{(1 + i)^n - 1}{i} \right) \cdot (1 + i)$$

> ⚠ En la renta **prepagable**, se multiplica por $(1 + i)$ porque los pagos se hacen **antes**, así que generan más intereses.


EJEMPLO 4: Renta pospagable de 10 pagos de 1.500 €, interés 3 % periodal
- $R = 1.500$, $n = 10$, $i = 0{,}03$

**a) Valor Actual:**
$$VA = 1.500 \cdot \frac{1 - (1 + 0{,}03)^{-10}}{0{,}03}$$

**b) Valor en t = 2:** → Calculas el **valor actual** como si estuvieras en el tiempo 2.  
Es decir, actualizas los 8 pagos restantes (de t=3 a t=10).

**c) Valor final si es anticipada tres periodos:** → Significa que la renta empieza **3 periodos antes**, y se debe **capitalizar 3 periodos más**.

$$VF = \text{Valor de la renta pospagable normal} \cdot (1 + i)^3$$
