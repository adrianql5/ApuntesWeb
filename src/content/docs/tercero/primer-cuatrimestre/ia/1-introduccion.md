---
title: "Introducción"
---

Copyright (c) 2025 Adrián Quiroga Linares Lectura y referencia permitidas; reutilización y plagio prohibidos

# 1.1 Conceptos Principales
## 1.1.1 Definición de Inteligencia Artificial (IA)
La IA no tiene una única definición, pero se puede entender desde dos perspectivas clave:

1. **Definición Institucional (UE):** Sistemas que muestran comportamiento inteligente analizando su entorno y tomando acciones (con cierto grado de autonomía) para lograr objetivos específicos.

2. **Definición Funcional:** Un sistema es inteligente si posee **autonomía** significativa, riqueza de comportamiento en entornos dinámicos, capacidad de **aprender de la experiencia** y competencia en áreas especializadas.


## 1.1.2 Los 4 Enfoques de la IA
Se clasifica la IA según su objetivo final (compararse con humanos o ser idealmente racional) y su faceta (pensamiento o comportamiento):

|                    | **Como Personas (Humanista)**                                    | **Racionalmente (Idealista)**                                         |
| ------------------ | ---------------------------------------------------------------- | --------------------------------------------------------------------- |
| **Pensamiento**    | **Modelado Cognitivo** (intentar imitar cómo piensa el cerebro). | **Leyes del Pensamiento** (Lógica formal, silogismos).                |
| **Comportamiento** | **Test de Turing** (actuar de forma indistinguible a un humano). | **Agentes Racionales** (actuar para maximizar el resultado esperado). |
|                    |                                                                  |                                                                       |

El Test de Turing tiene como referencia el comportamiento humano.

## 1.1.3 La Triada de la IA Moderna
El auge actual de la IA (desde 2010) se debe a la convergencia de tres factores:

1. **Algoritmos:** Nuevas técnicas de aprendizaje automático (Deep Learning).
2. **Datos:** Disponibilidad masiva de datos (Big Data).
3. **Computación:** Capacidad de procesamiento (GPUs/TPUs).



# 1.2 Explicaciones Paso a Paso
## 1.2.1 Evolución Histórica: Los "Inviernos" y "Primaveras"
La historia de la IA no es lineal, ha pasado por ciclos de optimismo exagerado y decepción5:

1. **Nacimiento (1956):** Conferencia de **Dartmouth**. Se acuña el término "Inteligencia Artificial" por McCarthy, Minsky, et al.6666.
2. **Entusiasmo (1956-1973):** Predicciones optimistas (ej. el Perceptrón que podría "caminar, hablar y reproducirse")7.
3. **Primer Invierno (1974-1980):** Declive por falta de resultados prácticos frente a las promesas.
4. **Sistemas Expertos (1981-1987):** Recuperación comercial.
5. **Segundo Invierno (1988-1993):** Estancamiento.
6. **Relanzamiento y Realismo (1994-Presente):** Éxito basado en datos, aprendizaje profundo y aplicaciones específicas.

## 1.2.2 Paradigmas: Simbólico vs. Subsimbólico
1. **IA Simbólica (Top-Down):**
    - Se basa en reglas explícitas y lógica y árboles de decisión.
    - _Ejemplo:_ Un árbol de decisión para saber qué comió un invitado ("Si comió carne -> No es vegetariano").
    - Es interpretable por humanos.

2. **IA Subsimbólica (Bottom-Up):**
    - Se basa en **Redes Neuronales**. No se programan reglas, se entrena el sistema con ejemplos.
    - Intenta imitar la estructura de las neuronas biológicas.
    - _Ejemplo:_ Deep Learning para reconocimiento de imágenes.



## 1.2.3 La Neurona Artificial (Perceptrón)
El componente básico de la IA subsimbólica es la neurona artificial. Matemáticamente se describe así:

$$Y = f \left( \sum_{i=1}^{m} (W_i \cdot X_i) + b \right)$$

**Desglose de componentes:**
- **$X_i$ (Inputs):** Las señales de entrada (datos).
- **$W_i$ (Pesos / Weights):** La importancia de cada entrada. Es lo que la red "aprende" durante el entrenamiento.
- **$\Sigma$ (Función Suma):** Agrega todas las entradas ponderadas.
- **$b$ (Sesgo / Bias):** Un umbral interno de activación (mencionado como "Internal Activation" en el gráfico).
- **$f(\cdot)$ (Función de Activación):** Decide si la neurona se "dispara" o no, introduciendo no linealidad (permite aprender patrones complejos).
- **$Y$ (Output):** El resultado final de la neurona.

>[!Nota]
>Esto no rallarse que se explica en los siguientes temas, este tema es para que suenen las cosas no para memorizarlo.


# 1.3 Conexiones: "Wetware" vs. Hardware
Una comparación crítica para entender por qué la IA es diferente a la inteligencia biológica:

| **Característica** | **Cerebro Humano (Wetware)**                    | **Computador (Hardware)**                                   |
| ------------------ | ----------------------------------------------- | ----------------------------------------------------------- |
| **Evolución**      | Biológica (lenta, 100k años sin cambios).       | Tecnológica (exponencial, Ley de Moore).                    |
| **Procesamiento**  | Paralelo masivo (10 mil millones de neuronas).  | Serial (muy rápido en secuencia).                           |
| **Fortalezas**     | Percepción, sentido común, aprendizaje general. | Cálculos matemáticos, lógica formal, almacenamiento masivo. |
| **Consumo**        | Muy eficiente (~20 Watts).                      | Muy costoso (Megavatios en supercomputadores).              |
| **Velocidad**      | "Lenta" (disparo neuronal en ms).               | "Rápida" (ciclos de reloj en nanosegundos).                 |

**Conexión clave:** La IA actual intenta emular la capacidad de aprendizaje del cerebro (redes neuronales) utilizando la velocidad de cálculo del hardware para compensar la falta de eficiencia biológica.


# 1.4 Aplicaciones Reales
1. **Juegos de Estrategia (Hitos):**    
    - **Deep Blue (1997):** Vence a Kasparov en ajedrez (fuerza bruta y búsqueda).
    - **AlphaGo (2016):** Vence a Lee Sedol en Go (aprendizaje profundo y refuerzo, un problema mucho más complejo que el ajedrez).

2. **Vehículos Autónomos:**    
    - Uso de sensores complejos: **LIDAR** (láser para mapa 3D), **RADAR** y cámaras.
    - Evolución desde el "DARPA Challenge" hasta coches comerciales (Tesla/Volvo)16161616.

3. **Generación de Lenguaje Natural (NLG):**    
    - **GALIWeather:** Sistema que convierte datos numéricos meteorológicos en predicciones escritas en texto natural (gallego).

4. **Robótica:**
    - **Boston Dynamics:** Robots con equilibrio dinámico y movilidad avanzada (Atlas, Spot)18.

5. **Limitaciones (Predicción Social):**    
    - Caso elecciones EE.UU. 2016: La IA falló al predecir la victoria de Trump basándose solo en "sentimiento en redes", mostrando que el ruido en los datos puede llevar a errores graves19.



# 1.5 Repercusiones Socioeconómicas y Éticas de la IA

## 1.5.1 Contexto: La 4ª Revolución Industrial
La IA no es solo una tecnología aislada, sino el motor de una nueva fase industrial.
- **1ª Revolución:** Vapor y agua (sustitución fuerza animal).
- **2ª Revolución:** Electricidad y producción en masa.
- **3ª Revolución:** Electrónica, internet y automatización simple.
- **4ª Revolución (Actual):** Sistemas Ciber-físicos y **Automatización Inteligente**.

## 1.5.2 Automatización y Empleo
### La Matriz de Automatización
No todos los trabajos se automatizan igual. Se clasifican según la capacidad requerida (Manual vs. Cognitiva) y el tipo de tarea (Sistemática vs. No sistemática):

|**Tipo de Tarea**|**Capacidad Manual**|**Capacidad Cognitiva**|
|---|---|---|
|**Sistemática** (Predecible)|Robots de soldadura y montaje (Fábricas)|Sistemas expertos (Análisis de riesgo bancario)|
|**No Sistemática** (Impredecible)|Robots de exploración en entornos abiertos|Generación de noticias (Periodismo automatizado)|
- _Dato clave:_ Las actividades físicas en entornos predecibles tienen un **81%** de potencial de automatización, mientras que la gestión de personas solo un **9%**.

### Impacto Real (Ejemplos)
- **Manufactura:** La empresa _Changying Precision Technology_ reemplazó al 90% de sus trabajadores con robots, logrando un aumento de producción del 250%.

- **Periodismo:** El "Quakebot" de _Los Angeles Times_ genera noticias sobre terremotos automáticamente usando datos del servicio geológico8888.

### La Paradoja de la Desigualdad
A medida que avanza la tecnología, se observa una paradoja económica:
- La desigualdad **entre países** disminuye (países en desarrollo crecen).
- La desigualdad **dentro de los países** aumenta (brecha entre trabajadores cualificados/propietarios de capital y trabajadores desplazados).

### ¿Es esta vez diferente? (Debate Keynesiano)
Keynes predijo el "desempleo tecnológico". Sin embargo, la revolución de la IA presenta desafíos únicos respecto a revoluciones pasadas:
1. **Velocidad:** El proceso se está acelerando.
2. **Alcance:** Afecta a tareas de nivel cognitivo medio y alto, no solo físico.
3. **Reubicación:** Es difícil reubicar a los trabajadores desplazados en nuevos sectores.


## 1.5.3 Ética y Riesgos Existenciales
### Superinteligencia y la "Explosión de Inteligencia"
Concepto propuesto por **I.J. Good (1965)** y analizado por **Nick Bostrom**:
- **Definición:** Una máquina que supera intelectualmente a cualquier humano.
- **Consecuencia:** Esta máquina podría diseñar máquinas aún mejores, provocando una "explosión de inteligencia" que dejaría atrás a la capacidad humana.
- **El Riesgo:** La primera máquina ultrainteligente es el _último_ invento que el hombre necesita crear, siempre que sepamos cómo mantenerla bajo control.

### Armas Autónomas ("Killer Robots")
Existe un debate ético activo y campañas para detener el desarrollo de armas totalmente autónomas que deciden atacar sin intervención humana (ej. campaña _Stop Killer Robots_).

### Privacidad y Responsabilidad Civil
- **Vigilancia:** Uso masivo de reconocimiento facial y cámaras19.
- **Responsabilidad:** El caso del atropello mortal de un coche autónomo de **Uber** en Arizona plantea quién es el culpable (¿el software, el conductor de seguridad, el fabricante?)20.


## 1.5.4 Regulación: La "AI Act" (Ley de IA de la UE)
La Unión Europea propone un marco regulatorio basado en niveles de riesgo para los sistemas de IA21:

| **Nivel de Riesgo**    | **Ejemplos**                                                                     | **Implicaciones / Sanciones**                                          |
| ---------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Riesgo Inaceptable** | _Score_ social, vigilancia biométrica en tiempo real por gobiernos.              | **Prohibición absoluta**. Multas hasta 6% de ingresos globales o 30M€. |
| **Riesgo Alto**        | Infraestructuras críticas, educación (admisión), justicia, dispositivos médicos. | Evaluación de conformidad obligatoria. Multas hasta 4% o 20M€.         |
| **Riesgo Limitado**    | Deepfakes, Chatbots, sistemas que interactúan con personas.                      | Obligación de **transparencia** (avisar que es una IA).                |
| **Riesgo Mínimo**      | Videojuegos, filtros de spam.                                                    | Sin restricciones específicas (códigos de conducta voluntarios).       |

