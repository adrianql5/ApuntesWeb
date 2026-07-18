import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Raíz del repo: backend/src/config.js → dos niveles arriba
export const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

const RUTA_CONFIG = join(RAIZ, 'apuntes.config.json');

function validar(config) {
  const errores = [];
  if (!config.salida) errores.push('falta "salida"');
  if (!Array.isArray(config.vaults) || config.vaults.length === 0) {
    errores.push('"vaults" debe ser una lista no vacía');
  }
  const vistos = new Set();
  for (const v of config.vaults ?? []) {
    const clave = `${v.curso}-${v.cuatri}`;
    if (vistos.has(clave)) errores.push(`vault duplicado: curso ${v.curso} cuatri ${v.cuatri}`);
    vistos.add(clave);
    if (!existsSync(v.ruta)) errores.push(`no existe la ruta del vault: ${v.ruta}`);
  }
  if (config.legacy && !existsSync(config.legacy.ruta)) {
    errores.push(`no existe la ruta legacy: ${config.legacy.ruta}`);
  }
  if (errores.length) {
    throw new Error(`apuntes.config.json inválido:\n  - ${errores.join('\n  - ')}`);
  }
}

export function cargarConfig() {
  const config = JSON.parse(readFileSync(RUTA_CONFIG, 'utf8'));
  validar(config);
  config.rutaSalida = join(RAIZ, config.salida);
  config.carpetasIgnoradas = new Set(config.carpetasIgnoradas ?? []);
  return config;
}
