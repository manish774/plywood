import type { FestivalTheme } from "../types";

// Diwali (Deepavali) — the festival of lights. Flagship reference theme:
// exercises every field of the FestivalTheme contract (5 icons, both
// ambient/hero scatter patterns, an optional hero photo) so it can be used
// as the concrete pattern other festival theme files imitate.
const diwali: FestivalTheme = {
  id: "diwali",
  nameEn: "Diwali",
  nameHi: "दिवाली",
  taglineEn: "Festival of Lights",
  taglineHi: "रोशनी का त्योहार",
  dateRangeEn: "Mid-October to Mid-November",
  dateRangeHi: "मध्य अक्टूबर से मध्य नवंबर",

  colors: {
    primary: "#c1440e",
    primaryDark: "#8f3009",
    soft: "#fbe4d5",
    textOnPrimary: "#fff",
    accent: "#d4af37",
    accentDark: "#a9862b",
    glow: "#ffb347",
    gradientFrom: "#4a0f1f",
    gradientTo: "#c1440e",
    gradientAngle: 135,
  },

  icons: [
    {
      id: "diya",
      viewBox: "0 0 64 64",
      label: "Lit clay oil lamp",
      shapes: [
        {
          tag: "path",
          attrs: {
            d: "M6 38 C 6 50 22 54 32 54 C 42 54 58 50 58 38 C 58 34 50 36 32 36 C 14 36 6 34 6 38 Z",
            fill: "#b5541f",
          },
        },
        {
          tag: "ellipse",
          attrs: { cx: 32, cy: 38, rx: 14, ry: 3.4, fill: "#8a3b1a" },
        },
        {
          tag: "path",
          attrs: {
            d: "M32 10 C 26 20 24 28 32 34 C 40 28 38 20 32 10 Z",
            fill: "#ff8a3d",
          },
        },
        {
          tag: "path",
          attrs: {
            d: "M32 16 C 29 22 28 27 32 31 C 36 27 35 22 32 16 Z",
            fill: "#ffe07a",
          },
        },
        {
          tag: "ellipse",
          attrs: { cx: 32, cy: 33.5, rx: 1.6, ry: 2.2, fill: "#5c3416" },
        },
      ],
    },
    {
      id: "rangoli-flower",
      viewBox: "0 0 64 64",
      label: "Rangoli mandala flower",
      shapes: [
        { tag: "ellipse", attrs: { cx: 32, cy: 18, rx: 5, ry: 14, fill: "#e8547a", transform: "rotate(0 32 32)" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 18, rx: 5, ry: 14, fill: "#f2994a", transform: "rotate(45 32 32)" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 18, rx: 5, ry: 14, fill: "#e8547a", transform: "rotate(90 32 32)" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 18, rx: 5, ry: 14, fill: "#f2994a", transform: "rotate(135 32 32)" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 18, rx: 5, ry: 14, fill: "#e8547a", transform: "rotate(180 32 32)" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 18, rx: 5, ry: 14, fill: "#f2994a", transform: "rotate(225 32 32)" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 18, rx: 5, ry: 14, fill: "#e8547a", transform: "rotate(270 32 32)" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 18, rx: 5, ry: 14, fill: "#f2994a", transform: "rotate(315 32 32)" } },
        { tag: "circle", attrs: { cx: 32, cy: 32, r: 6, fill: "#d4af37" } },
      ],
    },
    {
      id: "marigold-flower",
      viewBox: "0 0 64 64",
      label: "Marigold garland flower",
      shapes: [
        { tag: "path", attrs: { d: "M32 46 Q 30 50 26 51", stroke: "#4c7a3f", strokeWidth: 2, fill: "none", strokeLinecap: "round" } },
        { tag: "circle", attrs: { cx: 41, cy: 32, r: 3.5, fill: "#ffb648" } },
        { tag: "circle", attrs: { cx: 38.4, cy: 38.4, r: 3.5, fill: "#ffb648" } },
        { tag: "circle", attrs: { cx: 32, cy: 41, r: 3.5, fill: "#ffb648" } },
        { tag: "circle", attrs: { cx: 25.6, cy: 38.4, r: 3.5, fill: "#ffb648" } },
        { tag: "circle", attrs: { cx: 23, cy: 32, r: 3.5, fill: "#ffb648" } },
        { tag: "circle", attrs: { cx: 25.6, cy: 25.6, r: 3.5, fill: "#ffb648" } },
        { tag: "circle", attrs: { cx: 32, cy: 23, r: 3.5, fill: "#ffb648" } },
        { tag: "circle", attrs: { cx: 38.4, cy: 25.6, r: 3.5, fill: "#ffb648" } },
        { tag: "circle", attrs: { cx: 32, cy: 32, r: 6, fill: "#f2994a" } },
      ],
    },
    {
      id: "firework-burst",
      viewBox: "0 0 64 64",
      label: "Firework sparkle burst",
      shapes: [
        { tag: "line", attrs: { x1: 32, y1: 32, x2: 56, y2: 32, stroke: "#ffd54a", strokeWidth: 3, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 32, y1: 32, x2: 48.97, y2: 48.97, stroke: "#ff6f61", strokeWidth: 3, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 32, y1: 32, x2: 32, y2: 56, stroke: "#ffd54a", strokeWidth: 3, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 32, y1: 32, x2: 15.03, y2: 48.97, stroke: "#ff6f61", strokeWidth: 3, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 32, y1: 32, x2: 8, y2: 32, stroke: "#ffd54a", strokeWidth: 3, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 32, y1: 32, x2: 15.03, y2: 15.03, stroke: "#ff6f61", strokeWidth: 3, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 32, y1: 32, x2: 32, y2: 8, stroke: "#ffd54a", strokeWidth: 3, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 32, y1: 32, x2: 48.97, y2: 15.03, stroke: "#ff6f61", strokeWidth: 3, strokeLinecap: "round" } },
        { tag: "circle", attrs: { cx: 32, cy: 32, r: 4, fill: "#fff6df" } },
      ],
    },
    {
      id: "lakshmi-footprint",
      viewBox: "0 0 64 64",
      label: "Auspicious footprint",
      shapes: [
        {
          tag: "path",
          attrs: {
            d: "M32 12 C 24 12 20 22 22 34 C 23 44 26 52 32 54 C 38 52 41 44 42 34 C 44 22 40 12 32 12 Z",
            fill: "#b8323f",
          },
        },
        { tag: "circle", attrs: { cx: 24, cy: 15, r: 2.2, fill: "#b8323f" } },
        { tag: "circle", attrs: { cx: 28, cy: 12.5, r: 2.2, fill: "#b8323f" } },
        { tag: "circle", attrs: { cx: 32, cy: 11.5, r: 2.2, fill: "#b8323f" } },
        { tag: "circle", attrs: { cx: 36, cy: 12.5, r: 2.2, fill: "#b8323f" } },
        { tag: "circle", attrs: { cx: 40, cy: 15, r: 2.2, fill: "#b8323f" } },
        { tag: "circle", attrs: { cx: 32, cy: 34, r: 2, fill: "#d4af37" } },
      ],
    },
  ],

  ambientPattern: {
    iconIds: ["diya", "rangoli-flower", "marigold-flower"],
    count: 26,
    sizeRange: [20, 44],
    opacityRange: [0.05, 0.12],
    rotationRange: [-15, 15],
    seed: "diwali-ambient",
  },

  heroPattern: {
    iconIds: ["diya", "rangoli-flower", "marigold-flower", "firework-burst", "lakshmi-footprint"],
    count: 32,
    sizeRange: [28, 64],
    opacityRange: [0.22, 0.42],
    rotationRange: [-20, 20],
    seed: "diwali-hero",
  },

  // Hands cradling a lit clay diya, string lights bokeh behind — verified
  // live on Unsplash (free to use).
  heroPhotoUrl: "https://images.unsplash.com/photo-1605292356183-a77d0a9c9d1d?w=1600&q=80",
};

export default diwali;
