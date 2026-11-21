import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
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

// Las imágenes de las bóvedas son recortes a resolución completa (PNG de hasta
// 3 MB); dentro del PDF basta con 1400 px en JPEG. Se convierten con sips (macOS)
// a una caché en /tmp; si sips falla se usa el original.
const DIR_CACHE_IMG = join(tmpdir(), 'apuntesweb-pdf-img');
const IMG_UMBRAL = 300 * 1024;

function imagenParaPdf(abs) {
  try {
    const st = statSync(abs);
    if (st.size < IMG_UMBRAL || !/\.(png|jpe?g)$/i.test(abs)) return abs;
    const transparente = /hasAlpha: yes/.test(execFileSync('sips', ['-g', 'hasAlpha', abs], { encoding: 'utf8' }));
    const ext = transparente ? 'png' : 'jpg';
    const clave = createHash('sha1').update(`${abs}:${st.mtimeMs}`).digest('hex');
    const salida = join(DIR_CACHE_IMG, `${clave}.${ext}`);
    if (!existsSync(salida)) {
      mkdirSync(DIR_CACHE_IMG, { recursive: true });
      // Con transparencia se mantiene PNG (JPEG la pintaría de negro); solo se reduce
      const formato = transparente ? ['-s', 'format', 'png'] : ['-s', 'format', 'jpeg', '-s', 'formatOptions', '80'];
      execFileSync('sips', ['-Z', '1400', ...formato, abs, '--out', salida], { stdio: 'ignore' });
    }
    return salida;
  } catch {
    return abs;
  }
}

// Si un PDF supera este tamaño (GitHub avisa a partir de 50 MB y rechaza >100 MB)
// se divide por temas en partes: <id>-parte-1.pdf, <id>-parte-2.pdf…
const PDF_MAX_BYTES = (Number(process.env.APUNTES_PDF_MAX_MB) || 45) * 1024 * 1024;

// Partes publicadas de una asignatura: ['pdf/<id>.pdf'] o ['pdf/<id>-parte-1.pdf', …]
export function pdfsAsignatura(dirSalida, id) {
  const dirPdf = join(dirSalida, 'pdf');
  if (!existsSync(dirPdf)) return [];
  if (existsSync(join(dirPdf, `${id}.pdf`))) return [`pdf/${id}.pdf`];
  const re = new RegExp(`^${id}-parte-(\\d+)\\.pdf$`);
  return readdirSync(dirPdf)
    .map((f) => [f, re.exec(f)])
    .filter(([, m]) => m)
    .sort((x, y) => x[1][1] - y[1][1])
    .map(([f]) => `pdf/${f}`);
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
            srcImagen: (abs) => pathToFileURL(imagenParaPdf(abs)).href,
            buscarNota: () => null, // dentro del PDF los enlaces entre notas no aplican
          };
          const { html } = renderNota(md, readFileSync(n.ruta, 'utf8'), ctx);
          return `<section class="nota-pdf"><h1 class="nota-pdf-titulo">${escaparHtml(n.titulo)}</h1>\n${html}</section>`;
        });

        const temas = (desde, hasta) => (hasta - desde === 1 ? `tema ${hasta}` : `temas ${desde + 1}–${hasta}`);

        // Renderiza las secciones [desde, hasta) en un PDF y devuelve su tamaño
        const renderizar = async (desde, hasta, ruta, parte) => {
          const html = aplicar(plantilla, {
            titulo: a.nombre + (parte ? ` (parte ${parte})` : ''),
            subtitulo: `${ORDINAL_CURSO[v.curso] ?? `Curso ${v.curso}`} · ${nombreCuatri(v.cuatri)} · ` +
              (parte ? `${temas(desde, hasta)} de ${a.notas.length}` : `${a.notas.length} temas`),
            fecha,
            url: config.urlPublica ?? '',
            katexCss,
            cuerpo: cuerpo.slice(desde, hasta).join('\n'),
          });
          const rutaHtml = join(dirTmp, `${id}.html`);
          writeFileSync(rutaHtml, html);
          await pagina.goto(pathToFileURL(rutaHtml).href, { waitUntil: 'networkidle0', timeout: 120000 });
          await imprimir(ruta);
          return statSync(ruta).size;
        };

        const imprimir = (ruta) => pagina.pdf({
          path: ruta,
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

        // Se borra cualquier versión anterior (entera o por partes) antes de generar
        for (const f of pdfsAsignatura(config.rutaSalida, id)) rmSync(join(config.rutaSalida, f));

        const rutaEntera = join(dirPdf, `${id}.pdf`);
        const tamano = await renderizar(0, cuerpo.length, rutaEntera, null);
        if (tamano <= PDF_MAX_BYTES || cuerpo.length < 2) {
          console.log(`  ✓ pdf/${id}.pdf (${a.notas.length} temas, ${(tamano / 1048576).toFixed(1)} MB)`);
          continue;
        }

        // Demasiado grande: repartir los temas en el mínimo nº de partes que quepan
        rmSync(rutaEntera);
        let partes = Math.ceil(tamano / PDF_MAX_BYTES);
        for (;;) {
          const porParte = Math.ceil(cuerpo.length / partes);
          const generadas = [];
          let cabe = true;
          for (let p = 0, desde = 0; desde < cuerpo.length; p++, desde += porParte) {
            const hasta = Math.min(desde + porParte, cuerpo.length);
            const ruta = join(dirPdf, `${id}-parte-${p + 1}.pdf`);
            const t = await renderizar(desde, hasta, ruta, p + 1);
            generadas.push({ ruta, t, desde, hasta });
            if (t > PDF_MAX_BYTES && hasta - desde > 1) cabe = false;
          }
          if (cabe || partes >= cuerpo.length) {
            for (const g of generadas) {
              console.log(`  ✓ pdf/${id}-parte-${generadas.indexOf(g) + 1}.pdf (${temas(g.desde, g.hasta)}, ${(g.t / 1048576).toFixed(1)} MB)`);
            }
            break;
          }
          for (const g of generadas) rmSync(g.ruta);
          partes++;
        }
      }
    }
  } finally {
    await navegador.close();
    rmSync(dirTmp, { recursive: true, force: true });
  }
}
