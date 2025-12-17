---
title: "Copias de Seguridad"
---

Copyright (c) 2025 Adrián Quiroga Linares Lectura y referencia permitidas; reutilización y plagio prohibidos

El trabajo del administrador no es evitar que los desastres ocurran (eso es imposible), sino asegurar que **se puede recuperar la información** cuando ocurran.

**Causas de pérdida de datos:**
- Error humano (borrado accidental).
- Fallos técnicos (disco duro roto, corrupción de software).
- Catástrofes (incendio, inundación, robo).
- Malware (Ransomware, ataques hackers).

# 4.1 Los Tres Pilares del Backup
Para montar un sistema de copias necesitamos definir tres cosas: **¿Dónde?, ¿Cómo? y ¿Cuándo?**

## Medios de almacenamiento (¿Dónde?)
| **Medio**                 | **Capacidad**             | **Uso ideal**                                                                                                      |
| ------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Cintas (LTO)**          | Muy alta (18TB+ en LTO-9) | Estándar empresarial. Son baratas por TB y duraderas.                                                              |
| **Librerías Robotizadas** | Exabytes                  | Grandes Centros de Datos. Un robot mueve las cintas automáticamente.                                               |
| **Discos Duros (HDD)**    | Media/Alta (TB)           | Pequeñas empresas o copias rápidas locales.                                                                        |
| **Discos Ópticos**        | Baja (DVD/BluRay)         | Casi en desuso, salvo para archivo a muy largo plazo (Cold Storage).                                               |
| **Nube (Cloud)**          | "Ilimitada"               | Copias externas (off-site). _Ojo: Depende de tu velocidad de internet y de la legislación de protección de datos._ |


## El mecanismo de Copia (¿Cómo?)
Existen dos filosofías técnicas para copiar los datos:

**Copia Fichero a Fichero (Nivel Lógico):** 
- El programa pide al Sistema Operativo: "Dame el archivo `foto.jpg`", luego "Dame `texto.txt`".
- **Ventaja:** Puedes recuperar un solo archivo fácilmente.
- **Desventaja:** Lento si hay millones de archivos pequeños.
- _Herramienta:_ `tar`.

**Copia de Imagen (Nivel físico/bloque):**
- El programa no mira archivos, mira **bits**. Copia el disco duro sector por sector (clona los ceros y unos).
- **Ventaja:** Extremadamente rápido y exacto (copia hasta lo borrado si quieres).
- **Desventaja:** Restaurar un solo archivo es un dolor de cabeza (tienes que restaurar la imagen entera).
- _Herramientas:_ `dd`, `dump`.

## El planificador (¿Cuándo?)
Define la política de copias. Herramientas como `cron` se encargan de ejecutar la copia a las 3:00 AM, por ejemplo.

# 4.2 Estrategias: Completo, Diferencial e Incremental

## Backup Completo (Nivel 0)
- **Qué hace:** Copia **TODO**. Da igual si se modificó o no.
- **Ventaja:** Para restaurar solo necesitas esta cinta.
- **Desventaja:** Tarda muchísimo y ocupa mucho espacio.

## Backup Diferencial
- **Qué hace:** Copia todo lo que ha cambiado **desde el último Backup Completo (Nivel 0)**.
- **Analogía:** Imagina que el Domingo haces una foto a toda tu casa (Completo).
    - _Lunes:_ Pintas una pared de rojo. El backup guarda "Pared roja".
    - _Martes:_ Compras un sofá. El backup guarda "Pared roja + Sofá".
- **Restauración:** Rápida. Necesitas el **Completo + El último Diferencial**. (2 pasos).
- **Espacio:** Crece día a día (el viernes copias todo lo acumulado en la semana).

## Backup Incremental
- **Qué hace:** Copia solo lo que ha cambiado **desde el último backup (sea del tipo que sea)**.
- **Analogía:**
    - _Domingo:_ Foto casa (Completo).
    - _Lunes:_ Pintas pared roja. Backup guarda solo "Pared roja".
    - _Martes:_ Compras sofá. Backup guarda solo "Sofá". (No guarda la pared, porque eso ya se guardó el lunes).
- **Restauración:** Lenta. Necesitas el **Completo + Lunes + Martes + Miércoles...** (Muchos pasos).
- **Espacio:** Es el que menos ocupa.

# 4.3 Niveles de Dump y Estrategias de Rotación
El comando `dump` utiliza números (Niveles 0-9) para definir qué copiar. **Regla de Oro:** Un nivel `N` copia todo lo modificado desde el último backup de nivel _inferior_ a `N`.

## Ejemplo 1: Estrategia Diferencial 
_Secuencia:_ `0, 5, 5, 5, 5` (Domingo a Jueves)

1. **Domingo (Nivel 0):** Copia TODO.
2. **Lunes (Nivel 5):** Busca el último nivel menor que 5. Encuentra el 0 (Domingo). Copia cambios Lunes vs Domingo.
3. **Martes (Nivel 5):** Busca el último nivel menor que 5. Encuentra el 0 (Domingo). Copia cambios (Lunes+Martes) vs Domingo.

- **Resultado:** Cada día copias más datos ("acumulativo").  
- **Recuperación:** Si se rompe el disco el Jueves, solo necesitas la cinta del **Domingo (0)** y la del **Miércoles (5)**.

![](./Pasted image 20251207195954.png)

![](./Pasted image 20251207200006.png)

## Ejemplo 2: Estrategia Incremental
_Secuencia:_ `0, 3, 4, 5, 6` (Escalera de números)

1. **Domingo (Nivel 0):** Copia TODO.
2. **Lunes (Nivel 3):** Busca menor que 3 -> Encuentra 0. Copia cambios del Lunes.
3. **Martes (Nivel 4):** Busca menor que 4 -> Encuentra 3 (Lunes). Copia cambios Martes vs Lunes.
4. **Miércoles (Nivel 5):** Busca menor que 5 -> Encuentra 4 (Martes). Copia cambios Miércoles vs Martes.

- **Resultado:** Cada día copias poquísimo (solo lo de ese día).
- **Recuperación:** Si se rompe el disco el Jueves, necesitas: **Domingo (0) + Lunes (3) + Martes (4) + Miércoles (5)**. ¡Si pierdes una cinta intermedia, pierdes los datos siguientes!

![](./Pasted image 20251207200028.png)

![](./Pasted image 20251207200037.png)

# 4.4 Herramientas de Comando
## `dump` y `restore` (Específicos de sistemas de ficheros)
Están diseñados para trabajar a bajo nivel con sistemas de ficheros ext2/ext3/ext4.

- **Ventaja:** Respetan permisos, fechas y saben si un archivo se movió. Soportan los "niveles" nativamente.
- **Fichero clave:** `/var/lib/dumpdates` (Aquí anota cuándo hizo el último backup para calcular los incrementales).

```shell
# Hacer backup completo (nivel 0) de /home en cinta (/dev/st0) y actualizar fechas (-u)
dump -0u -f /dev/st0 /home

# Hacer backup incremental (nivel 5)
dump -5u -f /dev/st0 /home
``` 

## `tar` (Tape ARchiver - El estándar)
Empaqueta archivos. Es el más usado para backups de carpetas específicas.

- **Nota:** No tiene "niveles" automáticos como dump, hay que programarlos con scripts o usar la opción `--listed-incremental`.

```shell
# Crear un backup comprimido
tar -czvf backup_home.tar.gz /home
``` 


## `dd` (Data Definition - Clonado en crudo)
Copia bit a bit.
- **Uso:** Clonar discos enteros, crear imágenes ISO, o copias forenses.
- **Peligro:** Si te equivocas con el destino (`of=`), sobrescribes el disco sin preguntar.

```shell
# Clonar partición sda1 a sda2
dd if=/dev/sda1 of=/dev/sda2 bs=4M status=progress

# if = Input File (Origen)
# of = Output File (Destino)
# bs = Block Size (Tamaño del bloque, para ir más rápido)
``` 