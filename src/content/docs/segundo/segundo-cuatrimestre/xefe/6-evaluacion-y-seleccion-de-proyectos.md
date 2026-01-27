---
title: "Evaluación y Selección de Proyectos"
---

Escrito por Adrián Quiroga Linares.   

>[!Nota]
> Lo importante de este tema es saber teorÍa para el test
> 
> Calcular el **VAN** y el **PR**


# 6.1 Concepto de inversión
Invertir es **renunciar a un beneficio inmediato y seguro** (por ejemplo, gastar dinero hoy), con la **esperanza de obtener un beneficio mayor en el futuro**.  
Esto implica una **inmovilización de recursos** durante un tiempo.

#### **Características clave:**
- **Intercambio temporal**: sacrificio presente vs. beneficio futuro.
- **Proceso en el tiempo**: tanto la inversión como sus resultados se distribuyen en el tiempo.
- **Riesgo**: el futuro es incierto, así que hay riesgo de no obtener el rendimiento esperado.
- **Evaluación de viabilidad**: se compara lo que se da hoy con lo que se espera recibir.
#### **Ejemplo:**
Comprar un edificio por **350.000 € hoy (t=0)** esperando venderlo por **400.000 € en 3 años (t=3)**.

### **Elementos básicos de una inversión**
1. **Inversor**: quien invierte (persona o empresa). 
2. **Objeto de inversión**: en qué se invierte (activo, negocio, etc.).
3. **Plazo**: duración (puede ser fija o indefinida).
4. **Cuantía**: dinero invertido.
5. **Resultado esperado**: beneficio futuro.
6. **Riesgo**: probabilidad de que el rendimiento no sea el esperado.
7. **Binomio rentabilidad-riesgo**: a mayor posible ganancia, mayor riesgo asumido.

### **Tipos de inversión**
1. **Jurídicas**: según la forma legal o el contrato que las regula.
2. **Financieras**: colocación de capital en instrumentos financieros (acciones, bonos, etc.).
3. **Económicas**: inversión en bienes reales o productivos (maquinaria, inmuebles, empresas, etc.).


# 6.2 Dimensión financiera del proceso de inversión
#### **Dimensión temporal**
- **Desembolso inicial (Q₀)**:
    - Incluye la inversión en **activos fijos** (materiales o inmateriales) y en **activos corrientes necesarios** para empezar la actividad.
    - Generalmente ocurre en el **momento 0** (inicio del proyecto).

- **Flujos de caja posteriores (Q₁, Q₂, ..., Qₙ)**:
    - Representan las **entradas y salidas netas de tesorería** a lo largo del tiempo.
    - Solo se contabilizan **cobros y pagos efectivos** (no devengados).

### **Flujo neto de caja (FNC)**
- Se calcula para cada periodo **j**:
$$Q_j = C_j - P_j$$     Donde:
    - **Cj** = cobros efectivos del año **j**
    - **Pj** = pagos efectivos del año **j**


### **Horizonte temporal (HT)**
- Es el periodo durante el cual se analizan los **flujos de caja del proyecto** (desde el momento 0 hasta n).
- Puede **no coincidir con la vida económica real del proyecto**.
- Si el análisis termina antes de la vida útil del proyecto → se incluye el **valor final (Vₙ)** como ingreso adicional al final del HT.


### **Ejemplo práctico**
- **Inversión inicial**: 200.000 € (Año 0)
- **FNC estimados**:
    - Año 1: Cobros 70.000 – Pagos 20.000 = **50.000 €**
    - Año 2: Cobros 120.000 – Pagos 20.000 = **100.000 €**
    - Año 3: Cobros 130.000 – Pagos 40.000 = **90.000 €**
    - Año 4: Cobros 80.000 – Pagos 40.000 = **40.000 €**

### **Origen de los flujos de caja**
1. **Operativos** (actividad principal del proyecto):
    - **+ Ingresos por ventas**
    - **– Costes variables**
    - **– Costes fijos**
    - **– Amortización técnica**
    - = **BAIT (Beneficio antes de intereses e impuestos)**
    - **– Impuestos**
    - = **BNO (Beneficio Neto Operativo)**
    - **+ Amortización técnica**
    - = **FNC operativo**

2. **Extraoperativos** (efectos del capital invertido): 
    - Ej. ventas de activos, subvenciones, etc.


# 6.3 Evaluación de proyectos de inversión
El objetivo es determinar **el valor que aporta** una inversión, usando indicadores que ayuden a **decidir si se realiza o no**.

### **¿Qué se entiende por valor?**
- **Valor económico/financiero**: rentabilidad, recuperación del capital.
- **Valor social**: impacto en la comunidad. 
- **Valor ambiental**: impacto ecológico o sostenibilidad.

### **Evaluación económica**
Se busca responder a:
- ¿Vale la pena esta inversión?
- Si hay varias opciones, ¿cuál es la mejor?
#### **Dos contextos**:
1. **Oportunidad única**: decidir si **aceptar o rechazar**.
2. **Varias alternativas viables**: **comparar y jerarquizar**.

### **Indicadores clave de un proyecto**
1. **Rentabilidad**: capacidad para generar beneficios.
2. **Riesgo**: grado de incertidumbre sobre esos beneficios.
3. **Liquidez**: facilidad para convertir activos en dinero sin pérdidas.


> **Relaciones comunes:**
- - Riesgo → + Rentabilidad
- – Liquidez → + Rentabilidad
- – Liquidez → + Riesgo

### **La tasa de descuento y el valor actual**
- El **valor del dinero cambia en el tiempo**: 1 € hoy vale más que 1 € mañana.
- Se compara la inversión con otras opciones del mercado (coste de oportunidad).

#### **Fórmula del Valor Actual (VA):**

$$VA = \frac{C_1}{(1+k)^1} + \frac{C_2}{(1+k)^2} + \dots + \frac{C_n}{(1+k)^n}$$

Donde **k** = tasa de descuento  
**VAN (Valor Actual Neto)** = VA – Inversión inicial


### **Ejemplo práctico**
- Inversión: 200.000 €
- Flujos futuros durante 4 años: 50.000, 100.000, 90.000, 40.000
- Tasa de descuento: 10%

| Año | Flujo (€) | Flujo descontado (€) |
| --- | --------- | -------------------- |
| 0   | -200.000  | -200.000             |
| 1   | 50.000    | 45.455               |
| 2   | 100.000   | 82.645               |
| 3   | 90.000    | 67.618               |
| 4   | 40.000    | 27.321               |
|     | **VA**    | **223.038**          |
|     | **VAN**   | **23.038**           |

> En este caso, la inversión es viable:  
> Se recuperan los 200.000 €, se gana un 10% anual, y además se obtiene un beneficio neto de **23.038 €**.


# 6.4 Valor Actual Neto (VAN)
Es el valor actualizado de los beneficios netos futuros de una inversión **menos el desembolso inicial**. Pasos para calcular el VAN
1. Actualizar los flujos 

$$\textbf{VAN} = -A + \frac{Q_1}{(1+k)^1} + \frac{Q_2}{(1+k)^2} + \dots + \frac{Q_n}{(1+k)^n}$$

Donde:
- **A** = inversión inicial
- **Q₁, Q₂, ..., Qₙ** = flujos netos de caja futuros
- **k** = tasa de descuento

### **Pasos para calcular el VAN**
Pasos para calcular el VAN
1. Actualizar los flujos 1. **Actualizar** los flujos netos de caja al momento 0 usando la tasa de descuento (**k**).
2. **Sumar** los valores actualizados → se obtiene el **Valor Actual (VA)**.
3. **Restar** la inversión inicial → se obtiene el **VAN**.

### **Interpretación del VAN**
- **VAN > 0**: la inversión **genera valor** → **Aceptar**
- **VAN < 0**: la inversión **destruye valor** → **Rechazar**
- **VAN = 0**: ni gana ni pierde → **Indiferente**

### **Influencia de la tasa de descuento (k)**

| **Tasa de descuento (k)** | 0%     | 5%     | 10%    | 15%   | 20%     |
| ------------------------- | ------ | ------ | ------ | ----- | ------- |
| **VAN (€)**               | 80.000 | 48.975 | 23.038 | 1.139 | -17.515 |

> A mayor tasa de descuento, **menor VAN**: el valor del dinero futuro disminuye.


### **Características del VAN**
- Es un **criterio claro y directo** para evaluar inversiones.
- Mide la **rentabilidad absoluta** (en €).
- Es **aditivo**: el VAN de varios proyectos es la suma de sus VAN individuales.
- Requiere una **tasa de descuento externa (k)** → depende del coste de capital o riesgo del proyecto.
- Se puede calcular fácilmente con **Excel** usando:  
    `=VNA(tasa; flujos) - inversión inicial`


# 6.5 Tasa Interna de Rentabilidad (TIR)
Es la **tasa de descuento (𝑟)** que hace que el **VAN sea igual a cero**, es decir, aquella que iguala el valor presente de los flujos futuros con la inversión inicial.

$$-A + \frac{Q_1}{1 + r} + \frac{Q_2}{(1 + r)^2} + \dots + \frac{Q_n}{(1 + r)^n} = 0 \rightarrow r$$

### **¿Qué indica la TIR?**
- Es la **rentabilidad anual interna** del proyecto.
- Se expresa como un **porcentaje (%)**, lo que facilita su comparación con la **tasa mínima exigida (k)**.
- Muestra el **rendimiento relativo** del proyecto, sin necesidad de comparar con otro.

### **Criterio de decisión usando la TIR**
- **Si TIR > k** → El proyecto es **viable** (rentabilidad superior a la exigida).
- **Si TIR < k** → El proyecto es **no viable** (rentabilidad insuficiente).
- **Si TIR = k** → El proyecto es **indiferente** (cumple justo con la rentabilidad mínima).

> Se puede expresar en forma de rentabilidad neta:

$$\textbf{r}_{\text{neta}} = \text{TIR} - k$$

### **Ejemplo**
Proyecto con inversión de **200.000 €** y flujos de caja durante 4 años:

| Año | Flujo (€) | VAN con 10% | VAN con 15% | VAN con 16% |
| --- | --------- | ----------- | ----------- | ----------- |
| 0   | -200.000  | -           | -           | -           |
| 1   | 50.000    |             |             |             |
| 2   | 100.000   | 23.038      | 1.139       | -2.829      |
| 3   | 90.000    |             |             |             |
| 4   | 40.000    |             |             |             |

→ TIR ≈ **15,28%**


### **Limitaciones de la TIR**
- Es la solución de una **ecuación polinómica**, por lo que:
    - Puede tener **múltiples soluciones** reales (varias TIR).
    - Puede **no tener solución real** (ninguna TIR válida).
- No siempre es fiable si hay **cambios de signo** en los flujos de caja (positivos y negativos de forma intercalada).

#### Ejemplo de inconsistencias:
1. **Múltiples TIR**  
    Flujo: -22.000, +15.000, +15.000, +15.000, +15.000, -40.000  
    → Tiene dos TIR: 5,62% y 27,78%

2. **Sin TIR válida**  
    Flujo: -1.000, +3.000, -2.500  
    → TIR = #¡NUM! (Excel no encuentra una solución) 


# 6.6 Índice de Rentabilidad (IR)
Es una **alternativa al VAN** que permite medir la **rentabilidad de una inversión de forma relativa** (por cada euro invertido), en lugar de absoluta como el VAN.

### **Fórmulas**
Existen dos formas:
#### **1. Índice de Rentabilidad Bruto (IRB):**
$$\textbf{IRB} = \frac{VA}{A}IRB=AVA$$​

- **VA**: Valor Actual de los flujos de caja futuros
- **A**: Importe de la inversión inicial

#### **2. Índice de Rentabilidad Neto (IRN):**
$$\textbf{IRN} = \frac{VAN}{A} = IRB - 1IRN=AVAN​=IRB−1$$


### **Criterio de decisión**
- **IRB > 1** → Proyecto **viable**
- **IRN > 0** → Proyecto **viable**
- Cuanto **mayor** sea el IR, **más rentable** es el proyecto por cada euro invertido.

### **Ejemplo**
Inversión inicial: **200.000 €**  
Flujos netos de caja en 4 años: 50.000, 100.000, 90.000, 40.000  
Tasa de descuento: (por ejemplo, 10%)  
Resultado de Excel:
- **IRB = 111,5%** → Es decir, por cada euro invertido se obtiene 1,115 €.
- **IRN = 11,5%** → Equivale a un 11,5% de rentabilidad neta sobre la inversión inicial.



# 6.7 Plazo de Recuperación (PR)
Es el **tiempo que tarda un proyecto en recuperar su inversión inicial** gracias a los flujos netos de caja (FNC).  
En otras palabras, el número de años (o periodos) que se necesitan para **amortizar el capital invertido**.

### **¿Cómo se calcula?**
Se van **sumando los flujos netos de caja año a año**, hasta que esa suma iguale o supere el valor de la inversión inicial.

#### Ejemplo:

| Año | FNC (€)  | Acumulado (€) |
| --- | -------- | ------------- |
| 0   | -200.000 | -200.000      |
| 1   | +50.000  | -150.000      |
| 2   | +100.000 | -50.000       |
| 3   | +90.000  | **+40.000**   |
| 4   | +40.000  | +80.000       |

**Resultado:**  
El proyecto recupera los **200.000 € en el año 3**, por tanto:

$$\textbf{PR = 3 años}$$

(Fórmula Excel: `=CONTAR.SI(rango;"<0")`)


### **Interpretación**
- A menor PR → Mayor **liquidez** (el dinero “vuelve” antes).
- Es muy útil para analizar proyectos cuando:
    - Hay **alta incertidumbre**.
    - Existen **limitaciones de financiación**.
    - Se necesita liquidez en el corto plazo.


### **Limitaciones del PR**
1. **No tiene en cuenta** los beneficios **posteriores** al periodo de recuperación.  
    → Ej: Si el proyecto genera mucho dinero después de recuperarse, **eso no se valora**.

2. **No considera el valor del dinero en el tiempo**.  
    → Un euro hoy **vale más** que un euro dentro de 3 años.
 
3. **Pondera igual** un flujo al inicio y uno justo al final del PR.    


### **Ejemplo de Problemas con el PR**
#### **Problema 1: Ignora beneficios posteriores**

| Proyecto | Año 0 | Año 1 | Año 2 | Año 3 | Año 4 | VAN (k=10%) |
| -------- | ----- | ----- | ----- | ----- | ----- | ----------- |
| A        | -200k | 80k   | 120k  |       |       | -28.099     |
| B        | -200k | 80k   | 120k  | 130k  | 150k  | 172.024     |

→ Ambos tienen el **mismo PR**, pero B genera mucho más valor y tiene **mayor VAN**.

#### **Problema 2: No valora cuándo se recibe el dinero**

| Proyecto | Año 0 | Año 1 | Año 2 | Año 3 | Año 4 | VAN (k=10%) |
| -------- | ----- | ----- | ----- | ----- | ----- | ----------- |
| C        | -200k | 20k   | 180k  | 50k   | 50k   | 38.659      |
| D        | -200k | 180k  | 20k   | 50k   | 50k   | 51.882      |

→ El PR es el **mismo**, pero D recupera antes y genera un **mayor VAN**.

### **Conclusión**
El PR es una herramienta **útil para evaluar la liquidez**, pero **no debe usarse sola** para decidir.  
Siempre se debe complementar con otros indicadores como **VAN** o **TIR**.
