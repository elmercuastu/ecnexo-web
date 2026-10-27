# DESIGN.md — Navaja Barber Club (demo de Ecnexo Digital)

> Fuente de verdad visual de esta web. Si algo choca con `design-system/navaja-barber-club/MASTER.md` (salida de UI UX Pro Max), **manda este archivo**.
> Es una **web de demostración**: el negocio, los precios y el horario son de ejemplo.

## 1. Tema visual
- **Concepto:** «Club de caballeros de barrio»: oscuro, latón y rayas de poste de barbero, con letrero de rótulo antiguo.
- **Estilo base (UI UX Pro Max):** patrón *Feature-Rich Showcase* con CTA repetido (portada, tras servicios y final). Paleta «premium dark + gold». Se descarta su estilo *Liquid Glass*: no encaja con una barbería.
- **Sensación:** seguro, cuidado, masculino sin ser agresivo. Pocas palabras y grandes.

## 2. Logo
| Archivo | Uso |
| --- | --- |
| `assets/logo/navaja-logo.svg` | Cabecera y pie (navaja + NAVAJA / BARBER CLUB, latón sobre oscuro) |
| `assets/logo/favicon.svg` | Favicon e icono |

Reglas: siempre sobre fondo oscuro, nunca deformar, aire mínimo igual a la altura de la «N».

## 3. Paleta (tokens)
| Token | Valor | Rol | Contraste |
| --- | --- | --- | --- |
| `--negro` | #0F0E0D | Fondo | — |
| `--carbon` | #1A1816 | Tarjetas | — |
| `--linea` | rgba(243,237,228,.12) | Bordes | — |
| `--crema` | #F3EDE4 | Texto principal | 16.6:1 sobre negro |
| `--gris` | #A89F92 | Texto secundario | 7.4:1 sobre negro, 6.8:1 sobre carbón |
| `--laton` | #C9A15B | Acento, precios, botón principal | 8.0:1 sobre negro |
| `--tinta` | #17120A | Texto sobre latón | 7.8:1 |
| `--rojo` | #D9443A | Solo decorativo (rayas del poste) | 4.4:1 → no usar para texto |
| `--whatsapp` | #25D366 | Botón WhatsApp | texto `--wa-texto` #0B3B24: 6.4:1 (nunca blanco) |

## 4. Tipografía (alojadas en `assets/fonts`, woff2 latino)
| Rol | Fuente | Peso | Móvil → escritorio |
| --- | --- | --- | --- |
| Títulos / rótulo | Bebas Neue | 400 | 52 → 120 px (portada), 40 → 72 px (secciones) |
| Acento | Cormorant Garamond itálica | 500 | 26 → 40 px |
| Texto | Manrope | 400 / 600 / 700 | 16 → 18 px |
| Etiquetas | Manrope 700, mayúsculas, espaciado .2em | 700 | 12 px |

## 5. Componentes
- **Botón principal:** latón con texto tinta, esquinas 4 px (rótulo), mayúsculas, flecha que avanza al pasar el ratón.
- **Botón WhatsApp:** #25D366 + texto #0B3B24 + icono SVG.
- **Lista de precios:** estilo carta de barbería, nombre · línea de puntos · precio en latón.
- **Tarjetas de estilo:** carbón, borde fino, icono lineal SVG que se dibuja.
- **Pasos:** 3 números en Bebas grandes con navaja que recorre la línea.
- **Botón flotante WhatsApp** abajo a la derecha.
- **Franja de demo** arriba: «Web de demostración · Ecnexo Digital».
- Iconos siempre SVG propios, nunca emojis.

## 6. Movimiento
- Portada: poste de barbero con rayas que suben (CSS infinito), tijera que corta (abre/cierra), titular que entra por líneas.
- Secciones: aparición escalonada (`.revela` + IntersectionObserver, 90 ms entre elementos).
- Precios: filas que entran y línea de puntos que crece.
- Iconos: trazo que se dibuja (stroke-dashoffset).
- Pasos: navaja que recorre la línea al bajar.
- Llamada final: rayas diagonales que se desplazan; botón que late.
- Solo `transform` y `opacity` (y `stroke-dashoffset` en SVG). Con `prefers-reduced-motion`, todo visible y quieto.

## 7. Layout
Mobile first. Contenedor máx. 1200 px, margen lateral 20 px. Secciones con 96–140 px de aire.
Orden: franja demo · cabecera · portada · servicios y precios · estilos · el ritual (3 pasos) · horario y ubicación · llamada final · pie · botón flotante.

## 8. Contenido fijo
- WhatsApp: número en `CONFIG.whatsapp` de `js/main.js`, con mensaje prellenado.
- Zona: La Floresta, Quito. Horario: lunes a sábado 9:00–20:00, domingo 10:00–14:00.
- Precios: desde $3 (cejas) hasta $15 (corte + barba). Pago en efectivo, transferencia o tarjeta.

## 9. Lo que no se hace
- Nada de testimonios ni reseñas inventadas, ni cifras de clientes.
- Nada de fotos de otras barberías o con marca de agua.
- Nada de emojis como iconos.

## 10. Checklist antes de publicar
- [ ] Sin scroll horizontal a 390 px y 1440 px.
- [ ] Todos los botones de WhatsApp con el número correcto.
- [ ] Contraste de texto ≥ 4.5:1.
- [ ] Movimiento reducido respetado.
- [ ] Title, description, Open Graph y JSON-LD (`BarberShop`).
- [ ] Franja de demo visible.
