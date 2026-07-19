import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative } from 'node:path';
import { RAIZ } from './config.js';
import { escanearTodo } from './scanner.js';
import { escanearLegacy } from './legacy.js';

// state.json guarda, por bóveda, el hash de contenido de cada archivo vigilado en
// la última revisión. Cambiado = hash distinto o archivo nuevo. Independiente de
// git: funciona aunque haya cambios sin commitear o la bóveda no sea un repo.
// Se vigilan: las notas de cada asignatura, el README de observaciones de la raíz
// de cada bóveda de teoría y los README de las asignaturas legacy (1-Carrera).
const RUTA_ESTADO = join(RAIZ, 'automation', 'state.json');

function leerEstado() {
  return existsSync(RUTA_ESTADO) ? JSON.parse(readFileSync(RUTA_ESTADO, 'utf8')) : { vaults: {} };
}

const hash = (ruta) => createHash('sha1').update(readFileSync(ruta)).digest('hex');

// Lista unificada de bóvedas vigiladas: [{clave, ruta, entradas: [{asignatura, ruta}]}]
function vaultsVigilados(config) {
  const vaults = escanearTodo(config).map((v) => {
    const entradas = v.asignaturas.flatMap((a) =>
      a.notas.map((n) => ({ asignatura: a.nombre, ruta: n.ruta }))
    );
    const readme = join(v.ruta, 'README.md');
    if (existsSync(readme)) entradas.push({ asignatura: '(observaciones)', ruta: readme });
    return { clave: `${v.curso}-${v.cuatri}`, ruta: v.ruta, entradas };
  });

  const legacy = escanearLegacy(config);
  if (legacy) {
    vaults.push({
      clave: 'legacy',
      ruta: legacy.ruta,
      entradas: legacy.asignaturas
        .filter((a) => a.readme !== null)
        .map((a) => ({ asignatura: a.nombre, ruta: join(a.ruta, 'README.md') })),
    });
  }
  return vaults;
}

// Set de rutas absolutas de archivos modificados desde la última revisión
export function notasCambiadas(config) {
  const estado = leerEstado();
  const cambiadas = new Set();
  for (const v of vaultsVigilados(config)) {
    const previos = estado.vaults[v.clave]?.hashes ?? {};
    for (const e of v.entradas) {
      if (previos[relative(v.ruta, e.ruta)] !== hash(e.ruta)) cambiadas.add(e.ruta);
    }
  }
  return cambiadas;
}

export async function cambios(config, { update = false } = {}) {
  if (update) {
    const estado = leerEstado();
    for (const v of vaultsVigilados(config)) {
      const hashes = {};
      for (const e of v.entradas) hashes[relative(v.ruta, e.ruta)] = hash(e.ruta);
      estado.vaults[v.clave] = { fecha: new Date().toISOString(), hashes };
    }
    writeFileSync(RUTA_ESTADO, JSON.stringify(estado, null, 2) + '\n');
    console.log(`Estado actualizado en ${RUTA_ESTADO}`);
    return;
  }

  const cambiadas = notasCambiadas(config);
  const resultado = [];
  for (const v of vaultsVigilados(config)) {
    const notas = v.entradas
      .filter((e) => cambiadas.has(e.ruta))
      .map((e) => ({ asignatura: e.asignatura, ruta: e.ruta }));
    if (notas.length) resultado.push({ vault: v.clave, notas });
  }
  console.log(JSON.stringify(resultado, null, 2));
}
