---
title: "Modelado Estructural"
---

Copyright (c) 2025 Adrián Quiroga Linares Lectura y referencia permitidas; reutilización y plagio prohibidos

(*diagramas de clases*)

Una **clase** es una descripción de un conjunto de objetos que comparten atributos, operaciones, relaciones y semántica. Son **abstracciones** independientes del lenguaje de programación capaces de implementar **interfaces**.

Los objetos de una misma clase tienen los mismos tipos de **estado** y **comportamiento**. Las clases **colaboran** entre si para satisfacer necesidades. Hay 3 tipos de **relaciones:**

- **Dependencia:** los cambios en la planificación de un elemento pueden afectar a otro, indica utilización.
![](./Pasted image 20250225130055.png)
- **Generalización:** relación padre hijo.
![](./Pasted image 20250225130134.png)
- **Asociación:** relación estructural. Se usa para vincular clases. Ademas tenemos adornos:
	- **Nombre:** etiqueta que describe la relación
	- **Rol:** papel que juega cada clase relacionada
	- **Multiplicidad:** nº de instancias participantes
	- **Agregación:** es como lo de entidad débil - entidad fuerte de BDI (*asociación todo-partes*).
	- **Composición:** igual que en POO.

![](./Pasted image 20250225130542.png)
![](./Pasted image 20250225131001.png)
Son la base para diagramas de paquetes, componentes y despliegue. Pueden contener **paquetes**.

![](./Pasted image 20250225130831.png)
