---
title: "JSP"
---

# 6.1 Introducción
![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-259.png)

La **lógica de negocio** es la parte del programa que implementa las reglas del dominio: cómo se crean, almacenan, consultan y modifican los datos.

Las **JSP** (`Java Server Pages`) son páginas **HTML** con fragmentos de código Java y etiquetas especiales que se ejecutan en el **servidor** para generar contenido dinámico. Su objetivo principal es **separar la presentación de la lógica**, evitando construir HTML directamente desde un servlet.

En una aplicación web típica:
- el **cliente** envía la petición,
- el **contenedor web** ejecuta servlets y JSP,
- la lógica puede acceder a la **base de datos**,
- y la respuesta HTML vuelve al navegador.

Las JSP no se ejecutan directamente: el contenedor las **traduce a un servlet**, las **compila** y luego las ejecuta. Si la JSP cambia, el proceso de traducción y compilación se repite.

![](/ApuntesWeb/images/tercero/segundo-cuatrimestre/daw/imagenes/image-261.png)

Una JSP se parece a una página HTML normal, pero puede incluir código entre delimitadores `<% ... %>` o etiquetas `jsp:`. Los elementos básicos son estos:

- **Comentarios JSP**: no se envían al cliente.

```jsp
<%-- Este es un comentario JSP --%>
```

- **Declaraciones**: definen variables y métodos a nivel de clase del servlet generado.

```jsp
<%!
int suma = 0;

int doble(int n) {
    return n * 2;
}
%>
```

- **Expresiones**: evalúan una expresión Java y escriben el resultado en la salida.

```jsp
<%= Math.random() %>
```

- **Scriptlets**: insertan código Java dentro del método `_jspService()`. Permiten variables locales y lógica, pero no métodos.

```jsp
<%
if (time == 10) {
    ++suma;
}
%>
```

- **Directivas**: se procesan cuando la JSP se traduce a servlet. No generan salida, pero sí modifican el servlet resultante.

```jsp
<%@ page language="java" import="java.util.*" %>
<%@ include file="fragmento.html" %>
<%@ taglib uri="http://www.usc.es/pbi/jsp_lib" prefix="fun" %>
```

Además de las directivas, existen las **acciones JSP**, que se escriben con sintaxis XML y se evalúan en cada petición.

### Directiva `page`
La directiva `page` define características globales de la JSP y suele colocarse al comienzo del archivo.

```jsp
<%@ page atributo="valor" %>
```

Sus atributos más importantes son:

| Atributo       | Significado                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------------- |
| `language`     | Lenguaje de scripting. Por defecto, `java`.                                                              |
| `extends`      | Clase de la que heredará el servlet generado.                                                            |
| `import`       | Lista de clases o paquetes Java importados.                                                              |
| `session`      | Indica si la página usa sesión por defecto.                                                              |
| `buffer`       | Tamaño del buffer de salida. Por defecto, `8kb`.                                                         |
| `autoFlush`    | Si es `true`, el buffer se vacía automáticamente.                                                        |
| `isThreadSafe` | Si es `true`, el contenedor puede atender varias hebras simultáneamente.                                 |
| `info`         | Texto descriptivo de la página; alimenta `getServletInfo()`.                                             |
| `errorPage`    | URL de la página a la que se redirige si hay error.                                                      |
| `isErrorPage`  | Si es `true`, la página tiene acceso al objeto implícito `exception`.                                    |
| `contentType`  | Tipo MIME de la respuesta. En las notas suele aparecer como `text/html; charset=ISO-8859-1` por defecto. |
| `pageEncoding` | Codificación usada por la página de respuesta.                                                           |
| `isELIgnored`  | Si es `true`, se ignoran las expresiones EL.                                                             |

# 6.1.1 Objetos implícitos
Los **objetos implícitos** son objetos que el contenedor crea automáticamente para poder usar en la JSP, dentro del método `_jspService()`, sin necesidad de declararlos.

| Objeto        | Clase                 | Uso                                                                              |
| ------------- | --------------------- | -------------------------------------------------------------------------------- |
| `out`         | `JspWriter`           | Escribe la respuesta que se enviará al cliente.                                  |
| `request`     | `HttpServletRequest`  | Contiene los datos enviados por el cliente.                                      |
| `response`    | `HttpServletResponse` | Permite construir la respuesta HTTP.                                             |
| `session`     | `HttpSession`         | Mantiene información asociada al usuario entre peticiones.                       |
| `application` | `ServletContext`      | Información compartida por toda la aplicación web.                               |
| `config`      | `ServletConfig`       | Datos de configuración del servlet generado.                                     |
| `exception`   | `Throwable`           | Excepción lanzada desde la JSP; solo está disponible en páginas de error.        |
| `page`        | `Object`              | Referencia al propio servlet generado a partir de la JSP.                        |
| `pageContext` | `PageContext`         | Acceso centralizado a los demás objetos implícitos y a los atributos por ámbito. |

El objeto más importante es `pageContext`, que el contenedor obtiene mediante `JspFactory.getPageContext(...)`. A partir de él se recuperan el resto de objetos:

```java
pageContext.getOut();
pageContext.getRequest();
pageContext.getResponse();
pageContext.getSession();
pageContext.getServletContext();
pageContext.getServletConfig();
```

# 6.1.2 Atributos
Los **atributos** en JSP funcionan igual que en servlets, pero aparece un ámbito adicional: **`page`**.

Los ámbitos de trabajo quedan así:

| Ámbito        | Servlet                               | JSP                          |
| ------------- | ------------------------------------- | ---------------------------- |
| `application` | `getServletContext().getAttribute()`  | `application.getAttribute()` |
| `request`     | `request.getAttribute()`              | `request.getAttribute()`     |
| `session`     | `request.getSession().getAttribute()` | `session.getAttribute()`     |
| `page`        | No existe                             | `pageContext.getAttribute()` |

Para manipular atributos se usan `getAttribute()` y `setAttribute()` sobre el objeto adecuado:

```jsp
<%= session.getAttribute("email") %>
```

También pueden manejarse desde `pageContext`, indicando el ámbito explícitamente:

```jsp
<%= pageContext.getAttribute("email", PageContext.SESSION_SCOPE) %>
```

`pageContext` también dispone de constantes de ámbito como:
- `PageContext.PAGE_SCOPE`
- `PageContext.REQUEST_SCOPE`
- `PageContext.SESSION_SCOPE`
- `PageContext.APPLICATION_SCOPE`

Y métodos útiles como:
- `findAttribute("nombre")`, que busca en `page`, `request`, `session` y `application`,
- `getAttributeNamesInScope(...)`, para listar atributos de un ámbito concreto.

# 6.1.3 Redirigir petición
Para delegar el procesamiento a otro recurso se usa `RequestDispatcher`.

Hay dos operaciones principales:

- `forward(request, response)`: cede el control a otro recurso (`servlet`, `JSP`, etc.) usando la **misma** petición y la **misma** respuesta.
- `include(request, response)`: inserta en la respuesta actual la salida generada por otro recurso.

Como se reutiliza la misma `request`, los datos pueden pasarse mediante atributos:

```java
String name = request.getParameter("userName");
request.setAttribute("userBean", name);

RequestDispatcher rd = request.getRequestDispatcher("welcome.jsp");
rd.forward(request, response);
```

En la JSP de destino:

```jsp
<%
String userName = (String) request.getAttribute("userBean");
%>

<h2>Bienvenido <%= userName %></h2>
```

Esta técnica permite que un servlet procese la lógica y que la JSP solo se encargue de la presentación.

# 6.2 Acciones
Las **acciones JSP** usan sintaxis XML y controlan el comportamiento del servlet generado:

```jsp
<jsp:nombreAccion atributo="valor" />
```

Se diferencian de las directivas en que las acciones se **re-evalúan en cada acceso** a la página, mientras que las directivas actúan durante la **traducción** de la JSP.

Se usan sobre todo para:
- controlar el flujo entre páginas,
- pasar parámetros,
- trabajar con JavaBeans.

Las acciones principales son:

| Acción            | Descripción                                                    |
| ----------------- | -------------------------------------------------------------- |
| `jsp:forward`     | Reenvía `request` y `response` a otro recurso.                 |
| `jsp:include`     | Incluye otro recurso en la página actual.                      |
| `jsp:param`       | Añade parámetros cuando se usa `forward` o `include`.          |
| `jsp:useBean`     | Localiza e instancia un JavaBean.                              |
| `jsp:setProperty` | Asigna una propiedad de un JavaBean.                           |
| `jsp:getProperty` | Recupera una propiedad de un JavaBean.                         |
| `jsp:plugin`      | Inserta componentes externos, como applets.                    |
| `jsp:fallback`    | Contenido alternativo cuando `jsp:plugin` no puede ejecutarse. |

Ejemplos básicos:

```jsp
<jsp:forward page="miOtraPagina.jsp" />
<jsp:include page="cabecera.jsp" />
```

Si hay que pasar parámetros:

```jsp
<jsp:forward page="miOtraJSP.jsp">
    <jsp:param name="name" value="miValor" />
</jsp:forward>
```

### `include` directiva frente a `jsp:include`

| Directiva `include`                                  | Acción `jsp:include`                                 |
| ---------------------------------------------------- | ---------------------------------------------------- |
| Se resuelve en la traducción de la JSP.              | Se resuelve en tiempo de petición.                   |
| Mejor para contenido estático.                       | Mejor para contenido dinámico.                       |
| No permite incluir parámetros.                       | Sí permite incluir parámetros.                       |
| El contenido queda integrado en el servlet generado. | El contenido se obtiene cuando se ejecuta la página. |

# 6.3 JavaBeans
Cuando una JSP crece, los scriptlets se vuelven largos, difíciles de mantener y poco reutilizables. La solución es mover datos y funcionalidad a **JavaBeans**.

Esto permite:
- **reutilizar código**,
- **separar mejor la lógica y la presentación**.

Un **JavaBean** es una clase Java que almacena datos mediante **propiedades** y expone esas propiedades con métodos `getXxx()` y `setXxx()`.

Las convenciones básicas de un JavaBean son:
- tener un **constructor sin argumentos**,
- usar **atributos privados**,
- proporcionar métodos **getter/setter** con la nomenclatura estándar,
- implementar normalmente **`Serializable`**.

Ejemplo:

```java
import java.io.Serializable;

public class CarBean implements Serializable {
    private String fabricante = "Fiat";

    public CarBean() {
    }

    public String getFabricante() {
        return fabricante;
    }

    public void setFabricante(String fabricante) {
        this.fabricante = fabricante;
    }
}
```

### Uso desde JSP
Puede usarse con scriptlets, aunque en JSP es más habitual emplear **etiquetas**.

#### Con scriptlets

```jsp
<%
CarBean miCoche = new CarBean();
%>

<p>Mi coche es un <%= miCoche.getFabricante() %></p>

<%
miCoche.setFabricante("Renault");
%>

<p>Ahora mi coche es un <%= miCoche.getFabricante() %></p>
```

#### Con etiquetas JSP

```jsp
<jsp:useBean id="miCoche" class="CarBean" />

<p>Mi coche es un <jsp:getProperty name="miCoche" property="fabricante" /></p>

<jsp:setProperty name="miCoche" property="fabricante" value="Renault" />

<p>Ahora mi coche es un <jsp:getProperty name="miCoche" property="fabricante" /></p>
```

Las tres acciones específicas para JavaBeans son:

- `<jsp:useBean>`: localiza el bean y, si no existe, lo instancia.
- `<jsp:setProperty>`: asigna el valor de una propiedad.
- `<jsp:getProperty>`: recupera el valor de una propiedad.

### `scope` y creación automática
`<jsp:useBean>` no solo crea el objeto: también lo deja disponible como atributo en un ámbito.

```jsp
<jsp:useBean id="miCoche" class="daw.CarBean" scope="request" />
```

El comportamiento real es este:
- busca el atributo `miCoche` en el ámbito indicado,
- si ya existe, usa ese objeto,
- si no existe, crea una instancia,
- y la guarda con `setAttribute(...)`.

Los ámbitos habituales son:
- `page`
- `request`
- `session`
- `application`

Si `jsp:useBean` tiene cuerpo, ese cuerpo solo se ejecuta cuando el bean **se crea en ese momento**:

```jsp
<jsp:useBean id="miCoche" class="CarBean" scope="page">
    <jsp:setProperty name="miCoche" property="fabricante" value="Audi" />
</jsp:useBean>
```

### Bean creado en un servlet y usado en una JSP
Un servlet puede crear el bean, rellenarlo y pasarlo a una JSP:

```java
LoginBean bean = new LoginBean();
bean.setNombre(name);
bean.setPwd(pwd);

request.setAttribute("pwdBean", bean);

RequestDispatcher rd = request.getRequestDispatcher("welcome.jsp");
rd.forward(request, response);
```

Además de almacenar datos, el bean puede contener lógica de negocio sencilla, por ejemplo una validación:

```java
boolean status = bean.validate();
```

Con ese resultado, el servlet decide si hace `forward` a una vista u otra.

En la JSP se puede recuperar con scriptlets:

```jsp
<%@ page import="daw.LoginBean" %>
<%
LoginBean bean = (LoginBean) request.getAttribute("pwdBean");
%>
<h2>Bienvenido <%= bean.getNombre() %></h2>
```

O con etiquetas, indicando el mismo `scope`:

```jsp
<jsp:useBean id="pwdBean" class="daw.LoginBean" scope="request" />
<h2>Bienvenido <jsp:getProperty name="pwdBean" property="nombre" /></h2>
```

Si el bean ya estaba en `request`, `jsp:useBean` no lo vuelve a instanciar.

### Referencias polimórficas
Si el bean es de una clase concreta, basta con `class`:

```jsp
<jsp:useBean id="persona" class="Persona" scope="page" />
```

Pero si `Persona` es **abstracta**, eso provoca un error de instanciación (`InstantiationException`), porque no se puede crear un objeto de una clase abstracta.

En ese caso se usa:
- `type`: tipo de la referencia,
- `class`: clase concreta que sí se instancia.

```jsp
<jsp:useBean id="persona" type="Persona" class="Empleado" scope="page" />
```

Así, la referencia visible en la JSP es de tipo `Persona`, pero el objeto real instanciado es `Empleado`.

### Formularios y JavaBeans
Los datos de un formulario pueden copiarse a un bean de varias formas.

Si los nombres no coinciden, puede hacerse explícitamente:

```jsp
<jsp:useBean id="persona" type="Persona" class="Empleado" />
<jsp:setProperty name="persona" property="name" param="userName" />
```

También puede hacerse mezclando etiquetas con una expresión Java:

```jsp
<jsp:useBean id="persona" type="Persona" class="Empleado" />
<jsp:setProperty
    name="persona"
    property="name"
    value="<%= request.getParameter(\"userName\") %>" />
```

Si el nombre del campo del formulario coincide con la propiedad del bean, no hace falta `param`:

```jsp
<form action="miBean.jsp">
    nombre: <input type="text" name="name">
    <input type="submit">
</form>

<jsp:useBean id="persona" type="Persona" class="Empleado" />
<jsp:setProperty name="persona" property="name" />
```

Y si se quiere copiar automáticamente **todas** las propiedades cuyos nombres coincidan con los campos del formulario:

```jsp
<jsp:useBean id="persona" type="Persona" class="Empleado" />
<jsp:setProperty name="persona" property="*" />
```

`property="*"` intenta rellenar todas las propiedades del bean para las que exista un parámetro con el mismo nombre en la petición, por ejemplo `name`, `empID`, etc.

Hasta aquí, el **JSP clásico** permite:
- generar vistas dinámicas,
- separar la lógica de la presentación,
- compartir datos mediante objetos implícitos y atributos,
- navegar entre recursos con `forward/include`,
- y encapsular datos y comportamiento con JavaBeans para escribir páginas más limpias y reutilizables.

# 6.4 JSP Expression Language (EL)

El **JSP Expression Language (EL)** añade una sintaxis compacta para **leer** datos preparados por el servlet o almacenados como atributos. La idea es evitar scriptlets innecesarios y escribir expresiones del tipo `${...}` dentro de la JSP.

Para poder usarlo en una JSP:
- el contenedor debe soportar EL,
- la página no debe tener EL desactivado.

Si hace falta forzarlo explícitamente:

```jsp
<%@ page isELIgnored="false" %>
```

## 6.4.1 Qué aporta EL

Ventajas principales:
- es más compacto y legible que mezclar mucho Java en la página,
- accede fácilmente a propiedades anidadas, por ejemplo `${usuario.perfil.nombre}`,
- no solo trabaja con **JavaBeans**, sino también con **arrays**, **listas** y **mapas**,
- permite acceder a parámetros, cabeceras, cookies y parámetros de inicialización,
- soporta comparaciones, cálculos y expresiones condicionales.

Limitación importante:
- EL está pensado sobre todo para **leer** datos.
- La creación y modificación real de objetos suele hacerse en el **servlet** o en el modelo, no en la JSP.

## 6.4.2 Sintaxis básica y búsqueda por ámbitos

La forma general es:

```jsp
${primeraCosa.segundaCosa}
```

Ejemplos típicos:

```jsp
${usuario.nombre}
${asignaturas[1]}
${mapa["clave"]}
```

Si escribes `${atributo}` sin indicar ámbito, EL busca por este orden:
1. `page`
2. `request`
3. `session`
4. `application`

Si quieres evitar conflictos de nombres, puedes indicar el ámbito explícitamente:

```jsp
${sessionScope.usuario.nombre}
${requestScope.error}
```

## 6.4.3 Objetos implícitos en EL

Los objetos implícitos más importantes de EL son estos:

| Objeto EL | Qué representa |
| --- | --- |
| `pageScope` | Mapa de atributos de página |
| `requestScope` | Mapa de atributos de petición |
| `sessionScope` | Mapa de atributos de sesión |
| `applicationScope` | Mapa de atributos de aplicación |
| `param` | Parámetros simples de la petición |
| `paramValues` | Parámetros multivalor de la petición |
| `header` | Cabeceras HTTP |
| `headerValues` | Cabeceras HTTP con varios valores |
| `cookie` | Cookies recibidas |
| `initParam` | Parámetros de contexto |
| `pageContext` | Referencia al `PageContext` |

Ejemplos muy frecuentes:

```jsp
${param.nombre}
${paramValues.food[1]}
${cookie.asignatura.value}
${initParam.miEmail}
```

## 6.4.4 Operadores más usados

### Operador `.` y operador `[]`

- `.` se usa para propiedades de beans o claves simples de mapas.
- `[]` es muy útil con listas, arrays, mapas o claves calculadas.

```jsp
${usuario.nombre}
${usuario["nombre"]}
${colores[1]}
${usuarios[1].nombre}
```

### Operadores aritméticos, relacionales y lógicos

| Tipo | Operadores |
| --- | --- |
| Aritméticos | `+`, `-`, `*`, `/`, `div`, `%`, `mod` |
| Relacionales | `==`, `eq`, `!=`, `ne`, `<`, `lt`, `>`, `gt`, `<=`, `le`, `>=`, `ge` |
| Lógicos | `&&`, `and`, `||`, `or`, `!`, `not` |
| Otros | `empty`, operador ternario `condicion ? a : b` |

Ejemplos:

```jsp
${10 mod 3}
${nota ge 5}
${not empty sessionScope.usuario}
${edad ge 18 ? "Mayor de edad" : "Menor de edad"}
```

## 6.4.5 EL en formularios, cookies y MVC

### Leer parámetros de formularios

Si un formulario envía:

```html
<form action="miBean.jsp">
  Nombre: <input type="text" name="name">
  ID#: <input type="text" name="empID">
  Comida favorita: <input type="text" name="food">
  Segunda comida favorita: <input type="text" name="food">
  <input type="submit">
</form>
```

En la JSP puedes leerlo así:

```jsp
<p>Nombre: ${param.name}</p>
<p>ID: ${param.empID}</p>
<p>Comida favorita: ${param.food}</p>
<p>Segunda favorita: ${paramValues.food[1]}</p>
```

### Leer una cookie

Con scriptlets habría que recorrer `request.getCookies()`. Con EL basta con:

```jsp
${cookie.asignatura.value}
```

### Leer parámetros de contexto

Si en `web.xml` tienes:

```xml
<context-param>
  <param-name>miEmail</param-name>
  <param-value>pablo.garcia@dec.usc.es</param-value>
</context-param>
```

En EL se usa:

```jsp
${initParam.miEmail}
```

### EL dentro del patrón MVC

Patrón típico:

```java
LoginBean bean = new LoginBean();
bean.setNombre(nombre);
request.setAttribute("pwdBean", bean);
request.getRequestDispatcher("welcome.jsp").forward(request, response);
```

Y la JSP solo muestra:

```jsp
<h2>Bienvenido ${pwdBean.nombre}</h2>
```

Esto resume muy bien la idea moderna: el **servlet prepara**, la **JSP muestra**.

# 6.5 JSTL

La **JSTL** (`JSP Standard Tag Library`) es la biblioteca estándar de etiquetas para JSP. Su objetivo es ampliar lo que podemos hacer en la vista sin recurrir a tantos scriptlets.

Para usarla se declara con `taglib`:

```jsp
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
```

Además, el proyecto debe tener normalmente `jstl.jar` en `WEB-INF/lib/`.

## 6.5.1 Librerías JSTL

La versión clásica se organiza en cinco librerías:

| Librería | Prefijo | URI | Uso |
| --- | --- | --- | --- |
| Core | `c` | `http://java.sun.com/jsp/jstl/core` | Flujo, iteración, URLs y operaciones generales |
| Formatting | `fmt` | `http://java.sun.com/jsp/jstl/fmt` | Internacionalización y formato |
| SQL | `sql` | `http://java.sun.com/jsp/jstl/sql` | Acceso directo a bases de datos |
| XML | `x` | `http://java.sun.com/jsp/jstl/xml` | Trabajo con XML |
| Functions | `fn` | `http://java.sun.com/jsp/jstl/functions` | Funciones sobre cadenas y colecciones |

## 6.5.2 Librería `core`

Es la más importante y la que más suele entrar en examen.

### Etiquetas de propósito general

| Etiqueta | Para qué sirve |
| --- | --- |
| `c:out` | Muestra una expresión |
| `c:set` | Guarda un valor como atributo |
| `c:remove` | Elimina un atributo |
| `c:catch` | Captura una excepción |

Ejemplo:

```jsp
<c:set var="total" scope="page" value="${4000 + 4}" />
<p>El valor total es: <c:out value="${total}" /></p>
<c:remove var="total" />
<p>Ahora el valor total es: <c:out value="${total}" /></p>
```

`c:out` es especialmente útil porque escribe el valor de forma segura y, por defecto, escapa caracteres problemáticos de HTML/XML.

### Iteración

Etiquetas principales:
- `c:forEach`
- `c:forTokens`

Ejemplo típico con una lista preparada por el servlet:

```java
request.setAttribute("asg", java.util.Arrays.asList("DAW", "POO", "DOO"));
```

```jsp
<ul>
  <c:forEach var="k" items="${asg}">
    <li>${k}</li>
  </c:forEach>
</ul>
```

También puede iterar por rango:

```jsp
<ol>
  <c:forEach var="i" begin="0" end="2">
    <li>${asg[i]}</li>
  </c:forEach>
</ol>
```

Con `c:forTokens` se separa una cadena por delimitadores:

```jsp
<c:forTokens items="Hola;DAW;ETSE" delims=";" var="token">
  ${token}
</c:forTokens>
```

### Condicionales

Etiquetas principales:
- `c:if`
- `c:choose`
- `c:when`
- `c:otherwise`

Ejemplo con `c:if`:

```jsp
<c:set var="j" scope="request" value="${4 * 5}" />
<c:if test="${j gt 0}">
  <p>El valor <c:out value="${j}" /> es positivo</p>
</c:if>
```

Ejemplo con `c:choose`:

```jsp
<c:choose>
  <c:when test="${j ge 0}">
    <p>El valor es cero o positivo</p>
  </c:when>
  <c:otherwise>
    <p>El valor es negativo</p>
  </c:otherwise>
</c:choose>
```

### Manejo de URLs

Etiquetas principales:
- `c:import`
- `c:url`
- `c:redirect`
- `c:param`

Ejemplo:

```jsp
<c:url var="rutaLogout" value="/logout" />
<a href="${rutaLogout}">Cerrar sesión</a>
```

## 6.5.3 Otras librerías JSTL

### `fmt`

Se usa para internacionalización y formateo:
- `fmt:message`
- `fmt:setLocale`
- `fmt:bundle`
- `fmt:setBundle`
- `fmt:param`
- `fmt:requestEncoding`
- `fmt:timeZone`
- `fmt:setTimeZone`
- `fmt:formatNumber`
- `fmt:parseNumber`
- `fmt:parseDate`

### `sql`

Permite trabajar con bases de datos:
- `sql:query`
- `sql:update`
- `sql:setDataSource`
- `sql:param`
- `sql:dateParam`

Existe y puede caer en teoría, pero en aplicaciones bien estructuradas no suele ser la mejor opción para la lógica real de acceso a datos: eso debería vivir en el **modelo** o en una capa de servicio.

### `xml`

Permite trabajar con documentos XML:
- `x:parse`
- `x:out`
- `x:set`
- `x:transform`
- `x:param`
- `x:if`
- `x:choose`
- `x:when`
- `x:otherwise`
- `x:forEach`

### `fn`

Añade funciones sobre cadenas y colecciones:
- `fn:length`
- `fn:toUpperCase`
- `fn:toLowerCase`
- `fn:substring`
- `fn:substringAfter`
- `fn:substringBefore`
- `fn:trim`
- `fn:replace`
- `fn:indexOf`
- `fn:startsWith`
- `fn:endsWith`
- `fn:contains`
- `fn:containsIgnoreCase`
- `fn:split`
- `fn:join`
- `fn:escapeXml`

Ejemplo:

```jsp
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<p>Número de asignaturas: ${fn:length(asignaturas)}</p>
```

## 6.5.4 Sustitución progresiva de scriptlets

La evolución lógica en JSP suele ser esta:

1. **JSP con scriptlets**: mezcla mucho Java con HTML.
2. **JSP con JavaBeans**: separa mejor los datos.
3. **JSP con EL**: lee datos sin tanto Java embebido.
4. **JSP con JSTL**: añade bucles, condicionales y utilidades estándar.

Ejemplo típico de login usando EL y JSTL:

```jsp
<c:choose>
  <c:when test="${param.pwd eq 'DAW'}">
    <h2>Bienvenido ${param.nombre}</h2>
  </c:when>
  <c:otherwise>
    <p style="color:red">Password incorrecto</p>
  </c:otherwise>
</c:choose>
```

La idea es que la JSP quede cada vez más cerca de una **plantilla de presentación** y menos de un programa Java completo.

# 6.6 Preguntas típicas de examen

Estas son definiciones cortas que conviene saber decir literalmente:

| Concepto | Definición recomendable |
| --- | --- |
| **Aplicación web** | Programa que se ejecuta en un servidor web y responde a peticiones HTTP de los clientes, generando contenido estático o dinámico para el navegador. |
| **Servlet** | Clase Java gestionada por un contenedor web que procesa peticiones HTTP y genera o coordina la respuesta del servidor. |
| **JSP** | Siglas de `Java Server Pages`; son páginas HTML con etiquetas y fragmentos Java que el servidor traduce a servlets para generar vistas dinámicas. |
| **JavaBean** | Clase Java reutilizable con constructor vacío, atributos privados y métodos `get/set`, pensada para encapsular datos y exponer propiedades de forma estándar. |

Relación típica en MVC:
- **servlet** = controlador,
- **JSP** = vista,
- **JavaBean** = datos o modelo simple.

# 6.7 Parte JSP del ejercicio completo

Este ejemplo encaja con la plantilla de servlets y `web.xml` añadida en el tema `5. Servlets`.

## 6.7.1 `login.jsp`

La vista del formulario puede escribirse así:

```jsp
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<body>
  <h1>Acceso</h1>

  <c:if test="${not empty error}">
    <p style="color:red">${error}</p>
  </c:if>

  <form action="${pageContext.request.contextPath}/login" method="post">
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre">
    <br>

    <label for="pwd">Password:</label>
    <input type="password" id="pwd" name="pwd">
    <br>

    <button type="submit">Entrar</button>
  </form>
</body>
</html>
```

Qué hace:
- muestra el formulario,
- enseña `${error}` si el servlet ha puesto un atributo de error en `request`,
- envía los datos a `LoginServlet`.

## 6.7.2 `panel.jsp`

La vista de salida puede mostrar el bean de sesión y una lista:

```jsp
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<body>
  <h1>Bienvenido ${sessionScope.usuario.nombre}</h1>

  <h2>Asignaturas</h2>
  <ul>
    <c:forEach var="asig" items="${asignaturas}">
      <li><c:out value="${asig}" /></li>
    </c:forEach>
  </ul>

  <a href="${pageContext.request.contextPath}/logout">Cerrar sesión</a>
</body>
</html>
```

Qué demuestra este JSP:
- acceso a un **JavaBean** guardado en `session`,
- acceso a una **colección** puesta por el servlet en `request`,
- uso de **EL** y **JSTL** sin scriptlets,
- separación limpia entre controlador y vista.

Si en el examen te piden “varios servlets, algún JSP y `web.xml`”, esta pareja de temas queda muy bien resuelta así:
- en el tema 5 explicas **servlets, `request/session`, `forward`, `redirect` y `web.xml`**,
- en el tema 6 explicas **JSP, JavaBeans, EL y JSTL** como capa de vista.