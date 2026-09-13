import type { FestivalTheme } from "../types";

const akshayaTritiya: FestivalTheme = {
  id: "akshaya-tritiya",
  nameEn: "Akshaya Tritiya",
  nameHi: "अक्षय तृतीया",
  taglineEn: "The Day of Unending Prosperity",
  taglineHi: "अक्षय समृद्धि का दिन",
  dateRangeEn: "April to May (Vaishakha Shukla Tritiya)",
  dateRangeHi: "अप्रैल से मई (वैशाख शुक्ल तृतीया)",

  colors: {
    primary: "#9c7a1f",
    primaryDark: "#7a5e14",
    soft: "#f5ecd0",
    textOnPrimary: "#fff",
    accent: "#2f6b3f",
    accentDark: "#17402a",
    glow: "#ffd97a",
    gradientFrom: "#17402a",
    gradientTo: "#9c7a1f",
    gradientAngle: 135,
  },

  icons: [
    {
      id: "gold-kalash",
      viewBox: "0 0 64 64",
      label: "Kalash overflowing with gold coins",
      shapes: [
        { tag: "path", attrs: { d: "M18 30 C 18 46 22 54 32 54 C 42 54 46 46 46 30 Z", fill: "#c99a2b" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 30, rx: 14, ry: 4, fill: "#a67c1e" } },
        { tag: "rect", attrs: { x: 26, y: 20, width: 12, height: 8, fill: "#c99a2b" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 20, rx: 6, ry: 2.4, fill: "#e5b84a" } },
        { tag: "path", attrs: { d: "M24 18 C 24 12 40 12 40 18", stroke: "#7a5e14", strokeWidth: 2, fill: "none" } },
        { tag: "circle", attrs: { cx: 22, cy: 16, r: 5, fill: "#ffd97a" } },
        { tag: "circle", attrs: { cx: 32, cy: 12, r: 5, fill: "#ffd97a" } },
        { tag: "circle", attrs: { cx: 42, cy: 16, r: 5, fill: "#ffd97a" } },
        { tag: "circle", attrs: { cx: 22, cy: 16, r: 2, fill: "#c99a2b" } },
        { tag: "circle", attrs: { cx: 32, cy: 12, r: 2, fill: "#c99a2b" } },
        { tag: "circle", attrs: { cx: 42, cy: 16, r: 2, fill: "#c99a2b" } },
      ],
    },
    {
      id: "gold-coin",
      viewBox: "0 0 64 64",
      label: "Single gold coin",
      shapes: [
        { tag: "circle", attrs: { cx: 32, cy: 32, r: 20, fill: "#e5b84a" } },
        { tag: "circle", attrs: { cx: 32, cy: 32, r: 20, fill: "none", stroke: "#9c7a1f", strokeWidth: 2.4 } },
        { tag: "circle", attrs: { cx: 32, cy: 32, r: 13, fill: "none", stroke: "#a67c1e", strokeWidth: 1.4 } },
        { tag: "path", attrs: { d: "M32 22 C 27 22 25 26 28 29 C 30 31 34 31 36 33 C 39 36 37 40 32 40", stroke: "#7a5e14", strokeWidth: 2.4, fill: "none", strokeLinecap: "round" } },
      ],
    },
    {
      id: "lotus",
      viewBox: "0 0 64 64",
      label: "Lotus of prosperity",
      shapes: [
        { tag: "path", attrs: { d: "M32 44 C 24 40 20 30 24 20 C 27 28 30 34 32 38 C 34 34 37 28 40 20 C 44 30 40 40 32 44 Z", fill: "#e8547a" } },
        { tag: "path", attrs: { d: "M32 44 C 26 38 14 36 8 40 C 14 44 22 46 32 44 Z", fill: "#f2789a" } },
        { tag: "path", attrs: { d: "M32 44 C 38 38 50 36 56 40 C 50 44 42 46 32 44 Z", fill: "#f2789a" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 46, rx: 10, ry: 3.4, fill: "#2f6b3f" } },
        { tag: "circle", attrs: { cx: 32, cy: 38, r: 3, fill: "#e5b84a" } },
      ],
    },
    {
      id: "wheat-stalk",
      viewBox: "0 0 64 64",
      label: "Wheat stalk of abundance",
      shapes: [
        { tag: "line", attrs: { x1: 32, y1: 56, x2: 32, y2: 14, stroke: "#7a5e14", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 14, rx: 3, ry: 5, fill: "#c99a2b" } },
        { tag: "ellipse", attrs: { cx: 27, cy: 19, rx: 3, ry: 5, fill: "#c99a2b", transform: "rotate(-30 27 19)" } },
        { tag: "ellipse", attrs: { cx: 37, cy: 19, rx: 3, ry: 5, fill: "#c99a2b", transform: "rotate(30 37 19)" } },
        { tag: "ellipse", attrs: { cx: 26, cy: 27, rx: 3, ry: 5, fill: "#e5b84a", transform: "rotate(-35 26 27)" } },
        { tag: "ellipse", attrs: { cx: 38, cy: 27, rx: 3, ry: 5, fill: "#e5b84a", transform: "rotate(35 38 27)" } },
        { tag: "ellipse", attrs: { cx: 25, cy: 35, rx: 3, ry: 5, fill: "#c99a2b", transform: "rotate(-40 25 35)" } },
        { tag: "ellipse", attrs: { cx: 39, cy: 35, rx: 3, ry: 5, fill: "#c99a2b", transform: "rotate(40 39 35)" } },
      ],
    },
    {
      id: "diya",
      viewBox: "0 0 64 64",
      label: "Small lit diya",
      shapes: [
        { tag: "path", attrs: { d: "M8 40 C 8 50 20 53 32 53 C 44 53 56 50 56 40 C 56 37 48 39 32 39 C 16 39 8 37 8 40 Z", fill: "#a67c1e" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 40, rx: 12, ry: 3, fill: "#7a5e14" } },
        { tag: "path", attrs: { d: "M32 16 C 27 24 26 30 32 35 C 38 30 37 24 32 16 Z", fill: "#ff9d3d" } },
        { tag: "path", attrs: { d: "M32 21 C 29 26 28 30 32 33 C 36 30 35 26 32 21 Z", fill: "#ffe07a" } },
      ],
    },
  ],

  ambientPattern: {
    iconIds: ["gold-coin", "lotus", "wheat-stalk"],
    count: 26,
    sizeRange: [18, 40],
    opacityRange: [0.12, 0.26],
    rotationRange: [-15, 15],
    seed: "akshaya-tritiya-ambient",
  },

  heroPattern: {
    iconIds: ["gold-kalash", "gold-coin", "lotus", "wheat-stalk", "diya"],
    count: 32,
    sizeRange: [26, 58],
    opacityRange: [0.22, 0.42],
    rotationRange: [-18, 18],
    seed: "akshaya-tritiya-hero",
  },

  // Gold coins glowing beside a lit candle — verified live on Unsplash (free to use).
  heroPhotoUrl: "https://images.unsplash.com/photo-1585633644436-e65366848fcf?w=1600&q=80",
};

export default akshayaTritiya;
