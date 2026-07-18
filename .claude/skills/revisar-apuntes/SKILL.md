---
name: revisar-apuntes
description: Revisa SOLO las notas modificadas desde la última revisión buscando faltas de ortografía e incoherencias, y genera un informe en español. No edita las notas.
---

# Revisar apuntes modificados

1. Ejecuta `node backend/src/index.js changed` desde la raíz del repo. Si la salida
   no contiene notas, escribe "Sin cambios desde la última revisión." y termina.
2. Lee ÚNICAMENTE los archivos `.md` listados (rutas absolutas en las bóvedas).
3. Busca, por nota:
   - Faltas de ortografía y tildes (español); ignora términos técnicos, código,
     fórmulas LaTeX y nombres propios.
   - Incoherencias: contradicciones dentro de la nota o con su título, definiciones
     que cambian entre secciones, numeración o referencias rotas.
   - Embeds `![[...]]` que apunten a imágenes inexistentes.
4. Escribe el informe en `review-tmp/informe.md` (crea la carpeta si no existe) con
   este formato:

   ```markdown
   # Revisión de apuntes — {fecha}

   ## {ASIGNATURA} — {nombre de la nota}
   - **L{línea}** [ortografía|coherencia|embed]: {problema} → {sugerencia}
   ```

   Si una nota está limpia, indícalo en una línea. Termina con un párrafo
   "Resumen" (nº de notas revisadas, nº de hallazgos por tipo).
5. NUNCA edites las notas fuente: este es un flujo de solo-informe. Las correcciones
   las decide el usuario.
