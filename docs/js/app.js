// Mejora progresiva de ApuntesWeb: tema y ajustes de lectura, paneles laterales
// plegables, buscador Ctrl+K, navegación con teclado, progreso e índice de lectura,
// modo enfoque, retomar lectura y temas leídos.
// El sitio funciona íntegro sin este archivo.
(function () {
  'use strict';
  var rel = document.body.dataset.rel || '';
  var raiz = document.documentElement;
  var esMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

  // En Mac el modificador es ⌘, no Ctrl
  if (esMac) document.querySelectorAll('.tecla-mod').forEach(function (k) { k.textContent = '⌘'; });

  // ---------- Preferencias de lectura (localStorage 'lectura') ----------
  var lectura = {};
  try { lectura = JSON.parse(localStorage.getItem('lectura') || '{}') || {}; } catch (e) {}
  function guardarLectura() {
    try { localStorage.setItem('lectura', JSON.stringify(lectura)); } catch (e) {}
  }

  // ---------- Tema: auto / claro (papel) / sepia / oscuro (noche) ----------
  function ponerTema(valor) {
    if (valor) raiz.dataset.tema = valor; else delete raiz.dataset.tema;
    try { if (valor) localStorage.setItem('tema', valor); else localStorage.removeItem('tema'); } catch (e) {}
    sincronizarAjustes();
  }
  function alternarTema() {
    var oscuroSistema = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var actual = raiz.dataset.tema || (oscuroSistema ? 'oscuro' : 'claro');
    ponerTema(actual === 'oscuro' ? 'claro' : 'oscuro');
  }

  // ---------- Panel de ajustes de lectura ----------
  var ajustes = document.getElementById('ajustes');
  var botonLectura = document.getElementById('boton-lectura');
  function sincronizarAjustes() {
    if (!ajustes) return;
    var valores = {
      tema: raiz.dataset.tema || '',
      letra: lectura.letra || '', medida: lectura.medida || '', interlineado: lectura.interlineado || '',
    };
    Object.keys(valores).forEach(function (k) {
      ajustes.querySelectorAll('input[name="' + k + '"]').forEach(function (r) { r.checked = r.value === valores[k]; });
    });
    document.getElementById('opcion-enfoque').checked = 'enfoque' in raiz.dataset;
    document.getElementById('opcion-atenuar').checked = !!lectura.atenuar;
  }
  function ponerLectura(k, valor) {
    if (valor) { lectura[k] = valor; raiz.dataset[k] = valor; }
    else { delete lectura[k]; delete raiz.dataset[k]; }
    guardarLectura();
  }
  function abrirAjustes() {
    sincronizarAjustes();
    ajustes.hidden = false;
    botonLectura.setAttribute('aria-expanded', 'true');
    var marcado = ajustes.querySelector('input:checked') || ajustes.querySelector('input');
    if (marcado) marcado.focus();
  }
  function cerrarAjustes(devolverFoco) {
    if (!ajustes || ajustes.hidden) return;
    ajustes.hidden = true;
    botonLectura.setAttribute('aria-expanded', 'false');
    if (devolverFoco) botonLectura.focus();
  }
  function alternarAjustes() { if (ajustes.hidden) abrirAjustes(); else cerrarAjustes(true); }
  if (ajustes && botonLectura) {
    botonLectura.hidden = false;
    botonLectura.addEventListener('click', alternarAjustes);
    document.getElementById('ajustes-cerrar').addEventListener('click', function () { cerrarAjustes(true); });
    ajustes.addEventListener('change', function (ev) {
      var el = ev.target;
      if (el.name === 'tema') ponerTema(el.value);
      else if (el.type === 'radio') ponerLectura(el.name, el.value);
      else if (el.id === 'opcion-enfoque') alternarEnfoque(el.checked);
      else if (el.id === 'opcion-atenuar') { ponerLectura('atenuar', el.checked ? '1' : ''); actualizarFoco(); }
    });
    document.getElementById('ajustes-restablecer').addEventListener('click', function () {
      ['letra', 'medida', 'interlineado', 'atenuar'].forEach(function (k) { ponerLectura(k, ''); });
      ponerTema('');
      alternarEnfoque(false);
      actualizarFoco();
    });
    document.getElementById('ajustes-olvidar').addEventListener('click', function () {
      if (!window.confirm('¿Borrar los temas marcados como leídos y las posiciones de lectura guardadas en este navegador?')) return;
      try { localStorage.removeItem('leidos'); localStorage.removeItem('posiciones'); } catch (e) {}
      document.querySelectorAll('a.leida').forEach(function (a) { a.classList.remove('leida'); a.removeAttribute('title'); });
    });
    // Clic fuera del panel lo cierra
    document.addEventListener('click', function (ev) {
      if (!ajustes.hidden && !ajustes.contains(ev.target) && !botonLectura.contains(ev.target)) cerrarAjustes(false);
    });
  }

  // ---------- Modo enfoque: solo el texto ----------
  var salirEnfoque = null;
  function alternarEnfoque(forzar) {
    var activar = typeof forzar === 'boolean' ? forzar : !('enfoque' in raiz.dataset);
    if (activar) raiz.dataset.enfoque = ''; else delete raiz.dataset.enfoque;
    if (activar && !salirEnfoque) {
      salirEnfoque = document.createElement('button');
      salirEnfoque.type = 'button';
      salirEnfoque.className = 'salir-enfoque';
      salirEnfoque.innerHTML = 'Salir del modo enfoque <kbd>f</kbd>';
      salirEnfoque.addEventListener('click', function () { alternarEnfoque(false); });
      document.body.appendChild(salirEnfoque);
    }
    sincronizarAjustes();
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

  // ---------- Paneles laterales: temas (izquierda) e índice (derecha) ----------
  // En pantalla ancha se pliegan y el estado se recuerda; en estrecha se abren
  // como cajones superpuestos al texto.
  var ancho = window.matchMedia('(min-width: 1200px)');
  var velo = document.getElementById('velo-panel');
  var paneles = {
    temas: { panel: document.getElementById('panel-temas'), boton: document.getElementById('boton-temas'), clave: 'sinTemas' },
    indice: { panel: document.getElementById('panel-indice'), boton: document.getElementById('boton-indice'), clave: 'sinIndice' },
  };
  function panelVisible(nombre) {
    var p = paneles[nombre];
    return ancho.matches ? !(p.clave in raiz.dataset) : raiz.dataset.abierto === nombre;
  }
  function sincronizarPaneles() {
    Object.keys(paneles).forEach(function (n) {
      var p = paneles[n];
      if (p.boton) p.boton.setAttribute('aria-expanded', panelVisible(n) ? 'true' : 'false');
    });
    if (velo) velo.hidden = ancho.matches || !raiz.dataset.abierto;
  }
  function cerrarCajon() {
    if (!raiz.dataset.abierto) return;
    var p = paneles[raiz.dataset.abierto];
    delete raiz.dataset.abierto;
    sincronizarPaneles();
    if (p && p.boton) p.boton.focus();
  }
  function alternarPanel(nombre) {
    var p = paneles[nombre];
    if (!p.panel || p.panel.hidden) return;
    if (ancho.matches) {
      if (p.clave in raiz.dataset) delete raiz.dataset[p.clave]; else raiz.dataset[p.clave] = '';
      lectura[p.clave] = p.clave in raiz.dataset ? 1 : undefined;
      guardarLectura();
    } else if (raiz.dataset.abierto === nombre) {
      cerrarCajon();
      return;
    } else {
      raiz.dataset.abierto = nombre;
      var enlace = p.panel.querySelector('a.activo, .actual, a');
      if (enlace) enlace.focus({ preventScroll: true });
    }
    sincronizarPaneles();
  }
  Object.keys(paneles).forEach(function (n) {
    var p = paneles[n];
    if (!p.panel || !p.boton) return;
    p.boton.addEventListener('click', function () { alternarPanel(n); });
    // Cierre visible para el modo cajón (solo se ve en pantallas estrechas)
    var cerrarBtn = document.createElement('button');
    cerrarBtn.type = 'button';
    cerrarBtn.className = 'cerrar-cajon';
    cerrarBtn.setAttribute('aria-label', 'Cerrar panel');
    cerrarBtn.textContent = '×';
    cerrarBtn.addEventListener('click', cerrarCajon);
    p.panel.querySelector('.lateral-interior').prepend(cerrarBtn);
    p.panel.addEventListener('click', function (ev) {
      if (!ancho.matches && ev.target.closest('a')) cerrarCajon();
    });
  });
  if (velo) velo.addEventListener('click', cerrarCajon);
  ancho.addEventListener('change', function () { delete raiz.dataset.abierto; sincronizarPaneles(); });
  if (paneles.temas.panel && paneles.temas.boton) paneles.temas.boton.hidden = false;

  // ---------- Índice del tema, progreso y apartados ----------
  var prosa = document.querySelector('.nota .prosa');
  var apartados = [];
  var minutosTotales = +((document.querySelector('[data-minutos]') || {}).dataset || {}).minutos || 0;
  if (prosa) {
    var usados = {};
    apartados = Array.prototype.slice.call(prosa.querySelectorAll('h1, h2, h3'));
    // Nivel más alto presente: las notas usan # o ## para los apartados principales
    var nivelBase = Math.min.apply(null, apartados.map(function (h) { return +h.tagName[1]; }).concat(3));
    apartados.forEach(function (h) {
      if (!h.id) {
        var base = normalizar(h.textContent).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'apartado';
        var id = base, n = 2;
        while (usados[id] || document.getElementById(id)) id = base + '-' + n++;
        usados[id] = true;
        h.id = id;
      }
      // Numeración del apartado ("3.1") colgada en el margen, como en un libro
      var primero = h.firstChild;
      if (primero && primero.nodeType === 3) {
        var m = /^\s*(\d+(?:\.\d+)*\.?)\s+/.exec(primero.nodeValue);
        if (m) {
          var num = document.createElement('span');
          num.className = 'num-apartado';
          num.textContent = m[1].replace(/\.$/, '');
          primero.nodeValue = primero.nodeValue.slice(m[0].length);
          h.insertBefore(num, primero);
          h.classList.add('con-numero');
        }
      }
    });

    // Índice "En este tema" en el panel derecho, con el apartado visible resaltado
    var panelIndice = paneles.indice.panel;
    var enlacesToc = [];
    var restante = null;
    if (panelIndice && apartados.length > 1) {
      var toc = document.createElement('nav');
      toc.className = 'toc';
      toc.setAttribute('aria-label', 'En este tema');
      toc.innerHTML = '<p class="lateral-titulo">En este tema</p><p class="toc-restante" aria-live="off"></p>';
      restante = toc.querySelector('.toc-restante');
      var ol = document.createElement('ol');
      apartados.forEach(function (h) {
        var li = document.createElement('li');
        var nivel = +h.tagName[1] - nivelBase;
        if (nivel > 0) li.className = 'toc-n' + Math.min(nivel, 2);
        var a = document.createElement('a');
        a.href = '#' + h.id;
        var num = h.querySelector('.num-apartado');
        if (num) {
          var sn = document.createElement('span');
          sn.className = 'toc-num';
          sn.textContent = num.textContent;
          a.appendChild(sn);
        }
        a.appendChild(document.createTextNode(num ? h.textContent.slice(num.textContent.length) : h.textContent));
        li.appendChild(a);
        ol.appendChild(li);
        enlacesToc.push(a);
      });
      toc.appendChild(ol);
      panelIndice.querySelector('.lateral-interior').appendChild(toc);
      panelIndice.hidden = false;
      if (paneles.indice.boton) paneles.indice.boton.hidden = false;
    }
    sincronizarPaneles();

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
      if (restante && minutosTotales) {
        var min = Math.ceil(minutosTotales * (1 - p));
        restante.textContent = p > 0.97 ? 'Terminado' : 'Quedan ≈ ' + min + ' min · ' + Math.round(p * 100) + ' %';
      }
      if (enlacesToc.length) {
        var activo = 0;
        for (var i = 0; i < apartados.length; i++) {
          if (apartados[i].getBoundingClientRect().top < 120) activo = i;
        }
        enlacesToc.forEach(function (a, i) {
          var es = i === activo;
          a.classList.toggle('activo', es);
          if (es) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
        });
      }
      actualizarFoco();
    };
    window.addEventListener('scroll', function () {
      guardarPosicion();
      if (!pendiente) { pendiente = true; requestAnimationFrame(actualizar); }
    }, { passive: true });
    actualizar();
  } else {
    sincronizarPaneles();
  }

  // ---------- Atenuar lo que no se está leyendo ----------
  // Resalta el bloque de la prosa que cruza el 40 % superior de la ventana.
  var bloqueFoco = null;
  function actualizarFoco() {
    if (!prosa) return;
    if (!lectura.atenuar) {
      if (bloqueFoco) { bloqueFoco.classList.remove('en-foco'); bloqueFoco = null; }
      return;
    }
    var y = window.innerHeight * 0.4, elegido = null;
    for (var i = 0; i < prosa.children.length; i++) {
      var c = prosa.children[i].getBoundingClientRect();
      if (c.bottom >= y) { elegido = prosa.children[i]; break; }
    }
    if (elegido !== bloqueFoco) {
      if (bloqueFoco) bloqueFoco.classList.remove('en-foco');
      if (elegido) elegido.classList.add('en-foco');
      bloqueFoco = elegido;
    }
  }

  // ---------- Seguir donde lo dejé (posición por tema, solo en este navegador) ----------
  var posiciones = {};
  try { posiciones = JSON.parse(localStorage.getItem('posiciones') || '{}') || {}; } catch (e) {}
  var temporizadorPos = null;
  function fraccionScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? window.scrollY / max : 0;
  }
  function guardarPosicion() {
    if (!prosa) return;
    clearTimeout(temporizadorPos);
    temporizadorPos = setTimeout(function () {
      var f = fraccionScroll();
      if (f > 0.97 || f < 0.03) delete posiciones[location.pathname];
      else posiciones[location.pathname] = { f: +f.toFixed(4), t: Date.now() };
      try { localStorage.setItem('posiciones', JSON.stringify(posiciones)); } catch (e) {}
    }, 500);
  }
  var guardada = posiciones[location.pathname];
  var aviso = document.getElementById('aviso-retomar');
  if (prosa && guardada && !location.hash && aviso && window.scrollY < 50) {
    document.getElementById('aviso-texto').textContent = 'Lo dejaste al ' + Math.round(guardada.f * 100) + ' %.';
    aviso.hidden = false;
    var cerrarAviso = function () { aviso.hidden = true; };
    document.getElementById('aviso-si').addEventListener('click', function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: guardada.f * max, behavior: 'auto' });
      cerrarAviso();
    });
    document.getElementById('aviso-no').addEventListener('click', cerrarAviso);
    setTimeout(function () { if (window.scrollY > 200) cerrarAviso(); }, 0);
    window.addEventListener('scroll', function oculta() {
      if (window.scrollY > window.innerHeight) { cerrarAviso(); window.removeEventListener('scroll', oculta); }
    }, { passive: true });
  }

  // ---------- Volver arriba ----------
  var arriba = document.getElementById('arriba');
  if (arriba) {
    var mostrarArriba = function () { arriba.hidden = window.scrollY < window.innerHeight * 1.5; };
    window.addEventListener('scroll', mostrarArriba, { passive: true });
    mostrarArriba();
  }

  // ---------- Anotaciones por párrafo (erratas → GitHub Issues) ----------
  // Cada bloque recibe un id estable (hash de su texto) y un botón al margen que
  // abre un Issue prellenado. Los Issues abiertos que citan un bloque se marcan
  // a su lado. El ancla va en un comentario HTML del cuerpo del Issue.
  var REPO = 'adrianql5/ApuntesWeb';
  if (prosa) {
    var hashTexto = function (s) {
      var h = 0x811c9dc5;
      for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
      return (h >>> 0).toString(36);
    };
    var tipos = 'p, li, blockquote';
    var bloques = Array.prototype.filter.call(prosa.querySelectorAll(tipos), function (b) {
      return !b.parentElement.closest(tipos) && b.textContent.trim().length > 20;
    });
    var porId = {};
    bloques.forEach(function (b) {
      var base = 'p-' + hashTexto(b.textContent.replace(/\s+/g, ' ').trim());
      var id = base, n = 2;
      while (porId[id]) id = base + '-' + n++;
      porId[id] = b;
      if (!b.id) b.id = id;
      b.dataset.ancla = id;
      b.classList.add('anotable');

      var boton = document.createElement('button');
      boton.type = 'button';
      boton.className = 'anotar';
      boton.setAttribute('aria-label', 'Avisar de un error en este párrafo (abre GitHub)');
      boton.title = 'Avisar de un error en este párrafo · abre GitHub, necesitas cuenta';
      boton.textContent = '✎';
      boton.addEventListener('click', function () { window.open(urlIssue(b, id), '_blank', 'noopener'); });
      b.appendChild(boton);
    });

    var urlIssue = function (b, id) {
      var titulo = (document.querySelector('.nota h1') || document).textContent.trim();
      var copia = b.cloneNode(true);
      copia.querySelectorAll('.anotar, .anotacion').forEach(function (e) { e.remove(); });
      var cita = copia.textContent.replace(/\s+/g, ' ').trim();
      if (cita.length > 400) cita = cita.slice(0, 400) + '…';
      var enlace = location.origin + location.pathname + '#' + id;
      var cuerpo = '**Tema:** ' + titulo + '\n**Párrafo:** ' + enlace + '\n\n> ' + cita +
        '\n\n**Comentario:**\n\n\n<!-- No borres esta línea: ancla=' + location.pathname + '#' + id + ' -->\n';
      return 'https://github.com/' + REPO + '/issues/new?template=errata.md' +
        '&title=' + encodeURIComponent('[Errata] ' + titulo) +
        '&body=' + encodeURIComponent(cuerpo);
    };

    // Saltar al párrafo si se llega con #p-… (los ids se crean después de cargar)
    if (location.hash && porId[location.hash.slice(1)]) {
      var destino = porId[location.hash.slice(1)];
      destino.scrollIntoView();
      destino.classList.add('anotable-destacado');
    }

    // Marcar los bloques con Issues abiertos (caché de 10 min por pestaña: la API
    // sin autenticar permite 60 peticiones/hora por IP)
    var pintarAnotaciones = function (issues) {
      issues.forEach(function (is) {
        var m = /ancla=([^#\s]+)#(p-[a-z0-9-]+)/.exec(is.body || '');
        if (!m || m[1] !== location.pathname || !porId[m[2]]) return;
        var b = porId[m[2]];
        var marca = b.querySelector('.anotacion');
        if (!marca) {
          marca = document.createElement('a');
          marca.className = 'anotacion';
          marca.target = '_blank';
          marca.rel = 'noopener';
          marca.dataset.n = 0;
          marca.dataset.titulos = '';
          b.classList.add('con-anotacion');
          b.appendChild(marca);
        }
        var n = +marca.dataset.n + 1;
        marca.dataset.n = n;
        marca.dataset.titulos += (marca.dataset.titulos ? '\n' : '') + '#' + is.number + ' ' + is.title;
        marca.textContent = n;
        marca.title = n + (n > 1 ? ' anotaciones abiertas' : ' anotación abierta') + ':\n' + marca.dataset.titulos;
        marca.href = n > 1
          ? 'https://github.com/' + REPO + '/issues?q=' + encodeURIComponent('is:issue is:open "' + m[2] + '"')
          : is.html_url;
      });
    };
    var cacheado = null;
    try { cacheado = JSON.parse(sessionStorage.getItem('anotaciones') || 'null'); } catch (e) {}
    if (cacheado && Date.now() - cacheado.t < 600000) {
      pintarAnotaciones(cacheado.issues);
    } else if (window.fetch) {
      fetch('https://api.github.com/repos/' + REPO + '/issues?state=open&per_page=100')
        .then(function (r) { return r.ok ? r.json() : []; })
        .then(function (datos) {
          var issues = datos
            .filter(function (is) { return !is.pull_request && /ancla=/.test(is.body || ''); })
            .map(function (is) { return { number: is.number, title: is.title, body: is.body, html_url: is.html_url }; });
          try { sessionStorage.setItem('anotaciones', JSON.stringify({ t: Date.now(), issues: issues })); } catch (e) {}
          pintarAnotaciones(issues);
        })
        .catch(function () {});
    }
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
    if (ev.key === 'Escape') {
      if (ajustes && !ajustes.hidden) { cerrarAjustes(true); return; }
      if (raiz.dataset.abierto) { cerrarCajon(); return; }
      if ('enfoque' in raiz.dataset) { alternarEnfoque(false); return; }
    }
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
    } else if (ev.key === '[') {
      alternarPanel('temas');
    } else if (ev.key === ']') {
      alternarPanel('indice');
    } else if (ev.key === 'f' && prosa) {
      alternarEnfoque();
    } else if (ev.key === 'a' && ajustes) {
      alternarAjustes();
    } else if (ev.key === '?' && puedeDialogo) {
      dialogoAtajos.showModal();
    }
  });
})();
