---
title: "Seguridad en programas y aplicaciones"
---

# 3.1 Programación Segura
El **CERT** (Computer Emergency Response Team) es el **centro de coordinación de avisos de seguridad a nivel global**.


## 3.1.1 Introducción
- La mayor parte de los **riesgos** de seguridad hoy en día vienen de **aplicaciones** y servicios en **Internet**. 
- Muchos de los **avisos de seguridad** de los CERT/CSIRT **no se pueden arreglar** con **criptografía**. 
- Los **atacantes** **no crean los agujeros de seguridad, simplemente los explotan.** 
- La **seguridad** de un programa o aplicación **no es una característica que se añade** en algún momento del ciclo de desarrollo. 
- La **seguridad no es independiente del entorno** concreto en el que se ejecutará el programa. 
- Es importante definir correctamente la **política de seguridad**


Es común que las **aplicaciones** se lancen con **fallos** que luego deben ser **corregidos** a medida que los **atacantes los van detectando**. 
- Los parches **sólo solucionan** los problemas que **encuentran los atacantes**. 
- Muchos parches **no son aplicados** por los administradores de los equipos **hasta pasados varios meses**, o no llegan a ser aplicados nunca. 
- Económicamente sería **más rentable detectarlos y eliminarlos antes** del lanzamiento comercial del programa. 

1. Una vez que se **descubre y publica un problema** de seguridad en un sistema los **ataques aumentan** hasta la publicación del parche correspondiente. 
2. **Después del lanzamiento del parche** los ataques continúan **aumentando** porque los administradores y usuarios **tardan en actualizar los programas.** 
3. El **decrecimiento** en los ataques se puede retrasar incluso **más de un año** desde el **lanzamiento del parche**.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-52.png)

### Metas de un Proyecto Software
- **Funcionalidad** → objetivo principal. 
- **Usabilidad** → facilidad de uso. 
	- Puede afectar a la **fiabilidad**, pues es habitual que **fallos humanos** conduzcan a fallos software. 
	- En competencia con el aumento de la **seguridad**. 
- **Eficiencia** → también puede estar en **competencia** con la **seguridad** por la sobrecarga de los sistemas. 
- **Time-to-market** → tiempo de diseño y prueba para poner el producto en el mercado. 
	- Influye negativamente en la **seguridad**, por las prisas.

- Un **test de funcionalidad** trata de verificar que la aplicación funcione correctamente en situaciones normales o esperadas. 
- Un **test de seguridad** trata de verificar que la aplicación funcione según lo esperado en situaciones anormales (entradas de texto demasiado largas, entradas numéricas erróneas, intentos de conexión con parámetros incorrectos, etc.)

## 3.1.2 10 Reglas Básicas
### 1. Asegurar los puntos más débiles
La seguridad es como una **cadena**, es **tan fuerte como su eslabón más débil**, por tanto, al atacar un sistema se trata de hacerlo por el **punto más débil.** 
- Ataque a la información enviada de A a B en modo cifrado → mejor atacar A o B. 
- Ataque a un cortafuegos → mejor atacar las aplicaciones visibles desde fuera. 

A veces el punto más débil no está en el software si no en el **entorno** (ataques de ingeniería social). 


### 2. Practicar la defensa en profundidad. 
Tener **varias capas de defensa** de modo que **si falla una**, **otra pueda detener** aún al atacante. Protección de los datos de una bd: 
- Cortafuegos corporativo. 
- Cifrado de las comunicaciones internas. 
- Cortafuegos en el servidor de bd. 
- Protección física en el servidor de bd. 
- Cifrado de los datos en la propia bd. 

### 3. Fallar de forma segura. 
Los **fallos** son **inevitables** así que hay que procurar **gestionarlos de un modo seguro**. 

Una de las formas de **atacar** un sistema es **provocar un fallo en el mismo** para ver si no es gestionado de modo seguro. 

Si una acción **falla**, el sistema debería s**er tan seguro como cuando se inició la acción**. 

### 4. Privilegios mínimos. 
Proporcionar solamente el **nivel de privilegios necesarios** y para el **menor intervalo de tiempo** posible. 

Este principio no se cumple en muchos productos distribuidos comercialmente pues demandan un nivel de privilegios excesivos para evitar problemas futuros. 

Un servidor de correo en Unix necesita permisos de administrador para abrir el puerto 25. Después no hay razones técnicas para seguir manteniendo este privilegio así que se le podría quitar. Sin embargo, muchos programas (como sendmail) no lo hacían y continuaban todo el tiempo en modo administrador.

### 5. Compartimentalizar.
**Separar** distintos **subsistemas según los privilegios** necesarios y la **parte del sistema** con la que deben/pueden interaccionar.


### 6. Apostar por lo simple. 
El s**oftware complejo se entiende peor** y por lo tanto es **más propenso a errores**. 
- **Reutilización de componentes de buena calidad** (p. e. las librerías criptográficas).
- Importancia de los **puntos de control** a través de los cuales g**estionar todas las operaciones peligrosas** → no debe haber caminos ocultos (backdoor) alternativos. 
- **Opciones seguras por defecto**. 
- **Diálogo** con los **usuarios** potenciales para **determinar** sus **necesidades**. 
- Los usuarios no son expertos así que **cuidado con las ventanas de diálogo** (seguramente no leerán el texto). 

### 7. Favorecer la privacidad. 
- El programa debe **proteger** en la medida de lo posible los **datos facilitados por el usuario**. 
- Mantener la **privacidad del propio programa** también favorece la **seguridad**. No proporcionar públicamente si no es necesario información como la versión del software. 

### 8. Recordar que mantener secretos es difícil. 
Mantener **secretos** en el **código binario** no es fácil, sobre todo si los **atacantes** pueden **disponer de ese código en su máquina** para jugar con él. Las **comunicaciones** internas tampoco son completamente fiables (empleados corruptos, descontentos, etc.). 

La **seguridad no debería depender de ocultar el diseño o la implementación** (seguridad por oscuridad). No se aplica a información como contraseñas o claves criptográficas. 

### 9. Ser cauto con la confianza. 
- Los **servidores** no deben **confiar ciegamente** en los clientes y **viceversa** pues ambos pueden estar comprometidos. 
- No fiarse de las **prácticas de los demás** pues pueden no ser correctas. 
- No fiarse totalmente de los **productos específicos de seguridad**, pues pueden ser programas para violar la seguridad. 
- La seguridad es transitiva, **no comunicar libremente programas** fiables con programas de dudosa fiabilidad. 

### 10. Emplear los recursos de la comunidad. 
Los programas y componentes que llevan siendo **utilizados mucho tiempo sin noticias** **de fallos de seguridad** ofrecen un nivel de confianza alto. 

Las aplicaciones **revisadas** por mucha gente o de modo **público** también tienen un valor de seguridad y fiabilidad añadido (es el caso de las librerías de cifrado).


# 3.2 Vulnerabilidades en el Desarrollo de Apps
**Vulnerabilidad Software:** **fallo** en las **políticas** de seguridad, **procedimientos y controles** de un software que permiten a un sujeto **violar dichas políticas**.
- Al **sujeto** se le denomina **atacante**
- Al **uso del fallo** para violar la política de seguridad se le denomina **explotación de vulnerabilidad**

## 3.2.1 TOCTOU
- **TOCTOU** (Time Of Check, Time Of Use): vulnerabilidad relacionada con la sincronización en el control de acceso, cuando hay operaciones secuenciales en el proceso

- **Ventana de vulnerabilidad:** tiempo **entre** la **comprobación** y el **acceso**, durante el cual se podría modificar la condición y realizar un acceso incorrecto


En los casos de acceso a ficheros, deben darse varias **circuntancias** para poder explotar la vulnerabilidad:
- El **atacante** debe tener **acceso** a la **máquina local**
- El **programa explotado** necesita estar ejecutándose con **privilegios de root** (bit seuid o setgid activo).
- Estos **privilegios** deben **mantenerse** durante la ventana de vulnerabilidad

Las posibles **soluciones son:**
- Si es posible, es mejor usar **identificadores de fichero o punteros a fichero** en lugar de los nombres de los ficheros **como argumentos** en las funciones para asegurarnos de que el **fichero** sobre el que trabajamos **no cambia** después de que empecemos a manejarlo.
- Cuando no es posible, mantener los ficheros en un **directorio** que **sólo** sea **accesible** por e **UID del programa** que ejecuta las operaciones sobre el fichero
- Es muy importante **no usar setuid o setgid** a no ser que sea estrictamente necesario.

### Ejemplo: xterm
`xterm` emula un terminal en un sistema de ventanas X11, debía ccrer como usaurio root en **UNIX**, con setuid y setgid activos. Su utilidad de registro permitía al usuario **registrar** las **entras y salidas** en un **fichero**, de manera que si este no existe, `xterm` lo crea y hace propietario al usuario, y si sí existe, `xterm`comprueba que el usuario puede escribir en él y añade el registro.
- Dado que **root** puede añadir datos a cualquier archivo, la **comprobación siempre tiene éxito**

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-53.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-54.png)

Hay una **ventana de vulnerabilidad** entre la llamada a `access` y a `open`, que un atacante puede aprovechar para **reemplazar** un **fichero** en el que tiene permisos de escritura por uno que sea **propiedad de root, sobreescribiendo este último**. 
- Esto se haría haciendo que el programa abriese un enlace simbólico a un fichero y reemplazándolo durante la ventana de vulnerabilidad por un enlace con el **mismo nombre** a un archivo de **root**. 

Para aumentar las posibilidades de éxito puede crear un programa que **repita** el proceso **automáticamente** hasta que coincida con la ventana de vulnerabilidad
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-55.png)

## 3.2.2 Desbordamiento de Memoria
- **Buffer:** zona de memoria de **tamaño predefinido** reservada para alojar un conjunto de datos del mismo tipo
- **Desbordamiento de memoria:** se produce cuando un programa intenta **almacenar más** datos en el buffer de los que **permite su tamaño**. Los datos extra **sobrescriben** la **zona de memoria adyacente** al buffer, **corrompiendo datos** válidos y posiblemente **modificando el flujo de ejecución** del programa.

Tipos de ataques:
- **Remotos:** toda aplicación que espere datos de una conexión red o que lea datos que provienen de la red es susceptible de ser atacada si tiene esta vulnerabilidad.
- **Locales:** se produce cuando un usuario tiene acceso a una máquina, pero quiere obtener más mismos atacando una aplicación que corre bajo otro usuario, por ejemplo **root**

Los **efectos del desbordamiento** de memoria dependen de 4 factores:
- La **cantidad de información** escrita fuera de los límites.
- **Que datos son sobrescritos**
- Si el programa intenta **leer** alguno de los **datos sobrescritos**
- Qué datos **reemplazan** a los datos **sobrescritos**.


### Por qué es un problema de seguridad
- **Stack-smashing:** el atacante coloca su código en una zona de memoria cualquiera de la pila y provoca desbordamiento de esta con instrucciones de salto hacia esa zona.
	- Conseguir un **desbordamiento** de **heap** es más **difícil**, por lo que muchos programadores **evitan** los **buffers estáticos** y recurren a las funciones de **reserva dinámica**. Esto **no es infalible**, por lo que no se debe confiar únicamente en esta solución.
- Los **programas** que tiene el **setuid activado** que son ejecutados por un **usuario normal** asumiendo los **permisos de superusuario** pueden ser **necesarios** para acceder a determinados dispositivos o archivos restringidos, pero también son una **brecha de seguridad**.
- Los **servicios de red** pueden ser atacados por un **usuario remoto** para **acceder a la máquina** local como usuario normal o incluso como **root**. 


![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-56.png)


### Contramedidas
Por el **desarrollador:**
- Se deben **verificar** los **límites** de los buffers, usando **funciones** como `strncpy` y tratando con **cuidado** los **bucles** con `getc` y similares.
- Se pueden usar lenguajes de programación con comprobación de límites (Java, C#, etc. )

Por el **compilador:**
- Existen **compiladores** de C que implementan la **comprobación de límites**. Aunque pueden consumir **mucho timepo** en programas con uso de **punteros grandes**.
- Usar utilidades como **stackguard**, que implementan un método de comprobación de límites más eficientes.
- Las últimas versiones de **gcc comprueban modificaciones** de la **pila** y avisan de ataques de stack-smashing. Aunque existen ataques por desbordamiento de buffer en el **montón que no pueden detectarse** de esta manera.

Por el **sistema operativo:**
- La solución sencilla es **prohibir la ejecución de código en la pila**. Pero puede perderse algo en **eficiencia** y se pueden seguir produciendo **desbordamientos en el montón**
- **Aleatorización de la distribución del espacio de memoria** (Addres Space Layout Randomization, ASLR), que aleatoriza las direcciones de memoria de forma que la dirección de la pila de ejecución no sea siempre la misma , dificultando el ataque. Esto no evita **ataques por prueba y error**, que pueden encontrar valores razonables que funcionan en bastantes casos.

Por un **analizador de red:**
- **Inspección profunda de paquetes** (Deep Packet Inspection, DPI), que examina los paquetes de la red para identificar un posible ataque buscando shellcode, una lista larga de NOPs, etc. Aunque existen **shellcodes** que se **automodifican y transforman**, ignorando esta protección.


### Resumen
- La **base de datos de vulnerabilidades del CERT** contiene numerosas entradas relativas a aplicaciones con esta vunerabilidad.
- Constantemente se detectan **nuevas aplicaciones** con este problema.
- Es una vulnerabilidad **muy fácilmente explotable**.
- **No** existe una **solución** que proteja a **todos** los programas.


### Descripción Ténica
El código más habitual para ser ejecutado es el que abre una shell, ya que desde ella se puede ejecutar lo que se desee. Es posible ejecutar otro tipo de código, pero en general se le **shellcode** a **cualquier código** pensado para ser ejecutado en un **programa vulnerable** y **tomar control** de este.

Un **exploit** es un programa que permite **aprovechar** una o más **vulnerabilidades** de otro programa para **obtener determinados privilegios**.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-57.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-59.png)![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-60.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-61.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-62.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-63.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-64.png)



![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-65.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-66.png)


![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-67.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-68.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-69.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-70.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-71.png)



![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-72.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-73.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-74.png)



# 3.3 Vulnerabilidades Web
## 3.1.1 Ataques centrados en la Web y la Sesión de Usuario
### Man in the Browser
Un malware se mete en el navegador y **intercepta o modifica** lo que el usuario escribe o envía, incluso aunque luego viaje cifrado.
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-75.png)


### Registro de Pulsaciones de Teclado
Hardware o malware que **graba todas las teclas** que pulsa el usuario para robar credenciales u otra información. No está limitado a los navegadores.


### Page in the Middle
El usuario es redirigido a una **página distinta de la que cree visitar**, y ahí el atacante puede capturar o alterar su entrada.

### Browser in the Browser
Se simula una **ventana de inicio de sesión aparentemente real** dentro de la propia página para engañar al usuario y robar sus datos.

### Clickjackin
se engaña al usuario para que haga clic en algo que **parece inofensivo**, pero en realidad activa otra acción oculta. Ejemplo real: secuestro del “click” para activar la cámara y el micrófono del usuario.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-76.png)

## 3.3.2 Engaño al Usuario
### Phising
Mensaje o comunicación que **engaña a la víctima** para que entregue datos privados o realice una acción insegura.

### Sitio web falso
Página que **imita a una legítima** para que el usuario confíe en ella y entregue credenciales o información sensible.

### Sustitución en la descarga de programas
El atacante ofrece un programa aparentemente normal, pero al descargarlo o instalarlo el usuario **acaba metiendo malware o spyware**.

### Herramientas falsas
Software que se presenta como útil o de seguridad, pero en realidad **engaña al usuario** y puede instalar malware, mostrar falsos avisos o forzar acciones.
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-77.png)

### User in the middle
Se usa al propio usuario como intermediario, por ejemplo **haciéndole resolver un CAPTCHA** o realizar una acción que en realidad beneficia al atacante (por ejemplo, para solicitar la creación de nuevas cuentas de correo).


## 3.3.3 Mediación incompleta
Ocurre cuando el servidor **confía demasiado en datos que vienen del cliente** y no los vuelve a comprobar correctamente. El atacante cambia valores de la URL o del formulario, por ejemplo **precio, cantidad o identificadores**, para alterar el resultado.

**No se debe confiar en el navegador ni en la entrada del usuario**, porque puede ser modificada antes de llegar al servidor.


## 3.3.4 Ataques de Inyección
Consiste en introducir datos maliciosos para que la aplicación **ejecute algo distinto de lo esperado**.

### Cross-site scripting (XSS)
Se inyecta código de script o HTML para que **el navegador ejecute contenido malicioso** dentro de una web.

### Path traversal
Se manipulan rutas como `../` para **acceder a archivos del servidor** que no deberían estar expuestos. Habitualmente se introducen las direcciones en la barra de URLs, pero puede combinarse con otros ataques, como el XSS.

### Inyección SQL
Se introducen fragmentos SQL en entradas de usuario para **alterar consultas a la base de datos**.

### Contramedidas
- Filtrar y sanear todas las entradas del usuario: Necesario tener en cuenta toda posible codificación potencialmente válida
- No hacer suposiciones sobre el rango de entradas de usuario posibles: no confiar en nada, comprobarlo todo.
- Utilizar mecanismos de control en los servidores de datos, como por ejemplo “procedimientos almacenados”

## 3.3.5 OWASP
Es una comunidad y proyecto abierto centrado en **mejorar la seguridad de las aplicaciones web** y ayudar a desarrollar, comprar y mantener aplicaciones de confianza.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-78.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/ciber/imagenes/image-79.png)
