import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { RAIZ } from './config.js';

export function escaparHtml(texto) {
  return String(texto)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function cargarPlantillas() {
  const dir = join(RAIZ, 'frontend', 'templates');
  const plantillas = {};
  for (const archivo of readdirSync(dir)) {
    if (archivo.endsWith('.html')) {
      plantillas[basename(archivo, '.html')] = readFileSync(join(dir, archivo), 'utf8');
    }
  }
  return plantillas;
}

// {{{clave}}} inserta HTML tal cual; {{clave}} escapa. Claves ausentes → cadena vacía.
export function aplicar(plantilla, vars) {
  return plantilla
    .replace(/\{\{\{(\w+)\}\}\}/g, (_, k) => vars[k] ?? '')
    .replace(/\{\{(\w+)\}\}/g, (_, k) => escaparHtml(vars[k] ?? ''));
}

// Escribe una página envolviendo la plantilla `nombre` en base.html
export function escribirPagina(rutaSalida, plantillas, nombre, vars) {
  const contenido = aplicar(plantillas[nombre], vars);
  const html = aplicar(plantillas.base, { ...vars, contenido });
  mkdirSync(dirname(rutaSalida), { recursive: true });
  writeFileSync(rutaSalida, html);
}

// Migas de pan: items = [{href, texto}]; el último sin enlace (página actual)
export function migas(items) {
  return items
    .map((it, i) =>
      i === items.length - 1 || !it.href
        ? `<span aria-current="page">${escaparHtml(it.texto)}</span>`
        : `<a href="${it.href}">${escaparHtml(it.texto)}</a>`
    )
    .join('<span class="miga-sep">/</span>');
}

export const ORDINAL_CURSO = { 1: 'Primer curso', 2: 'Segundo curso', 3: 'Tercer curso', 4: 'Cuarto curso' };
export const nombreCuatri = (c) => `${c}.º cuatrimestre`;
