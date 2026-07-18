import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative } from 'node:path';
import { RAIZ } from './config.js';
import { escanearTodo } from './scanner.js';

// state.json guarda, por bóveda, el hash de contenido de cada nota en la última
// revisión. Cambiada = hash distinto o nota nueva. Independiente de git: funciona
// aunque haya cambios sin commitear o la bóveda no sea un repo.
const RUTA_ESTADO = join(RAIZ, 'automation', 'state.json');

function leerEstado() {
  return existsSync(RUTA_ESTADO) ? JSON.parse(readFileSync(RUTA_ESTADO, 'utf8')) : { vaults: {} };
}

const hash = (ruta) => createHash('sha1').update(readFileSync(ruta)).digest('hex');

function hashesVault(v) {
  const hashes = {};
  for (const a of v.asignaturas) {
    for (const n of a.notas) hashes[relative(v.ruta, n.ruta)] = hash(n.ruta);
  }
  return hashes;
}

// Set de rutas absolutas de notas de teoría modificadas desde la última revisión
export function notasCambiadas(config) {
  const estado = leerEstado();
  const cambiadas = new Set();
  for (const v of escanearTodo(config)) {
    const previos = estado.vaults[`${v.curso}-${v.cuatri}`]?.hashes ?? {};
    for (const a of v.asignaturas) {
      for (const n of a.notas) {
        if (previos[relative(v.ruta, n.ruta)] !== hash(n.ruta)) cambiadas.add(n.ruta);
      }
    }
  }
  return cambiadas;
}

export async function cambios(config, { update = false } = {}) {
  if (update) {
    const estado = leerEstado();
    for (const v of escanearTodo(config)) {
      estado.vaults[`${v.curso}-${v.cuatri}`] = {
        fecha: new Date().toISOString(),
        hashes: hashesVault(v),
      };
    }
    writeFileSync(RUTA_ESTADO, JSON.stringify(estado, null, 2) + '\n');
    console.log(`Estado actualizado en ${RUTA_ESTADO}`);
    return;
  }

  const cambiadas = notasCambiadas(config);
  const resultado = [];
  for (const v of escanearTodo(config)) {
    const notas = v.asignaturas.flatMap((a) =>
      a.notas.filter((n) => cambiadas.has(n.ruta)).map((n) => ({ asignatura: a.nombre, ruta: n.ruta }))
    );
    if (notas.length) resultado.push({ vault: `${v.curso}-${v.cuatri}`, notas });
  }
  console.log(JSON.stringify(resultado, null, 2));
}
