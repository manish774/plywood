import type { FestivalTheme } from "../types";

// Vasant Panchami — worship of Goddess Saraswati and the first bloom of
// spring. Palette is deliberately sunny mustard/saffron yellow with white
// and soft spring-green accents, distinct from Diwali's maroon/orange.
const vasantPanchami: FestivalTheme = {
  id: "vasant-panchami",
  nameEn: "Vasant Panchami",
  nameHi: "वसंत पंचमी",
  taglineEn: "Goddess of Knowledge, Spring's First Bloom",
  taglineHi: "ज्ञान की देवी, वसंत का पहला पुष्प",
  dateRangeEn: "Late January to Early February",
  dateRangeHi: "जनवरी के अंत से फरवरी के प्रारंभ तक",

  colors: {
    primary: "#f4c430",
    primaryDark: "#c99a1e",
    soft: "#fdf3cf",
    textOnPrimary: "#4a3800",
    accent: "#8bc34a",
    accentDark: "#5f8f2c",
    glow: "#fff59d",
    gradientFrom: "#fff9c4",
    gradientTo: "#f4c430",
    gradientAngle: 135,
  },

  icons: [
    {
      id: "veena",
      viewBox: "0 0 64 64",
      label: "Saraswati's veena",
      shapes: [
        { tag: "ellipse", attrs: { cx: 15, cy: 46, rx: 11, ry: 9, fill: "#a9723a" } },
        { tag: "ellipse", attrs: { cx: 15, cy: 46, rx: 6.5, ry: 5, fill: "#8d5a2b" } },
        { tag: "path", attrs: { d: "M23 41 L54 14 L58 18 L27 46 Z", fill: "#c9944f" } },
        { tag: "circle", attrs: { cx: 54, cy: 14, r: 5.5, fill: "#8d5a2b" } },
        { tag: "rect", attrs: { x: 53, y: 6, width: 3, height: 6, rx: 1, fill: "#5c3a17" } },
        { tag: "rect", attrs: { x: 58, y: 10, width: 3, height: 6, rx: 1, fill: "#5c3a17" } },
        { tag: "line", attrs: { x1: 24, y1: 43, x2: 55, y2: 15, stroke: "#f4e3c1", strokeWidth: 0.8 } },
        { tag: "line", attrs: { x1: 21, y1: 41, x2: 52, y2: 13, stroke: "#f4e3c1", strokeWidth: 0.8 } },
        { tag: "circle", attrs: { cx: 15, cy: 46, r: 2, fill: "#f4c430" } },
      ],
    },
    {
      id: "manuscript",
      viewBox: "0 0 64 64",
      label: "Open book of knowledge",
      shapes: [
        { tag: "path", attrs: { d: "M32 16 C 22 13 11 15 8 19 L8 45 C 11 41 22 39 32 42 Z", fill: "#fffdf2", stroke: "#c99a1e", strokeWidth: 1 } },
        { tag: "path", attrs: { d: "M32 16 C 42 13 53 15 56 19 L56 45 C 53 41 42 39 32 42 Z", fill: "#fffdf2", stroke: "#c99a1e", strokeWidth: 1 } },
        { tag: "line", attrs: { x1: 32, y1: 16, x2: 32, y2: 42, stroke: "#c99a1e", strokeWidth: 1.2 } },
        { tag: "line", attrs: { x1: 13, y1: 24, x2: 27, y2: 22, stroke: "#e3c76a", strokeWidth: 1.4, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 13, y1: 30, x2: 27, y2: 28, stroke: "#e3c76a", strokeWidth: 1.4, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 13, y1: 36, x2: 27, y2: 34, stroke: "#e3c76a", strokeWidth: 1.4, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 37, y1: 22, x2: 51, y2: 24, stroke: "#e3c76a", strokeWidth: 1.4, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 37, y1: 28, x2: 51, y2: 30, stroke: "#e3c76a", strokeWidth: 1.4, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 37, y1: 34, x2: 51, y2: 36, stroke: "#e3c76a", strokeWidth: 1.4, strokeLinecap: "round" } },
      ],
    },
    {
      id: "mustard-flower",
      viewBox: "0 0 64 64",
      label: "Blooming mustard flower",
      shapes: [
        { tag: "path", attrs: { d: "M32 60 C 30 50 34 42 31 32", stroke: "#5f8f2c", strokeWidth: 2.4, fill: "none", strokeLinecap: "round" } },
        { tag: "ellipse", attrs: { cx: 25, cy: 50, rx: 6, ry: 2.6, fill: "#7cb342", transform: "rotate(-20 25 50)" } },
        { tag: "ellipse", attrs: { cx: 37, cy: 43, rx: 6, ry: 2.6, fill: "#7cb342", transform: "rotate(20 37 43)" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 15, rx: 5.5, ry: 10, fill: "#fddb3a" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 15, rx: 5.5, ry: 10, fill: "#fddb3a", transform: "rotate(72 32 22)" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 15, rx: 5.5, ry: 10, fill: "#fce34f", transform: "rotate(144 32 22)" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 15, rx: 5.5, ry: 10, fill: "#fddb3a", transform: "rotate(216 32 22)" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 15, rx: 5.5, ry: 10, fill: "#fce34f", transform: "rotate(288 32 22)" } },
        { tag: "circle", attrs: { cx: 32, cy: 22, r: 4, fill: "#c99a1e" } },
      ],
    },
    {
      id: "swan",
      viewBox: "0 0 64 64",
      label: "Saraswati's swan",
      shapes: [
        { tag: "ellipse", attrs: { cx: 26, cy: 42, rx: 17, ry: 10, fill: "#ffffff", stroke: "#e4dfc8", strokeWidth: 1 } },
        { tag: "path", attrs: { d: "M40 40 C 46 32 44 20 50 14", stroke: "#ffffff", strokeWidth: 7, fill: "none", strokeLinecap: "round" } },
        { tag: "circle", attrs: { cx: 51, cy: 12, r: 5.5, fill: "#ffffff" } },
        { tag: "path", attrs: { d: "M56 12 L63 10 L56 15 Z", fill: "#f4a13a" } },
        { tag: "circle", attrs: { cx: 52.5, cy: 10.5, r: 1, fill: "#3a3020" } },
        { tag: "path", attrs: { d: "M10 46 Q 16 52 24 48", stroke: "#e4dfc8", strokeWidth: 1.2, fill: "none" } },
      ],
    },
    {
      id: "peacock-quill",
      viewBox: "0 0 64 64",
      label: "Peacock feather quill",
      shapes: [
        { tag: "line", attrs: { x1: 14, y1: 58, x2: 42, y2: 30, stroke: "#8d5a2b", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "path", attrs: { d: "M14 58 L10 62 L16 60 Z", fill: "#5c3a17" } },
        { tag: "path", attrs: { d: "M40 32 C 30 26 26 14 34 6 C 44 12 46 26 40 32 Z", fill: "#3f7d5c" } },
        { tag: "path", attrs: { d: "M38 28 C 32 22 30 14 35 9 C 41 14 42 24 38 28 Z", fill: "#2f9e8f" } },
        { tag: "circle", attrs: { cx: 35, cy: 16, r: 4.2, fill: "#1c4f8a" } },
        { tag: "circle", attrs: { cx: 35, cy: 16, r: 2.4, fill: "#6a3b1a" } },
        { tag: "circle", attrs: { cx: 35, cy: 16, r: 1, fill: "#f4c430" } },
      ],
    },
  ],

  ambientPattern: {
    iconIds: ["mustard-flower", "manuscript", "swan"],
    count: 20,
    sizeRange: [18, 40],
    opacityRange: [0.05, 0.14],
    rotationRange: [-15, 15],
    seed: "vasant-panchami-ambient",
  },

  heroPattern: {
    iconIds: ["mustard-flower", "manuscript", "swan", "veena", "peacock-quill"],
    count: 26,
    sizeRange: [26, 60],
    opacityRange: [0.12, 0.28],
    rotationRange: [-20, 20],
    seed: "vasant-panchami-hero",
  },
};

export default vasantPanchami;
