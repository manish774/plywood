import type { FestivalTheme } from "../types";

const guruPurnima: FestivalTheme = {
  id: "guru-purnima",
  nameEn: "Guru Purnima",
  nameHi: "गुरु पूर्णिमा",
  taglineEn: "Honoring the Teacher Within",
  taglineHi: "गुरु के प्रति श्रद्धा",
  dateRangeEn: "June to July (Full Moon of Ashadha)",
  dateRangeHi: "जून से जुलाई (आषाढ़ पूर्णिमा)",

  colors: {
    primary: "#c17f2a",
    primaryDark: "#8f5e1d",
    soft: "#f6e8d1",
    textOnPrimary: "#fff",
    accent: "#c9a227",
    accentDark: "#9c7d1c",
    glow: "#f0c869",
    gradientFrom: "#5c2a1a",
    gradientTo: "#c17f2a",
    gradientAngle: 135,
  },

  icons: [
    {
      id: "open-book",
      viewBox: "0 0 64 64",
      label: "Open book of wisdom",
      shapes: [
        { tag: "path", attrs: { d: "M8 16 C 8 14 10 13 14 13 C 20 13 28 15 32 20 L 32 50 C 28 45 20 43 14 43 C 10 43 8 44 8 46 Z", fill: "#faf3e2" } },
        { tag: "path", attrs: { d: "M56 16 C 56 14 54 13 50 13 C 44 13 36 15 32 20 L 32 50 C 36 45 44 43 50 43 C 54 43 56 44 56 46 Z", fill: "#f5ead0" } },
        { tag: "line", attrs: { x1: 32, y1: 20, x2: 32, y2: 50, stroke: "#7a3520", strokeWidth: 1.5 } },
        { tag: "line", attrs: { x1: 13, y1: 21, x2: 25, y2: 23, stroke: "#c9a227", strokeWidth: 1 } },
        { tag: "line", attrs: { x1: 13, y1: 26, x2: 25, y2: 28, stroke: "#c9a227", strokeWidth: 1 } },
        { tag: "line", attrs: { x1: 13, y1: 31, x2: 24, y2: 33, stroke: "#c9a227", strokeWidth: 1 } },
        { tag: "line", attrs: { x1: 39, y1: 23, x2: 51, y2: 21, stroke: "#c9a227", strokeWidth: 1 } },
        { tag: "line", attrs: { x1: 39, y1: 28, x2: 51, y2: 26, stroke: "#c9a227", strokeWidth: 1 } },
        { tag: "line", attrs: { x1: 40, y1: 33, x2: 51, y2: 31, stroke: "#c9a227", strokeWidth: 1 } },
        { tag: "path", attrs: { d: "M30 13 L 30 24 L 32 22 L 34 24 L 34 13 Z", fill: "#7a3520" } },
      ],
    },
    {
      id: "lamp",
      viewBox: "0 0 64 64",
      label: "Small oil lamp of knowledge",
      shapes: [
        { tag: "path", attrs: { d: "M10 40 C 10 48 20 51 32 51 C 44 51 54 48 54 40 C 54 37 48 38 32 38 C 16 38 10 37 10 40 Z", fill: "#8f5e1d" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 40, rx: 12, ry: 2.8, fill: "#6b4415" } },
        { tag: "path", attrs: { d: "M32 14 C 27 22 26 28 32 33 C 38 28 37 22 32 14 Z", fill: "#e0a52e" } },
        { tag: "path", attrs: { d: "M32 19 C 29.5 24 29 27 32 30 C 35 27 34.5 24 32 19 Z", fill: "#f6e8d1" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 32, rx: 1.4, ry: 2, fill: "#4a2e12" } },
      ],
    },
    {
      id: "lotus",
      viewBox: "0 0 64 64",
      label: "Lotus offered in reverence",
      shapes: [
        { tag: "path", attrs: { d: "M32 32 C 28 22 28 14 32 8 C 36 14 36 22 32 32 Z", fill: "#f0c869", transform: "rotate(0 32 32)" } },
        { tag: "path", attrs: { d: "M32 32 C 28 22 28 14 32 8 C 36 14 36 22 32 32 Z", fill: "#c17f2a", transform: "rotate(45 32 32)" } },
        { tag: "path", attrs: { d: "M32 32 C 28 22 28 14 32 8 C 36 14 36 22 32 32 Z", fill: "#f0c869", transform: "rotate(90 32 32)" } },
        { tag: "path", attrs: { d: "M32 32 C 28 22 28 14 32 8 C 36 14 36 22 32 32 Z", fill: "#c17f2a", transform: "rotate(135 32 32)" } },
        { tag: "path", attrs: { d: "M32 32 C 28 22 28 14 32 8 C 36 14 36 22 32 32 Z", fill: "#f0c869", transform: "rotate(180 32 32)" } },
        { tag: "path", attrs: { d: "M32 32 C 28 22 28 14 32 8 C 36 14 36 22 32 32 Z", fill: "#c17f2a", transform: "rotate(225 32 32)" } },
        { tag: "path", attrs: { d: "M32 32 C 28 22 28 14 32 8 C 36 14 36 22 32 32 Z", fill: "#f0c869", transform: "rotate(270 32 32)" } },
        { tag: "path", attrs: { d: "M32 32 C 28 22 28 14 32 8 C 36 14 36 22 32 32 Z", fill: "#c17f2a", transform: "rotate(315 32 32)" } },
        { tag: "circle", attrs: { cx: 32, cy: 32, r: 5.5, fill: "#c9a227" } },
      ],
    },
    {
      id: "peepal-leaf",
      viewBox: "0 0 64 64",
      label: "Sacred peepal leaf",
      shapes: [
        { tag: "path", attrs: { d: "M32 8 C 46 16 50 30 42 42 C 38 48 34 52 32 58 C 30 52 26 48 22 42 C 14 30 18 16 32 8 Z", fill: "#7a8f5a" } },
        { tag: "line", attrs: { x1: 32, y1: 14, x2: 32, y2: 54, stroke: "#4a5c2e", strokeWidth: 1.3 } },
        { tag: "line", attrs: { x1: 32, y1: 22, x2: 24, y2: 28, stroke: "#4a5c2e", strokeWidth: 1 } },
        { tag: "line", attrs: { x1: 32, y1: 22, x2: 40, y2: 28, stroke: "#4a5c2e", strokeWidth: 1 } },
        { tag: "line", attrs: { x1: 32, y1: 32, x2: 25, y2: 38, stroke: "#4a5c2e", strokeWidth: 1 } },
        { tag: "line", attrs: { x1: 32, y1: 32, x2: 39, y2: 38, stroke: "#4a5c2e", strokeWidth: 1 } },
      ],
    },
    {
      id: "footprint",
      viewBox: "0 0 64 64",
      label: "Footprints of reverence",
      shapes: [
        { tag: "path", attrs: { d: "M32 14 C 26 14 23 22 24 32 C 25 40 28 46 32 48 C 36 46 39 40 40 32 C 41 22 38 14 32 14 Z", fill: "#c17f2a" } },
        { tag: "circle", attrs: { cx: 25, cy: 16, r: 2, fill: "#c17f2a" } },
        { tag: "circle", attrs: { cx: 29, cy: 13.5, r: 2, fill: "#c17f2a" } },
        { tag: "circle", attrs: { cx: 33, cy: 13, r: 2, fill: "#c17f2a" } },
        { tag: "circle", attrs: { cx: 37, cy: 15.5, r: 2, fill: "#c17f2a" } },
      ],
    },
  ],

  ambientPattern: {
    iconIds: ["open-book", "lotus", "peepal-leaf"],
    count: 26,
    sizeRange: [18, 40],
    opacityRange: [0.12, 0.26],
    rotationRange: [-12, 12],
    seed: "guru-purnima-ambient",
  },

  heroPattern: {
    iconIds: ["open-book", "lamp", "lotus", "peepal-leaf", "footprint"],
    count: 32,
    sizeRange: [26, 58],
    opacityRange: [0.22, 0.42],
    rotationRange: [-15, 15],
    seed: "guru-purnima-hero",
  },

  // A warmly lit antique library of books — verified live on Unsplash (free to use).
  heroPhotoUrl: "https://images.unsplash.com/photo-1722182877533-7378b60bf1e8?w=1600&q=80",
};

export default guruPurnima;
