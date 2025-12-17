---
title: "Transformaciones"
---

Copyright (c) 2025 Adrián Quiroga Linares Lectura y referencia permitidas; reutilización y plagio prohibidos

# 3.1 Transformaciones
En la **pipeline gráfica** se describen varios espacios de trabajo:
- El **Local Space** es el sistema de **coordenadas locales** de los objetos con relación a su origen local.
- El **World Space** es el sistema de **coordenadas de escena** o de mundo de los objetos con relación al origen general.
- La **Model Matrix** transforma las coordenadas locales de la escena, trasladando, rotando y escalando los objetos hasta colocarlos en su posición final.

Las **transformaciones geométricas** se usan para trasladar, escalar y rotar los **objetos** y la **cámara de la escena**.
![](/ApuntesWeb/images/segundo/segundo-cuatrimestre/coga/Pasted image 20250425200629.png)

En la **pipeline fija (Opengl 1.2)** el paso de coordenadas locales a coordenadas de la escena se corresponde con el paso **transformación geométrica.**
![](/ApuntesWeb/images/segundo/segundo-cuatrimestre/coga/Pasted image 20250425200741.png)

En el **retained mode (Opengl 3.3)** el paso de coordenadas locales a coordenadas de escena se realiza mediante el **Vertex Shader**.
![](/ApuntesWeb/images/segundo/segundo-cuatrimestre/coga/Pasted image 20250425200841.png)

## 3.1.1 Traslación
Llamamos **traslación** a mover un objeto (todos sus vértices) de un lugar a otro. Si queremos trasladar un punto $P(x, y)$ a una nueva posición $P'(x', y')$, usamos la ecuación:

$$
\begin{bmatrix}
x' \\
y'
\end{bmatrix}
=
\begin{bmatrix}
x \\
y
\end{bmatrix}
+
\begin{bmatrix}
T_x \\
T_y
\end{bmatrix}
=
\begin{bmatrix}
x + T_x \\
y + T_y
\end{bmatrix}
$$
$$P' = T+P$$

En Opengl 1.2 `glTranslatef(Tx, Ty, Tz)` 
![](/ApuntesWeb/images/segundo/segundo-cuatrimestre/coga/Pasted image 20250425202303.png)
## 3.1.2 Rotación respecto al Origen
Llamemos **rotación respecto al origen** a desplazar un ángulo $\theta$ un objeto (todos sus vértices) respecto al origen. Para rotar un punto $P(x,y)$ usamos relaciones trigonométricas:

$$
\begin{bmatrix}
x' \\
y'
\end{bmatrix}
=
\begin{bmatrix}
\cos\theta & -\sin\theta \\
\sin\theta & \cos\theta
\end{bmatrix}
\cdot
\begin{bmatrix}
x \\
y
\end{bmatrix}
$$
$$P'=R*P$$

En Opengl 1.2 `glRotatef(θ, x, y,z)` donde $\theta$ está en grados y el giro se realiza alrededor del eje que pasa por (0,0,0) y (x,y,z) en sentido contrario a las agujas del reloj.
![](/ApuntesWeb/images/segundo/segundo-cuatrimestre/coga/Pasted image 20250425202315.png)
## 3.1.3 Rotación General
Para desplazar un ángulo $\theta$  un objeto (todos sus vertices) respecto un punto cualquiera $(x_c, y_c)$:
- Traslación al origen.
- Rotación respecto al origen
- Traslación a $(x_c,y_c)$
 $$P'=T(x_c,y_c)*R(\alpha)*T(-x_c,-y_c)*P$$

![](/ApuntesWeb/images/segundo/segundo-cuatrimestre/coga/Pasted image 20250425202337.png)

## 3.1.4 Ángulos de Euler
Dados dos sistemas de coordenadas $xyz$ e $XYZ$ con un mismo origen, es posible determinar la posición de uno en términos del otro usando tres ángulos $\alpha$ $\beta$ $\gamma$.
Esto sirve para representar los ejes de un objeto respecto a un sistema de referencia general.
Los giros son **acumulativos** y los **ángulos** se encuentran **ya girados**.
Para usar ángulos de Euler en `glRotatef(θ, x, y,z)` se pondría $(1,0,0),(0,1,0),(0,0,1)$.

## 3.1.5 Escalado respecto al origen
Llamamos **escalado** a cambiar el tamaño de un objeto (todos sus vértices). No es una transformación de **cuerpo rígido** ya que la geometría varía.
Para escalar multiplicamos por los **coeficientes de escalado**, que serán la razón entre las coordenadas nuevas y viejas:

$$S_x=\frac{\text{anchura nueva}}{\text{anchura vieja}}$$

$$S_y=\frac{\text{altura nueva}}{\text{altura vieja}}$$


- Si $S_x=S_y$ se realiza un **escalado uniforme**
- $S_x \neq S_y$ se realiza un **escalado no uniforme**

Para escalar un punto $P(x,y)$ multiplicamos sus coordenadas por los coeficientes de escalado:

$$
\begin{bmatrix}
x' \\
y'
\end{bmatrix}
=
\begin{bmatrix}
S_x & 0 \\
0 & S_y
\end{bmatrix}
\cdot
\begin{bmatrix}
x \\
y
\end{bmatrix}
$$
$$P'=S*P$$

En openGl(1.2) `glScale(Sx, Sy, Sz)` 

## 3.1.6 Escalado General
Para escalar un objeto (todos sus vértices) cuando el **origen de coordenadas no está en su interior** sin producir un desplazamiento:
- Traslación al origen
- Escalado respecto al origen
- Traslación al punto inicial

# 3.2 Coordenadas Homogéneas
Para poder realizar todas las transformaciones mediante **multiplicación de matrices** hay que cambiar la forma en la que se realiza la traslación. Para esto utilizaremos las **coordenadas homogéneas**, que añaden un nuevo elemento $w$ que será la última columna de las matrices de transformación, la cual se usará para colocar los factores de translación.
- En los puntos $w=1$
- En los vectores $w=0$
- No existe ni el (0,0,0) ni el (0,0,0,1).

## 3.2.1 Transformaciones en 2D
$$
T(x, y) = T(x, y, 1)
$$

$$
\begin{bmatrix}
x' \\
y'
\end{bmatrix}
=
\begin{bmatrix}
x \\
y
\end{bmatrix}
+
\begin{bmatrix}
T_x \\
T_y
\end{bmatrix}
=
\begin{bmatrix}
x + T_x \\
y + T_y
\end{bmatrix}
\quad \Rightarrow \quad
\begin{pmatrix}
1 & 0 & T_x \\
0 & 1 & T_y \\
0 & 0 & 1
\end{pmatrix}
$$

$$
\begin{bmatrix}
x' \\
y'
\end{bmatrix}
=
\begin{bmatrix}
\cos\theta & -\sin\theta \\
\sin\theta & \cos\theta
\end{bmatrix}
\cdot
\begin{bmatrix}
x \\
y
\end{bmatrix}
\quad \Rightarrow \quad
\begin{pmatrix}
\cos\alpha & -\sin\alpha & 0 \\
\sin\alpha & \cos\alpha & 0 \\
0 & 0 & 1
\end{pmatrix}
$$

$$
\begin{bmatrix}
x' \\
y'
\end{bmatrix}
=
\begin{bmatrix}
S_x & 0 \\
0 & S_y
\end{bmatrix}
\cdot
\begin{bmatrix}
x \\
y
\end{bmatrix}
\quad \Rightarrow \quad
\begin{pmatrix}
S_x & 0 & 0 \\
0 & S_y & 0 \\
0 & 0 & 1
\end{pmatrix}
$$

## 3.2.2 Transformaciones en 3D

**Traslación**
$$T(d_x, d_y, d_z) =
\begin{bmatrix}
1 & 0 & 0 & d_x \\
0 & 1 & 0 & d_y \\
0 & 0 & 1 & d_z \\
0 & 0 & 0 & 1
\end{bmatrix}
$$
**Escalado**
$$
    S(s_x, s_y, s_z) =
    \begin{bmatrix}
    s_x & 0 & 0 & 0 \\
    0 & s_y & 0 & 0 \\
    0 & 0 & s_z & 0 \\
    0 & 0 & 0 & 1
    \end{bmatrix}
    $$

**Rotación alrededor del eje Z**
$$    R_z(\theta) =
    \begin{bmatrix}
    \cos\theta & -\sin\theta & 0 & 0 \\
    \sin\theta & \cos\theta & 0 & 0 \\
    0 & 0 & 1 & 0 \\
    0 & 0 & 0 & 1
    \end{bmatrix}
    $$

**Rotación alrededor del eje X**
$$
    R_x(\theta) =
    \begin{bmatrix}
    1 & 0 & 0 & 0 \\
    0 & \cos\theta & -\sin\theta & 0 \\
    0 & \sin\theta & \cos\theta & 0 \\
    0 & 0 & 0 & 1
    \end{bmatrix}
    $$

**Rotación alrededor del eje Y**
$$
    R_y(\theta) =
    \begin{bmatrix}
    \cos\theta & 0 & \sin\theta & 0 \\
    0 & 1 & 0 & 0 \\
    -\sin\theta & 0 & \cos\theta & 0 \\
    0 & 0 & 0 & 1
    \end{bmatrix}
$$



Notación en columna $M[16]$
Por ejemplo, los valores de traslación estarán en $M(13, 14, 15, 16)$.

## 3.2.3 Zonas de una matriz
La zona azul serían **transformaciones lineales**, la verde **traslaciones** y la rosa **ceros**.

$$
\begin{bmatrix}
N_{11} & N_{21} & N_{31} & N_{41} \\
N_{12} & N_{22} & N_{32} & N_{42} \\
N_{13} & N_{23} & N_{33} & N_{43} \\
0 & 0 & 0 & 1
\end{bmatrix}
$$
