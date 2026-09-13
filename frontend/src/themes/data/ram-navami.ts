import type { FestivalTheme } from "../types";

const ramNavami: FestivalTheme = {
  id: "ram-navami",
  nameEn: "Ram Navami",
  nameHi: "राम नवमी",
  taglineEn: "Birth of the Ideal King",
  taglineHi: "मर्यादा पुरुषोत्तम का जन्मोत्सव",
  dateRangeEn: "March to April (Chaitra Shukla Navami)",
  dateRangeHi: "मार्च से अप्रैल (चैत्र शुक्ल नवमी)",

  colors: {
    primary: "#232c6b",
    primaryDark: "#161c47",
    soft: "#dfe1f2",
    textOnPrimary: "#fff",
    accent: "#e59a2e",
    accentDark: "#b8760f",
    glow: "#ffcf7a",
    gradientFrom: "#161c47",
    gradientTo: "#8a4a12",
    gradientAngle: 135,
  },

  icons: [
    {
      id: "bow-arrow",
      viewBox: "0 0 64 64",
      label: "Rama's bow and drawn arrow",
      shapes: [
        { tag: "path", attrs: { d: "M16 8 C 10 20 10 44 16 56", stroke: "#5a3a1a", strokeWidth: 3.4, fill: "none", strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 16, y1: 8, x2: 16, y2: 56, stroke: "#caa15a", strokeWidth: 1.4 } },
        { tag: "line", attrs: { x1: 16, y1: 32, x2: 54, y2: 32, stroke: "#8a5a24", strokeWidth: 2.2, strokeLinecap: "round" } },
        { tag: "path", attrs: { d: "M54 32 L 44 27 L 47 32 L 44 37 Z", fill: "#8a5a24" } },
        { tag: "circle", attrs: { cx: 16, cy: 32, r: 2.4, fill: "#e59a2e" } },
      ],
    },
    {
      id: "temple-spire",
      viewBox: "0 0 64 64",
      label: "Temple shikhara silhouette",
      shapes: [
        { tag: "path", attrs: { d: "M32 6 L 40 26 L 24 26 Z", fill: "#232c6b" } },
        { tag: "path", attrs: { d: "M32 6 L 32 26", stroke: "#e59a2e", strokeWidth: 1.2 } },
        { tag: "circle", attrs: { cx: 32, cy: 6, r: 2.4, fill: "#e59a2e" } },
        { tag: "rect", attrs: { x: 20, y: 26, width: 24, height: 8, fill: "#2f3a82" } },
        { tag: "path", attrs: { d: "M16 54 L 16 36 L 48 36 L 48 54 Z", fill: "#3a458f" } },
        { tag: "path", attrs: { d: "M12 54 L 52 54 L 52 58 L 12 58 Z", fill: "#161c47" } },
        { tag: "rect", attrs: { x: 28, y: 42, width: 8, height: 12, fill: "#161c47" } },
        { tag: "path", attrs: { d: "M32 42 A 4 4 0 0 1 36 46 L 28 46 A 4 4 0 0 1 32 42 Z", fill: "#161c47" } },
      ],
    },
    {
      id: "royal-crown",
      viewBox: "0 0 64 64",
      label: "Prince Rama's crown",
      shapes: [
        { tag: "path", attrs: { d: "M14 42 L 16 24 L 26 34 L 32 20 L 38 34 L 48 24 L 50 42 Z", fill: "#e59a2e" } },
        { tag: "rect", attrs: { x: 14, y: 42, width: 36, height: 8, rx: 1.5, fill: "#c17f1f" } },
        { tag: "circle", attrs: { cx: 32, cy: 20, r: 3, fill: "#b8323f" } },
        { tag: "circle", attrs: { cx: 16, cy: 24, r: 2.4, fill: "#5470c9" } },
        { tag: "circle", attrs: { cx: 48, cy: 24, r: 2.4, fill: "#5470c9" } },
        { tag: "circle", attrs: { cx: 32, cy: 46, r: 2.2, fill: "#fff6df" } },
      ],
    },
    {
      id: "lotus",
      viewBox: "0 0 64 64",
      label: "Sacred lotus bloom",
      shapes: [
        { tag: "path", attrs: { d: "M32 44 C 24 40 20 30 24 20 C 27 28 30 34 32 38 C 34 34 37 28 40 20 C 44 30 40 40 32 44 Z", fill: "#e8547a" } },
        { tag: "path", attrs: { d: "M32 44 C 26 38 14 36 8 40 C 14 44 22 46 32 44 Z", fill: "#f2789a" } },
        { tag: "path", attrs: { d: "M32 44 C 38 38 50 36 56 40 C 50 44 42 46 32 44 Z", fill: "#f2789a" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 46, rx: 10, ry: 3.4, fill: "#3a7a3f" } },
        { tag: "circle", attrs: { cx: 32, cy: 38, r: 3, fill: "#e59a2e" } },
      ],
    },
    {
      id: "tulsi-leaf",
      viewBox: "0 0 64 64",
      label: "Tulsi (holy basil) sprig",
      shapes: [
        { tag: "path", attrs: { d: "M32 54 L 32 22", stroke: "#3a6b2f", strokeWidth: 2, fill: "none" } },
        { tag: "path", attrs: { d: "M32 34 C 20 30 16 18 22 10 C 30 16 32 26 32 34 Z", fill: "#4c8a3f" } },
        { tag: "path", attrs: { d: "M32 34 C 44 30 48 18 42 10 C 34 16 32 26 32 34 Z", fill: "#3a6b2f" } },
        { tag: "path", attrs: { d: "M32 22 C 24 18 22 10 26 4 C 32 8 33 16 32 22 Z", fill: "#5c9a4a" } },
      ],
    },
  ],

  ambientPattern: {
    iconIds: ["bow-arrow", "lotus", "tulsi-leaf"],
    count: 26,
    sizeRange: [20, 42],
    opacityRange: [0.05, 0.12],
    rotationRange: [-15, 15],
    seed: "ram-navami-ambient",
  },

  heroPattern: {
    iconIds: ["bow-arrow", "temple-spire", "royal-crown", "lotus", "tulsi-leaf"],
    count: 32,
    sizeRange: [26, 60],
    opacityRange: [0.22, 0.42],
    rotationRange: [-18, 18],
    seed: "ram-navami-hero",
  },

  // An arrow struck dead-center in an archery target — verified live on Unsplash (free to use).
  heroPhotoUrl: "https://images.unsplash.com/photo-1666816584311-ba40d5299760?w=1600&q=80",
};

export default ramNavami;
