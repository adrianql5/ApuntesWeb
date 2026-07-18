import { cpSync, copyFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { RAIZ } from './config.js';

// Copia las imágenes registradas durante el render: Map(rutaAbs → 'asig-slug/nombre.png')
export function copiarImagenes(config, registro) {
  for (const [abs, destino] of registro) {
    const rutaDestino = join(config.rutaSalida, 'img', destino);
    mkdirSync(dirname(rutaDestino), { recursive: true });
    copyFileSync(abs, rutaDestino);
  }
  return registro.size;
}

export function copiarEstaticos(config) {
  cpSync(join(RAIZ, 'frontend', 'static'), config.rutaSalida, { recursive: true });
}

export function copiarKatex(config) {
  const origen = join(RAIZ, 'backend', 'node_modules', 'katex', 'dist');
  const destino = join(config.rutaSalida, 'vendor', 'katex');
  mkdirSync(destino, { recursive: true });
  copyFileSync(join(origen, 'katex.min.css'), join(destino, 'katex.min.css'));
  // Las fuentes se referencian relativas al CSS: basta copiar fonts/ entera
  cpSync(join(origen, 'fonts'), join(destino, 'fonts'), { recursive: true });
}

export function copiarPdfLegacy(config, abs, destinoRel) {
  const rutaDestino = join(config.rutaSalida, destinoRel);
  mkdirSync(dirname(rutaDestino), { recursive: true });
  copyFileSync(abs, rutaDestino);
}

export function existeEnSalida(config, rel) {
  return existsSync(join(config.rutaSalida, rel));
}
