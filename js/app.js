/* =========================================================
   PLANTILLA "ESTUDIO OSCURO" — interacciones
   Para reutilizar: cambia CONFIG y los textos del HTML.
   ========================================================= */
const CONFIG = {
  // Número de WhatsApp: código de país + número, sin "+", sin espacios y sin el 0 inicial.
  // Ejemplo Ecuador: 099 123 4567 → "593991234567"
  whatsapp: "593998666707",
  marca: "Ecnexo Digital",
};

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const waLink = (txt) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(txt)}`;

/* ---------- WhatsApp ---------- */
$$("[data-wa]").forEach((a) => {
  a.href = waLink(a.dataset.wa);
  a.target = "_blank";
  a.rel = "noopener";
});
const shown = $("#waShown");
if (shown) shown.textContent = "+" + CONFIG.whatsapp.replace(/^(\d{3})(\d{2})(\d{3})(\d+)$/, "$1 $2 $3 $4");
// El globo "¿Hablamos?" aparece solo una vez a los 6 segundos
setTimeout(() => {
  const wa = $(".wa");
  wa?.classList.add("tip-show");
  setTimeout(() => wa?.classList.remove("tip-show"), 3500);
}, 6000);

/* ---------- Títulos palabra por palabra ---------- */
$$(".split").forEach((el) => {
  let i = 0;
  const wrap = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) return frag.append(" ");
          const w = document.createElement("span");
          w.className = "w";
          w.innerHTML = `<span style="--i:${i++}">${part}</span>`;
          frag.append(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) wrap(n);
    });
  };
  wrap(el);
});

/* ---------- Aparición al hacer scroll (desvanecido + difuminado) ---------- */
$$("[data-delay]").forEach((el) => el.style.setProperty("--d", el.dataset.delay + "ms"));
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.classList.add("is-in");
    io.unobserve(el);
    // Al terminar la entrada se libera el retraso: el hover vuelve a responder al instante
    if (!el.hasAttribute("data-reveal")) return;
    let done = false;
    const settle = () => { if (!done) { done = true; el.classList.add("is-settled"); } };
    el.addEventListener("transitionend", (ev) => ev.target === el && ev.propertyName === "opacity" && settle());
    setTimeout(settle, (+el.dataset.delay || 0) + 1000);
  }),
  { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
);
$$("[data-reveal], .split").forEach((el) => io.observe(el));

/* ---------- Nav: se oculta al bajar, aparece al subir + barra de progreso ---------- */
const nav = $("#nav");
const bar = $(".progress");
let lastY = 0;
const onScroll = () => {
  const y = scrollY;
  nav.classList.toggle("is-solid", y > 30);
  nav.classList.toggle("is-hidden", y > 400 && y > lastY && !nav.classList.contains("is-open"));
  lastY = y;
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  timelineProgress();
};
addEventListener("scroll", onScroll, { passive: true });

const burger = $("#burger");
burger.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", open);
});
$$("#navLinks a").forEach((a) => a.addEventListener("click", () => {
  nav.classList.remove("is-open");
  burger.setAttribute("aria-expanded", "false");
}));

/* ---------- Efectos solo con ratón ---------- */
if (finePointer && !reduced) {

  /* Botones magnéticos: se acercan al puntero */
  $$(".magnetic").forEach((b) => {
    b.addEventListener("mousemove", (e) => {
      const r = b.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      b.style.transition = "transform .15s cubic-bezier(.23,1,.32,1)";
      b.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
    });
    b.addEventListener("mouseleave", () => {
      b.style.transition = "transform .5s cubic-bezier(.34,1.3,.64,1)";   // vuelve con un rebote suave
      b.style.transform = "";
    });
  });

  /* Luz del hero que sigue al mouse */
  const hero = $("#hero"), spot = $(".hero__spot");
  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    spot.style.setProperty("--sx", e.clientX - r.left + "px");
    spot.style.setProperty("--sy", e.clientY - r.top + "px");
  });
}

/* Tarjetas con luz que sigue al mouse (también funciona en táctil al tocar) */
$$(".spot").forEach((c) => c.addEventListener("pointermove", (e) => {
  const r = c.getBoundingClientRect();
  c.style.setProperty("--mx", e.clientX - r.left + "px");
  c.style.setProperty("--my", e.clientY - r.top + "px");
}));

/* ---------- Contadores ---------- */
const countIO = new IntersectionObserver((entries) => entries.forEach((e) => {
  if (!e.isIntersecting) return;
  const el = e.target, to = +el.dataset.count, t0 = performance.now(), dur = 1600;
  const tick = (t) => {
    const p = Math.min(1, (t - t0) / dur);
    el.textContent = Math.round(to * (1 - Math.pow(1 - p, 4)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  countIO.unobserve(el);
}), { threshold: 0.6 });
$$("[data-count]").forEach((el) => countIO.observe(el));

/* ---------- Video: si no existe el archivo, se queda la foto ---------- */
const vid = $("#heroVideo");
vid?.addEventListener("error", () => vid.removeAttribute("autoplay"), true);

/* ---------- Comparadores antes / ahora ---------- */
$$(".compare").forEach((cmp) => {
  const input = $("input", cmp);
  input.addEventListener("input", () => cmp.style.setProperty("--pos", input.value + "%"));
  // pequeña demostración automática la primera vez que se ve
  const demo = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    demo.disconnect();
    if (reduced) return;
    const t0 = performance.now();
    const anim = (t) => {
      const p = Math.min(1, (t - t0) / 1800);
      const v = 50 + Math.sin(p * Math.PI * 2) * 22 * (1 - p);
      cmp.style.setProperty("--pos", v + "%");
      input.value = v;
      if (p < 1) requestAnimationFrame(anim);
    };
    setTimeout(() => requestAnimationFrame(anim), 700);
  }, { threshold: 0.5 });
  demo.observe(cmp);
});

/* ---------- Línea de tiempo que se llena al bajar ---------- */
const tl = $("#timeline");
function timelineProgress() {
  if (!tl) return;
  const r = tl.getBoundingClientRect();
  const p = Math.min(1, Math.max(0, (innerHeight * 0.75 - r.top) / (r.height + innerHeight * 0.25)));
  tl.style.setProperty("--p", p);
  $$("li", tl).forEach((li, i, all) => li.classList.toggle("is-on", p >= (i + 0.2) / all.length));
}

/* ---------- Acordeón ---------- */
$$(".acc__q").forEach((q) => q.addEventListener("click", () => {
  const item = q.parentElement;
  const open = !item.classList.contains("is-open");
  $$(".acc.is-open").forEach((o) => { o.classList.remove("is-open"); $(".acc__q", o).setAttribute("aria-expanded", "false"); });
  item.classList.toggle("is-open", open);
  q.setAttribute("aria-expanded", open);
}));

/* ---------- Botones de plan → marcan el tipo en el formulario ---------- */
$$("[data-plan]").forEach((b) => b.addEventListener("click", () => {
  const r = $(`.chips input[value="${b.dataset.plan}"]`);
  if (r) r.checked = true;
}));

/* ---------- Formulario → WhatsApp ---------- */
const form = $("#form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let ok = true;
  $$("[required]", form).forEach((inp) => {
    const f = inp.closest(".field");
    f.classList.remove("is-error");
    if (!inp.value.trim()) {
      void f.offsetWidth; // reinicia la animación de sacudida
      f.classList.add("is-error");
      ok = false;
    }
  });
  if (!ok) return $(".is-error input", form).focus();
  const d = Object.fromEntries(new FormData(form));
  const msg = [
    `Hola ${CONFIG.marca}, soy ${d.nombre}.`,
    `Negocio: ${d.negocio}`,
    `Proyecto: ${d.tipo}`,
    d.mensaje && `Detalle: ${d.mensaje}`,
    d.web && `Web/redes actuales: ${d.web}`,
  ].filter(Boolean).join("\n");
  window.open(waLink(msg), "_blank", "noopener");
});
$$("[required]", form).forEach((inp) => inp.addEventListener("input", () => inp.closest(".field").classList.remove("is-error")));

$("#year").textContent = new Date().getFullYear();
onScroll();


/* ---------- Títulos que resplandecen al pasar el mouse ----------
   Cada letra se difumina con un brillo cian y vuelve a quedar nítida, en ola. */
(() => {
  const heads = $$("h1, h2, h3");
  heads.forEach((h) => {
    let n = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((t) => {
        if (t.nodeType === 1) return walk(t);
        if (t.nodeType !== 3 || !t.textContent.trim()) return;
        const frag = document.createDocumentFragment();
        t.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) return frag.append(part);
          const word = document.createElement("span");
          word.className = "gw";
          [...part].forEach((ch) => {
            const c = document.createElement("span");
            c.className = "ch";
            c.style.setProperty("--c", n++);
            c.textContent = ch;
            word.append(c);
          });
          frag.append(word);
        });
        t.replaceWith(frag);
      });
    };
    walk(h);
    h.style.setProperty("--n", n);
    h.classList.add("glow-title");

    if (!finePointer || reduced) return;   // en táctil o con movimiento reducido no se anima
    let played = false;
    h.addEventListener("pointerenter", () => {
      // La ola se ve solo la primera vez; después solo se ilumina (un efecto repetido cansa)
      if (!played) { played = true; h.classList.add("glow-run"); }
      h.classList.add("is-lit");
    });
    h.addEventListener("pointerleave", () => h.classList.remove("is-lit"));
    h.addEventListener("animationend", (e) => {
      if (+e.target.style.getPropertyValue("--c") === n - 1) h.classList.remove("glow-run");
    });
  });
})();
