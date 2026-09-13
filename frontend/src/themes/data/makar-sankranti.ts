import type { FestivalTheme } from "../types";

// Makar Sankranti / Pongal / Lohri — the sun's turn into Capricorn and the
// start of the harvest season. Bright, warm, daytime festival: kites, til-gud
// sweets, sugarcane, bonfires, wheat sheaves and a clay Pongal pot.
const makarSankranti: FestivalTheme = {
  id: "makar-sankranti",
  nameEn: "Makar Sankranti",
  nameHi: "मकर संक्रांति",
  taglineEn: "Harvest of the Sun",
  taglineHi: "सूर्य की फसल",
  dateRangeEn: "Mid-January",
  dateRangeHi: "मध्य जनवरी",

  colors: {
    primary: "#f2a541",
    primaryDark: "#c17d1f",
    soft: "#fdf1dc",
    textOnPrimary: "#4a2c0a",
    accent: "#4fa8d8",
    accentDark: "#2f7ea8",
    glow: "#ffd166",
    gradientFrom: "#ff6b35",
    gradientTo: "#ffc93c",
    gradientAngle: 120,
  },

  icons: [
    {
      id: "kite",
      viewBox: "0 0 64 64",
      label: "Flying kite with tail",
      shapes: [
        { tag: "polygon", attrs: { points: "32,6 52,28 32,28", fill: "#e63946" } },
        { tag: "polygon", attrs: { points: "52,28 32,50 32,28", fill: "#ffd166" } },
        { tag: "polygon", attrs: { points: "32,50 12,28 32,28", fill: "#3a9d5d" } },
        { tag: "polygon", attrs: { points: "12,28 32,6 32,28", fill: "#4fa8d8" } },
        { tag: "line", attrs: { x1: 32, y1: 6, x2: 32, y2: 50, stroke: "#ffffff", strokeWidth: 1, opacity: 0.7 } },
        { tag: "line", attrs: { x1: 12, y1: 28, x2: 52, y2: 28, stroke: "#ffffff", strokeWidth: 1, opacity: 0.7 } },
        { tag: "path", attrs: { d: "M32 50 C 30 54, 34 56, 32 60", stroke: "#e63946", strokeWidth: 2, fill: "none", strokeLinecap: "round" } },
        { tag: "polygon", attrs: { points: "29,53 35,53 32,57", fill: "#ffd166" } },
        { tag: "polygon", attrs: { points: "29,58 35,58 32,62", fill: "#4fa8d8" } },
      ],
    },
    {
      id: "til-gud-ladoo",
      viewBox: "0 0 64 64",
      label: "Sesame-jaggery sweet ball",
      shapes: [
        { tag: "circle", attrs: { cx: 32, cy: 34, r: 16, fill: "#8a5a2b" } },
        { tag: "ellipse", attrs: { cx: 26, cy: 26, rx: 6, ry: 4, fill: "#c98f4a", opacity: 0.6 } },
        { tag: "ellipse", attrs: { cx: 24, cy: 30, rx: 1.6, ry: 0.8, fill: "#fff3d6", transform: "rotate(20 24 30)" } },
        { tag: "ellipse", attrs: { cx: 30, cy: 24, rx: 1.6, ry: 0.8, fill: "#fff3d6", transform: "rotate(-15 30 24)" } },
        { tag: "ellipse", attrs: { cx: 38, cy: 26, rx: 1.6, ry: 0.8, fill: "#fff3d6", transform: "rotate(35 38 26)" } },
        { tag: "ellipse", attrs: { cx: 42, cy: 34, rx: 1.6, ry: 0.8, fill: "#fff3d6", transform: "rotate(-10 42 34)" } },
        { tag: "ellipse", attrs: { cx: 38, cy: 42, rx: 1.6, ry: 0.8, fill: "#fff3d6", transform: "rotate(25 38 42)" } },
        { tag: "ellipse", attrs: { cx: 28, cy: 44, rx: 1.6, ry: 0.8, fill: "#fff3d6", transform: "rotate(-30 28 44)" } },
        { tag: "ellipse", attrs: { cx: 22, cy: 38, rx: 1.6, ry: 0.8, fill: "#fff3d6", transform: "rotate(10 22 38)" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 34, rx: 1.6, ry: 0.8, fill: "#fff3d6", transform: "rotate(45 32 34)" } },
      ],
    },
    {
      id: "sugarcane",
      viewBox: "0 0 64 64",
      label: "Bundled sugarcane stalks",
      shapes: [
        { tag: "rect", attrs: { x: 24, y: 10, width: 6, height: 44, rx: 2, fill: "#c9d94a" } },
        { tag: "rect", attrs: { x: 24, y: 16, width: 6, height: 2, fill: "#8a9a2a" } },
        { tag: "rect", attrs: { x: 24, y: 26, width: 6, height: 2, fill: "#8a9a2a" } },
        { tag: "rect", attrs: { x: 24, y: 36, width: 6, height: 2, fill: "#8a9a2a" } },
        { tag: "rect", attrs: { x: 24, y: 46, width: 6, height: 2, fill: "#8a9a2a" } },
        { tag: "rect", attrs: { x: 34, y: 14, width: 6, height: 40, rx: 2, fill: "#d9e662" } },
        { tag: "rect", attrs: { x: 34, y: 20, width: 6, height: 2, fill: "#96a832" } },
        { tag: "rect", attrs: { x: 34, y: 30, width: 6, height: 2, fill: "#96a832" } },
        { tag: "rect", attrs: { x: 34, y: 40, width: 6, height: 2, fill: "#96a832" } },
        { tag: "rect", attrs: { x: 34, y: 48, width: 6, height: 2, fill: "#96a832" } },
        { tag: "path", attrs: { d: "M27 10 C 18 4, 12 6, 8 2", stroke: "#4c7a3f", strokeWidth: 3, fill: "none", strokeLinecap: "round" } },
        { tag: "path", attrs: { d: "M37 14 C 46 8, 52 10, 56 6", stroke: "#5c9c4a", strokeWidth: 3, fill: "none", strokeLinecap: "round" } },
      ],
    },
    {
      id: "bonfire",
      viewBox: "0 0 64 64",
      label: "Crackling Lohri bonfire",
      shapes: [
        { tag: "line", attrs: { x1: 15, y1: 54, x2: 49, y2: 46, stroke: "#5a3a1e", strokeWidth: 5, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 15, y1: 46, x2: 49, y2: 54, stroke: "#6b4226", strokeWidth: 5, strokeLinecap: "round" } },
        { tag: "path", attrs: { d: "M14 52 L50 52 L46 58 L18 58 Z", fill: "#4a2f18" } },
        { tag: "path", attrs: { d: "M32 8 C 18 22 16 36 26 46 C 22 36 30 30 32 24 C 34 30 42 36 38 46 C 48 36 46 22 32 8 Z", fill: "#ff6b35" } },
        { tag: "path", attrs: { d: "M32 16 C 24 26 22 36 28 43 C 26 35 30 31 32 27 C 34 31 38 35 36 43 C 42 36 40 26 32 16 Z", fill: "#ffd166" } },
        { tag: "path", attrs: { d: "M32 24 C 28 30 27 36 32 41 C 30 35 32 32 32 30 C 32 32 34 35 32 41 C 37 36 36 30 32 24 Z", fill: "#fff3b0" } },
      ],
    },
    {
      id: "wheat-sheaf",
      viewBox: "0 0 64 64",
      label: "Bundled wheat sheaf",
      shapes: [
        { tag: "line", attrs: { x1: 32, y1: 54, x2: 20, y2: 12, stroke: "#c9a227", strokeWidth: 1.6 } },
        { tag: "line", attrs: { x1: 32, y1: 54, x2: 26, y2: 10, stroke: "#c9a227", strokeWidth: 1.6 } },
        { tag: "line", attrs: { x1: 32, y1: 54, x2: 32, y2: 8, stroke: "#c9a227", strokeWidth: 1.6 } },
        { tag: "line", attrs: { x1: 32, y1: 54, x2: 38, y2: 10, stroke: "#c9a227", strokeWidth: 1.6 } },
        { tag: "line", attrs: { x1: 32, y1: 54, x2: 44, y2: 12, stroke: "#c9a227", strokeWidth: 1.6 } },
        { tag: "ellipse", attrs: { cx: 20, cy: 12, rx: 2, ry: 4, fill: "#e8c250", transform: "rotate(-15 20 12)" } },
        { tag: "ellipse", attrs: { cx: 26, cy: 10, rx: 2, ry: 4, fill: "#c9a227", transform: "rotate(-8 26 10)" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 8, rx: 2, ry: 4.4, fill: "#e8c250" } },
        { tag: "ellipse", attrs: { cx: 38, cy: 10, rx: 2, ry: 4, fill: "#c9a227", transform: "rotate(8 38 10)" } },
        { tag: "ellipse", attrs: { cx: 44, cy: 12, rx: 2, ry: 4, fill: "#e8c250", transform: "rotate(15 44 12)" } },
        { tag: "path", attrs: { d: "M22 40 L42 40 L44 46 L20 46 Z", fill: "#8a5a2b" } },
      ],
    },
    {
      id: "pongal-pot",
      viewBox: "0 0 64 64",
      label: "Clay Pongal pot with overflowing rice",
      shapes: [
        { tag: "rect", attrs: { x: 22, y: 54, width: 20, height: 6, rx: 1, fill: "#4a3222" } },
        { tag: "path", attrs: { d: "M16 55 C 20 51, 20 51, 24 54", stroke: "#ff8a3d", strokeWidth: 2, fill: "none", strokeLinecap: "round" } },
        { tag: "path", attrs: { d: "M48 55 C 44 51, 44 51, 40 54", stroke: "#ff8a3d", strokeWidth: 2, fill: "none", strokeLinecap: "round" } },
        { tag: "path", attrs: { d: "M20 30 C 18 46 22 56 32 56 C 42 56 46 46 44 30 Z", fill: "#b5541f" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 30, rx: 13, ry: 3, fill: "#8a3b1a" } },
        { tag: "path", attrs: { d: "M22 28 C 24 20 28 24 30 20 C 32 25 34 19 36 23 C 38 19 40 22 42 28 C 36 24 28 24 22 28 Z", fill: "#fdf6e3" } },
        { tag: "ellipse", attrs: { cx: 26, cy: 26, rx: 1.4, ry: 1, fill: "#fffbe8" } },
        { tag: "ellipse", attrs: { cx: 34, cy: 22, rx: 1.4, ry: 1, fill: "#fffbe8" } },
        { tag: "ellipse", attrs: { cx: 40, cy: 26, rx: 1.4, ry: 1, fill: "#fffbe8" } },
      ],
    },
  ],

  ambientPattern: {
    iconIds: ["kite", "til-gud-ladoo", "sugarcane", "wheat-sheaf"],
    count: 20,
    sizeRange: [20, 42],
    opacityRange: [0.05, 0.13],
    rotationRange: [-18, 18],
    seed: "makar-sankranti-ambient",
  },

  heroPattern: {
    iconIds: ["kite", "til-gud-ladoo", "sugarcane", "bonfire", "wheat-sheaf", "pongal-pot"],
    count: 26,
    sizeRange: [26, 60],
    opacityRange: [0.12, 0.27],
    rotationRange: [-22, 22],
    seed: "makar-sankranti-hero",
  },
};

export default makarSankranti;
