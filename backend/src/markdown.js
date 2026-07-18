import { existsSync } from 'node:fs';
import { join, basename } from 'node:path';
import MarkdownIt from 'markdown-it';
import texmath from 'markdown-it-texmath';
import katex from 'katex';
import { esImagen, resolverImagen } from './scanner.js';

// ---------------------------------------------------------------------------
// Callouts de Obsidian: >[!Tipo] Título  →  <div class="callout callout-tipo">
// ---------------------------------------------------------------------------
const RE_CALLOUT = /^\[!([a-zA-ZÁÉÍÓÚáéíóúñÑ-]+)\][+-]?[ \t]*([^\n]*)(\n|$)/;

function pluginCallouts(md) {
  md.core.ruler.after('block', 'obsidian_callouts', (state) => {
    const tokens = state.tokens;
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type !== 'blockquote_open') continue;

      // Primer token inline dentro del blockquote (típicamente i+2 tras paragraph_open)
      let idxInline = -1;
      let nivel = 0;
      let idxCierre = -1;
      for (let j = i; j < tokens.length; j++) {
        if (tokens[j].type === 'blockquote_open') nivel++;
        else if (tokens[j].type === 'blockquote_close' && --nivel === 0) { idxCierre = j; break; }
        if (idxInline === -1 && tokens[j].type === 'inline') idxInline = j;
      }
      if (idxInline === -1 || idxCierre === -1) continue;

      const inline = tokens[idxInline];
      const m = inline.content.match(RE_CALLOUT);
      if (!m) continue;

      const tipo = m[1].toLowerCase();
      const titulo = m[2].trim() || m[1];

      tokens[i].tag = 'div';
      tokens[i].attrSet('class', `callout callout-${tipo}`);
      tokens[idxCierre].tag = 'div';

      inline.content = inline.content.replace(RE_CALLOUT, '');

      const tituloTok = new state.Token('html_block', '', 0);
      tituloTok.content = `<p class="callout-titulo">${md.utils.escapeHtml(titulo)}</p>\n`;

      if (inline.content.trim() === '') {
        // El blockquote solo tenía el marcador: quita el párrafo vacío entero
        tokens.splice(i + 1, 3, tituloTok);
      } else {
        tokens.splice(i + 1, 0, tituloTok);
      }
    }
  });
}

// ---------------------------------------------------------------------------
// Embeds y wikilinks de Obsidian (pre-transform sobre el texto fuente)
// ---------------------------------------------------------------------------
const RE_EMBED = /!\[\[([^\]|]+?)(\|[^\]]*)?\]\]/g;
const RE_WIKILINK = /(?<!!)\[\[([^\]|]+?)(\|([^\]]*))?\]\]/g;

function atributosTamano(hint) {
  // Hints de Obsidian: |697 → width; |700x427 → width×height; puede haber varios (|697|700x427)
  if (!hint) return '';
  for (const parte of hint.split('|').reverse()) {
    const m = parte.trim().match(/^(\d+)(?:x(\d+))?$/);
    if (m) return m[2] ? ` width="${m[1]}" height="${m[2]}"` : ` width="${m[1]}"`;
  }
  return '';
}

function preTransformar(texto, ctx) {
  // 1) Embeds ![[...]]
  let salida = texto.replace(RE_EMBED, (todo, objetivo, hintRaw) => {
    objetivo = objetivo.trim();
    const hint = hintRaw ? hintRaw.slice(1) : null;
    if (esImagen(objetivo)) {
      const abs = resolverImagen(objetivo, ctx.asignatura, ctx.vault);
      if (!abs) {
        ctx.sinResolver.push(objetivo);
        return `<span class="imagen-rota">[imagen no encontrada: ${objetivo}]</span>`;
      }
      const alt = objetivo.replace(/"/g, '&quot;');
      return `<img src="${ctx.srcImagen(abs)}" alt="${alt}" loading="lazy"${atributosTamano(hint)}>`;
    }
    // Transclusión de nota: enlaza si existe en la asignatura, si no texto plano
    const nota = ctx.buscarNota?.(objetivo);
    return nota ? `[${objetivo}](${nota.slug}.html)` : objetivo;
  });

  // 2) Wikilinks [[Nota]] / [[Nota|alias]]
  salida = salida.replace(RE_WIKILINK, (todo, objetivo, _g2, alias) => {
    objetivo = objetivo.trim();
    const visible = (alias ?? objetivo).trim();
    const nota = ctx.buscarNota?.(objetivo);
    return nota ? `[${visible}](${nota.slug}.html)` : visible;
  });

  return salida;
}

// ---------------------------------------------------------------------------
// Imágenes markdown estándar ![](ruta/relativa.jpeg): reescribe el src contra
// la carpeta de la nota o, en su defecto, el índice de imágenes de la bóveda.
// (Las notas de SISTEMAS OPERATIVOS usan esta sintaxis en vez de wikilinks.)
// ---------------------------------------------------------------------------
function pluginImagenesRelativas(md) {
  const porDefecto = md.renderer.rules.image ??
    ((tokens, idx, opciones, env, self) => self.renderToken(tokens, idx, opciones));
  md.renderer.rules.image = (tokens, idx, opciones, env, self) => {
    const ctx = env?.ctx;
    const token = tokens[idx];
    const src = token.attrGet('src');
    if (ctx && src && !/^([a-z][a-z0-9+.-]*:|\/)/i.test(src)) {
      const limpio = decodeURIComponent(src);
      let abs = ctx.dirBase && existsSync(join(ctx.dirBase, limpio)) ? join(ctx.dirBase, limpio) : null;
      abs ??= resolverImagen(basename(limpio), ctx.asignatura, ctx.vault);
      if (abs) {
        token.attrSet('src', ctx.srcImagen(abs));
        token.attrSet('loading', 'lazy');
      } else {
        ctx.sinResolver.push(limpio);
      }
    }
    return porDefecto(tokens, idx, opciones, env, self);
  };
}

// ---------------------------------------------------------------------------
// Renderer
// ---------------------------------------------------------------------------
export function crearMarkdown() {
  const md = new MarkdownIt({ html: true, linkify: true, typographer: false });
  md.use(texmath, {
    engine: katex,
    delimiters: 'dollars',
    katexOptions: { throwOnError: false, strict: false, output: 'html' },
  });
  md.use(pluginCallouts);
  md.use(pluginImagenesRelativas);
  return md;
}

/**
 * Renderiza una nota Obsidian a HTML.
 * ctx: {
 *   asignatura, vault,            — modelo del scanner (para resolver imágenes)
 *   dirBase,                      — carpeta de la nota (resolución de rutas relativas)
 *   srcImagen(abs) → src          — convierte la ruta absoluta en el src final del <img>
 *                                    (web: registra la copia y devuelve '{rel}img/…';
 *                                     pdf: devuelve una URL file://)
 *   buscarNota(nombre) → nota|null — nota de la misma asignatura por nombre de archivo
 * }
 */
export function renderNota(md, texto, ctx) {
  ctx.sinResolver = [];
  const html = md.render(preTransformar(texto, ctx), { ctx });
  return { html, sinResolver: ctx.sinResolver };
}
