// Mejora progresiva de ApuntesWeb: tema claro/oscuro, buscador Ctrl+K y
// navegación con flechas. El sitio funciona íntegro sin este archivo.
(function () {
  'use strict';
  var rel = document.body.dataset.rel || '';

  // ---------- Tema claro/oscuro ----------
  var botonTema = document.getElementById('boton-tema');
  if (botonTema) {
    botonTema.addEventListener('click', function () {
      var raiz = document.documentElement;
      var oscuroSistema = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var actual = raiz.dataset.tema || (oscuroSistema ? 'oscuro' : 'claro');
      var nuevo = actual === 'oscuro' ? 'claro' : 'oscuro';
      raiz.dataset.tema = nuevo;
      try { localStorage.setItem('tema', nuevo); } catch (e) {}
    });
  }

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

  // ---------- Atajos globales ----------
  document.addEventListener('keydown', function (ev) {
    if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === 'k') {
      ev.preventDefault();
      if (fondo.hidden) abrir(); else cerrar();
      return;
    }
    if (ev.key === 'Escape' && !fondo.hidden) { cerrar(); return; }
    // ← → entre temas de la asignatura (solo con la paleta cerrada y sin foco en inputs)
    if (!fondo.hidden || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
    if (ev.key === 'ArrowLeft') {
      var ant = document.querySelector('.nota-nav .nav-anterior');
      if (ant) window.location.href = ant.getAttribute('href');
    } else if (ev.key === 'ArrowRight') {
      var sig = document.querySelector('.nota-nav .nav-siguiente');
      if (sig) window.location.href = sig.getAttribute('href');
    }
  });
})();
