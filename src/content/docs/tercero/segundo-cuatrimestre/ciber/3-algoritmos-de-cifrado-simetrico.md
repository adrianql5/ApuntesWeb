---
title: "Algoritmos de Cifrado Simétrico"
---

# 3.1 Servicios Básicos de Seguridad
1. **Disponibilidad:** asegurar que la información/recursos pueden ser utilizados por las partes autorizadas 
2. **Confidencialidad:** asegurar que la información/recursos son vistos sólo por partes autorizadas 
3. **Integridad:** asegurar que la información es modificada únicamente por partes autorizadas 
4. **Autenticación:** asegurar que el origen de la información es quien dice ser 
5. **No repudio:** impedir que alguien niegue haber realizado una acción cuando efectivamente lo ha hecho 
6. **Control de acceso:** garantizar acceso únicamente a partes autorizadas a los recursos


# 3.2 Primitivas criptográficas
- **Sustitución:** reemplazar un conjunto de bits por otro
- **Transposición:** modificar el orden de los bits al crear el texto cifrado para romper cualquier patrón repetido subyacente en texto plano
- **Confusión:** relación funcional compleja entre el par plano/clave y el texto cifrado, de manera que el cambio de un único
- **Difusión:** Se debe distribuir la información de los elementos individuales en el texto plano sobre el texto cifrado completo, de manera que incluso pequeños cambios en el texto plano resulten en cambios grandes en el texto cifrado

# 3.3 Confianza en un criptosistema
Para que un criptosistema sea de confianza debe:
1. Estar basado en elementos funcionales y matemáticas sólidas.
2. Haber sido analizado por expertos competentes y demostrado su robustez. 
3. Haber superado el test del tiempo.


# 3.4 Tipos de Algoritmos de cifrado simétrico
## 3.4.1 Cifradores de Bloque.
El algoritmo de cifrado transforma $n$ bits de texto claro en $n$ bits de texto cifrado. Cada bit del bloque de texto claro tiene efecto en cada bit del bloque de texto cifrado. En principio, cada bloque es independiente y no hay influencia entre bloques implicando que bloques de texto claro idénticos, producen bloques de texto cifrado idénticos. Un error en el texto cifrado influye solo en su bloque.


### Algoritmo DES
DES es un algoritmo de cifrado simétrico por bloques que utiliza una estructura conocida como **Red de Feistel**.
- **Bloque de datos:** Cifra fragmentos de texto plano de **64 bits** para devolver **64 bits** de texto cifrado.
- **Clave:** Utiliza una clave de 64 bits, pero **su longitud efectiva es de 56 bits**. Los 8 bits restantes se usan únicamente para comprobar la paridad (detección de errores) y luego se descartan.
- **Espacio de claves:** Al tener 56 bits efectivos, el número de combinaciones posibles es de $2^{56}$, lo que equivale a unos **72.000 billones** (no 7.200) de claves distintas.

Fue seleccionado como estándar por el gobierno de EE. UU. en 1976. En su época, romperlo por fuerza bruta probando 1000 claves por segundo habría tomado más de 2 millones de años. Sin embargo, con el avance de la computación, su clave de 56 bits quedó obsoleta. En 1998, la máquina "Deep Crack" de la Electronic Frontier Foundation (EFF) logró descifrar un mensaje DES en menos de 3 días.


#### Tipos de Permutación
Antes de ver una ronda por dentro, es importante entender que DES manipula los bits moviéndolos de sitio de tres formas distintas a lo largo del algoritmo:

- **Permutación regular (Straight):** Cambia los bits de orden, pero la cantidad de bits de entrada es igual a la de salida.

- **Permutación de Expansión:** Toma un grupo menor de bits y lo expande replicando algunos de ellos (ej. entra un bloque de 32 bits y salen 48 bits). Se usa para poder cruzar los datos con la clave.

- **Permutación de Elección (Permuted Choice):** Toma un grupo de bits, cambia su orden y elimina algunos (compresión). Se usa fundamentalmente en la generación de las subclaves.

!Pasted image 20260223102826

#### Un ciclo en DES
En cada una de las 16 rondas, la mitad derecha de los datos sufre una serie de transformaciones y se mezcla con una "subclave" específica generada para esa ronda.

Conceptualmente, el flujo de una ronda es este:

!Pasted image 20260223102919

**El ciclo detallado paso a paso:**

1. **Expansión:** La mitad derecha ($R_{i-1}$) de 32 bits pasa por una Permutación de Expansión para convertirse en 48 bits.

2. **Suma de Clave:** Esos 48 bits se suman mediante una operación lógica **XOR** ($\oplus$) con la subclave de 48 bits de esa ronda ($K_i$).

3. **Sustitución (S-Boxes):** El resultado pasa por las Cajas de Sustitución, que comprimen los datos de vuelta a 32 bits (este es el paso de seguridad más crítico).

4. **Permutación:** Se desordenan los 32 bits resultantes.
  
5. **Cruce (El efecto Feistel):** El resultado final se suma mediante XOR con la mitad izquierda original ($L_{i-1}$).

6. **Intercambio:** La antigua mitad derecha pasa a ser la nueva mitad izquierda intacta, y el resultado del paso 5 se convierte en la nueva mitad derecha.

!Pasted image 20260223102942

#### Cajas de Sustitución (S-boxes)
Las S-boxes son el único componente "no lineal" de DES; sin ellas, el algoritmo sería fácilmente rompible con álgebra básica.

Después de mezclar los datos con la clave, tenemos un bloque de 48 bits. Este bloque se divide en **8 fragmentos de 6 bits**. Cada fragmento entra en una S-box diferente (de la S1 a la S8).

La S-box busca en una tabla interna y devuelve un valor de **4 bits**. Al juntar las salidas de las 8 cajas (8 cajas $\times$ 4 bits), volvemos a tener el tamaño estándar de **32 bits** necesario para continuar.
!Pasted image 20260223103002

#### Variantes de DES
Debido a la vulnerabilidad de la clave original de 56 bits, la industria tuvo que buscar soluciones para alargar la vida útil de DES antes de que AES estuviera listo, aplicando el algoritmo varias veces seguidas:

- **Double DES (2DES):** Cifra el mensaje dos veces con dos claves distintas (112 bits en total). _Nota: Resultó ser vulnerable a un ataque llamado "Meet-in-the-Middle", por lo que su seguridad real era equivalente a solo 57 bits. Casi no se usó._

- **Triple DES (3DES) de dos claves:** Utiliza dos claves de 56 bits. Cifra con la clave 1, **descifra** con la clave 2 (lo que enreda aún más los datos) y vuelve a cifrar con la clave 1. Fuerza efectiva de 80 bits.

- **Triple DES (3DES) de tres claves:** El más seguro de la familia. Utiliza tres claves distintas en formato Cifrar-Descifrar-Cifrar (E-D-E). Otorgó una fuerza efectiva de 112 bits y fue el estándar de facto en la industria bancaria durante años.


### AES (Advanced Encryption Standard)
AES es un algoritmo de cifrado por bloques simétrico. A diferencia de algoritmos más antiguos que cifran bit a bit, AES procesa los datos en **bloques fijos de 128 bits** (que se organizan en una matriz de $4 \times 4$ bytes llamada "Matriz de Estado").

La seguridad y la complejidad de AES dependen del tamaño de la clave elegida, lo cual dicta directamente el número de "rondas" (iteraciones o ciclos de transformación) que sufrirá el texto plano:
- **Clave de 128 bits:** 10 rondas ($n = 10$)
- **Clave de 192 bits:** 12 rondas ($n = 12$)
- **Clave de 256 bits:** 14 rondas ($n = 14$)

A excepción de la última ronda (que omite un paso) y de una fase inicial de preparación, cada ronda de AES repite exactamente el mismo flujo de cuatro operaciones secuenciales.

!Pasted image 20260223103353

Es el estándar para información sensible "no clasificada".

#### Pasos del Algoritmo
A continuación se detalla qué ocurre dentro de esa matriz de estado de $4 \times 4$ bytes en cada etapa funcional:

1. **SubBytes (Sustitución de Bytes)**
Aporta la **confusión** al algoritmo. Es una sustitución no lineal donde cada byte individual de la matriz de estado se reemplaza por otro diferente. Para saber qué byte poner, se hace una búsqueda en una tabla predefinida llamada **S-Box** (Caja de Sustitución).

!Pasted image 20260223103526
_En la imagen:_ El byte $a_{2,2}$ entra en la función $S$ y se transforma en un byte completamente distinto, $b_{2,2}$.

2. **ShiftRows (Desplazamiento de Filas)**
Aporta la primera capa de **difusión**. Es una transposición simple que mezcla los bytes dentro de sus propias filas moviéndolos de forma cíclica hacia la izquierda.
- **Fila 0:** No cambia.
- **Fila 1:** Se desplaza 1 posición a la izquierda.
- **Fila 2:** Se desplaza 2 posiciones a la izquierda.
- **Fila 3:** Se desplaza 3 posiciones a la izquierda.
- _En la imagen:_ Observa cómo el último byte de la segunda fila ($a_{1,3}$) "da la vuelta" y pasa a ser el primero tras el desplazamiento.

!Pasted image 20260223103538

3. **MixColumns (Mezcla de Columnas)**
Aporta la difusión principal y más pesada. Transforma cada columna de la matriz de estado de forma independiente. Matemáticamente, multiplica cada columna por una matriz fija operando en un Cuerpo de Galois ($GF(2^8)$). El resultado es que cada nuevo byte de una columna depende de **todos** los bytes de esa misma columna anterior.
- _Nota importante:_ Este paso **no se ejecuta** en la última ronda del algoritmo.    
- _En la imagen:_ La columna entera pasa por la función polinómica $c(x)$ para generar una columna completamente nueva y mezclada.

!Pasted image 20260223103548

4. **AddRoundKey (Suma de la Clave de Ronda)**
Es el único paso que involucra directamente la clave de seguridad. Se toma la "subclave" específica generada para esta ronda actual y se aplica una operación lógica **XOR** ($\oplus$) bit a bit contra la matriz de estado.

- _En la imagen:_ Cada byte de los datos ($a_{2,2}$) se suma mediante XOR con su byte correspondiente en la matriz de la subclave ($k_{2,2}$) para dar el resultado final del ciclo ($b_{2,2}$).

!Pasted image 20260223103609

#### Modos de uso de un Cifrado de Bloque
Cuando utilizamos cifrado de clave simétrica por bloques (como AES), el algoritmo cifra los datos en fragmentos de tamaño fijo (por ejemplo, 64 o 128 bits). El "Modo de Operación" define cómo se procesan estos bloques, especialmente cuando el mensaje es más largo que un solo bloque.

1. **Electronic Code Book Mode (ECB): El problema de la independencia:**
En el modo ECB, **cada bloque se cifra de modo totalmente independiente** del resto, utilizando la misma clave. Es como usar un diccionario de traducción directa.
- **Funcionamiento:** Texto Plano $\rightarrow$ Cifrado $\rightarrow$ Texto Cifrado.
- **Debilidad Principal:** Las repeticiones en el texto plano originan **exactamente el mismo texto cifrado** (si se usa la misma clave). Esto no oculta los patrones de los datos subyacentes.

Al no ocultar los patrones, mensajes con inicios, finales o campos comunes proporcionan mucha información visual a un atacante, incluso sin descifrar el mensaje.
!Pasted image 20260223105403

Como ECB no vincula un bloque con el anterior, un atacante puede realizar un ataque de **manipulación de bloques (Copy & Paste)**.

Imagina que "Zelda" es la atacante. Analizando el tráfico anterior, ella sabe que cada vez que recibe dinero, el bloque de la cuenta destino se cifra como `cd4wx7`. Esto es lo que hace:
1. Intercepta la transferencia 1. El bloque de destino (Brian) es `grd#d#`.
2. Intercepta la transferencia 2. El bloque de destino (Drew) es `gyl615`.
3. **El cambiazo:** Zelda simplemente borra los bloques de Brian y Drew, y **pega su propio bloque cifrado** (`cd4wx7`) en la columna "To acct". El sistema lo descifrará correctamente como "Zelda" sin dar error.

!Pasted image 20260223105458


2. **Cipher Block Chaining Mode (CBC): La solución mediante encadenamiento**
Para evitar que se vean patrones y que se puedan intercambiar bloques, surge el modo CBC. El objetivo es que **el cifrado de cada bloque dependa del contenido del bloque anterior**.
- **Concepto clave:** Antes de cifrar un bloque de texto plano, se le aplica una operación XOR ($\oplus$) con el bloque de _texto cifrado_ anterior.
- **El problema del primer bloque:** Como el primer bloque no tiene un bloque previo con el que hacer XOR, se requiere un **Vector de Inicialización (IV - Initialization Vector)**. Este IV debe ser aleatorio o impredecible para cada ejecución, garantizando que el mismo mensaje cifrado dos veces dé resultados completamente distintos.


**Cifrado en modo CBC:**
Observa cómo ahora, aunque la fecha sea "1 Aug" en ambas transacciones (mismo texto plano), el resultado cifrado es completamente distinto gracias al uso de diferentes Vectores de Inicialización (Init. Vect. 1 y 2) y al encadenamiento en cascada.

!Pasted image 20260223110205

!Pasted image 20260223110215
!Pasted image 20260223110224

**Descrifrado en modo CBC:**
!Pasted image 20260223110306