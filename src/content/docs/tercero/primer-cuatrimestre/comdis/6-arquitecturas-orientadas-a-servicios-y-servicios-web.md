---
title: "Arquitecturas Orientadas a Servicios y Servicios Web"
---

Copyright (c) 2025 Adrián Quiroga Linares Lectura y referencia permitidas; reutilización y plagio prohibidos


# 6.1 El Desafío: Comunicación en la Web Abierta
**El Escenario:** Tienes una clase `Cliente` en tu portátil y quieres invocar el método `saludar()` de un objeto que vive en un servidor en Japón.

## 6.1.1 La Era Antigua: RPC, CORBA y DCOM (El Fracaso)
Al principio, intentamos conectar los ordenadores directamente usando protocolos binarios complejos.
- **El Método:** Los programas intentaban conectarse por puertos aleatorios o poco comunes.
- **Por qué fracasó en Internet:**
    1. **El Muro del Firewall:** Los firewalls corporativos están configurados para bloquear todo lo desconocido. Al ver tráfico extraño en puertos raros (ej. puerto 3500), lo bloquean por seguridad.
    2. **La Torre de Babel:** Requerían que ambas máquinas usaran la misma tecnología o lenguaje (ej. Java con Java).

> **Analogía del Edificio:** Es como intentar entrar a un edificio de máxima seguridad por la puerta trasera o una ventana. El guardia (Firewall) te detendrá inmediatamente.

## 6.1.2 El Paso Intermedio: Java Servlets (La Astucia)
Los ingenieros se dieron cuenta de que el Firewall **siempre deja abierta la Puerta 80** (el puerto para navegar por la web, HTTP).
- **La Idea (Tunneling):** "Disfrazar" nuestros datos como si fueran tráfico web normal para que el Firewall los deje pasar.
- **La Herramienta:** Los **Servlets**. Pequeños programas Java en el servidor que escuchan en el puerto 80.
- **La Ventaja:** Atraviesan cualquier firewall porque usan HTTP.
- **El Gran Defecto (Espagueti):** Los Servlets están pensados para devolver HTML (diseño para humanos), no datos limpios.
    - _Ejemplo:_ Si pides una suma, el Servlet te devuelve `<html><h1>El resultado es 10</h1></html>`.
    - Tu programa cliente tiene que "escarbar" en ese texto para hallar el "10". Es una comunicación frágil y artesanal; si cambias una coma, el cliente se rompe.

## 6.1.3 La Solución Definitiva: SOA y Servicios Web
Para solucionar el desorden de los Servlets, nació la **Arquitectura Orientada a Servicios (SOA)**. La idea genial fue combinar dos tecnologías existentes:

$$SOA = \text{Transporte HTTP} + \text{Datos XML}$$

1. **HTTP (El Camión de Transporte):** Usamos el protocolo web (Puerto 80) para cruzar el firewall sin problemas.    
2. **XML (El Paquete Estandarizado):** En lugar de enviar texto desordenado o HTML, enviamos los datos en un formato estricto y universal que cualquier máquina entiende.



>[!Info]
**El Firewall (El Portero)**
Es el sistema de seguridad que controla las entradas y salidas de la red.
>- **Comportamiento:** Cierra las 65.000 "puertas" (puertos) del ordenador, excepto las esenciales.
>- **La excepción:** Casi siempre permite el **Puerto 80 (Web)** y el **443 (Web Segura)**. SOA se aprovecha de esto.
>
>**HTTP (El Idioma del Transporte)**
Es el protocolo de la World Wide Web. Es **sin estado** (cada petición es nueva, no recuerda la anterior).
>- **Verbos:** Usa `GET` (dame datos) y `POST` (toma datos). En SOA, usamos mucho `POST` para enviar mensajes al servidor.
>
>**XML (El Formato de los Datos)**
Es la gran diferencia con los Servlets. XML estructura la información separando el _contenido_ de la _presentación_.
>- **HTML (Malo para máquinas):** `<p><b>10</b></p>` $\rightarrow$ Dice _cómo se ve_ (negrita), no qué es.
>- **XML (Bueno para máquinas):** `<precio moneda="EUR">10</precio>` $\rightarrow$ Dice _qué es_ (un precio).    
>- **Ventaja:** Es independiente del lenguaje. Un programa en Python puede leer un XML generado por Java.


# 6.2 Arquitectura Orientada a Servicios (SOA)
La **Arquitectura Orientada a Servicios (SOA)** es un modelo en el que la funcionalidad se descompone en servicios distintos. Se basa en tres roles fundamentales:

**Proveedor (Provider)**
- **Función:** Ofrece un conjunto de servicios con una funcionalidad concreta.
- **Accesibilidad:** Los servicios son accesibles vía Internet mediante **URLs**.
- **Descripción:** Utiliza un lenguaje estándar para describir qué hace el servicio.

**Consumidor (Consumer)**
- **Función:** Invoca o consume la funcionalidad ofrecida por el proveedor.    
- **Mecanismo:** Utiliza un protocolo de invocación para comunicarse.

**Registro (Registry)**
- **Función:** Directorio que contiene los servicios disponibles ofrecidos por los proveedores.

![](/ApuntesWeb/images/tercero/primer-cuatrimestre/comdis/imagenes/Pasted%20image%2020251212155730.png)

# 6.3 Los Servicios Web (Implementación de SOA)
Los Servicios Web son la implementación tecnológica de SOA mediante estándares abiertos.
- **Definición:** Interfaces que describen una colección de operaciones (métodos) accesibles por la red.
- **Base Tecnológica:** Todo se basa en **formatos XML**.
    - **Invocación:** Protocolos web estandarizados (estructura del protocolo).
    - **Descripción:** Propiedades del servicio representadas en XML.
- **Organismo Estandarizador:** El **Consorcio W3C** (World Wide Web Consortium) se encarga de estandarizar estos lenguajes y protocolos (excepto UDDI).

| **Estándar** | **Función**     | **Descripción / URL ref**                             |
| ------------ | --------------- | ----------------------------------------------------- |
| **HTTP**     | **Transporte**  | Protocolo de comunicaciones básico de la web.         |
| **SOAP**     | **Mensaje**     | Formato del mensaje para la invocación.               |
| **WSDL**     | **Descripción** | Describe _qué_ hace el servicio (interfaz funcional). |
| **UDDI**     | **Registro**    | Protocolo para publicar y descubrir servicios.        |

# 6.4 Funcionamiento Paso a Paso
El ciclo de vida de una interacción en SOA sigue este flujo cronológico:

## Paso 1: Despliegue (Proveedor)
El proveedor hace accesibles sus operaciones en Internet.
- **Identificación:** Mediante una **URL** que apunta a un recurso descrito en **WSDL**.
- **El fichero WSDL (Web Services Description Language):**
    - Describe las **capacidades funcionales**: Nombre de la operación, entradas y salidas.
    - Indica el **modo de invocación**.
    - _Condición:_ El servicio es accesible solo si el cliente conoce esta URL.

## Paso 2: Publicación (Proveedor -> UDDI)
Para que otros lo encuentren, el proveedor publica el servicio en el registro **UDDI**.
- **Contenido del Registro:**
    - **Características No Funcionales:** Descripción de la empresa, categoría, etc.
    - **Enlace:** La URL al fichero WSDL.
- **Gestión:** Se usan APIs para dar de alta/baja servicios.
- **Analogía:** _UDDI es a los Servicios Web lo que el DNS es a las direcciones Web._

## Paso 3: Descubrimiento (Consumidor -> UDDI)
El consumidor busca en el registro UDDI servicios que cumplan sus necesidades.
- **Búsqueda:** Por palabras clave (funcionales/no funcionales) o indicando entradas/salidas (**TModel**).
- **Resultado:** Obtiene la **URL del fichero WSDL**.

> **⚠️ Nota Importante sobre UDDI:** UDDI **no** es un estándar del W3C. Debido a esto, es el componente con **menor implantación** en el mercado real.

## Paso 4: Generación de Código (Consumidor)
Una vez obtenido el WSDL, el consumidor:
1. **Genera automáticamente** el código necesario (proxies/stubs).
2. Crea las clases para los tipos de datos de los parámetros.
3. Crea la lógica para **codificar y decodificar** los mensajes.

## Paso 5: Invocación (Consumidor -> Proveedor)
El consumidor ejecuta la operación usando el protocolo **SOAP** basándose en las definiciones del WSDL.


# 6.5 Ventajas de SOA
**Integración Universal (Interoperabilidad)**
Gracias al uso de **XML**, se pueden integrar aplicaciones dispares:
- **Lenguajes diferentes:** Se traduce de XML al lenguaje local (Java, Python, C#, etc.).
- **Modelos de datos diferentes:** Se traduce el modelo del formato XML al modelo interno de la aplicación.


# 6.6 El Manual de Instrucciones: WSDL
Si vas a conectar tu código con un servicio remoto, necesitas un contrato que te diga cómo hablarle. Ese es el **WSDL** (_Web Service Description Language_).

Es un documento **XML** con estructura jerárquica (de abajo a arriba). Se divide en dos grandes bloques: lo **Abstracto** (la lógica) y lo **Concreto** (la red).

## 6.6.1 Descripción Abstracta (La Lógica)
Aquí definimos el "qué" hace el servicio, sin importarnos si está hecho en Java, Python o C#.
1. **`types` (Tipos de Datos):**
    - Es el diccionario de base. Define los "ingredientes" usando **XML Schema (XSD)**.
    - _Ejemplo:_ Define qué es un entero (`xsd:int`) o un objeto complejo (`<Cliente>`).

2. **`message` (Mensajes):**    
    - Son los paquetes de datos. Combina los tipos anteriores para formar una "Petición" o una "Respuesta".
    - _Analogía:_ Es poner los ingredientes en un plato.

3. **`portType` (La Interfaz):** ¡Aquí está la clave!    
    - Es el equivalente a una `interface` en Java. Es un agrupador.
    - **Contiene:** Un conjunto de **`operations`**.

4. **`operation` (Las Funciones):**    
    - Define una acción específica que se puede realizar.
    - Conecta un **mensaje de entrada** (input) con un **mensaje de salida** (output).
    - _Equivalencia Java:_ Es la firma del método: `public int sumar(int a, int b)`.


> **Jerarquía:** `types` $\rightarrow$ componen `message` $\rightarrow$ usados en `operation` $\rightarrow$ agrupados en `portType`.

## 6.6.2 Descripción Concreta (La Red)
Aquí bajamos a tierra y definimos el "cómo" y el "dónde" conectarse.
1. **`binding` (El Protocolo):**
    - Toma el `portType` abstracto y le asigna un protocolo real.
    - Casi siempre: **SOAP** sobre **HTTP**. Define el formato de codificación (literal, encoded, etc.).
2. **`service` (El Servidor):**
    - Agrupa los `ports`.
3. **`port` (La Dirección):**
    - Une un `binding` con una dirección física (**URL**).
    - _Ejemplo:_ `http://localhost:8080/mi-app/calculadora`.

## 6.6.3 Ejemplo Práctico (Corregido)
Vamos a exponer la función Java: `public int sumar(int A, int B)`.

### A. Parte Abstracta (Definiciones)
```xml
<types>
  <xsd:schema>
    <xsd:element name="SumarRequest">
      <xsd:complexType>
        <xsd:sequence>
          <xsd:element name="numA" type="xsd:int"/>
          <xsd:element name="numB" type="xsd:int"/>
        </xsd:sequence>
      </xsd:complexType>
    </xsd:element>
    <xsd:element name="SumarResponse"> ... </xsd:element>
  </xsd:schema>
</types>

<message name="PaqueteEntrada">
  <part name="parametros" element="tns:SumarRequest"/>
</message>
<message name="PaqueteSalida">
  <part name="resultado" element="tns:SumarResponse"/>
</message>

<portType name="CalculadoraInterface">
  <operation name="sumar">
    <input message="tns:PaqueteEntrada"/>
    <output message="tns:PaqueteSalida"/>
  </operation>
</portType>
```

### B. Parte Concreta (Implementación)
```xml
<binding name="CalculadoraBinding" type="tns:CalculadoraInterface">
  <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
  <operation name="sumar">
    <soap:operation soapAction="sumar"/> <input><soap:body use="literal"/></input>
    <output><soap:body use="literal"/></output>
  </operation>
</binding>

<service name="CalculadoraService">
  <port name="CalculadoraPuerto" binding="tns:CalculadoraBinding">
    <soap:address location="http://localhost:8080/calculadora"/>
  </port>
</service>
```


### Resumen Rápido para Examen

| **Elemento WSDL** | **Concepto en Java** | **Función**                                           |
| ----------------- | -------------------- | ----------------------------------------------------- |
| **`types`**       | Clases/Beans         | Define la estructura de datos (int, String, ObjetoX). |
| **`message`**     | Argumentos           | Agrupa los datos para enviarlos o recibirlos.         |
| **`portType`**    | **`interface`**      | Agrupa las funciones abstractas.                      |
| **`operation`**   | **Método**           | Define una función (`sumar`) con entrada y salida.    |
| **`binding`**     | Implementación       | Define el protocolo (SOAP/HTTP).                      |
| **`service`**     | Instancia            | Define dónde está el servicio (URL).                  |

# 6.7 Protocolo SOAP (Invocación de Servicios Web)

## 6.7.1 Contexto y Necesidad
Para invocar servicios Web de forma consistente, no basta con usar XML para los datos; el propio **mecanismo de invocación** debe ser XML.
- **Requisitos:** Se necesita detallar qué operación ejecutar, con qué argumentos, gestionar errores y definir quién procesa cada parte del mensaje.
- **Herramientas Java:** Tecnologías como **JAX-WS** y **JAXB** automatizan este proceso, generando el código necesario para que cliente y servidor se entiendan sin escribir el XML a mano.

## 6.7.2 Definición de SOAP
**SOAP (Simple Object Access Protocol)** es el protocolo estándar para el intercambio de información estructurada en servicios web.

1. **Basado en Mensajes:** No es una llamada directa a función, sino un intercambio de "documentos" donde se codifica lo que se quiere hacer.    
2. **Sin Estado (Stateless):** No existe una coreografía predefinida; cada mensaje es independiente (salvo que la aplicación gestione lo contrario).
3. **Unidireccional y Asíncrono:**
    - Por defecto, SOAP es **one-way** (envío y olvido).
    - Para lograr el modelo clásico **Petición-Respuesta** (síncrono), SOAP se apoya en el protocolo de transporte (generalmente **HTTP**) y en middleware específico.


## 6.7.3 Estructura del Mensaje SOAP (El Sobre)
Un mensaje SOAP se visualiza conceptualmente como un **Sobre (Envelope)**.

1. **Envelope (Sobre):** La raíz del XML. Encapsula todo el mensaje.
2. **Header (Cabecera) - _Opcional_:**
    - Contiene metadatos (información "sobre" el mensaje, no "del" mensaje).
    - **Uso:** Seguridad (certificados), IDs de transacción, enrutamiento.
    - Puede ser procesado por **intermediarios** antes de llegar al destino final.

3. **Body (Cuerpo) - _Obligatorio_:**    
    - Contiene la carga útil (payload): los datos reales para la lógica de negocio.
    - Solo lo procesa el **destinatario final**.

## 6.7.4 Estilos del Cuerpo (Body Styles)
Aunque SOAP obliga a tener un Body, no impone cómo escribir el XML dentro. Existen dos estilos principales:

### A. Estilo Documento (Document Style)
- **Filosofía:** "Te envío un documento, tú sabrás qué hacer".
- **Formato:** El cuerpo contiene un documento XML arbitrario (puede ser validado por un Schema).    
- **Flexibilidad:** Máxima. No se ve explícitamente el nombre del método a simple vista, solo datos.

### B. Estilo RPC (Remote Procedure Call)
- **Filosofía:** "Quiero que ejecutes la función X con los parámetros Y".
- **Formato:** Simula una llamada a código. Estructura rígida:
    - Etiqueta con el nombre de la operación (`<chargeReservation>`).
    - Etiquetas con los parámetros (`<reservationCode>`).
- **Respuesta:** También estructurada (`<methodReturn>`).

### Reglas de Codificación (Encoding)
¿Cómo convertimos una clase Java `Coche` o un `ArrayList` a XML?
- Existen recomendaciones (W3C SOAP Encoding) que herramientas como **JAX-WS** siguen automáticamente.
- **Tipos Complejos:** Se traducen a estructuras anidadas (ej. Clase `Coche` con campos `matricula` y `kms`).
- **Arrays:** Se traducen a secuencias de elementos repetidos.


## 6.7.5 Procesamiento de la Cabecera (Header)
Una característica potente de SOAP es que el mensaje puede pasar por varios nodos (intermediarios) antes de llegar al servidor final.

### Atributo `env:role` (¿Quién?)
Define **qué nodo** debe leer ese bloque de la cabecera.
- `none`: Nadie debe procesarlo (informativo).
- `next`: El siguiente nodo que reciba el mensaje (sea intermediario o final) puede procesarlo.
- `ultimateReceiver`: Solo el destinatario final debe procesarlo.

### Atributo `env:mustUnderstand` (¿Obligatorio?)
Define la **importancia** del bloque:
- `true`: Si te toca procesarlo (según tu _role_) y no entiendes qué significa esa etiqueta, **debes generar un fallo** y parar.
- `false`: Si no lo entiendes, puedes ignorarlo.

## 6.7.6 Flujo de Ejecución (Arquitectura)
¿Cómo viaja el mensaje desde tu código Java hasta el servidor?

1. **Implementación del Cliente (Client Implementation):** Tu código llama al servicio como si fuera una llamada local normal.  
2. **Stub del Cliente (Client Stub):** Recibe esa llamada local e invoca al **Motor SOAP**.
3. **Motor SOAP (SOAP Engine):** Prepara el mensaje SOAP (crea el XML). Empaqueta ese SOAP dentro de una petición HTTP y se lo pasa al cliente HTTP.
4. **Motor HTTP (HTTP Engine):** Es el encargado de enviar físicamente la petición a través de la red hacia el proveedor.
5. **Servidor HTTP (HTTP Server):** Recibe la petición de red y le pasa el contenido del mensaje HTTP al Router.     
6. **Router SOAP (SOAP Router):** Parsea (analiza) el mensaje, identifica a qué **Stub del Servidor** debe llamar y le entrega el mensaje procesado.
7. **Stub del Servidor (Server Stub):** Actúa como intermediario final e invoca el procedimiento local de la implementación. 
8. **Implementación del Servicio (Service Implementation):** Se ejecuta finalmente el código real del servicio (`sumar()`, `reservar()`, etc.).


# 6.8 Ejemplo
## El Servidor (Service Provider)
**1. La Interfaz (Calculadora.java)**
```java
package com.ejemplo;

import jakarta.jws.WebService;
import jakarta.jws.WebMethod;

@WebService
public interface Calculadora {
    @WebMethod
    int sumar(int a, int b);
}
```

2. **La Implementación (CalculadoraImpl.java)**
```java
package com.ejemplo;

import jakarta.jws.WebService;

@WebService(endpointInterface = "com.ejemplo.Calculadora")
public class CalculadoraImpl implements Calculadora {
    
    @Override
    public int sumar(int a, int b) {
        System.out.println(">> Servidor: He recibido una petición para sumar " + a + " + " + b);
        return a + b;
    }
}
``` 

3. **El Publicador (Publicador.java)**
```java
package com.ejemplo;

import jakarta.xml.ws.Endpoint;

public class Publicador {
    public static void main(String[] args) {
        // Publicamos el servicio en localhost
        String url = "http://localhost:8080/miCalculadora";
        
        System.out.println("Iniciando servidor...");
        Endpoint.publish(url, new CalculadoraImpl());
        
        System.out.println("Servicio publicado exitosamente.");
        System.out.println("WSDL disponible en: " + url + "?wsdl");
    }
}
```

`Endpoint.publish(url, implementor)`. Esta función es la que "enciende" el servidor.
- **Argumentos:**
    1. **`url` (String):** La dirección web donde quieres ofrecer el servicio.
        - _Ejemplo:_ `"http://localhost:8080/miCalculadora"`
        - Define tres cosas: Protocolo (http), Máquina y Puerto (localhost:8080) y el nombre del servicio (/miCalculadora).
    2. **`implementor` (Object):** Una instancia real de la clase que hace el trabajo.        
        - _Ejemplo:_ `new CalculadoraImpl()`
        - Es el objeto Java que contiene el código que suma los números de verdad.

- **Efectos:**    
    - **Arranca un mini-servidor web:** Java (JDK) tiene un servidor HTTP interno ligero. Esta línea lo inicia y empieza a escuchar en el puerto 8080.
    - **Genera el WSDL:** Analiza tu clase `CalculadoraImpl` y crea el contrato XML automáticamente en memoria.
    - **Expone el servicio:** A partir de este momento, si alguien envía un XML SOAP a esa URL, este objeto responderá.

## El Cliente (Service Consumer)
```java
package com.ejemplo;

import jakarta.xml.ws.Service;
import javax.xml.namespace.QName; // QName sigue siendo parte del JDK estándar (javax)
import java.net.URL;

public class Cliente {
    public static void main(String[] args) {
        try {
            // 1. URL donde está el contrato (WSDL)
            URL wsdlURL = new URL("http://localhost:8080/miCalculadora?wsdl");

            // 2. Qualified Name (QName) del servicio
            // Estos nombres (Namespace y ServiceName) están definidos dentro del XML del WSDL
            QName qname = new QName("http://ejemplo.com/", "CalculadoraImplService");

            // 3. Crear la fábrica de servicios (Usando JAKARTA)
            Service service = Service.create(wsdlURL, qname);

            // 4. Obtener el "Stub" (el objeto proxy que implementa nuestra interfaz)
            Calculadora calculadoraProxy = service.getPort(Calculadora.class);

            // 5. Invocar el método remoto
            System.out.println("Cliente: Enviando petición sumar(10, 20)...");
            
            // --- AQUÍ OCURRE EL MARSHALLING (Java -> XML SOAP) ---
            int resultado = calculadoraProxy.sumar(10, 20); 
            // --- AQUÍ OCURRE EL UNMARSHALLING (XML SOAP -> Java) ---

            System.out.println("Cliente: El resultado recibido es " + resultado);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

`URL(string_spec)`:
- **Argumentos:**
    - **`spec` (String):** La dirección donde se encuentra el **WSDL** (el contrato).
    - _Nota:_ Fíjate que al final se le añade `?wsdl`. Sin esto, accederías al servicio, pero el cliente lo que necesita primero es leer las instrucciones (el manual).

- **Efectos:**    
    - Simplemente crea un objeto que apunta a ese recurso en internet. No conecta todavía, solo prepara la dirección para que la fábrica de servicios sepa dónde ir a leer las instrucciones.

`QName(namespaceURI, localPart)`. Es el concepto más "raro" para quien viene de Java puro. `QName` significa **Qualified Name** (Nombre Cualificado).
- **Argumentos:**
    1. **`namespaceURI`:** Es el "Espacio de Nombres". En XML, para evitar que dos servicios se llamen igual, se les pone un apellido que suele ser una URL invertida.
        - _En el código:_ `"http://ejemplo.com/"`. Esto sale del `package com.ejemplo` de tu servidor.
    2. **`localPart`:** El nombre del servicio dentro de ese espacio.
        - _En el código:_ `"CalculadoraImplService"`. Por defecto, JAX-WS le añade la palabra "Service" al nombre de tu clase implementadora.

- **Efectos:**    
    - Sirve para **identificar de forma única** al servicio dentro del archivo WSDL.
    - Un WSDL podría describir 10 servicios distintos. Con el `QName`, le estás diciendo a Java: _"De todo el archivo WSDL, quiero hablar concretamente con EL servicio llamado 'CalculadoraImplService' que pertenece a la empresa 'ejemplo.com'"_.

`Service.create(wsdlURL, qname)`
- **Argumentos:**
    1. **`wsdlURL`:** La ubicación del archivo de instrucciones (el manual WSDL).
    2. **`qname`:** El nombre exacto de la empresa dentro de ese manual.

- **¿Qué hace realmente? (La "Fábrica")** Esta función es el **Constructor Maestro**.    
    1. **Descarga y Lee:** Va a la URL que le diste, se baja el XML del WSDL y lo lee entero.
    2. **Valida:** Comprueba que dentro de ese XML existe realmente un servicio que se llame como el `qname` que le has pasado. Si el nombre no coincide, aquí saltará un error.
    3. **Prepara la "Agencia":** Crea un objeto `Service` en memoria. Este objeto **NO** es la calculadora todavía. Es una "fábrica" que sabe cómo crear calculadoras (o cualquier otro puerto definido en el WSDL).

- **Efecto en tu programa:** Te devuelve un objeto `Service` (de la librería `jakarta.xml.ws.Service`). Este objeto es el padre de todos los proxies. Sin él, no puedes pedir puertos (`getPort`).


 `service.getPort(serviceEndpointInterface)`
- **Argumentos:**
    - **`serviceEndpointInterface` (Class):** Le pasas la clase de la **Interfaz Java** (`Calculadora.class`).
    - _Ojo:_ No le pasas la implementación (el código real), solo la interfaz (el contrato). El cliente no sabe cómo se suma, solo sabe que existe un método `sumar`.

- **Efectos (La Magia del Proxy):**    
    - **Crea el STUB (Proxy):** Esta función te devuelve un objeto que **parece** local (implementa la interfaz `Calculadora`), pero que es mentira.
    - Este objeto (`calculadoraProxy`) es un "traductor".
    - Cuando tú llamas a `.sumar(10, 20)` sobre este objeto, él no suma nada. Lo que hace es:
        1. Coge el 10 y el 20.  
        2. Construye el XML SOAP (Marshalling).
        3. Envía el XML por la red a la URL que definiste.
        4. Espera la respuesta.
        5. Desempaqueta el XML de respuesta (Unmarshalling).
        6. Te devuelve el `int` resultado.

>[!Nota]
>En este tema miraros las cosas por encima, yo le metí mucho detalle y mucha explicación pero porque no entendía un carallo. Pero con entender un poco los conceptos principales malo será.