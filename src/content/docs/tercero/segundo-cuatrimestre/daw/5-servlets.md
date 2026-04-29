---
title: "Servlets"
---

# 5.1 Aplicación web en Java
Un **sitio web** publica contenido principalmente estático. Una **aplicación web** genera o adapta la respuesta según la petición del usuario, normalmente a partir de formularios, sesiones, lógica de negocio y acceso a datos.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-220.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-222.png)

En Java, una web tradicional se apoya en **Java EE / Jakarta EE**, que añade a `Java SE` tecnologías orientadas a servidor web. Entre ellas están **Servlets** y **JSP**.

## Definiciones típicas de examen

| Concepto | Definición breve | Papel habitual |
| --- | --- | --- |
| **Aplicación web** | Software que se ejecuta en un servidor web, recibe peticiones HTTP y genera respuestas para el navegador, muchas veces de forma dinámica. | Es el conjunto completo de controladores, vistas, modelo, sesiones y acceso a datos. |
| **Servlet** | Clase Java gestionada por un contenedor web que atiende peticiones HTTP y construye o coordina la respuesta. | Suele actuar como **controlador**. |
| **JSP** | Siglas de `Java Server Pages`: páginas HTML con etiquetas y fragmentos Java que el servidor traduce a un servlet para generar contenido dinámico. | Suele actuar como **vista**. |
| **JavaBean** | Clase Java reutilizable, con constructor vacío, atributos privados y métodos `get/set`, usada para encapsular datos o lógica sencilla. | Suele formar parte del **modelo** o de los datos que se muestran en la vista. |

Si te lo preguntan “de memoria”, la idea clave es: **servlet = controlador**, **JSP = vista**, **JavaBean = datos/modelo** dentro de una **aplicación web**.

Tres enfoques habituales en Java para la capa web:
- **Servlet/JSP**: solución de bajo nivel, con mucho control sobre la respuesta HTML.
- **JSF**: solución de más alto nivel, con más trabajo delegado al framework.
- **Frameworks como Spring MVC**: alto nivel, pero manteniendo control sobre la capa web.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-223.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-224.png)


## 5.1.1 MVC en una aplicación web

El patrón **MVC** divide la aplicación en tres partes:
- **Modelo**: datos y lógica de negocio.
- **Vista**: presentación al usuario.
- **Controlador**: recibe la petición, coordina el trabajo y decide qué respuesta devolver.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-225.png)

En una aplicación web Java clásica:

- el **servlet** suele actuar como **controlador**,
- la **JSP/HTML** suele actuar como **vista**,
- las clases Java de negocio y acceso a datos forman el **modelo**.

Flujo típico:

1. El navegador envía una petición.
2. El servlet la procesa.
3. El servlet usa el modelo si necesita datos o lógica.
4. El servlet genera la respuesta o reenvía a una vista.
5. El navegador recibe HTML.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-226.png)

# 5.2 Qué es un servlet
Un **servlet** es una clase Java gestionada por un **contenedor web** y ejecutada en el servidor para atender peticiones HTTP y construir respuestas dinámicas.

Un **contenedor web** es el entorno que:
- carga y crea los servlets,
- controla su ciclo de vida,
- crea los objetos de petición y respuesta,
- decide qué servlet debe atender cada URL,
- ejecuta el código del servlet dentro del servidor.

Ejemplos de contenedor: **Tomcat** o **Jetty**.

## 5.2.1 Características principales
- Están escritos en Java, así que son **portables**.
- Se **compilan** antes de ejecutarse.
- El navegador no necesita soporte Java: toda la ejecución ocurre en el servidor.
- El contenedor reutiliza el servlet y atiende varias peticiones con **hilos**, así que suelen consumir menos recursos que soluciones antiguas como CGI.
- Al ejecutarse en la JVM, heredan el modelo de seguridad y manejo de excepciones de Java.

**Idea importante:** normalmente hay **una instancia** del servlet y varias peticiones la usan de forma concurrente. Por eso no conviene guardar estado mutable de usuario en atributos de instancia.

# 5.3 API Servlet y jerarquía básica
La API Servlet define la base técnica de estos componentes. Históricamente aparecía en `javax.servlet`; desde **Jakarta EE 9** el espacio de nombres pasó a `jakarta.servlet`.

Jerarquía habitual:

| Elemento | Papel |
| --- | --- |
| `Servlet` | Interfaz base del ciclo de vida. |
| `GenericServlet` | Implementación abstracta genérica, no limitada a HTTP. |
| `HttpServlet` | Especialización para HTTP. |
| `MiServlet` | Clase escrita por el desarrollador. |

En la práctica, casi siempre se hereda de `HttpServlet`, porque la web trabaja sobre HTTP.

## 5.3.1 Métodos esenciales

| Método | Cuándo lo llama el contenedor | Para qué sirve |
| --- | --- | --- |
| `init()` | Una vez, al inicializar el servlet | Preparación inicial |
| `service()` | En cada petición | Despacha la petición |
| `destroy()` | Justo antes de retirar el servlet | Limpieza final |

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-228.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-229.png)

En `HttpServlet`, `service()` decide a qué método HTTP delegar:

- `doGet()`
- `doPost()`
- `doPut()`
- `doDelete()`
- `doHead()`
- `doOptions()`
- `doTrace()`

# 5.4 Ciclo de vida y trabajo del contenedor
El ciclo de vida real de un servlet es:

1. El contenedor **carga la clase**.
2. Crea una **instancia** del servlet cuando decide inicializarlo.
3. Llama a `init()`.
4. Atiende cada petición llamando a `service()`, que normalmente termina en `doGet()` o `doPost()`.
5. Antes de descargarlo, llama a `destroy()`.


## 5.4.1 Cómo se procesa una petición
Cuando llega una petición HTTP:
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-231.png)

1. El contenedor comprueba qué URL se ha solicitado.
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-230.png)

2. Localiza el servlet asociado a esa URL.
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-232.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-233.png)

3. Crea los objetos `HttpServletRequest` y `HttpServletResponse`.
4. Ejecuta la atención de la petición en un hilo.
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-234.png)

5. El servlet lee datos del `request` y escribe la respuesta en `response`.
6. El contenedor transforma `response` en una respuesta HTTP real y la devuelve al cliente.
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-235.png)


![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-236.png)

# 5.5 `HttpServletRequest` y `HttpServletResponse`

Estos dos objetos encapsulan toda la comunicación HTTP.

## 5.5.1 `HttpServletRequest`

Representa la petición enviada por el cliente. Métodos muy usados:

- `getParameter()` y `getParameterNames()`: leer parámetros de formularios o query string.
- `getHeader()`: leer cabeceras HTTP.
- `getMethod()`: saber si la petición es `GET`, `POST`, etc.
- `getCookies()`: acceder a las cookies recibidas.
- `getSession()`: obtener o crear la sesión.
- `getAttribute()` y `setAttribute()`: compartir datos durante la petición.

## 5.5.2 `HttpServletResponse`

Representa la respuesta que el servidor enviará al cliente. Métodos muy usados:

- `setContentType()`: indicar el tipo de contenido.
- `getWriter()`: escribir texto, normalmente HTML.
- `getOutputStream()`: enviar datos binarios.
- `addCookie()`: añadir cookies.
- `sendError()`: devolver un error HTTP.
- `sendRedirect()`: redirigir al cliente a otro recurso.

`getWriter()` se usa para texto; `getOutputStream()` para binarios.

## 5.5.3 Servlet mínimo

```java
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/hola")
public class HolaServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    response.setContentType("text/html;charset=UTF-8");

    PrintWriter out = response.getWriter();
    out.println("<html><body><h1>Mi primer servlet</h1></body></html>");
  }
}
```

# 5.6 Estructura de una aplicación web basada en servlets

## 5.6.1 Estructura clásica desplegada en Tomcat

```text
miAplicacion/
├── index.html
├── css/
├── img/
└── WEB-INF/
    ├── web.xml
    ├── classes/
    └── lib/
```

Ideas clave:

- `WEB-INF` no es accesible directamente por URL.
- `classes/` contiene clases compiladas.
- `lib/` contiene bibliotecas `.jar`.
- `web.xml` es el descriptor de despliegue.

## 5.6.2 Estructura moderna con Maven

En desarrollo es habitual usar una estructura como esta:

```text
proyecto/
├── pom.xml
└── src/
    ├── main/
    │   ├── java/
    │   ├── resources/
    │   └── webapp/
    │       └── WEB-INF/
    └── test/
```

Maven automatiza dependencias, compilación y empaquetado del `.war`.

# 5.7 Configuración: `web.xml` y anotaciones

## 5.7.1 Configuración clásica con `web.xml`

Tradicionalmente el servlet se declaraba y mapeaba en `web.xml`:

```xml
<servlet>
  <servlet-name>Hola</servlet-name>
  <servlet-class>com.ejemplo.HolaServlet</servlet-class>
</servlet>

<servlet-mapping>
  <servlet-name>Hola</servlet-name>
  <url-pattern>/hola</url-pattern>
</servlet-mapping>
```

## 5.7.2 Configuración con anotaciones

Desde **Servlet 3.0** se puede hacer el mapeo en el propio código:

```java
@WebServlet("/hola")
public class HolaServlet extends HttpServlet {
}
```

También se pueden definir varias propiedades:

```java
@WebServlet(
  name = "FormularioServlet",
  urlPatterns = {"/formulario"},
  initParams = {
    @jakarta.servlet.annotation.WebInitParam(name = "miEmail", value = "miEmail@usc.es")
  }
)
public class FormularioServlet extends HttpServlet {
}
```

Igual que `@Override` indica una sobreescritura en Java, `@WebServlet` y `@WebInitParam` añaden metadatos que el contenedor usa para configurar el servlet.

Correspondencia más habitual:

| `web.xml`        | `@WebServlet`           |
| ---------------- | ----------------------- |
| `<servlet-name>` | `name`                  |
| `<url-pattern>`  | `urlPatterns` o `value` |
| `<init-param>`   | `initParams`            |
|                  |                         |

**Conclusión:** las anotaciones reducen XML, pero `web.xml` sigue siendo útil en configuraciones complejas.

# 5.8 Parámetros de inicialización y de contexto

Un **parámetro** es un dato de configuración, normalmente de tipo `String`, que evita tener valores fijos dentro del código.

## 5.8.1 Parámetros de inicialización de un servlet

Se definen con `<init-param>` y afectan solo a un servlet.

```xml
<servlet>
  <servlet-name>Hola</servlet-name>
  <servlet-class>com.ejemplo.HolaServlet</servlet-class>
  <init-param>
    <param-name>miEmail</param-name>
    <param-value>miEmail@usc.es</param-value>
  </init-param>
</servlet>
```

Se leen a través de `ServletConfig`:

```java
String email = getServletConfig().getInitParameter("miEmail");
```

## 5.8.2 Parámetros de contexto

Se definen con `<context-param>` y afectan a toda la aplicación:

```xml
<context-param>
  <param-name>miEmail</param-name>
  <param-value>miEmail@usc.es</param-value>
</context-param>
```

Se leen a través de `ServletContext`:

```java
String email = getServletContext().getInitParameter("miEmail");
```

## 5.8.3 `ServletConfig` vs `ServletContext`

| Aspecto    | `ServletConfig`      | `ServletContext`      |
| ---------- | -------------------- | --------------------- |
| Alcance    | Un servlet           | Toda la aplicación    |
| Instancias | Una por servlet      | Una por aplicación    |
| Parámetros | `<init-param>`       | `<context-param>`     |
| Acceso     | `getServletConfig()` | `getServletContext()` |

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-239.png)

Secuencia de despliegue:

1. Se despliega la aplicación.
2. Se crea el `ServletContext`.
3. Se cargan los `context-param`.
4. Se crea cada servlet que el contenedor inicialice en ese momento.
5. Se crea su `ServletConfig`.
6. Se llama a `init()`.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-237.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-238.png)


# 5.9 Atributos: compartir datos en ejecución

Un **atributo** es un objeto con nombre y valor que se guarda durante la ejecución. A diferencia de los parámetros, no es configuración fija: sirve para compartir datos entre componentes.

Métodos básicos:

- `setAttribute()`
- `getAttribute()`
- `getAttributeNames()`
- `removeAttribute()`

## 5.9.1 Ámbitos de los atributos

| Ámbito | Acceso | Dura mientras | Uso típico |
| --- | --- | --- | --- |
| `request` | `request.getAttribute()` | La petición actual | Pasar datos a otra vista o servlet |
| `session` | `request.getSession().getAttribute()` | La sesión del usuario | Estado del usuario autenticado, carrito |
| `application` | `getServletContext().getAttribute()` | La aplicación esté desplegada | Datos compartidos globales |

Ejemplo de atributo de aplicación:

```java
getServletContext().setAttribute("PBI", "6");
Object valor = getServletContext().getAttribute("PBI");
```

**Resumen importante:**

- **parámetros** = configuración,
- **atributos** = datos compartidos en tiempo de ejecución.

# 5.10 Construcción de la respuesta y reenvío de control

Un servlet puede responder de tres formas principales:

- escribir directamente en la respuesta con `PrintWriter`,
- ceder el control a otro recurso del servidor,
- ordenar al navegador que haga una nueva petición.

## 5.10.1 Escritura directa con `PrintWriter`
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-242.png)

Es la opción más simple, pero mezcla lógica y presentación. En aplicaciones medianas es mejor dejar la vista a una JSP u otra capa de presentación.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-240.png)

## 5.10.2 `RequestDispatcher`

Sirve para trabajar con recursos del mismo servidor: otro servlet, una JSP o un HTML interno.

```java
RequestDispatcher rd = request.getRequestDispatcher("/destino");
```

Métodos principales:
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-241.png)

Puntos clave:
- `forward()` y `include()` trabajan con los **mismos** objetos `request` y `response`.
- Con `forward()` el control pasa al recurso destino.
- Con `include()` el servlet actual mantiene el control y añade contenido ajeno.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-243.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-244.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-245.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-246.png)

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-247.png)


## 5.10.3 `sendRedirect()`

```java
response.sendRedirect("otraPagina.html");
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-248.png)

Aquí no se reenvía internamente la petición: se le dice al **navegador** que haga una petición nueva a otra URL.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-250.png)


## 5.10.4 `forward()` vs `sendRedirect()`
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-251.png)


# 5.11 Sesiones y seguimiento de estado

## 5.11.1 Por qué hacen falta sesiones

**HTTP es un protocolo sin estado**: cada petición se trata de forma independiente. Si no se añade un mecanismo extra, el servidor no sabe si dos peticiones vienen del mismo usuario ni puede relacionarlas.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-252.png)

La solución es mantener una **sesión**, es decir, asociar varias peticiones al mismo cliente.

Una sesión suele:

- empezar cuando el cliente realiza una petición y el servidor crea el contexto de sesión,
- terminar por inactividad, cierre o invalidación explícita.

## 5.11.2 Mecanismos de seguimiento de sesión

| Mecanismo | Idea | Situación |
| --- | --- | --- |
| Campos ocultos | Guardar datos en `<input type="hidden">` | Manual y hoy poco recomendable |
| Reescritura de URL | Añadir datos o identificadores a la URL | Útil como respaldo si no hay cookies |
| Cookies | Guardar un identificador o dato en el cliente | Muy habitual |
| `HttpSession` | Mantener el estado en servidor | Opción estándar y recomendada |

## 5.11.3 Campos ocultos

Ejemplo:

```html
<input type="hidden" name="miDato" value="valor">
```

Luego se recupera con:

```java
String dato = request.getParameter("miDato");
```

Ventaja: no depende de cookies.  
Inconveniente: es manual, limitado y poco mantenible.

## 5.11.4 Reescritura de URL

Consiste en pasar datos o identificadores dentro de la URL:

```text
/servlet2?ID=123
```

Se leen con `getParameter()`. Es útil como mecanismo de respaldo, pero genera URLs largas, visibles y más delicadas desde el punto de vista de seguridad y caché.

El contenedor puede ayudar con:

```java
String url = response.encodeURL("/servlet2");
```

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-253.png)
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-254.png)

## 5.11.5 Cookies

Una **cookie** es un par **nombre/valor** que el servidor pide almacenar al navegador y que este devuelve automáticamente en peticiones posteriores.

Creación y envío:

```java
Cookie cookie = new Cookie("mi_cookie", "valor");
cookie.setMaxAge(30 * 60);
response.addCookie(cookie);
```

Lectura:

```java
Cookie[] cookies = request.getCookies();
```

Ventajas:

- no ensucia las URLs,
- es transparente para el usuario,
- es el mecanismo estándar para asociar una sesión.

Limitaciones:

- el navegador puede bloquearlas,
- tienen tamaño pequeño,
- afectan a privacidad y mantenimiento.

## 5.11.6 `HttpSession`

Es la solución estándar en Servlets. El contenedor crea una sesión y la identifica normalmente con la cookie `JSESSIONID`.

Métodos frecuentes:

- `getId()`
- `isNew()`
- `getCreationTime()`
- `getLastAccessedTime()`
- `setAttribute()`
- `getAttribute()`
- `removeAttribute()`
- `setMaxInactiveInterval()`
- `invalidate()`

Creación o recuperación:

```java
HttpSession session = request.getSession();
```

Solo recuperar si ya existe:

```java
HttpSession session = request.getSession(false);
```

Comprobación típica:

```java
HttpSession session = request.getSession(false);

if (session == null) {
  session = request.getSession();
}
```

Guardar datos de usuario en sesión:

```java
HttpSession session = request.getSession();
session.setAttribute("usuario", usuario);
Usuario u = (Usuario) session.getAttribute("usuario");
```

## 5.11.7 Finalización de sesión

Hay tres formas habituales:

- en `web.xml` con `<session-timeout>`,
- por código con `session.setMaxInactiveInterval(segundos)`,
- forzando el cierre con `session.invalidate()`.

**Conclusión práctica:** `HttpSession` es la opción más simple e integrada; internamente se apoya en cookies y, si hace falta, puede usar reescritura de URL.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-255.png)

# 5.12 Evolución de los servlets: de `javax` a `jakarta`

## 5.12.1 Evolución resumida

| Versión | Año | Idea principal |
| --- | --- | --- |
| Servlet 3.0 | 2009 | Anotaciones, menos XML, soporte asíncrono |
| Servlet 3.1 | 2013 | Mejoras asíncronas e I/O no bloqueante |
| Servlet 4.0 | 2017 | Integración con HTTP/2 |
| Servlet 5.0 | 2020 | Paso de `javax.servlet` a `jakarta.servlet` |
| Servlet 6.0 | 2022 | Ajustes y mejoras para entornos modernos |

## 5.12.2 Por qué cambia `javax` por `jakarta`

Java EE pasó a la **Eclipse Foundation** para seguir evolucionando como plataforma abierta. Como Oracle conservó la marca **Java** y el espacio de nombres `javax`, la evolución posterior tuvo que hacerse con un nuevo nombre de paquete:

- antes: `javax.servlet.*`
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-256.png)

- ahora: `jakarta.servlet.*`
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-257.png)

Esto significa que mucha documentación antigua sigue usando `javax`, pero el enfoque actual usa `jakarta`.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-258.png)

## 5.13 Ideas que no debes confundir

- Un **servlet no es una página HTML**: es código Java del servidor.
- Un **servlet no vive en el navegador**: vive en el contenedor web.
- `request` representa lo que llega del cliente; `response`, lo que se devolverá.
- **Parámetro** no es lo mismo que **atributo**.
- **`forward()`** no es lo mismo que **`sendRedirect()`**.
- **Sesión** no es lo mismo que **cookie**: la cookie suele transportar el identificador; la sesión se mantiene en el servidor.

Si entiendes esas diferencias, entiendes la base del modelo Servlet/JSP.

# 5.14 Plantilla de ejercicio de examen

Si te piden **programar una aplicación web con varios servlets, algún JSP y `web.xml`**, una solución muy típica es montar un flujo MVC sencillo: un servlet muestra el formulario, otro procesa el login, otro carga datos para la vista y otro cierra la sesión.

## 5.14.1 Estructura recomendada

```text
src/
└── main/
    ├── java/
    │   └── daw/
    │       ├── model/
    │       │   └── UsuarioBean.java
    │       └── web/
    │           ├── InicioServlet.java
    │           ├── LoginServlet.java
    │           ├── ListadoServlet.java
    │           └── LogoutServlet.java
    └── webapp/
        └── WEB-INF/
            ├── jsp/
            │   ├── login.jsp
            │   └── panel.jsp
            ├── lib/
            │   └── jstl.jar
            └── web.xml
```

Idea importante:
- los **servlets** viven en `java/`,
- las **vistas JSP** viven en `WEB-INF/jsp/` para que no se entren por URL directa,
- `web.xml` mapea las URLs a los servlets.

## 5.14.2 Bean de apoyo

```java
package daw.model;

import java.io.Serializable;

public class UsuarioBean implements Serializable {
  private String nombre;

  public UsuarioBean() {
  }

  public UsuarioBean(String nombre) {
    this.nombre = nombre;
  }

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }
}
```

## 5.14.3 Servlets principales

### `InicioServlet`

Muestra el formulario de acceso.

```java
package daw.web;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

public class InicioServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
    request.getRequestDispatcher("/WEB-INF/jsp/login.jsp").forward(request, response);
  }
}
```

### `LoginServlet`

Lee el formulario, valida y guarda el usuario en sesión si todo va bien.

```java
package daw.web;

import daw.model.UsuarioBean;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

public class LoginServlet extends HttpServlet {
  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
    String nombre = request.getParameter("nombre");
    String pwd = request.getParameter("pwd");

    if ("DAW".equals(pwd)) {
      UsuarioBean usuario = new UsuarioBean(nombre);
      request.getSession().setAttribute("usuario", usuario);
      response.sendRedirect(request.getContextPath() + "/listado");
    } else {
      request.setAttribute("error", "Password incorrecto");
      request.getRequestDispatcher("/WEB-INF/jsp/login.jsp").forward(request, response);
    }
  }
}
```

### `ListadoServlet`

Carga datos para la vista y comprueba que el usuario ya está autenticado.

```java
package daw.web;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class ListadoServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
    HttpSession session = request.getSession(false);

    if (session == null || session.getAttribute("usuario") == null) {
      response.sendRedirect(request.getContextPath() + "/inicio");
      return;
    }

    List<String> asignaturas = Arrays.asList("DAW", "POO", "DOO");
    request.setAttribute("asignaturas", asignaturas);
    request.getRequestDispatcher("/WEB-INF/jsp/panel.jsp").forward(request, response);
  }
}
```

### `LogoutServlet`

Invalida la sesión y vuelve al inicio.

```java
package daw.web;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;

public class LogoutServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    HttpSession session = request.getSession(false);

    if (session != null) {
      session.invalidate();
    }

    response.sendRedirect(request.getContextPath() + "/inicio");
  }
}
```

## 5.14.4 `web.xml`

Si el ejercicio pide **descriptor de despliegue**, este es el patrón básico:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="https://jakarta.ee/xml/ns/jakartaee https://jakarta.ee/xml/ns/jakartaee/web-app_6_0.xsd"
         version="6.0">

  <display-name>EjemploServletJsp</display-name>

  <servlet>
    <servlet-name>InicioServlet</servlet-name>
    <servlet-class>daw.web.InicioServlet</servlet-class>
  </servlet>

  <servlet>
    <servlet-name>LoginServlet</servlet-name>
    <servlet-class>daw.web.LoginServlet</servlet-class>
  </servlet>

  <servlet>
    <servlet-name>ListadoServlet</servlet-name>
    <servlet-class>daw.web.ListadoServlet</servlet-class>
  </servlet>

  <servlet>
    <servlet-name>LogoutServlet</servlet-name>
    <servlet-class>daw.web.LogoutServlet</servlet-class>
  </servlet>

  <servlet-mapping>
    <servlet-name>InicioServlet</servlet-name>
    <url-pattern>/inicio</url-pattern>
  </servlet-mapping>

  <servlet-mapping>
    <servlet-name>LoginServlet</servlet-name>
    <url-pattern>/login</url-pattern>
  </servlet-mapping>

  <servlet-mapping>
    <servlet-name>ListadoServlet</servlet-name>
    <url-pattern>/listado</url-pattern>
  </servlet-mapping>

  <servlet-mapping>
    <servlet-name>LogoutServlet</servlet-name>
    <url-pattern>/logout</url-pattern>
  </servlet-mapping>

  <session-config>
    <session-timeout>30</session-timeout>
  </session-config>
</web-app>
```

## 5.14.5 Flujo que debes saber explicar

1. El navegador entra en `/inicio`.
2. `InicioServlet` hace `forward()` a `login.jsp`.
3. El formulario envía `POST` a `/login`.
4. `LoginServlet` valida los datos.
5. Si son correctos, guarda un `UsuarioBean` en `session` y hace `sendRedirect()` a `/listado`.
6. `ListadoServlet` carga datos en `request` y hace `forward()` a `panel.jsp`.
7. `panel.jsp` muestra el usuario y la lista de asignaturas.
8. `LogoutServlet` invalida la sesión y redirige de nuevo a `/inicio`.

Este patrón resume casi todo lo que suelen pedir:
- **varios servlets**,
- **un bean** para los datos,
- **una o varias JSP** como vista,
- **`web.xml`** para el mapeo,
- **`request/session`**, `forward()` y `sendRedirect()`.

La parte JSP de este mismo ejemplo queda desarrollada en el tema `6. JSP`.