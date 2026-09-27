// Mejora progresiva de ApuntesWeb: tema claro/oscuro, buscador Ctrl+K, navegación
// con teclado, progreso e índice de lectura y temas leídos.
// El sitio funciona íntegro sin este archivo.
(function () {
  'use strict';
  var rel = document.body.dataset.rel || '';

  // ---------- Tema claro/oscuro ----------
  var botonTema = document.getElementById('boton-tema');
  function alternarTema() {
    var raiz = document.documentElement;
    var oscuroSistema = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var actual = raiz.dataset.tema || (oscuroSistema ? 'oscuro' : 'claro');
    var nuevo = actual === 'oscuro' ? 'claro' : 'oscuro';
    raiz.dataset.tema = nuevo;
    try { localStorage.setItem('tema', nuevo); } catch (e) {}
  }
  if (botonTema) botonTema.addEventListener('click', alternarTema);

  // ---------- Buscador (paleta Ctrl+K) ----------
  var fondo = document.getElementById('paleta-fondo');
  var entrada = document.getElementById('paleta-entrada');
  var lista = document.getElementById('paleta-resultados');
  var botonBuscar = document.getElementById('boton-buscar');
  var indice = null;
  var seleccion = 0;
  var resultados = [];

  function normalizar(s) {
    return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }

  function cargarIndice() {
    if (indice) return Promise.resolve(indice);
    return fetch(rel + 'buscador.json')
      .then(function (r) { return r.json(); })
      .then(function (datos) {
        datos.forEach(function (e) {
          e.tn = normalizar(e.t);
          e.an = normalizar(e.a || '');
          e.hn = (e.h || []).map(normalizar);
        });
        indice = datos;
        return indice;
      });
  }

  // Puntuación: todos los términos deben aparecer; título > asignatura > apartados.
  // Bonus por coincidencia al principio de palabra.
  function puntuar(e, terminos) {
    var total = 0;
    for (var i = 0; i < terminos.length; i++) {
      var t = terminos[i];
      var p = 0;
      if (e.tn.indexOf(t) >= 0) p = e.tn.indexOf(' ' + t) >= 0 || e.tn.lastIndexOf(t, 0) === 0 ? 6 : 4;
      else if (e.an.indexOf(t) >= 0) p = 3;
      else {
        for (var j = 0; j < e.hn.length; j++) {
          if (e.hn[j].indexOf(t) >= 0) { p = 2; e.apartado = e.h[j]; break; }
        }
      }
      if (!p) return 0;
      total += p;
    }
    return total;
  }

  function buscar(consulta) {
    var terminos = normalizar(consulta).split(/\s+/).filter(Boolean);
    if (!terminos.length) return [];
    return indice
      .map(function (e) { e.apartado = null; return { e: e, p: puntuar(e, terminos) }; })
      .filter(function (r) { return r.p > 0; })
      .sort(function (a, b) { return b.p - a.p; })
      .slice(0, 12);
  }

  function pintar() {
    lista.innerHTML = '';
    if (!entrada.value.trim()) {
      lista.innerHTML = '<p class="paleta-ayuda">Escribe para buscar entre todos los temas y asignaturas.</p>';
      return;
    }
    if (!resultados.length) {
      lista.innerHTML = '<p class="paleta-vacia">Nada por aquí. Prueba con otra palabra (sin miedo a las tildes).</p>';
      return;
    }
    resultados.forEach(function (r, i) {
      var li = document.createElement('li');
      if (i === seleccion) li.className = 'sel';
      var a = document.createElement('a');
      a.href = rel + r.e.u;
      var titulo = document.createElement('span');
      titulo.className = 'res-titulo';
      titulo.textContent = r.e.t;
      var contexto = document.createElement('span');
      contexto.className = 'res-contexto';
      contexto.textContent = r.e.c + (r.e.apartado ? ' › ' + r.e.apartado : '');
      a.appendChild(titulo);
      a.appendChild(contexto);
      li.appendChild(a);
      lista.appendChild(li);
    });
  }

  function abrir() {
    fondo.hidden = false;
    entrada.value = '';
    resultados = [];
    seleccion = 0;
    pintar();
    entrada.focus();
    cargarIndice().then(function () { pintar(); });
  }
  function cerrar() {
    fondo.hidden = true;
    if (botonBuscar) botonBuscar.focus();
  }

  if (botonBuscar) botonBuscar.addEventListener('click', abrir);
  if (fondo) {
    fondo.addEventListener('click', function (ev) { if (ev.target === fondo) cerrar(); });
    entrada.addEventListener('input', function () {
      if (!indice) return;
      seleccion = 0;
      resultados = buscar(entrada.value);
      pintar();
    });
    entrada.addEventListener('keydown', function (ev) {
      if (ev.key === 'ArrowDown') { ev.preventDefault(); seleccion = Math.min(seleccion + 1, resultados.length - 1); pintar(); }
      else if (ev.key === 'ArrowUp') { ev.preventDefault(); seleccion = Math.max(seleccion - 1, 0); pintar(); }
      else if (ev.key === 'Enter' && resultados[seleccion]) {
        window.location.href = rel + resultados[seleccion].e.u;
      }
    });
  }

  // ---------- Ayuda de atajos (?) ----------
  var dialogoAtajos = document.getElementById('atajos');
  var botonAtajos = document.getElementById('boton-atajos');
  var puedeDialogo = dialogoAtajos && typeof dialogoAtajos.showModal === 'function';
  if (puedeDialogo && botonAtajos) {
    botonAtajos.hidden = false;
    botonAtajos.addEventListener('click', function () { dialogoAtajos.showModal(); });
  }

  // ---------- Temas leídos (solo en este navegador) ----------
  var leidos = {};
  try { leidos = JSON.parse(localStorage.getItem('leidos') || '{}') || {}; } catch (e) {}
  function marcarLeida() {
    var ruta = location.pathname;
    if (leidos[ruta]) return;
    leidos[ruta] = 1;
    try { localStorage.setItem('leidos', JSON.stringify(leidos)); } catch (e) {}
  }
  document.querySelectorAll('.lista-notas a, .lateral ol a, .indice-movil a').forEach(function (a) {
    if (leidos[a.pathname]) {
      a.classList.add('leida');
      a.setAttribute('title', 'Ya leído');
    }
  });

  // ---------- Índice del tema, progreso y apartados ----------
  var prosa = document.querySelector('.nota .prosa');
  var apartados = [];
  if (prosa) {
    var usados = {};
    apartados = Array.prototype.slice.call(prosa.querySelectorAll('h2, h3'));
    apartados.forEach(function (h) {
      if (h.id) return;
      var base = normalizar(h.textContent).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'apartado';
      var id = base, n = 2;
      while (usados[id] || document.getElementById(id)) id = base + '-' + n++;
      usados[id] = true;
      h.id = id;
    });

    // Índice "En este tema" en el rail lateral, con el apartado visible resaltado
    var rail = document.querySelector('.lateral-interior');
    var enlacesToc = [];
    if (rail && apartados.length > 1) {
      var toc = document.createElement('nav');
      toc.className = 'toc';
      toc.setAttribute('aria-label', 'En este tema');
      toc.innerHTML = '<p class="lateral-titulo">En este tema</p>';
      var ol = document.createElement('ol');
      apartados.forEach(function (h) {
        var li = document.createElement('li');
        if (h.tagName === 'H3') li.className = 'toc-h3';
        var a = document.createElement('a');
        a.href = '#' + h.id;
        a.textContent = h.textContent;
        li.appendChild(a);
        ol.appendChild(li);
        enlacesToc.push(a);
      });
      toc.appendChild(ol);
      rail.appendChild(toc);
    }

    var barra = document.getElementById('progreso');
    if (barra) barra.hidden = false;
    var pendiente = false;
    var actualizar = function () {
      pendiente = false;
      var caja = prosa.getBoundingClientRect();
      var recorrido = caja.height - window.innerHeight * 0.6;
      var p = Math.min(1, Math.max(0, -caja.top / Math.max(1, recorrido)));
      if (barra) barra.style.transform = 'scaleX(' + p + ')';
      if (p > 0.9) marcarLeida();
      if (enlacesToc.length) {
        var activo = 0;
        for (var i = 0; i < apartados.length; i++) {
          if (apartados[i].getBoundingClientRect().top < 120) activo = i;
        }
        enlacesToc.forEach(function (a, i) { a.classList.toggle('activo', i === activo); });
      }
    };
    window.addEventListener('scroll', function () {
      if (!pendiente) { pendiente = true; requestAnimationFrame(actualizar); }
    }, { passive: true });
    actualizar();
  }

  function saltarApartado(dir) {
    if (!apartados.length) return;
    var i;
    if (dir > 0) {
      for (i = 0; i < apartados.length; i++) if (apartados[i].getBoundingClientRect().top > 90) break;
    } else {
      for (i = apartados.length - 1; i >= 0; i--) if (apartados[i].getBoundingClientRect().top < -10) break;
    }
    if (apartados[i]) apartados[i].scrollIntoView();
  }

  // ---------- Atajos globales ----------
  document.addEventListener('keydown', function (ev) {
    if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'k') {
      ev.preventDefault();
      if (fondo.hidden) abrir(); else cerrar();
      return;
    }
    if (ev.key === 'Escape' && !fondo.hidden) { cerrar(); return; }
    // El resto, solo con la paleta cerrada, sin modificadores y sin foco en campos
    if (!fondo.hidden || ev.ctrlKey || ev.metaKey || ev.altKey) return;
    if (/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    if (dialogoAtajos && dialogoAtajos.open) return;
    if (ev.key === 'ArrowLeft') {
      var ant = document.querySelector('.nota-nav .nav-anterior');
      if (ant) window.location.href = ant.getAttribute('href');
    } else if (ev.key === 'ArrowRight') {
      var sig = document.querySelector('.nota-nav .nav-siguiente');
      if (sig) window.location.href = sig.getAttribute('href');
    } else if (ev.key === 'j') {
      saltarApartado(1);
    } else if (ev.key === 'k') {
      saltarApartado(-1);
    } else if (ev.key === 't') {
      alternarTema();
    } else if (ev.key === '?' && puedeDialogo) {
      dialogoAtajos.showModal();
    }
  });
})();
