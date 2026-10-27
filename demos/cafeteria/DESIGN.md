# DESIGN.md — Café Andino (demo de Ecnexo Digital)

> Fuente de verdad visual de esta web. Si algo choca con `design-system/cafe-andino/MASTER.md` (salida de UI UX Pro Max), **manda este archivo**.
> Es una **web de demostración**: el negocio, la carta, los precios y el horario son de ejemplo.

## 1. Tema visual
- **Concepto:** «Cafetería de barrio con alma andina»: papel crema, terracota, verde de páramo y montañas dibujadas a línea.
- **Estilo base (UI UX Pro Max):** estilo *Minimalism* con paleta «warm brown + cream» y patrón de embudo en 3 pasos (origen → carta → pedido). Se descartan sus fuentes Fredoka/Nunito por infantiles.
- **Sensación:** cálido, artesanal y tranquilo. Huele a café recién hecho.

## 2. Logo
| Archivo | Uso |
| --- | --- |
| `assets/logo/andino-logo.svg` | Cabecera (sobre crema) |
| `assets/logo/andino-logo-crema.svg` | Pie y fondos oscuros |
| `assets/logo/favicon.svg` | Favicon e icono |

Reglas: círculo terracota con montaña nevada + «Café Andino» en Fraunces. No girar, no cambiar colores.

## 3. Paleta (tokens)
| Token | Valor | Rol | Contraste |
| --- | --- | --- | --- |
| `--crema` | #F6EFE6 | Fondo | — |
| `--papel` | #EFE4D6 | Secciones alternas | — |
| `--espresso` | #2B1B14 | Texto y fondo oscuro | 14.5:1 sobre crema |
| `--cafe` | #6B5446 | Texto secundario | 6.2:1 sobre crema |
| `--terracota` | #A84B24 | Botón principal, acentos | blanco encima 5.7:1 · como texto sobre crema 5.0:1 |
| `--verde` | #3F5D45 | Montañas, detalles | crema encima 6.4:1 |
| `--dorado` | #D9A441 | Detalles sobre espresso | 7.4:1 sobre espresso |
| `--whatsapp` | #25D366 | Botón WhatsApp | texto #0B3B24: 6.4:1 (nunca blanco) |

## 4. Tipografía (alojadas en `assets/fonts`)
| Rol | Fuente | Peso | Móvil → escritorio |
| --- | --- | --- | --- |
| Títulos | Fraunces | 600 | 48 → 104 px (portada), 38 → 64 px (secciones) |
| Acento | Fraunces itálica | 400 | igual que el título |
| Texto | DM Sans | 400 / 500 / 700 | 16 → 18 px |
| Etiquetas | DM Sans 700 mayúsculas, espaciado .18em | 700 | 12 px |

## 5. Componentes
- **Botón principal:** terracota + texto blanco, muy redondeado (pastilla).
- **Botón WhatsApp:** #25D366 + #0B3B24 + icono SVG.
- **Carta:** dos columnas (Cafés · Para acompañar), nombre, descripción corta y precio en terracota.
- **Pasos de origen:** tarjetas con número en círculo e ilustración lineal.
- **Taza ilustrada** (SVG) con vapor animado en la portada.
- **Franja de demo** arriba y **botón flotante** de WhatsApp.
- Iconos SVG propios, nunca emojis.

## 6. Movimiento
- Portada: vapor que sube y se desvanece, granos de café que flotan, montañas que se dibujan.
- Aparición escalonada de secciones (`.revela`, 90 ms).
- Carta: filas que entran una tras otra.
- Pasos: ilustraciones que se dibujan.
- Llamada final: granos flotando; botón que late.
- Solo `transform`, `opacity` y `stroke-dashoffset`. Con `prefers-reduced-motion`, todo quieto y visible.

## 7. Layout
Mobile first. Contenedor máx. 1180 px, margen 20 px. Orden: franja demo · cabecera · portada · del cerro a tu taza · carta · pide para llevar · visítanos · llamada final · pie · flotante.

## 8. Contenido fijo
- WhatsApp en `CONFIG.whatsapp` de `js/main.js`, con mensaje prellenado.
- Zona: Guápulo, Quito. Horario: lunes a sábado 7:30–20:00, domingo 8:00–14:00.
- Precios: café desde $1.80, acompañantes desde $1.50.

## 9. Lo que no se hace
- Nada de reseñas inventadas ni cifras de clientes.
- Nada de fotos de otras cafeterías o de bancos de imágenes con marca de agua.
- Nada de emojis como iconos.

## 10. Checklist antes de publicar
- [ ] Sin scroll horizontal a 390 px y 1440 px.
- [ ] WhatsApp con el número correcto.
- [ ] Contraste ≥ 4.5:1 en texto.
- [ ] Movimiento reducido respetado.
- [ ] Title, description, Open Graph y JSON-LD (`CafeOrCoffeeShop`).
- [ ] Franja de demo visible.
