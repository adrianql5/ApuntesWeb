---
title: "Introducción"
---

Escrito por Adrián Quiroga Linares. [adrianql5](https://github.com/adrianql5)


La ciberseguridad busca la protección de los activos de un sistema informático. Estos activos incluyen los datos, el software, el hardware y las comunicaciones.

# 1.1 Los datos
Cada día hº más datos en los equipos de uso personal apetitosos para los ciberdelinucentes, **números de tarjetas de crédito, números de cuenta, certificados digitales, contraseñas,...** Incluso datos como el **DNI** aparentemente inofensivos, pueden servir para un **ataque de suplantación de la personalidad**. 

A la hora de valorar los efectos de un ataque, también **hay que pensar en el valor que tienen esos datos** y lo que supondría su pérdida. En cada caso deberíamos emplear diferentes técnicas para proteger los datos: realizar copias de seguridad, mecanismos de autentificación de usuarios o incluso cifrado de los datos. Tener datos en la **nube** implica tener información personal fuera de nuestro control directo.

# 1.2 El software
En cualquier dispositivo coexisten muchos tipos de software. Uno de los objetivos de los atacantes de un sistema es hacerse con el control de alguna de esas aplicaciones para hacer que trabajen para ellos. Existen dos métodos de ataque básico:
- **Buscar puntos débiles en el software**: fallos del sistema operativo y vulnerabilidades conocidas de los programas instalados que permitirían a un atacante tomar el control de los mismos.
- **Introducir algo aparentemente inofensivo en el software pero que después hiciese cosas diferentes (troyano):** por ejemplo, un gestor de correo que, además de gestionar el correo, envía copia de los mensajes a una determinada dirección de internet. 

Para protegernos debemos tener siempre los programas lo más actualizados posible y no instalar programas de procedencia dudosa.


# 1.3 El hardware
Muchos usuarios tienen cortafuegos y antivirus en sus ordenadores, pero si se trata de equipos que emplean ellos solos, puede ser que los tengan **configurados para que los pidan ninguna contraseña** al arrancar. Por lo que cualquier persona que tenga acceso físico al equipo y podrá hacer con él lo que quiera.

Una persona con conocimientos informático, aún no teniendo las contraseñas de acceso, puede hacer muchas averiguaciones en el. Puede **robar el disco duro** para montarlo en otro ordenador, arrancar el sistema, puede instalar un sistema que registre las pulsaciones de las teclas para obtener claves de acceso, etc.

**Robo de dispositivos móviles más probable**.


# 1.4 Las comunicaciones
Involucran hardware y software, transmiten datos y necesitan protocolos seguros. Para transmitir información entre ordenadores y demás dispositivos tiene que existir un canal entre ellos. Hoy en día este canal es mayoritariamente **Internet**.

Solamente grandes empresas y gobiernos emplean redes propias o algunos canales telefónicos punto a punto. El problema de Internet y las redes públicas es que emplean múltiples nodos de interconexión a los que tienen acceso muchos usuarios y de muy  distintos tipos.

Esto se une al hecho de que **en ocasiones los protocolos de comunicación más empleados no contemplan mecanismos de seguridad adecuados,** hacen que cualquier persona con acceso a esos nodos o a alguna de las redes intermedias pueda interceptar, leer y/o modificar cualquier mensajes sin demasiados problemas.

En este caso la solución no es aislar nuestros sistemas, la solución es **emplear técnicas criptográficas.**. Es muy importante la correcta **implementación** de los protocolos que aportan seguridad.

# 1.5 Amenazas
## 1.5.1 Ataques Aleatorios
Las **motivaciones** pueden ser varias:
- Simple diversion de alguien que busca sistemas mal protegidos para alguna **travesura**
- Alguien que busca instalar en nuestro sistema **programas espía** para capturar datos nuestros y aprovecharlos en su beneficio.
- Atacante que busque **controlar nuestro sistema** para emplearlo como cabeza de puente en ataques contra otros sitios ocultando así su verdadera identidad.
 Ej: **escaneo al azar de direcciónes IP y puertos abiertos**.

## 1.5.2 Ataques Dirigidos
Los motivos también pueden ser muy diversos:
- **Competencia industrial:** interés de una empresa rival en acceder a nuestra comunicaciones internas
- **Ataques de organizaciones religiosas, políticas, ONGs** que defienden ideas contrapuestas a las de la organización.
- **Afán de notoriedad**, si somos por ejemplo una empresa con cierta imagen pública.
- **Facilidad:** ataques a sistemas porque son fáciles de atacar.

La mayoría de las empresas tienen la tendencia a suponer que los ataques vienen de fuera y por lo tanto se dedican a proteger sus sistemas del exterior, estableciendo una defensa perimetral. Sin embargo existen los **ataques internos**, donde un empleado con conocimientos puede tratar de implementar un ataque informático contra su empresa: caso de un **empleado descontento** o despedido injustamente (para él) o también el caso de una persona infiltrada para hacer **espionaje industrial** (o militar, o político…).


# 1.6 Servicios básicos de seguridad
- **Disponibilidad:** asegurar que la información puede ser utilizado por las partes autorizadas
- **Confidencialidad:** asegurar que la información es visto solo por partes autorizadas
- **Integridad:** asegurar que la información es modificada únicamente por partes autorizadas.

- **Autenticación:** asegurar que el origen de la información es quien dice ser
- **No repudio:** impedir que alguien niegue haber realizado una acción cuando efectivamente lo ha hecho
- **Control de acceso:** garantizar acceso únicamente a partes autorizadas a los recursos.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/Pasted%20image%2020260217140244.png)

