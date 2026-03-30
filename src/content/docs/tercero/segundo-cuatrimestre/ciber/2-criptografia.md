---
title: "Criptografía"
---

# 2.1 Criptografía Simétrica

## 2.1.1 Conceptos Básicos
El objetivo de la **criptografía** es **ocultar el significado** del mensaje que se quiere transmitir para que sólo su **destinatario** pueda interpretarlo correctamente.

En criptografía clásica las técnicas más utilizadas son:
- **Transposición:** basada en reordenar las letras de un mensaje. Por ejemplo, la **escítala espartana**, que era una vara de madera sobre la que se enrollaba una tira de pergamino de manera que si alguien intercepta el mensaje no podrá descifrarlo si no dispone de una vara adecuada
- **Sustitución:** basada en recodificar el alfabeto de manera que cada letra se le asigne otra, creando así un nuevo alfabeto. Por ejemplo, el **cifrado ceśar**, que consistía en sustituir cada letra del alfabeto por la situada $n$ posiciones más adelante.

- **Criptología:** criptografía y criptoanálisis
- **Criptografía:** arte y ciencia de mantener mensajes seguros
- **Criptoanálisis:** arte y ciencia de romper mensajes seguros
- **Criptosistema:** conjunto de dispositivos de cifrado y descifrado, acompañado de un protocolo de transmisión de claves
- **Algoritmos criptográficos:** función que realiza el proceso de cifrado y descifrado, junto con la interrelación con las claves.
- **Claves:** parámetros que inicializan y personalizan los algoritmos

### Esquema de cifrado y descifrado
- $m$: mensaje en claro
- $c$: mensaje cifrado
- $k$: clave
- $E$: operación de cifrado
- $D$: operación de descifrado

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-1.png)

1. $c=E_k(m)$
2. $m=D_k(c)$
3. $D_k(E_k(m))=m$
- Esta es la definición de un **cifrado simétrico**.

Por ejemplo, **Cifrado César:**
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-2.png)

## 2.1.2 Criptoanálisis
### Objetivos del criptoanálisis
- **Romper** (descifrar) un único mensaje
- Reconocer **patrones** en mensajes cifrados
- **Inferir** algún significado sin llegar a romper el cifrado, por el **tamaño** o la **frecuencia** de los mensajes.
- **Deducir la clave** para romper un mensaje y quizás mensajes sucesivos.
- Encontrar **debilidades** en la **implementación** o en el **entorno** de uso del cifrado por parte del emisor.
- Encontrar **debilidades generales** en un algoritmo de cifrado.

### Ataques
Se asume que el criptoanalista conoce el algoritmo empleado, pero no la clave. Existen 3 tipos de ataques:
- **Solo texto cifrado:** el analista sólo dispone de texto cifrado y su meta es descubrir el texto plano (y posiblemente la clave).
- **Texto plano conocido:** el analista dispone del texto cifrado y su texto plano correspondiente, la meta es averiguar la clave.
- **Texto plano elegido:** el analista puede suministrar textos planos y obtener el correspondiente texto cifrado, la meta es descubrir la clave.

Hay 2 bases para los ataques:
- Ataques **matemáticos:** basados en el análisis de las matemáticas o de los algoritmos subyacentes
- Ataques **estadísticos:** basados en hacer suposiciones sobre las letras, pares de letras, tripletas, etc.
	- Examinan el texto cifrado correlacionando **propiedades** con las **suposiciones**
	- Buscan **patrones**, similitudes y discontinuidades entre múltiples **mensajes cifrados de la misma forma**.

El **cifrado de sustitución** puede ser atacado por **fuerza bruta** si el espacio de claves es lo suficientemente pequeño. El cifrado César solo tiene 27 posibles claves.

## 2.1.3 Cifrados Básicos
### Sustitución Monoalfabética Genérica
La **sustitución monoalfabética genérica** consiste en construir el alfabeto cifrado colocando **al azar** las letras del alfabeto llano. Así existen $27!=10^{28}$ posibles alfabetos cifrados.

La **frecuencia de aparición de las distintas letras** en un idioma permite descubrir la letra más frecuente en el texto cifrado sucesivamente. Por tanto, se deben **evitar patrones** en el mensaje cifrado y **hacer la clave más compleja**.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-3.png)

### Cifrado de Vigènere (polialfabético)
El **cifrado de Vigenère** consiste en realizar varios cifrados de **César**, pero con **más de una letra** en la clave. Aunque ahora mismo está roto en dos pasos (Babbage):
1. **Estadísitcas** sobre la **frecuencia** de distribución de **series de letras repetidas** y la **separación entre repeticiones** para descubrir la **longitud de la clave**, $n$.
2. División del texto en $n$ bloques, correspondiendo cada uno a una cifra **monoalfabética clásica.**

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-4.png)

### Enigma
**Enigma** fue una máquina criptográfica costruida en 1920 por Arthur Scherbius. Inicialmente era una versión mecanizada del cifrado **monoalfabético**, pero al girar una posición tras codificar cada letra se consigue el **polialfabético**.


Hay varas modificaciones de esta máquina:
- Con 3 modificadores encadenados:$26^3=17576$ alfabetos posibles
- Con un reflector y un clavijero y modificadores intercambiables: $10000$ billones

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-5.png)

### Cuaderno de uso único
El **cuaderno de uso único** es un cifrado de Vigenère con **clave aleatoria** al menos **tan larga como el mensaje**.

Es **probablemente irrompible**, ya que un texto de longitud $n$ se puede corresponder con cualquier cadena de longitud $n$, por lo que probarlas todas es inviable.

La **clave debe ser aleatoria** para evitar que el cifrado se rompa generándola. El uso de **generadores de números pseudo-aleatorios** supone una debilidad, ya que si no se implementan bien se puede deducir la clave generada.


## 2.1.4 Primitivas Criptográficas
- **Sustitución:** reemplazar un conjunto de bits por otro
- **Transposición:** modificar el orden de los bits al crear el texto cifrado para romper cualquier patrón repetido subyacente en el texto plano.
- **Confusión:** relación funcional compleja entre el par texto plano/clave y el texto cifrado, de manera que el cambio de un único carácter (bit) en el texto plano cause cambios no predecibles en el texto cifrado resultante
- **Difusión:** se debe distribuir la información de los elementos individuales en el texto plano sobre el texto cifrado completo, de  manera que incluso pequeños cambios en el texto plano resulten en cambios grandes en el texto cifrado
- Las **técnicas criptográficas** se usan como medida para asegurar la **confidencialidad** dándole acceso a las claves solo a las partes autorizadas


Para que un criptosistema sea de **confianza** debe:
- Estar basado en **elementos funcionales** y **matemáticas sólidas**
- Haber sido analizado por **expertos competentes** y demostrado su **robustez**
- Haber superado la **prueba del tiempo**.


## 2.1.5 Cifradores de Bloque
**Cifradores de bloque:** el mensaje se separa en bloques de $n$ bits de texto claro que el algoritmo filtra por separado para devolver $n$ bits de texto cifrado.
- En principio, cada **bloque es independiente** y no hay influencia entre ellos, así que bloques de texto claro **idénticos** producen bloques de texto cifrado **idénticos**.
- Cada **bit** del bloque de **texto** claro tiene **efecto** en **cada bit** del bloque de **texto cifrado**.
- Un **error** en el texto cifrado influye **sólo en su bloque**.

### Algoritmo DES
El algoritmo de cifrado **DES** consiste en un cifrado de bloque usando una clave de $64\text{ bits}$ y cuya salida son $64 \text{ bits}$ de texto cifrado. 

Realiza **substitución** (confiere propiedades de difusión) y **transposición**/permutación (confiere propiedades de confusión) sobre los bits.

Usa una **clave** efectiva de $56 \text{ bits} + 8 \text{ de paridad}$ , $64 \text{ bits}$ en total.
- Por tanto. hay $2^{56}=7200 \text{ billones}$  de calves posibles, por lo que romperlo por fuerza bruta llevaría más de 2 millones de años $1000 \text{claves/segundo}$
- En 1998 la Electronic Frontier Foundation fabricó una máquina que descifraba **DES** en menos de 3 días.

El proceso de cifrado consta de **16 iteraciones**, cada una con una clave de iteración generada a partir de la suministrada por el usuario.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-6.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-7.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-8.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-9.png)

**Variantes de DES**
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-10.png)


**Evolución de los Algoritmos:**
- Varios desafíos para descifrar mensajes cifrados con DES resueltos mediante computación distribuida.
- En enero de 1997 el NIST solicitó algoritmos para sustituir al DES. Diseñados para resistir los ataques que habían tenido éxito contra DES.
- En agosto de 1998 se pre-seleccionarion 15 algoritmos.
- En abril de 1999 se preseleccionaron 5 finalistas: MARS, RC6, Rigndael, Serpente y Twofish.
- En octubre de 2000 se seleccionó Rijndael como AES. Diseñado en Bélgica por Joan Daemen y Vicent Rijmen.

### AES (Advanced Encryption Standard)
El **AES** actual es un algoritmo de cifrado de bloque de $128 \text{ bits}$. Puede utilizar **3 tamaños diferentes de clave**, cada uno con un **número de rondas diferente**.
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-16.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-17.png)


- En **ECB** (Electronic Code Book Mode, mode de uso de un cifrado en bloque) **se cifra cada bloque de manera independiente**.
- **Repeticiones** en el texto plano cifradas con la misma clave generan el mismo texto cifrado.
- La solución es el **encadenamiento**.

#### CBC
El **CBC** (CIpher Block Chaning Mode) usa encadenamiento, de manera que el cifrado de cada bloque depende del contenido del bloque previo además del suyo. Realiza un **XOR** de cada bloque con el bloque cifrado previo. Requiere un **vector de inicialización** para el primer bloque.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-18.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-19.png)![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-20.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-21.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-22.png)

## 2.1.6 Cifradores de Flujo
**Cifradores de flujo:** en cada paso entra un bit (o byte) del mensaje en el cifrador y sale un bit (o byte) de texto cifrado. Funcionamiento:
1. A partir de una semilla se genera una **secuencia** (pseudoaleatoria) del **mismo tamaño** que el mensaje.
2. La secuencia cifrante se **combina** con el mensaje (por ejemplo, con una XOR)
3. **Ambos** extremos **comparten la semilla,** de manera que el receptor pueda usarla para generar otra vez la clave y descifrar el mensaje

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-23.png)

Condiciones para una **clave segura:**
- **Período:** la clave deberá ser tanto o más larga como el mensaje. En la práctica, con una semilla de 120-250 bits se generan periodos superiores a 1035.
- **Distribución de bits:**
	- Distribución **uniforme** de unos y ceros que represente una secuencia pseudoaleatoria.
	- Distribución **estadística** de **rachas** de dígitos (bits iguales entre 2 bits distintos).

### Propuesta de Cifrador de Vernam (1917)
Esta propuesta se basa en una secuencia cifrante **binaria y aleatoria** $S$ que se obtiene de una clave secreta $K$ compartida por emisor y receptor. Se usa la función **XOR** para cifrar y descifrar el mensaje.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-25.png)

### Ejemplo de Generador Pseudoaletorio
0. Inicialmente el registro contiene el valor de la clave.
1. En cada iteración:
	1. Se desplaza el registro $1 \text{ bit}$ a la derecha
	2. El bit $B_1$ se toma como salida
	3. El nuevo bit $B_n$ se obtiene con la función $f(B_n, B_{n-1},..., B_1)$

Hay que escoger la **función** $f$ de manera que:
- **No** se **repitan** las secuencias cortas en la salida
- **No** sea **previsible** la salida
- Sea **fácilmente** implementable

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-26.png)



### Algoritmo RC4 (Ron Rivest 1987)
- Este algoritmo se basa en usar **claves de longitud variable.** 
- Software **propietario** (privado)(pero en septiembre del 94 se filtró a internet).
- Empleado en su momento en SSL, WEP y WPA. 
- Diez veces más **rápido** que **DES**.
- **Debilidades** en la **implementación** que llevaron a ataques en WEP y cifrado de ficheros MSOffice.

### Algoritmo A5 (no publicado, propuesto en 1994)
- Este algoritmo se solía usar para el cifrado del enlace entre el abonado y la central de un teléfono móvil tipo GSM.
- Varias debilidades originaron distintos tipos de ataques. Consecuencia típica en el mundo de la criptografía cuando los desarrolladores de algoritmos no hacen público el código fuente.


### CTR
- **CTR** es una alternativa al encadenamiento en cifrado de bloque que usa **contadores** y **un vector aleatorio**.
- Es una **combinación** de cifrado de **bloque** y de **flujo**.
- Mejora la **eficiencia** ya que se puede **paralelizar el proceso**.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-27.png)


### GCM
- **Recomendado** por el **NIST** para cifrado y autenticación
- En combinación con AES, se utiliza, por ejemplo en el protocolo TLS. Se usa AES para cifrar un IV y un contador usando la clave simétrica AES y a continuación se usa el resultado como XOR con texto plano.
- Existen **vulnerabilidades** si no se implementa correctamente.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-28.png)

## 2.1.7 Problemas de la Criptografía Simétrica
**Distribución de claves:**
- Debe haber **una para cada par de usuarios,** por lo que para $n$ usuarios se necesitarían $\frac{n \times(n-1)}{2}$ claves.
- Se necesita un **canal seguro** para distribuirlas

Riesgo de **ataques de fuerza bruta:** conlleva la necesidad de cambias las claves frecuentemente.


# 2.2 Criptografía de Clave Pública
## 2.2.1 Conceptos Básicos
### Algoritmo de Diffie-Hellman
- El algoritmo de **protocolo de intercambio de clave simétrica** fue desarrollado en 1976 para acordar una clave común entre 2 iterlocutores. Está basado en las propiedades de los **logaritmos discretos**.

- Se calcula usando dos enteros $n$ y $a$ y un número primo $p$ tal que $n=a^k mod (p)$. Soluciones conocidas para $p$ pequeños, pero **computacionalmente inviables** con $p$ **grande**.

- Necesita de **autenticación adicional** ya que es vulnerable a ataques **man-in-the-middle** 

- Se usa en SSL, SSH, SecureFPT, IPSec, etc.

**Algortimo:**
1. Alice y Bobo acuerdan un número primo $p$ y un número $a$ **públicamente:** $1 < a < p-1$ ($p=11$ y $a=7$)
2. Alice escoge un número aleatorio $x$ ($3$) y envía a Bob $A=a^x mod (p)$ ($2$)
3. Bob escoge un número aleatorio $y$ ($6$) y envía a Alice $B=a^y mod(p)$ ($4$)
4. Alice calcula $K=B^x mod(p)$ ($9$)
5. Bob calcula $K=A^y mod(p)$ ($9$)
6. A partir de ese momento pueden emplear la misma clave $K$.

![](image-29.png|298)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-30.png)


### Fundamentos de los Algoritmos de Clave Pública
La idea básica de la **criptografía de clave pública** es usar 2 claves por usuario:
- Una **clave privada** o secreta ($kS$) conocida únicamente por el individuo.
- Una **clave pública** ($kS$) disponible para todo el mundo.
- Ambas claves son **inversas** en cierta forma.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-31.png)


1. $c=E_{kP}(m)$
2. $m=D_{kS}(c)$
3. $D_{kS}(E_kP(m))=m$

**Requisitos:**
- Debe ser **computacionalmente sencillo cifrar** o **descifrar** un mensaje dada la clave adecuada básica
- Debe ser **computacionalmete imposible determinar** la $kS$ a partir de la $kP$
- Debe ser **computacionalmente imposible determinal** la $kS$ mediante **ataques de texto claro** elegido


**Servicios de Seguridad:**
- **Confidencialidad:** cifrar usando la $kP$, descifrar usando la $kS$
- **Integirdad/autenticación/no repudio:** cifrar usando la $kS$, descifrar usando la $kP$

## 2.2.2 Algoritmo RSA
El **algoritmo RSA** usa un cifrado por exponenciación basado en la **dificultad** de **factorizar primos grandes** y de **calcular raíces i-ésimos** discretas con **módulo grande**.

Dos números son **primos relativos** si **no comparten factores** entre sí.

La función $\phi(n)$ devuelve el **número de enteros positivos menores** que $n$ y que son **primos relativos** con $n$. Ejemplo:
$$\phi(10)=4$$
Porque $1, 3,7,9$ son primos relativos con $10$


0. Se eligen dos números primos muy grandes $p$ y $q$
1. Se calcula $n=p*q$, entonces $\phi(n)=(p-1)*(q-1)$ 
2. Se elige $e<n$ tal que $e$ y $\phi(n)$ son primos entre sí, entonces $mcd(e, \phi(n))=1$ 
3. Se calcula $d$ tal que $e*d \space mod(\phi(n))=1$ 

$kP=(e,n)$ y $kS=d$
 $$c=m^emod(n)$$
 $$m=c^dmod(n)$$
 $$(m^emod(n))^d mod(n) = m$$

- **No** se necesita un **canal seguro** para intercambiar las claves
- Bastan un **par de claves por usuario**
- Se necesitan **claves muy grandes** (con RSA, se recomienda al menos 2048 bits)
- **Proceso** de cifrado/descifrado **lento** (en comparación con los algoritmos de cifrado simétrico). **Límites** en el **tamaño** de la información a cifrar.
- Se requiere de un tercero de confianza.

### Servicios de Seguridad
- **Autenticación:** sólo el propietario de la $kS$ la conoce, de modo que un texto cifrado con esa clave debe haber sido generado por el propietario
- **Confidencialidad:** sólo el propietario de la $kS$ la conoce, de modo que un texto cifrado con la $kP$ correspondiente sólo puede leerlo el propietario de la $kS$.
- **Integridad:** el mensaje cifrado no puede modificarse de forma indetectable sin conocer la $kS$.
- **No repudio:** un mensaje cifrado con una $kS$ necesariamente viene de quien la conoce.


### Advertencias
Las **claves** deben ser lo suficientemente **grandes** para que los cálculos de descifrado sin conocer la $kS$ sean irrealizables en tiempo finito. Estos cálculos son **factorizar** $n$ en primos para obtener $kS$ a partr de $kP$ o **calcular raíces i-ésimas** en módulo grande para descifrar sin conocer la $kS$

Los mensajes deben cifrarse en **bloques grandes** para evitar el  descifrado con **técnicas estadísticas** o la **alteración del mensaje**.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-32.png)


## 2.2.3 Criptografía Híbrida
La **criptografía híbrida** se basa en usar la criptografía de **clave pública** para **intercambiar** una **clave de sesión simétrica**. Se suele usar en el protocolo **TLS:**
- Clave pública RSA para autenticación
- Diffie-Hellman para intercambio de clave simétrica
- Cifrado simétrico para intercambio de infoRmación

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-33.png)

## 2.2.4 Evolución de la criptografía de Clave Pública
- Debido a la aparición de la **computación cuántica**, se hizo posible implementar el algoritmo de Shor para **descomponer en factores primos números grandes**. 
- Como solución, se trató de **incrementar** el tamaño de **clave RSA**, los cual **disminuyó** su **eficiencia**
- EL tamaño de **clave** de **curva elíptica** es mucho **menor** que el de RSA (256 bits en una curva elíptica equivalen a una clave RSA de 3072) por lo que se obtienen **operaciones más eficientes** para un **mismo nivel de seguridad**.

## 2.2.5 Intercambio de Claves de Curva Elíptica
El **intercambio de claves de curva elíptica** permite que dos partes acuerden una $kS$ sobre un **canal inseguro** usando una **curva elíptica conocida públicamente y un punto generador** $G$.

Las claves públicas de cada extremo son $A$ y $B$ y las privadas $a$ y $b$.
0. Ambos extremos calculas sus **claves públicas** $A=a*G$ y $B=b*G$
1. Ambos extremos calculan el **mismo secreto** $(a*(b*G)=b*(a*G))$
	1. Alice: $S=a*B$
	2. Bob: $S=b*A$
2. El secreto obtenido se usa para **derivar la clave simétrica** (AES) que se usará para cifrar los mensajes.


- Un atacante no sería capaz de obtener $a$ o $b$ a partir de $A$ y $B$ ya que para ello debería **resolver** el **logaritmo discreto en curvas elípticas** (computacionalmente intratable)
- Es importante elegir **curvas elípticas estadarizadas** y de las que se haya **verificado su robustez**.
- Por sí solo, este algoritmo **no cifra ni autentica** por lo que se usan mecanismos adicionales.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-35.png)


# 2.3 Funciones Hash y Firma Digital.
Las **Funciones de Resumen** se usan para **comprobar** si un bloque ha sido **modificado**.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-36.png)

## 2.3.1 Funciones Hash Criptográficas
La función de **resumen criptográfico** (o hash) se define como una funcion $h:A\rightarrow B$ que:

- Para cualquier $x \in A, h(x)$ es **fácil** de calcular.
- Para cualquier $y \in B$, es **computacionalmente intratable** encotnrar $x \in A$ tal que $h(x)=y$
- Es **computacionalmente intratable** encontrar dos entradas $x, x' \in A$ tales que $x \neq x'$ y $h(x)=h(x')$
- El resumen debe ser **corto** y siempre de la **misma longitud**
- El algoritmo debe ser **irreversible** (una sola vía)

Usos:
- Chequeo de **integridad**
- **Autenticación**
- **Cifrado** y **firma digital** en sistemas de **clave pública**
- Protocolos de **comunicación**
- Almacenamiento de **contraseñas**

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-37.png)


### Colisiones 
Si $x \neq x'$ y $h(x)=h(x')$,  $x$ y $x'$ presentan una **colisión**.
- **Principio del casillero:** si tenemos $n$ contenedores para $n+1$ objetos, al menos un contenedor tendrá 2 objetos dentro. Si existen 32 ficheros y 8 valores de resumen posibles, cada valor corresponde al menos a 4 ficheros.
- Las funciones de resumen criptográfico deben ser **resistentes frente a la búsqueda de colisiones**.

### Algoritmos de Resumen
Resúmenes criptográficos **con clave:** se usa una clave criptográfica para obtenerlos (MAC, Message Autthentication Code). 
	DES en modo de encadenamiento

Resúmenes criptográficos **sin clave:** no requieres de una clave criptográfica.
	MD5 Y SHA-1 son los más conocidos pero ya no se consideras seguros


**MD5 (Message Digest 5)**
- Procesa los mensajes de **entrada** en bloques de **512** bits y produce un **resumen** de 128.
- Algoritmo den **desuso** por presentar **debilidades**

**SHA-1 (Secure Hashing Algorithm 1)**
- Procesa los mensajes de **entrada** en bloques de **512** bits y produce un **resumen** de **160** bits
- Desde 2017 ya **no** se considera **seguro** para determinados usos.

**Familia SHA-2**
- Procesa los mensajes de entrada en bloques de 512 o 1024 bits y produce resúmenes de 224, 256, 384 o 512 bits
- Es la familia **más utilizada** en la actualidad

**Familia SHA-3**
- Utiliza una **aproximación diferente** a la familia SHA-2
- Variantes → SHA3-224, SHA3-256, SHA3-384, SHA3-512


![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-38.png)


## 2.3.2 Firma Digital
La **firma digital** pretende garantizar la **confidencialidad** del mensaje de la misma manera que una firma manuscrita lo hace en el mundo real. La forma general de obtener firmas digitales es usando **criptografía de clave pública**.
1. El **firmante** calcula una firma usando la **clave privada**
2. **Otros** pueden usar la correspondiente **clave pública** para verificar que la firma procede de la clave privada asociada.

La firma digital **debe ser:**
- **Infalsibicable:** nadie puede producir la firma sin la clave privada del firmante, solo el firmante puede firmar
- **Auténtica:** el receptor puede determinar que la firma realmente procede del firmante
- **No alterable:** ni el firmante, ni el receptor, ni ningún tercero puede modificar la firma sin que la manipulación sea evidente
- **No reutilizable:** cualquier intento d reutilización de una forma previa será detectado por el receptor.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-39.png)

La firma digital **garantiza:**
- **Autentificación:** el remitente empleó su calve privada, es decir, es quien dice ser
- **Integridad:** el mensaje no cambió durante la transmisión
- **No repudio:** el remitente no puede negar que fue él quien envió el mensaje.


![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-40.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-41.png)

# 2.4 Infraestrucutra de Clave Pública: KPI
## 2.4.1 El Problema de la Confianza
En el **mundo real** para identificar a las personas se usa un DNI o pasaporte, que son **documentos**, emitidos por **una autoridad de confianza** que hace tanto al documento como a la persona que lo por ta creibles.

En el **mundo digital** se usa la $kS$ para firmar datos, de manera que como sólo su dueño puede acceder a ella y usarla se **demuestra su intervención** en el proceso. Para **comprobar** que se usó la $kS$ de un usuario, otros **usan** su $kP$. Para distribuir una $kP$ de manera segura se puede usar un **certificado** emitido por una autoridad certificadora, en la que se confía para este fin.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-42.png)

## 2.4.2 Certificados Digitales
Un **certificado digital** son los **datos publicos** del usuario **firmados por la correspondiente CA**. Contiene:
- **Identidad** del usuario
- $kP$ del usuario
- Fecha de **emisión** del certificado
- Información adicional

Ejemplo de uso:
1. Bill obtiene de Carlos (CA) el certificado de Amy
2. Si conoce la $kP$ de Carlos, puede descifrar el certificado (verificar su firma)
3. Ahora Bill tiene la $kP$ de Amy

Bill ha necesitado la $kP$ de Carlos para validar el certificado, por tanto el problema se ha desplazado un nivel hacia arriba.

## 2.4.3 Infraestructura PKI
La **infraestrucutra de clave pública** se usa para **organizar** las $kP$, $kS$, **certificados** y **CA** de manera gestionable, flexible y segura. Se usa **criptografía de clave pública** para asociar una **identidad** a una $kP$ (la de clave simétrica no sirve para esto ya que todas las claves son compartidas). Una **asociación errónea** implica que **no** habrá **privacidad** entre sujetos.

Los **componente** de un sistema PKI son:
- **Usuario:** puede ser una persona, máquina, programa ...
- **Autoridad Certificadora(CA):** entidad que se encargar de emitir los certificados
- **Autoridad de Registro(RA):** entidad que facilita el registro de usuarios (opcional).
	- Puede generar el par de claves privada/pública
	- Permite realizar una prueba de posesión, que consiste en comprobar que el solicitante posee la clave privada correspondiente.
- **Repositorio de certificados**
- **Autoridad de Validación (VA):** entidad que se encarga de validar los certificados online (opcional)
- **Autoridad de Sellado de Tiempos (TSA):** entidad que se encarga de sellar fecha y hora de transacciones (opcional)
- **Hardware criptográfico**
- **Tarjetas criptográficas**

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-43.png)

Las **acciones** más habituales de un sistema PKI son:
- **Registro:**
	- Distintos niveles de autentificación del usuario
	- Distintas posibilidades para generar y almacenar el par de claves
- **Servicio de recuperación de claves (opcional)**
	- Empleado que deja la empresa y destruye su clave privada
	- Mandato judicial
- **Revocación de certificados:** gestión de las CRLs (listas de certificados revocados)
- **Certificación cruzada**


## 2.4.4 Certificados Digitales
### CERTIFICADOS DIGITALES X-509 V3
• **Versiones 1 y 2** (X.500) → C (Country), O (Organization), OU (Organization Unit) (pueden aparecer varios niveles), CN (Common Name). Por ejemplo C=es, O=USC, OU=ETSE, OU=DEC, CN=Puri Cariñena

- **Versión 3:** permite varias posibilidades
	- Nombre X.500.
	- Dirección de correo. 
	- Nombre de dominio. 
	- Identificador URL. 
	- Dirección IP. 
	- Otros nombres definidos y registrados. 
	- Varias opciones a la vez
	- Algunos elementos del estándar **X.509v3**: 
		- Versión. 
		- Número de serie. 
		- Identificador del algoritmo de firma, algoritmo de “hash”. 
		- Nombre del emisor: identifica unívocamente al emisor. 
		- Periodo de validez.  
		- Nombre del sujeto → identifica unívocamente al sujeto (obligatoria). 
		- Clave pública del proceso (obligatoria). 
		- Firma → hash cifrado.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-44.png)

### Generación de Certificados
1. En la **tarjeta** de usuario (o en su PC) se genera **un par de claves** $kP$ y $kS$. La $kS$ se protege con un **PIN** y **nunca sale** de la tarjeta (o almacén de software seguro del equipo)
2. Se envía la $kP$ a la **CA** (formato PKCS#10) **solicitando un certificado**.
3. La **RA** (opcional) **verifica la idetidad** del usuario y **proprociona a la CA dichos datos** junto con su aprobación
4. La **CA** junta la $kP$, los **datos** del usuario y sus **políticas** y los **firma** con su $kS$ para formar el certificado digital
5. La **CA** envía el certificado al usuario (PKCS#7) y éste se carga en la **tarjeta** (o almacén software).

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-45.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-46.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-47.png)

### Validación de Certificados X.509
1. **Comprobar** que el **nombre** en el certificado es de quién creemos → si no lo es, el certificado no es válido para ese uso. 
2. Obtener la 𝒌𝑷 del emisor del certificado → la correspondiente al algoritmo de firma correcto. 
3. **Descifrar** la firma del certificado → se obtiene el resumen del certificado. 
4. **Recalcular** el resumen a partir del certificado y **comparar** → si difieren, hay un problema. 
5. **Comprobar** el periodo de **validez** → esto confirma que el certificado está vigente. 
6. **Comprobar** que no ha sido **revocado** → aunque no haya caducado, es posible que se haya retirado la confianza.

### Revocación de Certificados
La revocación puede ser por varios motivos, entre los que destacan: 
- Si el **usuario pierde el PIN, la tarjeta** o cree que el certificado ha sido comprometido, debe solicitar a la CA que revoque su certificado. 
- La propia **CA** por algún otro motivo puede **querer revocar** el uso de la $𝑘𝑆$ como método de autenticación de un usuario. 

- Las CAs emiten cada cierto tiempo (minutos, horas, días) una **LISTA DE CERTIFICADOS REVOCADOS**, de manera que **cualquier aplicación** que quiera usar el certificado deberá **consultar la CRL** de la CA correspondiente para **verificar que no está revocad**. 
- Los navegadores usan el **protocolo OCSP** (Online Certificate Status Protocol) para **verificar** la validez de un certificado una **consulta al servidor OCSP** indicado

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-48.png)


### Formatos de Codificación
Formatos de codificación de certificados más utilizados: 
- BER → basic encoding rules. 
- DER → distinguished encoding rules [OpenSSL]. 
- CER → canonical encoding rules. 
- PER → packet encoding rules. 
- PEM → privacy enhanced mail [OpenSSL, default]. 
- PKCS#12 → personal information exchange syntax standard. 
	- Incluye la 𝒌𝑺 y la cadena de certificados hasta la raíz de la CA.  
	- Usado por la mayoría de los navegadores para certificados personales. 
	- Extensión . p12.



## 2.4.5 Autoridades Certificadoras
La autoridad certificadora (CA) es la entidad que emite certificados

### Certificación Cruzada
Al existir múltiples CAs, puede ocurrir un problema de validación:  La CA que usa Amy es Carlos, si Bill usa como CA a Dolores, ¿cómo puede Amy validar el certificado de Bill? 

Como solución, Carlos y Dolores hacen certificación cruzada → cada uno emite un certificado para la otra parte:

**Certificados:**
- \<Amy> (firmado por Carlos) 
- \<Bill> (firmado por Dolores). 
- \<Dolores> (firmado por Carlos). 
- \<Carlos> (firmado por Dolores)

Amy valida el certificado de Bill. 
Amy obtiene \<Dolores> (Carlos).
Amy usa la clave pública (conocida por ella) de Carlos para validar \<Dolores> (Carlos). 
Amy usa \<Dolores> (Carlos) para validar \<Bill> (Dolores).


### Cadena de autenticación de las CA

Algunas veces, **el certificado de una CA no está disponible** en el sistema, de forma que, si llega un certificado firmado por ella, no se podría validar. Como solución, hay CA que generan certificados para **autenticar los certificados de otras CA.**

La cadena de certificación puede tener varios niveles.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-49.png)![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-50.png)


### Tipos de Autoridad Certificadora
- **Organizaciones** que actúan como **CA** para los **miembros de la organización**. 
	- Necesitan i**nstalarse en los navegadores** como CA.
	
- **Empresas** de reconocido prestigio que actúan como **CA** para **cualquier cliente** (con coste económico).
	- Los **navegadores** ya **suelen incluir** de serie sus certificados. 
	
- **Organizaciones sin ánimo** de lucro que ofrecen certificados gratuitos. 
	- De servidor SSL/TLS. 
	
- **Entidades públicas** que actúan como **CA** para los **ciudadanos** (sin coste económico). 
	- En España existe el proyecto CERES de la Fábrica nacional de la Moneda y Timbre. Además, tenemos los certificados disponibles en el DNI electrónico, emitidos por la Dirección General de la Policía.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-51.png)
