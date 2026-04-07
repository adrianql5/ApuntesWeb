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


# 4.2 Cortafuegos
Un **cortafuegos** es un sistema que implanta una **política de control de accesos entre dos redes**.

Consiste en hardware, software o combinación de ambos que monitoriza y filtra paquetes de red que intentan entrar o salir de una red privada protegida. Separa por ejemplo una red protegida (eduroam) de una no protegida (internet) de menos confianza.

Normalmente son dispositivos dedicados puesto que son más fáciles de diseñar e inspeccionar posibles fallos o bugs. Además facilita optimizar su rendimiento.

Los cortafuegos **implementan políticas de seguridad:** conjuntos de reglas que determinan qué tráfico puede o no pasar a través de ellos.

Los cortafuegos son:
- Siempre invocados (no se pueden evitar o burlar)
- Resistentes a manipulaciones no autorizadas
- Pequeños y simples, para análisis rigurosos.


## 4.2.1 Contra qué protege un cortafuegos
- Contra **accesos no autorizados**
- Tráfico **no autorizado**
- **Permite/restringe la salida desde el interior**
- Proporciona un único punto para implantar una política de seguridad y auditoría
- Ha de protegerse a sí mismo

El cortafuegos debe ser parte de una política global: no debería la única línea de defensa.

## 4.2.2 Limitaciones
- Ineficaces ante **bugs** en aplicaciones o servicios permitidos
- No protege contra ataques mediante **conexiones autorizadas**.
- No proporciona seguridad desde la **red interna**.
- Solo protegen frente a **conexiones que pasan por él:**
	- Accesos alternativos (redes móviles)
	- Accesos desde dentro (wifi mal protegida, malware en memorias USB)
- Puede llegar a ser **molestos para los usuarios**
- Deben configurarse y administrarse cuidadosamente

## 4.2.3 Ejemplo de política se seguridad en un cortafuegos

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-93.png)


## 4.2.4 Tipos de Cortafuegos por tecnología
### Nivel de Red - Filtrado de Paquetes
Se trata de routers que inspeccionan el contenido de la cabecera de los paquetes TCP, UDP, ICMP, enviados entre redes. Aceptan o rechazan los paquetes de red establecida dentro de la política de seguridad de la organización.

Las políticas para paquetes de red más utilizadas en estos cortafuegos son:
- **Rechazar todo lo no permitido explícitamente:** configurar el cortafuegos de manera que deniega el acceso a todo el tráfico y servicios, **excepto aquellos explícitamente añadidos**.
- **Permitir todo lo no denegado explícitamente:** permite todo el tráfico y los servicios **excepto aquellos en la lista de prohibidos**, que se va implementando según los requisitos de la organización.

Las características que se analizan para filtrar en base a características de la cabecera del paquete IP son:
- Dirección IP de **origen**
- Dirección IP de **destino**
- **Tipo de tráfico** (TCP, UDP, ICMP)
- Puertos origen y destino
- Interfaz de red por la que llega o se envía el paquete

Se analiza cada paquete independientemente, **no se guarda información del contexto**.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-94.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-95.png)

Para filtrar paquetes nos basamos en la definición de un conjunto de **reglas secuenciales:**
- Una parte de equiparación, con la que debe coincidir el paquete:
	- Sentido del paquete: entrada/salida
	- Dirección de origen/destino, tipo de tráfico, puerto, ...
- Acción a realizar:
	- **Aceptar:** el paquete pasa el cortafuegos
	- **Denegar:** e paquete se descarta y se notifica al origen
	- **Descartar:** el paquete se descarta sin notificar al origen
	- Acciones adicionales (por ejemplo, registro de actividad)

Las ventajas que ofrecen son la **independencia de las aplicaciones** y que son **muy rápidos y escalables**. Las limitaciones son:
- Definición del filtrado de paquetes **compleja**
- Difícil monitorización y comprobación de routers
- No analizan globalmente el tráfico, ni entienden el contexto.
- Muchas implementaciones se fían de la dirección IP, que puede ser **falsificada** con relativa facilidad.


### Inspección de estados - Filtrado dinámico
Es una técnica de cortafuegos en la que **no se analiza cada paquete de forma aislada**, sino **teniendo en cuenta el estado de la comunicación**.
- El cortafuegos **intercepta los paquetes en la capa de red** y revisa sus cabeceras
- Además, puede **extraer información de los datos** para saber **qué aplicación o tipo de comunicación** hay detrás.
- Así puede **distinguir peticiones y respuestas**. Por ejemplo, en **TCP** reconoce fases de conexión somo SYN, SYN-ACK y ACK

A diferencia del filtrado simple, las decisiones se toman **relacionando varios paquetes entre sí**. Para hacerlo, el cortafuegos **mantiene una tabla dinámica de estados**, donde guarda información de las conexiones activas, por ejemplo:
- quién inició la conexión
- en qué estado está
- qué paquetes son válidos como respuesta

Con esa tabla decide **si permite o bloquea** los paquetes. Además estos sistemas, suelen estar **preconfigurados para detectar ciertas firmas o patrones de ataque**

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-96.png)


### Cortafuegos de Capa de Aplicación
Es un **proxy o pasarela de aplicación** que se coloca entre la red externa y la interna. **Da servicio a los usuarios internos** y, al mismo tiempo, **protege a los servidores internos** frente a usuarios externos maliciosos.

- **No deja pasar tráfico directamente entre ambas redes**.
- Toda comunicación debe hacerse **a través de un proxy de aplicación**.
- Por eso hay **dos conexiones distintas**:
    - una entre el **cliente externo y el cortafuegos**;
    - otra entre el **cortafuegos y el servidor interno**.

El filtrado se hace **a nivel de aplicación** y **basado en servicios conocidos**:
- el cortafuegos actúa como un servidor intermedio entre una aplicación cliente y una aplicación servidor;
- **se comporta como servidor frente al cliente**;
- y **como cliente frente al servidor**.

Eso permite tener **control completo sobre cada servicio**.

Además:
- se debe mantener **información detallada y auditada** de los registros de tráfico de cada conexión;
- normalmente se admite **un conjunto limitado de comandos**;
- suelen incorporar **autenticación**, obligando al usuario a identificarse;
- **cada proxy es independiente** de los demás dentro del sistema de defensa;
- y sus **reglas de filtrado son más fáciles de definir** que en un router con filtrado de paquetes.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-97.png)

Ejemplo: chequeo de virus en correo electrónico:
- El correo entrante llega al **proxy**
- El proxy lo escanea, y si no tiene virus lo redirige al destinatario y si tiene virus lo rechaza o lo desinfecta

Ejemplo: servidor FTP
- Se permiten todas las acciones de descarga de ficheros
- NO se permite el comando put

Las ventajas es que ofrecen un **alto nivel de seguridad**, examinan información a **nivel de aplicación** y toman decisiones basadas en **datos de cada aplicación**.

El problema que tienen es **menor rendimiento y escalabilidad**, rompe el modelo **cliente/servidor** (requiere dos conexiones) y requiere implantar un proxy por cada aplicación: software especializado en cada sistema/servicio que se quiera proteger.


### Cortafuegos Híbridos
La mayoría de los cortafuegos comerciales actuales **combinan varias tecnologías** en lugar de usar solo una. Esto permite aplicar **distintos mecanismos según el tipo de tráfico:**
- **Filtrado de paquetes** cuando se necesita **alta velocidad**
- **Proxy** cuando se necesita **mayor seguridad**

Además muchos son **adaptativos**, es decir:
- durante el **establecimiento de la conexión** actúan como **proxy**, porque así inspeccionan y controlan mejor la comunicación
- durante la **transferencia de datos** usan **filtrado de paquetes**, para que el tráfico vaya más rápido.

En resumen, un cortafuegos híbrido **busca equilibrar seguridad y rendimiento** combinando varias técnicas.

En una red, cada host tiene una **dirección IP**. Si en una red fija esas direcciones son **estáticas**, a un atacante le resulta más fácil identificar un host, tomar su control y usarlo para atacar a otros equipos, tanto **dentro** como **fuera** de la red.

Para reducir este riesgo se usa un **filtro NAT**, que:
- **oculta la información TCP/IP** de los hosts internos
- hace que, desde el exterior, no se vea directamente cada equipo interno

Por eso, un cortafuegos NAT funciona de forma parecida a un **proxy:**
- **esconde la identidad** de los hosts internos
- hacia el exterior, **todos los hosts internos parecen tener una sola IP pública**, que es la del dispositivo NAT

El NAT añade protección porque **los equipos internos no son visibles directamente desde fuera.**

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-98.png)

## 4.2.5 Arquitecturas de Cortafuegos
### Routers de Filtrado de Paquetes
Implementación formada únicamente por un router de filtrado entre la red privada y la red externa.
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-99.png)

### Host de base dual
Cortafuegos implementado situando un host (bastion host) entre las redes interna y externa que bloquea el tráfico directo entre las dos redes. Opciones de funcionamiento:
- Instalar en ese host proxies a nivel de aplicación
- Permitir login remoto en dicho host para, desde allí acceder al resto de hosts


### Proxy con Router de Filtrado
Una de las configuraciones más utilizadas: se implementa utilizando un host de base dual (bastion host, donde se instalan los proxies) y un router de filtrado.

El bastion host está en la **red privada** siendo el único equipo alcanzable desde el exterior. El router de selección permite que sólo los servicios que tienen instalado un proxy en el bastion host se comuniquen con él.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-100.png)

## 4.2.6 Zona desmilitarizada - DMZ
La **DMZ** es una **subred intermedia** entre **Internet** y la **intranet**. Sirve para colocar ahí los servicios que deben ser accesibles desde fuera, sin exponer directamente la red interna. En la DMZ se suelen instalar servidores de acceso público como:
- **web**
- **correo electrónico**
- **FTP**
- **DNS**

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-101.png)

La idea es que **los accesos desde Internet no lleguen directamente a la intranet**, sino que **pasen antes por la DMZ**. Así, desde la red externa solo se permite llegar a lo **estrictamente necesario**. Además, en la DMZ se pueden instalar:
- sistemas de **filtrado**,
- sistemas de **detección antivirus**,
- y **zonas de cuarentena** para aislar contenido sospechoso antes de enviarlo a la red interna.

Como los servidores de la DMZ están expuestos a Internet, **deben tener una protección reforzada**.

Como la DMZ es una red distinta de la red interna, se puede usar un **NAT** en el **bastion host** que actúa como cortafuegos.

### DMZ en el correo electronico
El servidor de correo en la DMZ:
- **revisa direcciones y contenido** de todo el correo;
- busca **ocultar información interna al exterior**;
- pero debe ser **transparente hacia el interior**.

Funcionamiento:
- el correo que llega desde **Internet** se redirige hacia la **red interna**;
- el correo que sale desde la **red interna** se redirige hacia **Internet**

Cuando entra un correo desde internet, el sistema:
1. **reensambla el mensaje** completo: cabecera, cuerpo y adjuntos;
2. **escanea** cabecera, cuerpo y adjuntos en busca de **contenido malicioso conocido**;
3. si no encuentra nada, analiza el mensaje original en busca de **violaciones del protocolo SMTP**;
4. comprueba las **direcciones del destinatario**;
5. **reescribe la dirección** con la correspondiente al servidor de correo interno;
6. y **reenvía** el mensaje.

Y cuando sale hacia internet se hace algo parecido, pero además:
- se analiza también si hay **datos sensibles** o confidenciales;
- se **reescriben las cabeceras** que contengan:
    - nombres de host,
    - direcciones de correo,
    - direcciones IP internas.

Esa información se sustituye por el **dominio del servidor proxy** o por la **IP del cortafuegos externo**, para no revelar datos internos.


### DMZ en servicios Web
Para **HTTP y HTTPS**, el cortafuegos analiza las peticiones buscando elementos sospechosos, por ejemplo:
- líneas excesivamente largas,
- componentes anómalos o maliciosos.
- Si detecta algo sospechoso, **descarta la petición**.
- Si no, la **redirige al servidor web de la DMZ**.

## 4.2.7 Tipos de cortafuegos por ubicación
### Cortafuegos personales
- Permiten filtros de entrada y salida
- Alertan sobre posibles intentos de conexión desde el exterior
- Ocultan el sistema frente a escaneo de puertos, no respondiendo al tráfico de red no solicitado
- Previenen el tráfico no deseado procedente de aplicaciones locales
- Recomendable combinarlos con antivirus

### Cortafuegos para pequeñas oficinas (SOHO)
- Protegen a varios usuarios en pequeñas oficinas (2-50)
- Suelen ser pequeños equipos instalador antes del router, o incluso integrados

### Equipos hardware
- Utilizados en oficinas medias y sucursales 
- Fáciles de configurar, con funcionalidades básicas y gestionados centralizadamente 
- Utilizan sistemas operativos propios del hardware en el que están implantados
- Ejemplos: Cisco y Fortinet

### Cortafuegos corporativos
- El punto central de accesos a Internet de una empresa 
- En este punto se implanta la política de seguridad de la empresa 
- Pueden conectar múltiples redes 
- Software que se instala en grandes servidores con configuraciones tolerantes a fallos

## 4.2.8 Configuración e implementación de un cortafuegos
Hay **dos formas principales** de configurar un cortafuegos según las necesidades de una organización:
- **Diseñarlo desde cero**, recopilando toda la información necesaria para definir requisitos y necesidades. Es una opción más ajustada, pero **lleva mucho tiempo y puede ser costosa**.
- **Usar un cortafuegos comercial**, que ya incorpora muchas opciones y configuraciones predefinidas. Es la opción que adoptan muchas organizaciones.

Como apoyo, se mencionan las **guías del CCN-CERT**, en particular la **Serie 1000 de Guías de Procedimiento de Empleo Seguro**, buscando por “cortafuegos”.

Errores habituales:
- **Implantarlo sin una política de seguridad** previa.
- **Añadir reglas y servicios** sin distinguir entre **necesidades reales** y **deseos**.
- **Centrarse solo en el cortafuegos** e ignorar otras medidas de seguridad.
- **Ignorar alarmas y logs** del cortafuegos.
- **Desactivar alarmas repetitivas o de bajo nivel**, porque pueden ocultar problemas reales.
- **Permitir a demasiadas personas** acceder o administrar su configuración.
- **Permitir accesos independientes**, es decir, vías de acceso que se saltan el control del cortafuegos.


Un cortafuegos suele apoyarse en otros mecanismos de seguridad:
- **Autenticación de usuarios externos**, por ejemplo con usuario y contraseña, certificados digitales o tarjetas.
- **Antivirus**, normalmente instalados en la **DMZ**.
- **Filtros de contenido**:
    - filtrado de **URL y navegación hacia el exterior**;
    - filtrado para controlar la **información que sale**.
- **IDS (sistemas de detección de intrusiones)**; muchos cortafuegos ya incorporan también **prevención de intrusiones**.
- **VPN (redes privadas virtuales)**, que crean **túneles cifrados** para permitir acceso remoto seguro a través de redes públicas.