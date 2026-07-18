// Mejora progresiva: alternador de tema claro/oscuro con memoria en localStorage.
(function () {
  var boton = document.getElementById('boton-tema');
  if (!boton) return;
  boton.addEventListener('click', function () {
    var raiz = document.documentElement;
    var oscuroSistema = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var actual = raiz.dataset.tema || (oscuroSistema ? 'oscuro' : 'claro');
    var nuevo = actual === 'oscuro' ? 'claro' : 'oscuro';
    raiz.dataset.tema = nuevo;
    try { localStorage.setItem('tema', nuevo); } catch (e) {}
  });
})();
