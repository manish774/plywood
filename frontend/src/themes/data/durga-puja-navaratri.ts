import type { FestivalTheme } from "../types";

const durgaPujaNavaratri: FestivalTheme = {
  id: "durga-puja-navaratri",
  nameEn: "Durga Puja & Navaratri",
  nameHi: "दुर्गा पूजा और नवरात्रि",
  taglineEn: "Nine Nights, Victory of Good",
  taglineHi: "नौ रातें, अच्छाई की जीत",
  dateRangeEn: "Late September to Mid-October (Ashwin Shukla Paksha, Dussehra on Day 10)",
  dateRangeHi: "अश्विन शुक्ल पक्ष, विजयदशमी (दशहरा) दसवें दिन",

  colors: {
    primary: "#8a1128",
    primaryDark: "#5c0b1a",
    soft: "#f5dde1",
    textOnPrimary: "#fff",
    accent: "#c8992c",
    accentDark: "#9c7620",
    glow: "#e3b34c",
    gradientFrom: "#38050f",
    gradientTo: "#8a1128",
    gradientAngle: 140,
  },

  icons: [
    {
      id: "trishul",
      viewBox: "0 0 64 64",
      label: "Trishul, Durga's trident",
      shapes: [
        { tag: "line", attrs: { x1: 32, y1: 58, x2: 32, y2: 22, stroke: "#c8992c", strokeWidth: 3.4, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 19, y1: 30, x2: 45, y2: 30, stroke: "#c8992c", strokeWidth: 3, strokeLinecap: "round" } },
        { tag: "path", attrs: { d: "M32 22 C 30 16 26 10 19 5", stroke: "#8a1128", strokeWidth: 3.2, fill: "none", strokeLinecap: "round" } },
        { tag: "path", attrs: { d: "M32 22 C 32 15 32 9 32 3", stroke: "#8a1128", strokeWidth: 3.2, fill: "none", strokeLinecap: "round" } },
        { tag: "path", attrs: { d: "M32 22 C 34 16 38 10 45 5", stroke: "#8a1128", strokeWidth: 3.2, fill: "none", strokeLinecap: "round" } },
        { tag: "circle", attrs: { cx: 32, cy: 30, r: 2.6, fill: "#e3b34c" } },
      ],
    },
    {
      id: "dandiya-crossed",
      viewBox: "0 0 64 64",
      label: "Crossed dandiya sticks",
      shapes: [
        { tag: "line", attrs: { x1: 48.97, y1: 15.03, x2: 15.03, y2: 48.97, stroke: "#c8992c", strokeWidth: 5, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 15.03, y1: 15.03, x2: 48.97, y2: 48.97, stroke: "#8a1128", strokeWidth: 5, strokeLinecap: "round" } },
        { tag: "circle", attrs: { cx: 32, cy: 32, r: 3.2, fill: "#e3b34c" } },
        { tag: "circle", attrs: { cx: 48.97, cy: 15.03, r: 2.6, fill: "#5c0b1a" } },
        { tag: "circle", attrs: { cx: 15.03, cy: 48.97, r: 2.6, fill: "#5c0b1a" } },
        { tag: "circle", attrs: { cx: 15.03, cy: 15.03, r: 2.6, fill: "#9c7620" } },
        { tag: "circle", attrs: { cx: 48.97, cy: 48.97, r: 2.6, fill: "#9c7620" } },
      ],
    },
    {
      id: "durga-lion",
      viewBox: "0 0 64 64",
      label: "Durga's lion vahana, mane motif",
      shapes: [
        { tag: "polygon", attrs: { points: "32,4 38,14 48,8 46,20 58,20 48,28 56,38 44,34 42,46 34,38 32,50 30,38 22,46 20,34 8,38 16,28 6,20 18,20 16,8 26,14", fill: "#a3701f" } },
        { tag: "circle", attrs: { cx: 32, cy: 32, r: 14, fill: "#e0b35c" } },
        { tag: "ellipse", attrs: { cx: 26, cy: 30, rx: 2.2, ry: 3, fill: "#3a1c0a" } },
        { tag: "ellipse", attrs: { cx: 38, cy: 30, rx: 2.2, ry: 3, fill: "#3a1c0a" } },
        { tag: "circle", attrs: { cx: 32, cy: 33, r: 1.6, fill: "#3a1c0a" } },
        { tag: "path", attrs: { d: "M29 36 Q 32 39 35 36", stroke: "#3a1c0a", strokeWidth: 1.6, fill: "none", strokeLinecap: "round" } },
      ],
    },
    {
      id: "lotus",
      viewBox: "0 0 64 64",
      label: "Lotus flower",
      shapes: [
        { tag: "ellipse", attrs: { cx: 32, cy: 46, rx: 16, ry: 4, fill: "#7a8c3c" } },
        { tag: "path", attrs: { d: "M32 46 C 20 40 16 28 24 18 C 27 26 30 34 32 46 Z", fill: "#b83d51" } },
        { tag: "path", attrs: { d: "M32 46 C 44 40 48 28 40 18 C 37 26 34 34 32 46 Z", fill: "#d66678" } },
        { tag: "path", attrs: { d: "M32 46 C 24 36 24 24 32 12 C 40 24 40 36 32 46 Z", fill: "#ec8b9a" } },
        { tag: "path", attrs: { d: "M32 46 C 26 38 28 30 32 24 C 36 30 38 38 32 46 Z", fill: "#fbe4e8" } },
        { tag: "circle", attrs: { cx: 32, cy: 30, r: 4, fill: "#c8992c" } },
      ],
    },
    {
      id: "dhak-drum",
      viewBox: "0 0 64 64",
      label: "Dhak, the ceremonial Durga Puja drum",
      shapes: [
        { tag: "path", attrs: { d: "M18 22 L46 22 L42 46 L22 46 Z", fill: "#7a3b1a" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 22, rx: 14, ry: 5, fill: "#c98a4a" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 46, rx: 10, ry: 4, fill: "#5c2b10" } },
        { tag: "line", attrs: { x1: 20, y1: 26, x2: 44, y2: 26, stroke: "#3a1c0a", strokeWidth: 1.4 } },
        { tag: "line", attrs: { x1: 21, y1: 32, x2: 43, y2: 32, stroke: "#3a1c0a", strokeWidth: 1.4 } },
        { tag: "line", attrs: { x1: 22, y1: 38, x2: 42, y2: 38, stroke: "#3a1c0a", strokeWidth: 1.4 } },
        { tag: "path", attrs: { d: "M12 10 L20 24", stroke: "#e3b34c", strokeWidth: 2.4, strokeLinecap: "round" } },
        { tag: "path", attrs: { d: "M52 10 L44 24", stroke: "#e3b34c", strokeWidth: 2.4, strokeLinecap: "round" } },
      ],
    },
    {
      id: "bow-arrow",
      viewBox: "0 0 64 64",
      label: "Bow and arrow, Ram's weapon for Dussehra",
      shapes: [
        { tag: "path", attrs: { d: "M22 8 C 12 24 12 40 22 56", stroke: "#8a5a1f", strokeWidth: 3, fill: "none", strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 22, y1: 8, x2: 22, y2: 56, stroke: "#e8e0c8", strokeWidth: 1.4 } },
        { tag: "line", attrs: { x1: 14, y1: 32, x2: 50, y2: 32, stroke: "#8a1128", strokeWidth: 2.4, strokeLinecap: "round" } },
        { tag: "path", attrs: { d: "M50 32 L44 27 L44 37 Z", fill: "#c8992c" } },
        { tag: "path", attrs: { d: "M14 32 L20 28 M14 32 L20 36", stroke: "#8a1128", strokeWidth: 2, fill: "none", strokeLinecap: "round" } },
      ],
    },
  ],

  ambientPattern: {
    iconIds: ["lotus", "dandiya-crossed", "trishul"],
    count: 26,
    sizeRange: [20, 42],
    opacityRange: [0.12, 0.26],
    rotationRange: [-15, 15],
    seed: "durga-puja-navaratri-ambient",
  },

  heroPattern: {
    iconIds: ["trishul", "dandiya-crossed", "durga-lion", "lotus", "dhak-drum", "bow-arrow"],
    count: 32,
    sizeRange: [26, 60],
    opacityRange: [0.22, 0.42],
    rotationRange: [-20, 20],
    seed: "durga-puja-navaratri-hero",
  },

  // An ornately decorated Durga idol — verified live on Unsplash (free to use).
  heroPhotoUrl: "https://images.unsplash.com/photo-1616074385287-67f6fb9e9eb8?w=1600&q=80",
};

export default durgaPujaNavaratri;
