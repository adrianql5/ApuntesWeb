---
name: normalizar-readme
description: Crea o reestructura el README.md de observaciones de una bóveda de teoría según la plantilla común, preservando el contenido y el tono existentes.
---

# Normalizar README de cuatrimestre

Argumento esperado: la bóveda objetivo (p. ej. `3-TEORIA-2-CUATRI`); si no se da,
pregunta cuál o detecta con `apuntes.config.json` cuáles carecen de README.

1. Lee `plantillas/README-cuatrimestre.md` (formato canónico) y el `README.md`
   actual de la bóveda si existe.
2. Migra el contenido existente sección a sección: cada `## Asignatura` actual se
   reparte entre Profesorado / Dificultad / Evaluación / Consejos / Opinión.
   - PRESERVA el tono personal y las frases originales; no las suavices ni las
     reescribas, solo reubícalas.
   - Lo que no encaje en ninguna subsección va a Opinión.
   - Asignaturas de la bóveda sin sección: créalas con las subsecciones vacías
     (guion placeholder) para que el usuario las rellene.
3. Si no había README, crea uno nuevo desde la plantilla con una sección por
   asignatura (subcarpetas de la bóveda, ignorando las de `carpetasIgnoradas`).
4. Muestra un diff/resumen de lo que vas a escribir y escribe el `README.md` en la
   raíz de la bóveda (¡es un repo git aparte — no lo commitees tú!).
