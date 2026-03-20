---
title: "Criptografía Simétrica"
---

El objetivo de la criptografía es ocultar el significado del mensaje que se quiere transmitir, para que sólo su destinatario pueda interpretarlo correctamente.

Para eso se utilizan técnicas que alterna el contenido del mensaje. En criptografía clásica, las más utilizadas son **transposición** y **sustitución**.

# 2.1 Transposición
La transposición se basa en **reordenar las letras** de un mensaje. La escitala espartana era una vara de madera sobre la cual se enrollaba una tira de cuero o pergamino, si alguien intercepta el mensaje por el camino no podrá descifrarlo a no ser que disponga de una vara adecuada.

# 2.2 Sustitución
Se basa en la **recodificación del alfabeto** de manera que a cada letra se le asigne otra, creando un nuevo alfabeto. Por ejemplo el **crifrado de cesar**, que consistía en sustituir cada letra del alfabeto por la situada n posiciones más adelante para construir el alfabeto cifrado.

Esto era fácil de descifrar sin saber la clave puesto que solo habría que mirar 27 casos.

# 2.3 Conceptos Básicos

- **Criptología:** criptografía y criptoanálisis
	- El arte y ciencia de mantener mensajes seguros
	- El arte y ciencia de romper mensajes seguros

- **Criptosistema:** conjunto de dispositivos de cifrado y descifrado, acompañado de un **protocolo de transmisión** de claves.

- **Algoritmos criptográficos:** la función que realiza el proceso de cifrado y descifrado, junto con la interrelación con las claves

- **Claves:** parámetros que inicializan y personalizan los algoritmos

# 2.4 Esquema de Cifrado

- $m=\text{mensaje en claro}$
- $c=\text{mensaje cifrado}$
- $k=\text{clave}$
- $E=\text{operación de cifrado}$
- $D=\text{operación de descifrado}$

!Pasted image 20260217161858

# 2.5 Objetivos del Criptoanálisis
Los principales objetivos son:
- **Romper (descifrar)** un único mensaje
- **Reconocer patrones** en mensajes cifrados
- Inferir algún significado sin llegar a romper el cifrado, por el tamaño o la frecuencia de los mensajes
- Deducir la clave para romper un mensaje y quizá mensajes sucesivos
- Encontrar debilidades en la implementación o el entorno de uso
- Encontrar debilidades generales en un algoritmo de cifrado.

# 2.6 Ataques
Se asume que el cirptoanalista conoce el algoritmo empleado, pero no la clave. Tenemos tres tipos de ataques:
- **Sólo texto cifrado:** el analista sólo dispone de texto cifrado, su meta es descubrir el testo plano, y posiblemente la clave.
- **Texto plano conocido:** el analista dispone de texto cifrado, y su texto plano correspondiente; la meta es averiguar la clave.
- **Texto plano elegido:** el analista puede suministrar textos panos y obtener el correspondiente texto cifrado; la meta es descubrir la clave

Las **bases para los ataques son:**
- **Ataques matemáticos o algorítmicos**
- **Ataques estadísticos:** buscar patrones, similitudes y discontinuidades entre múltiples mensajes cifrados de la misma forma. Examinar el texto cifrado, correlacionando propiedades con las suposiciones. Utilizando modelos del lenguaje. En criptografía clásica se suele hacer suposiciones sobre la distribución de letras.

Al cifrado por **sustitución** se le suele atacar mediante la **búsqueda exhaustiva (fuerza bruta)**, si el espacio de claves es los suficientemente pequeño, probar todas las posibles claves hasta encontrar la correcta, por lo que **el espacio de claves debe ser suficientemente grande para resistir ataques de fuerza bruta**.


# 2.7 Sustitución Monoalfabética Genérica
Consiste en construir el alfabeto cifrado colocando al azar las letras del alfabeto llano. De esta forma existen $27!=10^{28}$ posibles alfabetos cifrados.

!Pasted image 20260217172210

Sin embargo presenta una gran debilidad, la frecuencia de aparición de las distintas letras en un idioma, por lo que **se deben evitar patrones en el mensaje cifrado**.

Las frecuencias estadísticas no están bien disfrazadas, se parecen demasiado a las del lenguaje original, cada letra se cifra siempre con la misma sustituta. Como solución debemos hacer la clave más compleja, incluyendo múltiples alfabetos y que cada letra se pueda sustituir por más de una diferente. La idea es suavizar la distribución de frecuencias para dificultar el criptoanálisis.


# 2.8 Cifrado de Vigenère (polialfabético /sustitución polialfabética)
Se realizan varios cifrados como el de Ceśar, pero con más letras en la clave. Ejemplo:

!Pasted image 20260217172314

Usando cifrado de César para cada letra:
!Pasted image 20260217172340

En el siglo XIX, Charles Babbage consiguió romper el cifrado polialfabético de Vigenère:
- Primer paso: estadísticas sobre la frecuencia de distribución de series de letras repetidas y la separación entre repeticiones para **descubrir la longitud de la clave**.
- Segundo paso: división del texto en "n" bloques, siendo $n$ la longitud de la clave, respondiendo **cada bloque a una cifra monoalfabética clásica**, y por lo tanto fácilmente atacable.

# 2.8 Máquina Enigma
Es una máquina criptográfica construida en 1920 por Arthir Scherbius. Inicialmente no era más que una versión mecanizada del cifrado monoalfabético. Tras codificar cada letra el modificador giraba a una posición $\rightarrow$ cifrado polialfabético.

!Pasted image 20260217172840

Cifrado alfabético más transposición:
- Con tres modificadores encadenados el número de alfabetos posibles era $26*26*26=17576$ 
- Con un reflector y un clavijero, y modificadores intercambiables: número de alfabetos posibles $10000$ billones.

# 2.9 Cuaderno de uso único (one-time pad)
Cifrado de Vigenère con clave aleatoria al menos tan larga como el mensaje. Es probablemente irrompible Si tomamos el texto cifrado DXQR, es igualmente probable que corresponda al texto plano DOIT (clave AJIY) que al texto plano DONT (clave AJDY) y a cualquier otro grupo de 4 letras.

**Importante:** las claves **debe ser aleatorias**, o puede atacarse el cifrado intentando regenerar la cave.

# 2.10 Historia de la Criptografía digital simétrica
- En los años 70 se generalizan los ordenadores digitales.
- 1973: solicitud del gobierno americano de propuestas de sistemas de cifrado digitales
- 1976: DES (Data Encryption Standard) de IBM propuesto como estándar para cifrado de datos no clasificados.
- 1997: nueva solicitud de propuestas por debilidades en DES.
- 2002: AES (Advanced Encryption Standard)
- 2017: solicitud de propuestas de criptografía ligera (IoT)
- 2023: ASCON seleccionado como estándar