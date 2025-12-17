---
title: "Modelado"
---

Copyright (c) 2025 Adrián Quiroga Linares Lectura y referencia permitidas; reutilización y plagio prohibidos

# 2.1 Objetos Sólidos
Modelar un objeto es darle forma. Existen dos tipos de modelado:
- **Modelado de interior:** se suelen emplear representaciones basadas en Spatial-Partitioning que consiste en describir el interior de un objeto diviendolo en regiones pequeñas sólidas que no se solapan entre sí. Por lo general se usan cubos (marching cubes)
- **Modelado de Exterior o Representación de Superficie:** define el contorno del objeto sin hacer referencia a su volumen interior. Proporciona información sobre:
	- **Superficie:** debe tener en cuenta su geometría
	- **Propiedades visuales:** cómo se comporta el color o la textura frente a la luz
	- Alguna **propiedad física** (como la elasticicidad). Si va a efectuar una simulación física sobre el objeto.

En la re representación de objetos 3D las superficies representadas deben ser cerradas.

# 2.2 Ejes, Puntos y Vectores
Tanto los puntos, como los vectores y los objetos, se representarán sobre los tres ejes cartesianos.
- $x$, anchura
- $y$, altura
- $z$, profundidad

Por defecto, el rango de valores de las coordenadas va desde (-1,-1,-1) a (1,1,1).
![](/ApuntesWeb/images/segundo/segundo-cuatrimestre/coga/Pasted image 20250425192508.png)
![](/ApuntesWeb/images/segundo/segundo-cuatrimestre/coga/Pasted image 20250425192521.png)

# 2.3 Triangulación
Para modelar cualquier objeto se emplea la técnica de **teselación**, que consiste en su representación mediante polígonos. Por lo general, se suele usar el triángulo,  por lo que se llama **triangulación**.

$$\text{Número de triángulos} = \text{Número de lados del polígono} -2$$
![](/ApuntesWeb/images/segundo/segundo-cuatrimestre/coga/Pasted image 20250425192642.png)

# 2.4 Identificación de Caras
Un plano se puede definir por su **vector normal**, que se puede calcular mediante el producto vectorial de dos de sus vectores. 
	Si simplemente se desea conocer la **dirección** del vector normal, basta aplicar la **regla de la mano derecha** según el recorrido de los vértices. Si se recorren en sentido antihorario la normal será positiva, en caso contrario, será negativa
	![](/ApuntesWeb/images/segundo/segundo-cuatrimestre/coga/Pasted image 20250425193007.png)


>[!Nota] Calcular Vectores entre 2 puntos
>$A(x_1​,y_1​,z_1​),B(x_2​,y_2​,z_2​)$
>$AB=(x_2​−x_1​,y_2​−y_1​,z_2​−z_1​)$

El producto vectorial $\vec{u} \times \vec{v}$ en $R^3$ se calcula como el determinante de la matriz $3 \times 3$ conformada por los vectores unitarios de los ejes, los componentes del vector $\vec{u}$ y los del $\vec{v}$:

$$
\begin{vmatrix} 
\vec{i} & \vec{j} & \vec{k} \\ 
\vec{u}_1 & \vec{u}_2 & \vec{u}_3 \\ 
\vec{v}_1 & \vec{v}_2 & \vec{v}_3 
\end{vmatrix}
$$

Dados los vectores:
$$\mathbf{u} = (1, 0, 0), \quad \mathbf{v} = (0, 1, 0)$$

Calculamos el producto cruz:
$$\mathbf{u} \times \mathbf{v} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ 1 & 0 & 0 \\ 0 & 1 & 0 \end{vmatrix}$$



La normal se puede especificar para un conjunto de vértices con `glNormal3f(x,y,z)` o `glNormal3fv(*v)`.

En OpenGl se usa `FACE CULLING`, es decir **sólo se visualizan las superficies cuya normal se dirige hacia la cámara**. Por tanto hay que tener en cuenta el **orden de creación de los vértices**. 
Está desactivado por defecto, pero esto se puede cambiar con `glEnable(GL_CULL_FACE)` y `glDisable(GL_CULL_FACE)` 
Por defecto, se visualizarán las caras frontales (lo que se puede especificar con `glFrontFace(GL_CCW)` pero se puede desactivar con `glFrontFace(GL_CW)`.

Un vector normal se puede **normalizar** (es decir, transformar en un vector unitario) diviendo cada una de sus componentes por su módulo. Esto es útil para procesos de **iluminación de objetos**, por lo que conviene activas la normalización automática con `glEnable(GL_NORMALIZE)`.

$$\vec{v}_{\text{normalizado}} = \frac{\vec{v}}{\|\vec{v}\|}$$
$$\|\vec{v}\| = \sqrt{v_1^2 + v_2^2 + \cdots + v_n^2}
$$

# 2.5 Tablas de Representación
Para la representación de un objeto en base a polígonos necesitamos conocer, representar y almacenar sus vértices y atributos en **tablas**. Tipos de tablas:
- **Geométricas:** almacenan información sobre los vértices y parámetros sobre los polígonos o superficie que determinan.
- **De atributos:** almacenan información sobre las propiedades físicas de los polígonos (textura, color, transparencia, etc.)

Tipos de tablas según sus índices:
- **Sin indexar**
- **Indexada:** hay una tabla para los vértices (con 3 coordenadas para cada uno) y otro para los polígonos (con los vértices que definen cada uno). Si un vértice se usa varias veces, se escribe una  única vez en la tabla de vértices y se puede referenciarse varias veces en la de polígonos.
![](/ApuntesWeb/images/segundo/segundo-cuatrimestre/coga/Pasted image 20250425195342.png)
- **Doblemente indexada:** hay una tabla para los vértices (con 3 coordenadas para cada uno), otra para las aristas (con dos vértices para cada una y si se desea los dos polígonos que la comparte) y otra para los polígonos (con las aristas de cada uno).
![](/ApuntesWeb/images/segundo/segundo-cuatrimestre/coga/Pasted image 20250425195358.png)
