import type { FestivalTheme } from "../types";

const ganeshChaturthi: FestivalTheme = {
  id: "ganesh-chaturthi",
  nameEn: "Ganesh Chaturthi",
  nameHi: "गणेश चतुर्थी",
  taglineEn: "Welcoming the Remover of Obstacles",
  taglineHi: "विघ्नहर्ता का स्वागत",
  dateRangeEn: "Bhadrapada Shukla Chaturthi — a 10-day festival (August/September)",
  dateRangeHi: "भाद्रपद शुक्ल चतुर्थी — 10 दिवसीय उत्सव (अगस्त/सितंबर)",

  colors: {
    primary: "#b3211c",
    primaryDark: "#7f1713",
    soft: "#fbe0dc",
    textOnPrimary: "#fff",
    accent: "#f2b705",
    accentDark: "#c1900a",
    glow: "#ffcf6b",
    gradientFrom: "#5c0f14",
    gradientTo: "#b3211c",
    gradientAngle: 135,
  },

  icons: [
    {
      id: "modak",
      viewBox: "0 0 64 64",
      label: "Modak, Lord Ganesha's favorite sweet",
      shapes: [
        { tag: "ellipse", attrs: { cx: 32, cy: 52, rx: 18, ry: 6, fill: "#e8b45a" } },
        { tag: "path", attrs: { d: "M14 52 C 14 40 20 28 32 16 C 44 28 50 40 50 52 C 50 58 42 60 32 60 C 22 60 14 58 14 52 Z", fill: "#fff6e0" } },
        { tag: "path", attrs: { d: "M32 16 L 27 25 L 37 25 Z", fill: "#f2b705", transform: "rotate(-32 32 20)" } },
        { tag: "path", attrs: { d: "M32 16 L 27 25 L 37 25 Z", fill: "#f2b705", transform: "rotate(-16 32 20)" } },
        { tag: "path", attrs: { d: "M32 16 L 27 25 L 37 25 Z", fill: "#f2b705" } },
        { tag: "path", attrs: { d: "M32 16 L 27 25 L 37 25 Z", fill: "#f2b705", transform: "rotate(16 32 20)" } },
        { tag: "path", attrs: { d: "M32 16 L 27 25 L 37 25 Z", fill: "#f2b705", transform: "rotate(32 32 20)" } },
        { tag: "circle", attrs: { cx: 32, cy: 16, r: 2, fill: "#b3211c" } },
      ],
    },
    {
      id: "ganesha-trunk",
      viewBox: "0 0 64 64",
      label: "Stylized Ganesha head silhouette",
      shapes: [
        { tag: "ellipse", attrs: { cx: 15, cy: 28, rx: 12, ry: 14, fill: "#f2b705" } },
        { tag: "ellipse", attrs: { cx: 49, cy: 28, rx: 12, ry: 14, fill: "#f2b705" } },
        { tag: "ellipse", attrs: { cx: 15, cy: 28, rx: 6.5, ry: 8.5, fill: "#c1900a" } },
        { tag: "ellipse", attrs: { cx: 49, cy: 28, rx: 6.5, ry: 8.5, fill: "#c1900a" } },
        { tag: "path", attrs: { d: "M21 15 C 15 14 13 22 14 30 C 15 40 20 46 32 46 C 44 46 49 40 50 30 C 51 22 49 14 43 15 C 37 11 27 11 21 15 Z", fill: "#b3211c" } },
        { tag: "path", attrs: { d: "M32 46 C 30 50 35 52 33 56 C 31 59 25 59 23 55.5", fill: "none", stroke: "#b3211c", strokeWidth: 6, strokeLinecap: "round" } },
        { tag: "circle", attrs: { cx: 26, cy: 27, r: 2.2, fill: "#2b1608" } },
        { tag: "circle", attrs: { cx: 38, cy: 27, r: 2.2, fill: "#2b1608" } },
        { tag: "circle", attrs: { cx: 32, cy: 19, r: 2.2, fill: "#f2b705" } },
      ],
    },
    {
      id: "hibiscus",
      viewBox: "0 0 64 64",
      label: "Red hibiscus flower offering",
      shapes: [
        { tag: "ellipse", attrs: { cx: 32, cy: 19, rx: 7, ry: 13, fill: "#d81e2c", transform: "rotate(0 32 32)" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 19, rx: 7, ry: 13, fill: "#e8404a", transform: "rotate(72 32 32)" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 19, rx: 7, ry: 13, fill: "#d81e2c", transform: "rotate(144 32 32)" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 19, rx: 7, ry: 13, fill: "#e8404a", transform: "rotate(216 32 32)" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 19, rx: 7, ry: 13, fill: "#d81e2c", transform: "rotate(288 32 32)" } },
        { tag: "path", attrs: { d: "M32 32 C 30 22 30 14 33 8", stroke: "#f2b705", strokeWidth: 2, fill: "none", strokeLinecap: "round" } },
        { tag: "circle", attrs: { cx: 33, cy: 8, r: 1.6, fill: "#b3211c" } },
        { tag: "circle", attrs: { cx: 30.5, cy: 10, r: 1.4, fill: "#b3211c" } },
        { tag: "circle", attrs: { cx: 35, cy: 11, r: 1.4, fill: "#b3211c" } },
        { tag: "circle", attrs: { cx: 32, cy: 32, r: 5.5, fill: "#f2b705" } },
      ],
    },
    {
      id: "ceremonial-umbrella",
      viewBox: "0 0 64 64",
      label: "Ceremonial canopy umbrella over the idol",
      shapes: [
        { tag: "rect", attrs: { x: 30.5, y: 30, width: 3, height: 28, fill: "#8a5a2b" } },
        { tag: "path", attrs: { d: "M8 30 C 8 14 56 14 56 30 Z", fill: "#b3211c" } },
        { tag: "path", attrs: { d: "M8 30 C 8 22 56 22 56 30 Z", fill: "#7f1713" } },
        { tag: "circle", attrs: { cx: 32, cy: 13, r: 3, fill: "#f2b705" } },
        { tag: "circle", attrs: { cx: 12, cy: 30, r: 3, fill: "#f2b705" } },
        { tag: "circle", attrs: { cx: 20, cy: 30, r: 3, fill: "#f2b705" } },
        { tag: "circle", attrs: { cx: 28, cy: 30, r: 3, fill: "#f2b705" } },
        { tag: "circle", attrs: { cx: 36, cy: 30, r: 3, fill: "#f2b705" } },
        { tag: "circle", attrs: { cx: 44, cy: 30, r: 3, fill: "#f2b705" } },
        { tag: "circle", attrs: { cx: 52, cy: 30, r: 3, fill: "#f2b705" } },
        { tag: "line", attrs: { x1: 16, y1: 33, x2: 16, y2: 42, stroke: "#f2b705", strokeWidth: 1.6, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 32, y1: 34, x2: 32, y2: 44, stroke: "#f2b705", strokeWidth: 1.6, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 48, y1: 33, x2: 48, y2: 42, stroke: "#f2b705", strokeWidth: 1.6, strokeLinecap: "round" } },
      ],
    },
    {
      id: "laddu",
      viewBox: "0 0 64 64",
      label: "Round laddu sweet",
      shapes: [
        { tag: "circle", attrs: { cx: 32, cy: 34, r: 21, fill: "#c1900a" } },
        { tag: "circle", attrs: { cx: 32, cy: 32, r: 20, fill: "#e8b45a" } },
        { tag: "circle", attrs: { cx: 24, cy: 26, r: 1.8, fill: "#c1900a" } },
        { tag: "circle", attrs: { cx: 34, cy: 22, r: 1.6, fill: "#c1900a" } },
        { tag: "circle", attrs: { cx: 41, cy: 30, r: 1.8, fill: "#c1900a" } },
        { tag: "circle", attrs: { cx: 22, cy: 38, r: 1.6, fill: "#c1900a" } },
        { tag: "circle", attrs: { cx: 30, cy: 42, r: 1.8, fill: "#c1900a" } },
        { tag: "circle", attrs: { cx: 40, cy: 40, r: 1.6, fill: "#c1900a" } },
        { tag: "ellipse", attrs: { cx: 25, cy: 22, rx: 6, ry: 4, fill: "#ffd873", opacity: 0.55 } },
      ],
    },
  ],

  ambientPattern: {
    iconIds: ["modak", "hibiscus", "laddu"],
    count: 26,
    sizeRange: [20, 42],
    opacityRange: [0.12, 0.26],
    rotationRange: [-15, 15],
    seed: "ganesh-chaturthi-ambient",
  },

  heroPattern: {
    iconIds: ["modak", "ganesha-trunk", "hibiscus", "ceremonial-umbrella", "laddu"],
    count: 32,
    sizeRange: [28, 60],
    opacityRange: [0.22, 0.42],
    rotationRange: [-20, 20],
    seed: "ganesh-chaturthi-hero",
  },

  // A golden Ganesha idol resting on a leaf in soft light — verified live on Unsplash (free to use).
  heroPhotoUrl: "https://images.unsplash.com/photo-1610085927744-7217728267a6?w=1600&q=80",
};

export default ganeshChaturthi;
