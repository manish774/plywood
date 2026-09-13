import type { FestivalTheme } from "../types";

const ugadiGudiPadwa: FestivalTheme = {
  id: "ugadi-gudi-padwa",
  nameEn: "Ugadi / Gudi Padwa",
  nameHi: "उगादी / गुड़ी पड़वा",
  taglineEn: "New Year's First Morning",
  taglineHi: "नए साल की पहली सुबह",
  dateRangeEn: "Late March to Early April (Chaitra Shukla Pratipada)",
  dateRangeHi: "मार्च के अंत से अप्रैल की शुरुआत (चैत्र शुक्ल प्रतिपदा)",

  colors: {
    primary: "#e8720c",
    primaryDark: "#b5540a",
    soft: "#fde8cf",
    textOnPrimary: "#fff",
    accent: "#c98a2e",
    accentDark: "#96661f",
    glow: "#ffcf6b",
    gradientFrom: "#1f6b3a",
    gradientTo: "#e8720c",
    gradientAngle: 130,
  },

  icons: [
    {
      id: "gudi-flag",
      viewBox: "0 0 64 64",
      label: "Gudi flag with kalash pot and neem leaves",
      shapes: [
        { tag: "line", attrs: { x1: 20, y1: 60, x2: 20, y2: 8, stroke: "#c98a2e", strokeWidth: 3, strokeLinecap: "round" } },
        { tag: "path", attrs: { d: "M20 14 L 52 22 L 20 30 Z", fill: "#e8720c" } },
        { tag: "path", attrs: { d: "M20 14 L 52 22 L 20 30 Z", fill: "#ffcf6b", opacity: 0.25 } },
        { tag: "path", attrs: { d: "M12 12 C 14 6 18 4 20 8 C 22 4 26 6 28 12 C 24 10 16 10 12 12 Z", fill: "#4c7a3f" } },
        { tag: "path", attrs: { d: "M14 10 C 15 7 17 6 18 8", stroke: "#33552b", strokeWidth: 0.8, fill: "none" } },
        { tag: "ellipse", attrs: { cx: 20, cy: 9, rx: 6, ry: 5, fill: "#c9791f" } },
        { tag: "ellipse", attrs: { cx: 20, cy: 6.5, rx: 3.6, ry: 2.4, fill: "#e8a94a" } },
        { tag: "circle", attrs: { cx: 20, cy: 4, r: 1.4, fill: "#f2d18a" } },
      ],
    },
    {
      id: "neem-sprig",
      viewBox: "0 0 64 64",
      label: "Fresh neem leaf sprig",
      shapes: [
        { tag: "line", attrs: { x1: 32, y1: 50, x2: 32, y2: 16, stroke: "#5c8a3f", strokeWidth: 1.6, strokeLinecap: "round" } },
        { tag: "ellipse", attrs: { cx: 25, cy: 42, rx: 7, ry: 3.2, fill: "#4c7a3f", transform: "rotate(-35 25 42)" } },
        { tag: "ellipse", attrs: { cx: 39, cy: 42, rx: 7, ry: 3.2, fill: "#5c8a3f", transform: "rotate(35 39 42)" } },
        { tag: "ellipse", attrs: { cx: 23, cy: 30, rx: 7, ry: 3.2, fill: "#5c8a3f", transform: "rotate(-30 23 30)" } },
        { tag: "ellipse", attrs: { cx: 41, cy: 30, rx: 7, ry: 3.2, fill: "#4c7a3f", transform: "rotate(30 41 30)" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 20, rx: 6, ry: 2.8, fill: "#6ca34a", transform: "rotate(0 32 20)" } },
        { tag: "circle", attrs: { cx: 32, cy: 14, r: 2, fill: "#8fbf5f" } },
      ],
    },
    {
      id: "mango-torana",
      viewBox: "0 0 64 64",
      label: "Mango leaf torana door string",
      shapes: [
        { tag: "path", attrs: { d: "M4 14 Q 32 30 60 14", stroke: "#7a5a2e", strokeWidth: 1.6, fill: "none" } },
        { tag: "path", attrs: { d: "M10 17 C 7 22 8 28 13 30 C 16 25 15 19 10 17 Z", fill: "#2f6b35" } },
        { tag: "path", attrs: { d: "M22 21 C 19 26 20 32 25 34 C 28 29 27 23 22 21 Z", fill: "#3a7d3f" } },
        { tag: "path", attrs: { d: "M32 23 C 29 28 30 34 35 36 C 38 31 37 25 32 23 Z", fill: "#2f6b35" } },
        { tag: "path", attrs: { d: "M42 21 C 39 26 40 32 45 34 C 48 29 47 23 42 21 Z", fill: "#3a7d3f" } },
        { tag: "path", attrs: { d: "M53 17 C 50 22 51 28 56 30 C 59 25 58 19 53 17 Z", fill: "#2f6b35" } },
      ],
    },
    {
      id: "pachadi-bowl",
      viewBox: "0 0 64 64",
      label: "Ugadi pachadi bowl",
      shapes: [
        { tag: "path", attrs: { d: "M12 30 C 12 44 20 50 32 50 C 44 50 52 44 52 30 Z", fill: "#c98a2e" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 30, rx: 20, ry: 5, fill: "#e8a94a" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 29, rx: 16, ry: 3.6, fill: "#f2c96b" } },
        { tag: "circle", attrs: { cx: 25, cy: 28, r: 1.8, fill: "#8a3b1a" } },
        { tag: "circle", attrs: { cx: 32, cy: 27.5, r: 1.8, fill: "#4c7a3f" } },
        { tag: "circle", attrs: { cx: 39, cy: 28, r: 1.8, fill: "#d4af37" } },
        { tag: "circle", attrs: { cx: 28.5, cy: 30, r: 1.8, fill: "#b5541f" } },
        { tag: "circle", attrs: { cx: 35.5, cy: 30, r: 1.8, fill: "#6ca34a" } },
      ],
    },
    {
      id: "rangoli-dot",
      viewBox: "0 0 64 64",
      label: "Doorstep rangoli dot-flower motif",
      shapes: [
        { tag: "circle", attrs: { cx: 32, cy: 16, r: 3, fill: "#e8720c" } },
        { tag: "circle", attrs: { cx: 44.9, cy: 22.1, r: 3, fill: "#c98a2e" } },
        { tag: "circle", attrs: { cx: 48, cy: 32, r: 3, fill: "#e8720c" } },
        { tag: "circle", attrs: { cx: 44.9, cy: 41.9, r: 3, fill: "#c98a2e" } },
        { tag: "circle", attrs: { cx: 32, cy: 48, r: 3, fill: "#e8720c" } },
        { tag: "circle", attrs: { cx: 19.1, cy: 41.9, r: 3, fill: "#c98a2e" } },
        { tag: "circle", attrs: { cx: 16, cy: 32, r: 3, fill: "#e8720c" } },
        { tag: "circle", attrs: { cx: 19.1, cy: 22.1, r: 3, fill: "#c98a2e" } },
        { tag: "circle", attrs: { cx: 32, cy: 32, r: 6, fill: "#4c7a3f" } },
        { tag: "circle", attrs: { cx: 32, cy: 32, r: 2.4, fill: "#ffcf6b" } },
      ],
    },
  ],

  ambientPattern: {
    iconIds: ["neem-sprig", "rangoli-dot", "mango-torana"],
    count: 20,
    sizeRange: [18, 40],
    opacityRange: [0.05, 0.14],
    rotationRange: [-15, 15],
    seed: "ugadi-gudi-padwa-ambient",
  },

  heroPattern: {
    iconIds: ["gudi-flag", "neem-sprig", "mango-torana", "pachadi-bowl", "rangoli-dot"],
    count: 26,
    sizeRange: [26, 60],
    opacityRange: [0.12, 0.28],
    rotationRange: [-18, 18],
    seed: "ugadi-gudi-padwa-hero",
  },
};

export default ugadiGudiPadwa;
