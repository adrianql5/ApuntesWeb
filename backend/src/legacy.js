import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { crearSlugger } from './slug.js';

// Adaptador de 1-Carrera: una carpeta por asignatura con README.md + PDFs sueltos
function buscarPdfs(ruta, acumulado = []) {
  for (const e of readdirSync(ruta, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const abs = join(ruta, e.name);
    if (e.isDirectory()) buscarPdfs(abs, acumulado);
    else if (e.name.toLowerCase().endsWith('.pdf')) acumulado.push(abs);
  }
  return acumulado;
}

export function escanearLegacy(config) {
  if (!config.legacy) return null;
  const { curso, ruta } = config.legacy;
  const slugAsig = crearSlugger();
  const asignaturas = readdirSync(ruta, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.') && !config.carpetasIgnoradas.has(d.name))
    .map((d) => {
      const rutaAsig = join(ruta, d.name);
      const rutaReadme = join(rutaAsig, 'README.md');
      return {
        nombre: d.name,
        slug: slugAsig(d.name),
        ruta: rutaAsig,
        readme: existsSync(rutaReadme) ? readFileSync(rutaReadme, 'utf8') : null,
        pdfs: buscarPdfs(rutaAsig).sort((a, b) => a.localeCompare(b, 'es')),
      };
    })
    .filter((a) => a.readme !== null || a.pdfs.length > 0)
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));

  return { curso, ruta, asignaturas };
}
