import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, basename, extname } from 'node:path';
import { crearSlugger } from './slug.js';

const EXT_IMAGEN = new Set(['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp']);

export function esImagen(nombre) {
  return EXT_IMAGEN.has(extname(nombre).toLowerCase());
}

function subcarpetas(ruta, ignoradas) {
  return readdirSync(ruta, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('.') && !ignoradas.has(d.name))
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b, 'es'));
}

// Recorre recursivamente una carpeta y devuelve las rutas absolutas de las imágenes
function buscarImagenes(ruta, ignoradas, acumulado = []) {
  for (const e of readdirSync(ruta, { withFileTypes: true })) {
    if (e.name.startsWith('.') || ignoradas.has(e.name)) continue;
    const abs = join(ruta, e.name);
    if (e.isDirectory()) buscarImagenes(abs, ignoradas, acumulado);
    else if (esImagen(e.name)) acumulado.push(abs);
  }
  return acumulado;
}

// Orden de notas: prefijo numérico primero (1., 2., …), sin número al final (alfabético)
function ordenarNotas(a, b) {
  const na = a.orden, nb = b.orden;
  if (na !== null && nb !== null) return na - nb || a.archivo.localeCompare(b.archivo, 'es');
  if (na !== null) return -1;
  if (nb !== null) return 1;
  return a.archivo.localeCompare(b.archivo, 'es');
}

function escanearAsignatura(nombre, ruta, ignoradas, slugAsig) {
  const slugNota = crearSlugger();
  const notas = readdirSync(ruta, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith('.md') && e.name !== 'README.md')
    .map((e) => {
      const m = e.name.match(/^(\d+)\./);
      return {
        archivo: e.name,
        titulo: e.name.replace(/\.md$/i, ''),
        orden: m ? Number(m[1]) : null,
        ruta: join(ruta, e.name),
      };
    })
    .sort(ordenarNotas);
  for (const n of notas) n.slug = slugNota(n.archivo);

  // Índice de imágenes de la asignatura: nombre de archivo → ruta absoluta
  const imagenes = new Map();
  const duplicadas = [];
  for (const abs of buscarImagenes(ruta, ignoradas)) {
    const nombreImg = basename(abs);
    if (imagenes.has(nombreImg)) duplicadas.push(nombreImg);
    else imagenes.set(nombreImg, abs);
  }

  return { nombre, slug: slugAsig, ruta, notas, imagenes, duplicadas };
}

export function escanearVault({ curso, cuatri, ruta }, config) {
  const ignoradas = config.carpetasIgnoradas;
  const slugAsig = crearSlugger();
  const asignaturas = subcarpetas(ruta, ignoradas)
    .map((nombre) => escanearAsignatura(nombre, join(ruta, nombre), ignoradas, slugAsig(nombre)))
    .filter((a) => a.notas.length > 0);

  const rutaReadme = join(ruta, 'README.md');
  const readme = existsSync(rutaReadme) ? readFileSync(rutaReadme, 'utf8') : null;

  // Índice global de la bóveda (fallback de resolución): primera aparición gana.
  // Recorre TODA la bóveda, no solo las asignaturas: hay imágenes en carpetas de
  // la raíz (p. ej. archivos/imagenes/ en 2-TEORIA-2-CUATRI).
  const imagenesVault = new Map();
  for (const a of asignaturas) {
    for (const [nombre, abs] of a.imagenes) {
      if (!imagenesVault.has(nombre)) imagenesVault.set(nombre, abs);
    }
  }
  for (const abs of buscarImagenes(ruta, ignoradas)) {
    const nombre = basename(abs);
    if (!imagenesVault.has(nombre)) imagenesVault.set(nombre, abs);
  }

  return { curso, cuatri, ruta, readme, asignaturas, imagenesVault };
}

// Resuelve un embed ![[nombre]] : carpeta de la asignatura primero, luego bóveda entera
export function resolverImagen(objetivo, asignatura, vault) {
  const nombre = basename(objetivo.trim());
  return asignatura.imagenes.get(nombre) ?? vault.imagenesVault.get(nombre) ?? null;
}

const RE_EMBED = /!\[\[([^\]|]+?)(\|[^\]]*)?\]\]/g;

// Lista los embeds de imagen de una nota: [{objetivo, hint, resuelta}]
export function extraerEmbeds(textoNota, asignatura, vault) {
  const embeds = [];
  for (const m of textoNota.matchAll(RE_EMBED)) {
    const objetivo = m[1].trim();
    if (!esImagen(objetivo)) continue;
    embeds.push({
      objetivo,
      hint: m[2] ? m[2].slice(1) : null,
      resuelta: resolverImagen(objetivo, asignatura, vault),
    });
  }
  return embeds;
}

export function escanearTodo(config) {
  return config.vaults.map((v) => escanearVault(v, config));
}
