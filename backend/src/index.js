#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { cargarConfig } from './config.js';
import { escanearTodo, extraerEmbeds } from './scanner.js';
import { escanearLegacy } from './legacy.js';

const [comando, ...flags] = process.argv.slice(2);
const tiene = (f) => flags.includes(f);

function informeScan(config) {
  const vaults = escanearTodo(config);
  const legacy = escanearLegacy(config);
  let totalNotas = 0;
  let totalImagenes = 0;
  const sinResolver = [];

  for (const v of vaults) {
    console.log(`\nCurso ${v.curso} · Cuatrimestre ${v.cuatri}  (${v.ruta})`);
    console.log(`  README de observaciones: ${v.readme ? 'sí' : 'NO'}`);
    for (const a of v.asignaturas) {
      totalNotas += a.notas.length;
      totalImagenes += a.imagenes.size;
      console.log(`  · ${a.nombre} [${a.slug}]: ${a.notas.length} notas, ${a.imagenes.size} imágenes`);
      if (a.duplicadas.length) {
        console.log(`    ⚠ imágenes duplicadas dentro de la asignatura: ${a.duplicadas.join(', ')}`);
      }
      for (const n of a.notas) {
        for (const e of extraerEmbeds(readFileSync(n.ruta, 'utf8'), a, v)) {
          if (!e.resuelta) sinResolver.push(`${a.nombre}/${n.archivo} → ![[${e.objetivo}]]`);
        }
      }
    }
  }

  if (legacy) {
    console.log(`\nCurso ${legacy.curso} (legacy)  (${legacy.ruta})`);
    for (const a of legacy.asignaturas) {
      console.log(`  · ${a.nombre} [${a.slug}]: README ${a.readme ? 'sí' : 'no'}, ${a.pdfs.length} PDFs`);
    }
  }

  console.log(`\nTotales: ${vaults.reduce((s, v) => s + v.asignaturas.length, 0)} asignaturas de teoría, ` +
    `${totalNotas} notas, ${totalImagenes} imágenes indexadas` +
    (legacy ? `, ${legacy.asignaturas.length} asignaturas legacy` : ''));

  if (sinResolver.length) {
    console.log(`\nEmbeds SIN RESOLVER (${sinResolver.length}):`);
    for (const s of sinResolver) console.log(`  ✗ ${s}`);
  } else {
    console.log('\nTodos los embeds de imagen resuelven ✓');
  }
  return sinResolver.length;
}

async function main() {
  const config = cargarConfig();
  switch (comando) {
    case 'scan': {
      informeScan(config);
      break;
    }
    case 'build': {
      const { construir } = await import('./build.js');
      await construir(config, { strict: tiene('--strict') });
      break;
    }
    case 'pdf': {
      const { generarPdfs } = await import('./pdf.js');
      await generarPdfs(config, { soloCambiadas: tiene('--solo-cambiadas') });
      break;
    }
    case 'changed': {
      const { cambios } = await import('./diff.js');
      await cambios(config, { update: tiene('--update') });
      break;
    }
    case 'clean': {
      const { limpiar } = await import('./build.js');
      limpiar(config);
      break;
    }
    default:
      console.log('Uso: node backend/src/index.js <scan|build [--strict]|pdf [--solo-cambiadas]|changed [--update]|clean>');
      process.exitCode = comando ? 1 : 0;
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
