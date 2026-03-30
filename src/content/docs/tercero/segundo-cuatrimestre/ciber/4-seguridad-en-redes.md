---
title: "Seguridad en Redes"
---

# 4.1 Introducción
La seguridad en redes consiste en **proteger las redes y sus servicios** frente a accesos no autorizados, modificaciones, destrucción de información o filtración de datos confidenciales. Además, no solo importa proteger la información, sino también garantizar que la red siga funcionando correctamente, es decir, preservar su **disponibilidad**.

## 4.1.1 Por qué las redes son vulnerables
La transmisión puede realizarse por distintos medios: **cable, fibra óptica, microondas, WiFi o satélite**, y cada uno presenta debilidades propias. La idea general es que el canal de comunicación puede ser interceptado, monitorizado o manipulado. Puede haber escuchas en enlaces cableados, receptores no autorizados en redes LAN o interceptación en comunicaciones por satélite y microondas.
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-80.png)

## 4.1.2 Factores que hacen vulnerable a un red
- **Anonimato**: un atacante puede actuar a distancia, incluso desde miles de kilómetros, y realizar ataques sin ser identificado fácilmente.
- **Múltiples puntos de ataque**: una red grande tiene muchos posibles puntos de entrada.
- **Compartición**: al estar los recursos conectados, más usuarios pueden acceder potencialmente a ellos.
- **Complejidad**: una red integra muchos sistemas, sistemas operativos y servicios distintos, lo que hace más difícil protegerla.
- **Perímetro desconocido**: en redes grandes y cambiantes es difícil saber con precisión qué dispositivos forman parte de la red.
- **Ruta desconocida**: entre dos hosts puede haber múltiples caminos, algunos de ellos no confiables.

## 4.1.3 Debilidades de TCP/IP y ataques básicos de red
**TCP/IP no fue diseñado originalmente con la seguridad como prioridad**. Por eso, de forma nativa no incorpora mecanismos sólidos de **cifrado, autenticación ni integridad**. Como consecuencia, las comunicaciones basadas en TCP/IP son vulnerables a escuchas, interceptación y manipulación.

### Modificación y Fabricación de Datos
Cuando no hay protección suficiente, los datos pueden ser alterados o incluso inventados durante la comunicación.
- **Corrupción de datos**: alteración intencionada o accidental de la información.
- **Secuenciación**: cambiar el orden de llegada de los datos o paquetes.
- **Sustitución**: reemplazar una parte de la secuencia por otra distinta.
- **Inserción**: añadir valores nuevos a la secuencia de datos.
- **Repetición**: reutilizar datos legítimos que ya habían sido transmitidos.

### Ataque simple de repetición
En un ataque de repetición, el atacante **intercepta una comunicación legítima y la vuelve a enviar** para provocar que el receptor la acepte como válida. Como medida básica para evitar este problema, se propone **numerar las secuencias**, de forma que el sistema pueda detectar reenvíos indebidos.ç
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-81.png)

### Sniffing
El **sniffing** consiste en la **interceptación o monitorización no autorizada del tráfico de red**, aprovechando normalmente la falta de cifrado. El objetivo es escuchar las comunicaciones y capturar información sensible o confidencial. Puede haber técnicas:
- **Pasivas**, si solo se observa el tráfico.
- **Activas**, si además se insertan datos.

Como medidas de prevención, el **cifrado**, la **segmentación de red**, sistemas **IDS** para detectar sniffing activo y la **monitorización de dispositivos no autorizados**.


## 4.1.4 Reconocimiento y suplantación en red
### Escaneo de puertos
El escaneo de puertos es una técnica que permite analizar los equipos y servicios conectados a una red. Puede usarse legítimamente por administradores para comprobar conexiones abiertas, servicios activos o versiones de software, pero también puede ser usada por un atacante para obtener exactamente esa misma información. La herramienta más destacada es **Nmap**.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-82.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-83.png)

Con esta información, un atacante puede:
- identificar máquinas con un sistema operativo concreto,
- detectar servicios que ejecutan versiones vulnerables,
- automatizar la búsqueda de objetivos en rangos de direcciones IP.


Para reducir el riesgo conviene:
- no abrir más puertos de los necesarios,
- no mostrar más información de la imprescindible en los servicios,
- mantener actualizados sistema operativo y software


### Spoofing
El **spoofing** consiste en **hacerse pasar por algo o alguien** dentro de una red, explotando la ausencia o debilidad de mecanismos de autenticación. El objetivo puede ser robar o manipular información, o saltarse controles de acceso aparentando ser un dispositivo o usuario de confianza. Puede darse en varias capas, por ejemplo como **IP spoofing**, **MAC spoofing** o **DNS spoofing**.

Como medidas de prevención, la presentación menciona la **autenticación basada en criptografía**, políticas de control de acceso, IDS, monitorización de red y filtrado de tráfico.

### DNS spoofing
En el **DNS spoofing**, el atacante suplanta la respuesta del servidor DNS y hace que el usuario asocie un dominio legítimo con una dirección IP falsa. En las diapositivas se muestra cómo, ante una consulta DNS, el atacante responde antes que el servidor legítimo y redirige a la víctima hacia una IP maliciosa.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-84.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-85.png)


### ARP spoofing y Man in the Middle
El protocolo **ARP** se usa para averiguar qué dirección MAC corresponde a una dirección IP dentro de una red local. El problema es que ARP tiene varias debilidades:
- no autentica correctamente las respuestas ARP,
- puede aceptarse una respuesta ARP sin haber hecho una petición previa,
- cualquier dispositivo de la red puede enviar una respuesta ARP.


Esto permite el **ARP spoofing**, donde un atacante envía respuestas ARP falsas y envenena la caché ARP de los dispositivos. Así consigue que las máquinas crean que deben comunicarse con él. De este modo se coloca entre ambos extremos de la comunicación, realizando un ataque **Man in the Middle (MitM)**: recoge los datos y los reenvía para mantener la conexión mientras intercepta el tráfico.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-86.png)


## 4.1.5 Protocolos inseguros y protocolos seguros
### Protocolos de comunicación no seguros
- **Telnet**: permite acceso remoto, pero transmite comandos, respuestas y credenciales sin cifrar.
- **POP**: en sus primeras versiones, el correo también viajaba sin cifrado.
- **HTTP**: no proporciona cifrado ni autenticación; si la información no es pública, esto supone un problema serio de confidencialidad y autenticación.

### Protocolos de comunicación seguros
Los protocolos seguros buscan resolver precisamente esos problemas. Aportan **confidencialidad, integridad y autenticación** mediante técnicas criptográficas, y pueden implementarse en distintas capas de la pila de protocolos.

**IPsec** opera en la **capa de red (capa 3)** y sirve para asegurar comunicaciones IP de forma transparente a las aplicaciones. Proporciona autenticación de paquetes y cifrado. Entre sus elementos, la presentación menciona:
- **ESP (Encapsulating Security Payload)**, que añade cifrado con algoritmos simétricos.
- **IKE (Internet Key Exchange)**, que permite el intercambio de claves mediante criptografía asimétrica, Diffie-Hellman y certificados digitales.

Un caso típico de uso es el acceso remoto a través de **VPN**.

**SSL/TLS** opera en la **capa de transporte (capa 4)**. Fue diseñado originalmente para proteger la comunicación entre navegador y servidor, y posteriormente evolucionó a TLS. Aporta:
- autenticación del servidor mediante certificados X509v3,
- autenticación opcional del cliente,
- confidencialidad,
- integridad.

Al comenzar una sesión TLS, cliente y servidor negocian una **suite de cifrado**, que incluye:
- un algoritmo de firma digital para autenticación,
- un algoritmo de cifrado para confidencialidad,
- una función hash criptográfica para integridad.

TLS se apoya en dos subprotocolos principales:
- **Handshake**, que autentica extremos, establece la conexión segura y negocia parámetros.
- **Record**, que cifra y autentica los datos transferidos.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-87.png)


Hay varios métodos de intercambio de claves en el handshake, como **RSA**, **Diffie-Hellman fijo**, **Ephemeral Diffie-Hellman** y métodos basados en **curvas elípticas**. Aunque **Diffie-Hellman anónimo** es vulnerable a ataques MitM y no es recomendable.

**TLS 1.3** es la evolución del protocolo, con un proceso de establecimiento de sesión más moderno y eficiente.


**SSH (Secure Shell)** opera en la **capa de aplicación (capa 7)** y proporciona un canal cifrado y autenticado para acceso remoto por línea de comandos. Sustituye a herramientas inseguras como Telnet, rlogin o rsh, y protege frente a spoofing y modificación de datos. Además, soporta autenticación por contraseña y por claves públicas.


**Otros protocolos seguros:**
- **SFTP**, transferencia segura de ficheros sobre SSH.
- **DNSSEC**, que añade protección criptográfica al DNS y ayuda frente al DNS spoofing.
- **FTPS**, que añade TLS/SSL al FTP tradicional.
- **OpenVPN**, una VPN de código abierto que usa TLS/SSL.


## 4.1.6 Ataques a la disponibilidad
Uno de los principales problemas de seguridad en redes es la pérdida de disponibilidad, es decir, la **interrupción del servicio**. Esto puede suceder por varias razones:
- problemas en el enrutado,
- demanda excesiva que agota la capacidad de la red,
- fallos en componentes hardware o software.

### Denegación de servicio (DoS y DDoS)
Los ataques **DoS** buscan precisamente impedir que un sistema preste servicio con normalidad. Pueden adoptar varias formas:
- **ataques volumétricos**,
- **ataques basados en aplicaciones**,
- **deshabilitación de comunicaciones**.

Cuando el ataque se realiza desde múltiples máquinas coordinadas, hablamos de **DDoS**. En ese caso se combinan varias fuentes de tráfico malicioso, a menudo mediante una **botnet**, es decir, una red de equipos comprometidos controlados mediante una infraestructura de **Command and Control (C&C)**.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-90.png)


### Ping of Death
El **Ping of Death** es un ataque DoS clásico basado en el envío de paquetes ICMP malformados o excesivamente grandes, con el objetivo de provocar errores en el sistema destino.
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-88.png)


### Ataque Smurf
El ataque **Smurf** consiste en enviar peticiones **ICMP Echo** a una dirección de broadcast, falsificando como dirección origen la de la víctima. Como resultado, muchos hosts responden simultáneamente a la víctima y la saturan con respuestas. El esquema de la diapositiva muestra precisamente ese efecto de amplificación.
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-89.png)

### SYN flooding
El **SYN flooding** es un caso concreto de DoS que aprovecha el funcionamiento del **TCP handshake**. TCP necesita establecer previamente una conexión, y el servidor reserva recursos mientras espera la confirmación final del cliente. La presentación explica que existe un número máximo de conexiones en estado **SYN_RECVD**, que se mantienen durante un tiempo hasta recibir el ACK o agotar el timeout.

En este ataque, el atacante envía muchas peticiones **SYN** con direcciones IP falsificadas. El servidor responde con **SYN+ACK**, pero el ACK final nunca llega. Si la cola de conexiones pendientes se llena, el servidor rechaza nuevas conexiones legítimas hasta que vayan expirando las anteriores.

La base del ataque está en dos debilidades:
- no hay autenticación fuerte del origen de los paquetes,
- es posible falsificar direcciones IP mediante **IP spoofing**.


Tenemos estas poisbles contramedidas en dos niveles.

**En el sistema:**
- reducir el timeout,
- aumentar el tamaño de la cola de peticiones,
- deshabilitar servicios no esenciales.

**En el router:**
- bloquear paquetes externos con direcciones de origen internas,
- bloquear paquetes salientes con direcciones de origen que no pertenezcan a la red interna.


### Botnets
Es una red de máquinas comprometidas controladas mediante infraestructura de **Command and Control (C&C)**. Estas máquinas, o bots, pueden ser utilizadas coordinadamente para lanzar ataques DDoS contra una víctima.  atacante → C&C → bots → víctima.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-91.png)