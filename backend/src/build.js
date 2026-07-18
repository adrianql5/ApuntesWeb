import { readFileSync, readdirSync, rmSync, existsSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import { escanearTodo } from './scanner.js';
import { escanearLegacy } from './legacy.js';
import { crearMarkdown, renderNota } from './markdown.js';
import {
  cargarPlantillas, escribirPagina, migas, escaparHtml, ORDINAL_CURSO, nombreCuatri,
} from './render.js';
import { copiarImagenes, copiarEstaticos, copiarKatex, copiarPdfLegacy } from './assets.js';
import { slug } from './slug.js';

// Borra la salida excepto CLAUDE.md (aviso de carpeta generada) y pdf/ (caros de regenerar)
export function limpiar(config, { conservarPdfs = true } = {}) {
  if (!existsSync(config.rutaSalida)) return;
  for (const e of readdirSync(config.rutaSalida)) {
    if (e === 'CLAUDE.md') continue;
    if (conservarPdfs && e === 'pdf') continue;
    rmSync(join(config.rutaSalida, e), { recursive: true, force: true });
  }
}

// Registro global de imágenes a copiar: rutaAbs → 'ambito-slug/nombre-slug.ext'
function crearRegistro() {
  const registro = new Map();
  const usadosPorAmbito = new Map();
  return {
    registro,
    registrador(ambito) {
      if (!usadosPorAmbito.has(ambito)) usadosPorAmbito.set(ambito, new Map());
      const usados = usadosPorAmbito.get(ambito);
      return (abs) => {
        if (registro.has(abs)) return registro.get(abs);
        const ext = extname(abs).toLowerCase();
        const base = slug(basename(abs, extname(abs)));
        const n = usados.get(base) ?? 0;
        usados.set(base, n + 1);
        const destino = `${ambito}/${n === 0 ? base : `${base}-${n + 1}`}${ext}`;
        registro.set(abs, destino);
        return destino;
      };
    },
  };
}

const enlaceCuatri = (v) => `curso-${v.curso}/cuatri-${v.cuatri}/`;

function tarjeta({ href, codigo, titulo, detalle }) {
  return `    <li class="tarjeta"><a href="${href}">` +
    (codigo ? `<span class="tarjeta-codigo">${escaparHtml(codigo)}</span>` : '') +
    `<h2>${escaparHtml(titulo)}</h2><p>${escaparHtml(detalle)}</p></a></li>`;
}

export async function construir(config, { strict = false } = {}) {
  const inicio = Date.now();
  const vaults = escanearTodo(config);
  const legacy = escanearLegacy(config);
  const plantillas = cargarPlantillas();
  const md = crearMarkdown();
  const { registro, registrador } = crearRegistro();
  const sinResolver = [];
  let paginas = 0;

  limpiar(config);

  const pagina = (rutaRel, nombre, vars) => {
    escribirPagina(join(config.rutaSalida, rutaRel), plantillas, nombre, vars);
    paginas++;
  };

  const renderMd = (texto, ctx, origen) => {
    const { html, sinResolver: fallos } = renderNota(md, texto, ctx);
    for (const f of fallos) sinResolver.push(`${origen} → ![[${f}]]`);
    return html;
  };

  // ---------- Portada ----------
  const totalNotas = vaults.reduce((s, v) => s + v.asignaturas.reduce((t, a) => t + a.notas.length, 0), 0);
  const tarjetasCursos = [];
  for (const curso of [...new Set(vaults.map((v) => v.curso))].sort()) {
    const deCurso = vaults.filter((v) => v.curso === curso);
    const nAsig = deCurso.reduce((s, v) => s + v.asignaturas.length, 0);
    tarjetasCursos.push(tarjeta({
      href: `curso-${curso}/index.html`,
      codigo: `CURSO ${curso}`,
      titulo: ORDINAL_CURSO[curso] ?? `Curso ${curso}`,
      detalle: `${deCurso.length} cuatrimestres · ${nAsig} asignaturas`,
    }));
  }
  if (legacy) {
    tarjetasCursos.unshift(tarjeta({
      href: `curso-${legacy.curso}/index.html`,
      codigo: `CURSO ${legacy.curso}`,
      titulo: ORDINAL_CURSO[legacy.curso] ?? `Curso ${legacy.curso}`,
      detalle: `${legacy.asignaturas.length} asignaturas · resúmenes y PDFs`,
    }));
  }
  pagina('index.html', 'index', {
    rel: '', titulo: 'Apuntes de Ingeniería Informática',
    descripcion: `Apuntes de teoría de Ingeniería Informática: ${totalNotas} temas con fórmulas, imágenes y PDFs descargables.`,
    migas: migas([{ texto: 'inicio' }]),
    tarjetas: tarjetasCursos.join('\n'),
  });

  // ---------- Cursos de teoría (2.º, 3.º…) ----------
  for (const curso of [...new Set(vaults.map((v) => v.curso))].sort()) {
    const deCurso = vaults.filter((v) => v.curso === curso).sort((a, b) => a.cuatri - b.cuatri);
    const tarjetasCuatris = deCurso.map((v) => tarjeta({
      href: `cuatri-${v.cuatri}/index.html`,
      codigo: `${curso}.${v.cuatri}`,
      titulo: nombreCuatri(v.cuatri),
      detalle: `${v.asignaturas.length} asignaturas · ${v.asignaturas.reduce((s, a) => s + a.notas.length, 0)} temas`,
    }));
    pagina(`curso-${curso}/index.html`, 'curso', {
      rel: '../', titulo: ORDINAL_CURSO[curso] ?? `Curso ${curso}`,
      descripcion: `Apuntes de ${ORDINAL_CURSO[curso] ?? `curso ${curso}`} de Ingeniería Informática.`,
      sello: 'teoría · por cuatrimestres', introduccion: '',
      migas: migas([{ href: '../index.html', texto: 'inicio' }, { texto: `curso-${curso}` }]),
      tarjetas: tarjetasCuatris.join('\n'),
    });

    // ---------- Cuatrimestres ----------
    for (const v of deCurso) {
      const rel = '../../';
      const tarjetasAsig = v.asignaturas.map((a) => tarjeta({
        href: `${a.slug}/index.html`,
        titulo: a.nombre,
        detalle: `${a.notas.length} temas`,
      }));
      let observaciones;
      if (v.readme) {
        const ctx = {
          asignatura: { slug: `curso-${v.curso}-cuatri-${v.cuatri}`, imagenes: new Map() },
          vault: v, rel, dirBase: v.ruta,
          registrarImagen: registrador(`curso-${v.curso}-cuatri-${v.cuatri}`),
          buscarNota: () => null,
        };
        observaciones = renderMd(v.readme, ctx, `README ${v.curso}-${v.cuatri}`);
      } else {
        observaciones = '<div class="callout callout-warning"><p class="callout-titulo">Pendiente</p>' +
          '<p>Este cuatrimestre aún no tiene observaciones escritas.</p></div>';
      }
      pagina(`${enlaceCuatri(v)}index.html`, 'cuatrimestre', {
        rel, titulo: `${nombreCuatri(v.cuatri)} · ${ORDINAL_CURSO[v.curso]}`,
        descripcion: `Asignaturas y observaciones del ${nombreCuatri(v.cuatri)} de ${ORDINAL_CURSO[v.curso]?.toLowerCase()}.`,
        sello: `curso ${v.curso} · cuatrimestre ${v.cuatri}`,
        migas: migas([
          { href: '../../index.html', texto: 'inicio' },
          { href: '../index.html', texto: `curso-${v.curso}` },
          { texto: `cuatri-${v.cuatri}` },
        ]),
        tarjetas: tarjetasAsig.join('\n'),
        observaciones,
      });

      // ---------- Asignaturas ----------
      for (const a of v.asignaturas) {
        const relAsig = '../../../';
        const rutaPdf = `pdf/${v.curso}-${v.cuatri}-${a.slug}.pdf`;
        const lista = a.notas.map((n) => {
          const numero = n.orden !== null ? String(n.orden) : '·';
          return `    <li><a href="${n.slug}.html"><span class="nota-numero">${numero}</span>` +
            `<span class="nota-titulo">${escaparHtml(n.titulo.replace(/^\d+\.\s*/, ''))}</span></a></li>`;
        });
        pagina(`${enlaceCuatri(v)}${a.slug}/index.html`, 'asignatura', {
          rel: relAsig, titulo: a.nombre,
          descripcion: `Apuntes de ${a.nombre}: ${a.notas.length} temas de teoría con PDF descargable.`,
          sello: `curso ${v.curso} · cuatrimestre ${v.cuatri} · ${a.notas.length} temas`,
          migas: migas([
            { href: '../../../index.html', texto: 'inicio' },
            { href: '../../index.html', texto: `curso-${v.curso}` },
            { href: '../index.html', texto: `cuatri-${v.cuatri}` },
            { texto: a.slug },
          ]),
          acciones: `<a class="boton" href="${relAsig}${rutaPdf}" download>Descargar PDF de la asignatura</a>`,
          listaNotas: lista.join('\n'),
          extra: '',
        });

        // ---------- Notas ----------
        const buscarNota = (nombre) => {
          const objetivo = nombre.replace(/\.md$/i, '').toLowerCase();
          return a.notas.find((n) => n.titulo.toLowerCase() === objetivo) ?? null;
        };
        a.notas.forEach((n, i) => {
          const ctx = {
            asignatura: a, vault: v, rel: relAsig, dirBase: a.ruta,
            registrarImagen: registrador(a.slug), buscarNota,
          };
          const cuerpo = renderMd(readFileSync(n.ruta, 'utf8'), ctx, `${a.nombre}/${n.archivo}`);
          const ant = a.notas[i - 1];
          const sig = a.notas[i + 1];
          pagina(`${enlaceCuatri(v)}${a.slug}/${n.slug}.html`, 'nota', {
            rel: relAsig, titulo: `${n.titulo} · ${a.nombre}`,
            descripcion: `${n.titulo} — apuntes de ${a.nombre} (${ORDINAL_CURSO[v.curso]?.toLowerCase()} de Ingeniería Informática).`,
            sello: `${a.nombre} · curso ${v.curso}`,
            migas: migas([
              { href: '../../../index.html', texto: 'inicio' },
              { href: '../../index.html', texto: `curso-${v.curso}` },
              { href: '../index.html', texto: `cuatri-${v.cuatri}` },
              { href: 'index.html', texto: a.slug },
              { texto: n.slug },
            ]),
            cuerpo,
            anterior: ant
              ? `<a class="nav-anterior" href="${ant.slug}.html"><span class="nav-etiqueta">← anterior</span>${escaparHtml(ant.titulo)}</a>`
              : '<span></span>',
            siguiente: sig
              ? `<a class="nav-siguiente" href="${sig.slug}.html"><span class="nav-etiqueta">siguiente →</span>${escaparHtml(sig.titulo)}</a>`
              : '',
          });
        });
      }
    }
  }

  // ---------- Curso legacy (1.º) ----------
  let pdfsLegacy = 0;
  if (legacy) {
    const tarjetasAsig = legacy.asignaturas.map((a) => tarjeta({
      href: `${a.slug}/index.html`,
      titulo: a.nombre,
      detalle: `${a.pdfs.length ? `${a.pdfs.length} PDFs` : 'resumen'}`,
    }));
    pagina(`curso-${legacy.curso}/index.html`, 'curso', {
      rel: '../', titulo: ORDINAL_CURSO[legacy.curso],
      descripcion: 'Material de primer curso: resúmenes por asignatura y PDFs descargables.',
      sello: 'material legado · resúmenes y pdfs',
      introduccion: '<p class="portada-texto">Primero lo cursé antes de empezar a tomar apuntes en Obsidian: aquí hay resúmenes por asignatura y el material en PDF tal cual lo conservo.</p>',
      migas: migas([{ href: '../index.html', texto: 'inicio' }, { texto: `curso-${legacy.curso}` }]),
      tarjetas: tarjetasAsig.join('\n'),
    });

    for (const a of legacy.asignaturas) {
      const rel = '../../';
      const cuerpo = a.readme
        ? renderMd(a.readme, {
            asignatura: { slug: `legacy-${a.slug}`, imagenes: new Map() },
            vault: { imagenesVault: new Map() }, rel, dirBase: a.ruta,
            registrarImagen: registrador(`legacy-${a.slug}`), buscarNota: () => null,
          }, `1-Carrera/${a.nombre}/README.md`)
        : '<p>Sin resumen para esta asignatura.</p>';
      const listaPdfs = a.pdfs.map((abs) => {
        const nombrePdf = `${slug(basename(abs, '.pdf'))}.pdf`;
        const destinoRel = `curso-${legacy.curso}/${a.slug}/${nombrePdf}`;
        copiarPdfLegacy(config, abs, destinoRel);
        pdfsLegacy++;
        return `<li><a href="${nombrePdf}" download>${escaparHtml(basename(abs))}</a></li>`;
      });
      pagina(`curso-${legacy.curso}/${a.slug}/index.html`, 'asignatura', {
        rel, titulo: a.nombre,
        descripcion: `Material de ${a.nombre} (primer curso): resumen y PDFs.`,
        sello: `curso ${legacy.curso} · material legado`,
        migas: migas([
          { href: '../../index.html', texto: 'inicio' },
          { href: '../index.html', texto: `curso-${legacy.curso}` },
          { texto: a.slug },
        ]),
        acciones: '',
        listaNotas: '',
        extra: `<section class="prosa" aria-label="Resumen">${cuerpo}</section>` +
          (listaPdfs.length
            ? `<section aria-label="PDFs"><h2 class="observaciones-titulo"><mark>Material en PDF</mark></h2><ul class="lista-pdfs">${listaPdfs.join('\n')}</ul></section>`
            : ''),
      });
    }
  }

  // ---------- Recursos ----------
  const nImagenes = copiarImagenes(config, registro);
  copiarEstaticos(config);
  copiarKatex(config);

  const seg = ((Date.now() - inicio) / 1000).toFixed(1);
  console.log(`Build completado en ${seg}s: ${paginas} páginas, ${nImagenes} imágenes, ${pdfsLegacy} PDFs legacy.`);
  if (sinResolver.length) {
    console.log(`\nEmbeds sin resolver (${sinResolver.length}):`);
    for (const s of sinResolver) console.log(`  ✗ ${s}`);
    if (strict) throw new Error('Build --strict: hay embeds sin resolver.');
  }
  return { vaults, legacy, registro };
}
