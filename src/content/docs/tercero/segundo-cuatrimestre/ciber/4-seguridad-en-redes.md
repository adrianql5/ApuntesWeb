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


# 4.3 IDS/IPS
## 4.3.1 Intrusiones
Una **intrusión** en un sistema es un intento, por parte de alguien externo, de obtener acceso ilegal a un sistema.
- **Detección de intrusiones:** técnica para detectar accesos o actividades no autorizados a un ordenador o a una red
- **Prevención/protección ante intrusiones:** técnica para prevenir daños y protegerse ante accesos no autorizados a los recursos del sistema.

## 4.3.2 IDS
Un **IDS** es una herramienta de seguridad que recolecta información de diversas fuentes de un sistema. Analiza esta información de acuerdo a patrones establecidos de uso indebido o actividades inusuales.

En algunos casos, responde automáticamente antes la actividad detectada. Informa del resultado al administrados del sistema para que éste actúe en consecuencia.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-102.png)

El **IDS:**
- Monitoriza las actividades de los usuarios y de los sistemas.
- Audita de forma continua la configuración del sistema y sus vulnerabilidades
- Evalua la integridad de los sistemas críticos y los archivos de datos
- Identifica actividad anormal a partir del análisis estadísticos
- Audita la administración del S.0. con reconocimiento de actividades relativas a la violación de políticas
- Instala y gestiona trampas para recolectar información sobre los intrusos.


## 4.3.3 Sistema IDS/IPS
Este sistema proporciona **protección y detección en tiempo real** de ataques: DoS, troyanos, escaneo de puertos, inyección, etc. Existen productos software y dispositivos hardware. Se deben integrar con:
- **Sistemas operativos:** con aplicaciones de registro y auditorías, para monitorizar recursos críticos para la seguridad
- **Servidores:** todas las aplicaicones en servidores web, de correo o de bases de datos deberían incluir capacidades de registro/auditoría también.
- **Cortafuegos:** un buen cortafuegos debería incluir alguna capacidad de detección de instrusiones en red.

### IDS
**Sistema de Detección de Instrusiones**
- Sólo detecta intrusiones, genera alarmas, pero no actúa.
- Se conecta como una sonda en la red o en un equipo, sin interferir el tráfico
- Utiliza solamente una interfaz Ethernet, no corta la red

### IPS
**Sistema de Prevención de Intrusiones:**
- Además de detectar, previene contra intrusiones, protege al sistema actuando de forma proactva.
- Se conecta en medio de la red, cortando la conexión
- Utiliza dos interfaces Ethernet
- Puede actuar conjuntamente con el cortafuegos

### Posibles respuestas
- Reconfiguración de accesos del cortafuegos y de las listas de control de acceso de los routers
- Emisión de alarmas y registro de las mismas.
- Almacenamiento de evidencias
- Ejecución de algún programa para manipular el evento detectado
- Terminar sesión TCP

## 4.3.4 Tipos de IDS/IPS por ubicación
- **Software para servidores:** software que se instala en los servidores y detecta instrusiones al equipo
- **Sondas de red:** existen sistemas software o equipos hardware. Se conectan en una subred y analizan todo el tráfico que pasa
- **Software para puesto de trabajo:** software que se instala en el PC y detecta intrusiones al equipo. Se combina con el software antivirus y cortafuegos del PC.


### Sondas de Red (NIDS)
Sensores o agentes que recolectan información de la propia red, generalmente basados en **sniffers**. Dispositivos externos, no afectan al rendimiento de los servidores que monitorizan.

**Ventajas:**
- La inserción de los agentes a nivel de red no afecta a datos existentes
- Detecta ataques a nivel de red (SYN Flood)
- Capaz de monitorizar grandes redes
- Detección en tiempo real

**Inconvenientes:**
- Pueden no funcionar adecuadamente en redes de alta velocidad
- Los agentes de esta estrategia no pueden buscar en los protocolos o revisar el contenido de la red si se encuentra cifrado
- No confirman si un ataque ha tenido éxito, sólo detectan el inicio.

### Software para Servidores (HIDS)
- Monitorizan eventos locales en un host (pueden detectar atauqes invisibles a un NIDS). Logs del SO, logs de procesos, contenidos de objetos particulares del sistema que no generan logs.

- Se pueden usar en entornos de tráfico cifrado, para analizar la información antes de que se cifre o después de que se descifre.

- Monitorización del SO: búsqueda de anomalías y de firmas de ataques conocidos.

**Ventajas:**
- Monitorización de quién accede a qué
- Identificación directa del usuario
- Capacidad para operar en ambientes cifrados
- Monitorizar redes amplias

**Inconvenientes:**
- Actividad de la red no visible a los agentes.
- Vulnerabilidades del SO comprometen la integridad de los agentes
- Uso de recursos locales: coste en rendimiento.

## 4.3.5 Cómo modelar una Intrusión
### Reconocimiento de firmas o patrones conocidos
- Se asume que toda actividad intrusiva es representable mediante un patrón único o firma
- Los datos obtenidos de la monitorización se comparan con bases de datos de firmas conocidas de ataques o usos indebidos, en tiempo real.
- Los proveedores incluyen frecuentemente actualizaciones de las bases de datos de firmas como parte de los acuerdos de mantenimiento
- Número reducido de falsas alarmas.

**Inconvenientes:** 
- Los patrones de intrusión deben codificarse a mano
- Las firmas deben estar bien definidas: dificultad para detectar variantes
- Es posible falsificar el patrón para confundir al sistema
- Es imposible detectar intrusiones futuras

### Ejemplo de Reconomiento de patrones (NIDS)
**Dirección origen y destino:**
- Tráfico proveniente de nuestra DMZ que tenga como destino nuestra red protegida: es muy posible que estos paquetes constituyan un intento de violación de nuestra política de seguridad
- Peticiones originadas desde Internet y que tienen como destino máquinas de nuestra organización que no está ofreciendo servicios directos al exterior, como un servidor de bases de datos cuyo acceso está restringido a sistemas de nuestra red.

**Puerto origen y destino:**
- Los puertos origen y destino son un excelente indicativo de actividades sospechosas en una red.
- Aparte de los intentos de acceso no autorizado a servicios de nuestros sistemas, se pueden detectar actividades que también supondrán a priori violaciones de las políticas de seguridad, como la existencia de troyanos, ciertos tipos de barridos de puertos, o la presencia de servidores no autorizados dentro de nuestra red.

**Flags TCP:**
- UNo de los campos de una cabecera TCP contiene seis bits, cada uno de ellos con una finalidad diferente
- El valor de cada uno de estos bits será 0 o 1, lo cual de forma aislada no suele decir mucho de su emisor, no obstante ciertas combinaciones de valores suelen ser bastante sospechosas. Por ejemplo, unatrama con los bits SYN y FIN activados simultáneamente sería indicativa de una conexión que trata de abrirse y cerrarse al mismo tiempo

**Campo de datos:**
- En el campo de datos de un paquete que circula por la red es donde más probabilidades tenemos de localizar un ataque contra nuestros sistemas
- Con toda probabilidad un cortafuegos corporativo detendrá tramas cuya cabecera sea sospechosa
- Pero un cortaguegos puede no pararse a analizar el contenido de los datos transportados en la trama. Por ejemplo, una petición como `'GET ../../../etc/passwd HTTP/1.0'`  contra el puerto 80 del servidor web de nuestra empresa no se detendría en el cortafuegos, pero muy probablemente se trata de un intento de intrusión contra nuestros sistemas.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-103.png)

### Detección de Anomalías
**Análisis estadístico:**
- Establecer desviaciones con respecto a patrones normales de comportamiento: generar perfiles de actividades sobre los objetos
- Señalar los eventos que difieren de los patrones de uso normal

**Son sistemas que requieren aprendizaje (técnicas de IA como redes neuronales, minería de datos: reglas de asociación, episodias frecuentes):**
- Se compara la actividad observada con los perfiles de uso normal esperados. Los perfiles pueden desarrollarse para usuarios, grupos de usuarios, aplicaciones, o uso de los recursos del sistema
- Son necesarios conjuntos de entrenamiento bastante extensos.

**Ventajas:**
- Puede llegar a identificar atauqes desconocidos. Obtención de información para firmas de ataques
- Puede identificar ataques sofisticados en el tiempo

**Inconvenientes:**
- Alta posibilidad de falsas alarmas
- Problemas cuando hay cambios en los hábitos del usuario

## 4.3.6 Como implantar un IDS
Modo oculto:
- Una interfaz de red externa que sólo recibe, no envía nada (no tiene que tener dirección pública). Podría llegar a identificar ataques desconocidos.
- Una interfaz de control, para enviar alerta u otra información al servidor de control

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-104.png)

## 4.3.7 SIEM
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-105.png)

Son sistemas softeware que recogen todos los datos relevantes a nivel de seguridad a nivel de seguridad de una gran variedad de productos hardware y/o software para proporcionar una consola de seguridad unificada.

Utilizado por los SOC (Security Operations Center): equipo de personal de seguridad dedicado a monitorizar la red para detectar incidentes de seguridad e investigar y remediar dichos incidentes.

Requisitos:
- Portabilidad de los datos
- Compatibilidad de las fuentes de logs
- Personalización
- Almacenamiento de datos
- Control de acceso y segregación
- Mantenimiento a tiempo completo

**Ventajas:**
- Centralización de la información y eventos
- Automatización de tareas
- Seguimiento de los eventos para detectar anomalías de seguridad
- Visualización de datos históricos a lo largo del tiempo
- Muestran al admistrador la existencia de vulnerabilidades, así como si están siendo aprovechadas en los ataques

**Desventajas:**
- Altos costes de implantación
- Curva de aprendizaje larga
- Pérdida de control de la información generada o acceso limitado a la misma

# 4.4 Redes Privadas Virtuales
## 4.4.1 Introducción
Una **vpn** es una red que se extiende, mediante un proceso de encapsulación, y habitualmente de cifrado de los paquetes de datos, a diferentes puntos remotos, mediante el uso de **infraestructuras públicas** de transport.

Los paquetes de datos de la red privada viajan por un túnel definido en la red pública.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-106.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-107.png)

Una VPN pemite al usuario, por ejemplo, acceder a su red coporativa, asignado a su ordenador remoto las direcciones y privilegios de ésta, aunque la conexión la haya realizado mediante un acceso público a Internet.

**Componentes de una VPN:**
- **Dos terminales**, que pueden ser software o hardware. Estos terminales realizan el cifrado y descifrado y autenticación. También encapsulan la información.

- **Un túnel** conectando los terminales. El túnel es un enlace de comunicación seguro entre los terminales a través de rede como Internet. De hecho, el túnel se crea de forma virtual entre los terminales.

**Ventajas:**
- Permite disfrutar de una conexión a red con todas las características de la red privada a la que queremos acceder
- El cliente VPN adquiere totalmente la condición de miembro de esa red, con lo que se le aplican todas las directrices de seguridad y los permisos de un equipo en esa red privada:
	- Acceso a información publicada para la red privada: bases de datos, documentos internos, etc. a través de un acceso público
	- Todas las conexiones de acceso a Internet desde el ordenador cliente VPN se llevarán a  a cabo con los recursos y las conexiones que tenga la red privada.
	- Se reducen los costes económicos en las comunicaciones

**Inconvenientes:**
- **Cargar en el cliente VPN:** debe realizar la tarea adicional de encapsular los paquetes de datos.
- Carga aún mayor si se cifran los datos, lo que puede producir una realentización de las conexiones:
	- La conexión cifrada VPN requiere recursos, tanto al servidor de túnel como al ordenador cliente de VPN, aparte de requerir la instalación de programas especiales al cliente
- Mayor complejidad en el tráfico de datos, que puede requerir cambios en las configuraciones de aplicaciones o programas.
- Muchas aplicaciones y muchos programas ya implementan cifrado, y en ese caso, el túnel VPN no aporta seguridad adicional
- En estos casos el cifrado de los datos se produce en todo su recorrido. En una conexión VPN segura el cifrado únicamente tiene lugar entre el servidor de túnel y el cliente VPN; la conexión entre el servidor de túnel y el servidor de la aplicación se realiza sin cifrado.

## 4.4.2 Ejemplos de Uso
- **Accesos remotos**, para explotación remota de sistemas o acceso a información corporativa desde internet.
- **Comunicaciones seguras entre oficinas,** utilización de redes públicas IP para comunicaciones seguras internas
- **Teletrabajo:** sistemas de teletrabajo seguro

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-108.png)

## 4.4.3 Tecnología VPN
**Deben contemplarse las siguientes tareas:**
- **Encapsulamiento IP:** envolver los paquetes de datos TPC/IP dentro de otro paquete con la dirección IP de un cortafuegos u otro servidor que actúe como terminal VPN
- **Cifrado:** para proteger el contenido de los datos de los paquetes
- **Autenticación:** creación de un dominio de autenticación mediante servidores de autenticación o mecanismos de clave pública.

## 4.4.4 IPsec
**Proporciona los siguientes servicios en la capa de red:**
- **Control de acceso:** para prevenir accesos no autorizados a los recursos
- **Integridad:** asegurar que el tráfico recibido no ha sufrido ningún tipo de alteración
- **Confidencialidad:** asegura que el tráfico en Internet no es examinado por partes no autorizadas. Esto requiere que todos los datagramas IP tengan sus campos de datos
- **Autenticación:** en particular, autenticación de la fuente de forma que cuando el servidor o destinatario recibe un datagrama IP, con una dirección IP de origen dada, pueda estar seguro de que el datagrama IP fue realmente generado por la máquina con dirección IP la de origen. Esto previene el IP spoofinf
- **Protección frente a ataques de repetición:** garantizar que cada paquete intercambiado entre dos partes el diferente.

**Protocolos de seguridad en la capa de red:**
- **ESP** (Encapsulating Security Payload): integridad + autenticación + confidencialidad
- **IKE** (Internet Key Exchange): permite a dos nodos negociar las clave y todos los parámetros necesarios para establecer una conexión ESP


### Modos de Funcionamiento
IPsec emplea el protocolo ESP para asegurar la autenticación, integridad y confidencialidad de la comunicación. Puede proteger el datagrama IP completo sólo los protocolos de capas superiores:
- **Modo túnel:** el datagrama IP se encapsula completamente dentro de un nuevo datagrama IP que emplea el protocolo IPsec
- **Modo transporte:** sólo se maneja la carga del datagrama IP, insertándose la cabecera IPsec entre la cabecera IP y la cabecera del protocolo de capas superiores

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-109.png)

#### Modo Transporte
- El contenido transportado dentro del datagrama ESP son datos de la capa de transporte. 
- La cabecera IPSEC se inserta inmediatamente a continuación de la cabecera IP Y antes de los datos de los niveles superiores que se desean proteger
- El modo transporte tiene la ventaja de que asegura la comunicación extremo a extremo, pero requiere que ambos extremos entiendan el protocolo IPsec

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-110.png)

#### Modo Túnel
- El contenido del datagrama ESP es un datagrama IP completo, incluida la cabecera IP original.
- Al datagrama IP se le añade inicialmente una cabecera ESP, y posteriormente se añade una nueva cabecera IP que es la que se utiliza para encaminar los paquetes a través de la red
- El modo túnel se usa normalmente cuando el destino final de los datos no coincide con el dispositivo que realiza las funciones IPsec.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-111.png)

### Encapsulación de los Datos (ESP)
- **Autenticación, integridad y confidencialidad** de los datos en los paquetes IP
- Cifrado de la carga útil (AES-GCM)
- La cabecera ESP se genera y añade al paquete tras cifrarlo y calcular su HMAC
- No protege el paquete de cabecera

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-112.png)

- **SPI**: Identificación de la conexión en este protocolo 
- **Sequence** Number: Identificador que se incrementa con cada paquete 
- **Payload** **Data**: Datos cifrados del protocolo IP. 
- **Padding**: Se usan algoritmos de cifrado bloque, de modo que la longitud de los datos a cifrar tiene que ser un múltiplo del tamaño de bloque. 
- **Next** **Header** : Tipo de protocolo de datos en el payload data.  
- **Authentication** **Data**: Contiene el ICV (Integrity Check Value)

**Formación del datagrama IPSEC:**
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-113.png)

### IKE (ISAKMP / Oakley)
- **Internet Key Exchange:** establece un contexto de seguridad entre dos partes
	- Internet Security Association and Key Management Protocol
	- Oakley Key Determination Protocolo

- Se realizan tres tareas:
	- Negociar la política de seguridad: algoritmos y protocolo
	- Autenticar el intercambio Diffie-Hellman
	- Intercambio Diffie-Hellman de claves

**Esquema de obtención de clave de sesión:** 
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-114.png)

La clave de sesión es imprescindible para el funcionamiento del protocolo ESP.

### Integración con una PKI
El uso de una PKI aparece en IPsec como respuesta a la necesidad de un procedimiento para **autenticar de forma fiable** a un conjunto de nodos que desean comunicarse mediante IPsec, siendo dicho conjunto de nodos muy numeroso.

La existencia de una PKI centraliza el alta y baja de los usuarios, además de posibilitar la introducción de tarjetas criptográficas para soportar los certificados, lo cual es muy interesante para la aplicación de IPsec en entornos de teletrabajadores o usuarios móviles.

## 4.4.5 Alternativas a IPsec
**SSL VPNs:** vpns en la capa de transporte
- Lo que habitualmente se entiende cuando se habla de VPN
- Actualmente usan TLS
- La más utilizada es OpenVPN

**Secure Shell (SSH):**
- Se pueden crear túneles entre puertos específicos mediante conexiones SSH para permitir tanto a una conexión local acceder a un recurso remoto, como a una conexión remota acceder a un recurso local.


## 4.4.6 OpenVPN
- Usa TLS sobre cualquier puerto preconfigurado, y puede usar TCP o UDP
- Los algoritmos soportados son los típicos de TLS. Para autenticación, soporta certificados, PSKs, y usuario/contraseña.
- Puede funcionar como VPN en capa de red o capa de transporte.
- El servidor puede enviar al cliente commandos a ejecutar, lo que implica que un servidor comprometido puede comprometer a todos sus clientes.
- Tiene una superficie de ataque mayor debido a que el protocolo completo corre como proceso de usuario, y ha presentado vulnerabilidades en el passado.

## 4.4.7 VPNs mediante túneles SSH
- A menudo se usa en hosts intermedios (bastion hosts) para saltar a otros equipos.
- OpenSSH, por ejemplo, permite emplear el protocolo SSH para crear interfaces para túneles en los equipos. Un túnel SSH crea una interfaz entre los hosts local y remoto, a la que se le puede asociar otras direcciones IP.
- Son VPNs complejas de implementar:
	- Requieren de la instalación y configuración del cliente SSH en cada máquina de usuario, así como la reconfiguración de las aplicaciones del cliente que vayan a usar el túnel.
	- Cada usuario debe tener privilegios de login en un servidor dentro de la organización. Debido a que este servidor típicamente necesita ser accesible desde internet, es susceptible de ataque.
	- Generalmente, los usuarios necesitan tener conocimientos técnicos sólidos para configurar las aplicaciones por sí mismos, y solucionar los problemas que puedan ocurrir.
	- Los usuarios habituales de las VPNs basadas en túneles SSH son los admistradores sistemas TI.
