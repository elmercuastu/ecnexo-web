// Café Andino — demo de Ecnexo Digital
// Cambia aquí el número de WhatsApp: código de país + número, sin "+", sin espacios y sin el 0 inicial.
// Ejemplo Ecuador: 099 123 4567 → "593991234567"
var CONFIG = { whatsapp: "593998666707" };

(function () {
  var doc = document.documentElement;
  var reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Enlaces de WhatsApp con mensaje prellenado
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(a.getAttribute("data-wa"));
  });

  // Cabecera con borde al bajar
  var cab = document.getElementById("cabecera");
  var borde = function () { cab.classList.toggle("con-borde", window.scrollY > 10); };
  window.addEventListener("scroll", borde, { passive: true });
  borde();

  if (reducido || !("IntersectionObserver" in window)) return;
  doc.classList.add("js");
  requestAnimationFrame(function () { requestAnimationFrame(function () { doc.classList.add("listo"); }); });

  // Aparición escalonada
  var grupos = new Map();
  var elementos = document.querySelectorAll(".revela");
  elementos.forEach(function (el) {
    var padre = el.parentElement, i = grupos.get(padre) || 0;
    el.style.setProperty("--retraso", Math.min(i * 90, 450) + "ms");
    grupos.set(padre, i + 1);
  });
  var io = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("visible");
      io.unobserve(e.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
  elementos.forEach(function (el) { io.observe(el); });

})();
