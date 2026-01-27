---
title: "Modelado Estructural Avanzado"
---

Escrito por Adrián Quiroga Linares.  

# 5.1 Definición general
El **modelado estructural** en UML (Unified Modeling Language) se refiere a la representación de la **estructura estática del sistema**, es decir, **cómo están organizados sus elementos (clases, objetos, relaciones, interfaces, etc.)**.

Se diferencia del **modelado dinámico**, que se enfoca en el comportamiento (interacciones, eventos, flujos).

# 5.2. Niveles de abstracción
La UML permite modelar un sistema en **varios niveles de detalle**, lo cual es crucial para **diferenciar entre lo que se quiere hacer, cómo se piensa hacer y cómo se implementa finalmente**.

### ✦ Conceptual
- **Qué es**: representación del dominio de forma abstracta, sin pensar en software aún.
- **Ejemplo**: En una tienda, tienes conceptos como `Cliente`, `Producto`, `Pedido`.

### ✦ Especificación
- **Qué es**: definición de **interfaces** del sistema (cómo interactúan los componentes entre sí).
- **Ejemplo**: Sabemos que `Cliente` puede "realizarPedido()", pero no cómo lo hace.

### ✦ Implementación
- **Qué es**: ya vemos el detalle real en código, clases, métodos, campos.
- **Ejemplo**: `Cliente` tiene `List<Pedido>` como atributo, y un método `crearPedido()`.

# 5.3 Elementos del modelo estructural

### Atributos
- A **nivel conceptual**: identifican propiedades relevantes. Ej: `nombre` de un `Cliente`.
- A **nivel de especificación**: decides tipos y restricciones (e.g., `nombre: String`, obligatorio).
- A **nivel de implementación**: el atributo es un **campo real en una clase**.

### Operaciones
- A **nivel conceptual**: representan **responsabilidades**. Ej: `realizarPedido()`.
- A **nivel de especificación**: se definen visibilidad, parámetros, excepciones.
- También se incluyen **operaciones privadas y protegidas**, no visibles externamente.


### Alcance
Define si el atributo es **de instancia** (cada objeto lo tiene) o **de clase** (compartido).

- **Ejemplo**:
```java
class Usuario {
    static int totalUsuarios; // atributo de clase (subrayado en UML)
    String nombre;            // atributo de instancia
}
    ```

# 5.4 Asociaciones y relaciones

### Asociación
Relación estructural entre clases. A distintos niveles, implica cosas distintas:

- **Conceptual**: denota **navegabilidad**: puedes ir de `Pedido` a `Cliente`.
- **Especificación**: muestra **responsabilidades** e **interfaces**.
- **Implementación**: implica una **estructura de datos** (por ejemplo, una lista).

```java
class Cliente {
    List<Pedido> pedidos; // Asociación 1 a muchos
}
```

### Clase Asociación
Una **asociación** que necesita atributos propios se modela como **clase**.
**Ejemplo**: Relación `Matricula` entre `Estudiante` y `Curso` con atributo `nota`.

### Composición vs Agregación
- **Agregación**: relación débil. Las partes pueden vivir sin el todo.
- **Composición**: relación fuerte. Las partes **viven y mueren** con el todo.

```java
class Pedido {
    private List<LineaPedido> lineas; // Composición: LineaPedido no existe sin Pedido
}
```


# 5.5 Mecanismos de extensibilidad
UML es extensible para adaptarse a dominios específicos:
### ✦ Estereotipos (`<< >>`)
Permiten **crear nuevos elementos** especializados.
- Ej: `<<controller>>`, `<<entity>>`, `<<boundary>>` en MVC.

### ✦ Valores etiquetados
Metadatos asociados a elementos UML. Ej: `versión = 1.0`.

### ✦ Restricciones
Condiciones que deben cumplirse (`{ordered}`, `{unique}`, `{readOnly}`).


# 5.6 Clasificadores
Un **clasificador** es un concepto general que agrupa cosas como:

- **Clases**
- **Interfaces**
- **Componentes**
- **Casos de uso**

Tienen **instancias**, **atributos**, **operaciones** y pueden participar en **relaciones**.


# 5.7 Visibilidad
Controla **quién puede acceder** a atributos u operaciones:

|Símbolo|Nivel|Significado|
|---|---|---|
|`+`|Pública|Accesible desde cualquier clase|
|`-`|Privada|Solo accesible dentro de la clase|
|`#`|Protegida|Accesible desde subclases|
|`~`|De paquete|Accesible solo dentro del mismo paquete|

```java
class Cliente {
    private String nombre;   // (-)
    protected void validar(); // (#)
    public void comprar();  // (+)
}
```

# 5.8 Interfaces y realización

### ✦ ¿Qué es una interfaz?
Una **colección de operaciones** sin implementación ni atributos.
- No define estructura.
- Define **qué se debe hacer**, no **cómo**.
- Puede participar en:
    - **Generalización**
    - **Dependencia**
    - **Asociación**
    - **Realización**

```java
interface Imprimible {
    void imprimir();
}

class Factura implements Imprimible {
    public void imprimir() {
        // implementación concreta
    }
}
```

📌 **Realización** es la relación entre una interfaz y una clase que **garantiza** cumplir ese contrato.
