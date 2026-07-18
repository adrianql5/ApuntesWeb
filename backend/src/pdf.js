import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';
import puppeteer from 'puppeteer-core';
import { RAIZ } from './config.js';
import { escanearTodo } from './scanner.js';
import { crearMarkdown, renderNota } from './markdown.js';
import { aplicar, escaparHtml, ORDINAL_CURSO, nombreCuatri } from './render.js';

// Navegadores Chromium en orden de preferencia (o CHROME_PATH del entorno)
const NAVEGADORES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
].filter(Boolean);

function rutaNavegador() {
  const ruta = NAVEGADORES.find((r) => existsSync(r));
  if (!ruta) {
    throw new Error(
      'No se encontró ningún navegador Chromium para generar PDFs.\n' +
      'Instala Google Chrome o Brave, o define CHROME_PATH.'
    );
  }
  return ruta;
}

export async function generarPdfs(config, { soloCambiadas = false } = {}) {
  const vaults = escanearTodo(config);
  const md = crearMarkdown();
  const plantilla = readFileSync(join(RAIZ, 'frontend', 'templates', 'pdf.html'), 'utf8');
  const katexCss = pathToFileURL(join(RAIZ, 'backend', 'node_modules', 'katex', 'dist', 'katex.min.css')).href;
  const dirPdf = join(config.rutaSalida, 'pdf');
  mkdirSync(dirPdf, { recursive: true });

  // Con --solo-cambiadas: regenera solo asignaturas con notas modificadas
  let filtro = null;
  if (soloCambiadas) {
    const { notasCambiadas } = await import('./diff.js');
    const cambiadas = notasCambiadas(config);
    filtro = new Set();
    for (const v of vaults) {
      for (const a of v.asignaturas) {
        if (a.notas.some((n) => cambiadas.has(n.ruta))) filtro.add(`${v.curso}-${v.cuatri}-${a.slug}`);
      }
    }
    if (filtro.size === 0) {
      console.log('PDF: ninguna asignatura con cambios.');
      return;
    }
  }

  const navegador = await puppeteer.launch({
    executablePath: rutaNavegador(),
    headless: true,
  });
  const dirTmp = join(tmpdir(), `apuntesweb-pdf-${process.pid}`);
  mkdirSync(dirTmp, { recursive: true });

  try {
    const pagina = await navegador.newPage();
    const fecha = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });

    for (const v of vaults) {
      for (const a of v.asignaturas) {
        const id = `${v.curso}-${v.cuatri}-${a.slug}`;
        if (filtro && !filtro.has(id)) continue;

        const cuerpo = a.notas.map((n) => {
          const ctx = {
            asignatura: a, vault: v, dirBase: a.ruta, rel: '',
            srcImagen: (abs) => pathToFileURL(abs).href,
            buscarNota: () => null, // dentro del PDF los enlaces entre notas no aplican
          };
          const { html } = renderNota(md, readFileSync(n.ruta, 'utf8'), ctx);
          return `<section class="nota-pdf"><h1 class="nota-pdf-titulo">${escaparHtml(n.titulo)}</h1>\n${html}</section>`;
        }).join('\n');

        const html = aplicar(plantilla, {
          titulo: a.nombre,
          subtitulo: `${ORDINAL_CURSO[v.curso] ?? `Curso ${v.curso}`} · ${nombreCuatri(v.cuatri)} · ${a.notas.length} temas`,
          fecha,
          url: config.urlPublica ?? '',
          katexCss,
          cuerpo,
        });

        const rutaHtml = join(dirTmp, `${id}.html`);
        writeFileSync(rutaHtml, html);
        await pagina.goto(pathToFileURL(rutaHtml).href, { waitUntil: 'networkidle0', timeout: 120000 });
        await pagina.pdf({
          path: join(dirPdf, `${id}.pdf`),
          format: 'A4',
          printBackground: true,
          margin: { top: '18mm', bottom: '16mm', left: '15mm', right: '15mm' },
          displayHeaderFooter: true,
          headerTemplate: '<span></span>',
          footerTemplate:
            `<div style="width:100%;font-size:8px;color:#6b7280;padding:0 15mm;display:flex;justify-content:space-between;">` +
            `<span>${escaparHtml(a.nombre)} · ApuntesWeb</span>` +
            `<span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
        });
        console.log(`  ✓ pdf/${id}.pdf (${a.notas.length} temas)`);
      }
    }
  } finally {
    await navegador.close();
    rmSync(dirTmp, { recursive: true, force: true });
  }
}
