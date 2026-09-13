import type { FestivalTheme } from "../types";

const mahaShivaratri: FestivalTheme = {
  id: "maha-shivaratri",
  nameEn: "Maha Shivaratri",
  nameHi: "महा शिवरात्रि",
  taglineEn: "The Great Night of Shiva",
  taglineHi: "शिव की महान रात्रि",
  dateRangeEn: "Late February to Early March",
  dateRangeHi: "फ़रवरी अंत से मार्च आरंभ",

  colors: {
    primary: "#22305a",
    primaryDark: "#141d38",
    soft: "#dbe1f0",
    textOnPrimary: "#fff",
    accent: "#c98a3e",
    accentDark: "#96631f",
    glow: "#9fb4dd",
    gradientFrom: "#0b1330",
    gradientTo: "#2c3f70",
    gradientAngle: 145,
  },

  icons: [
    {
      id: "trishul",
      viewBox: "0 0 64 64",
      label: "Shiva's trident",
      shapes: [
        { tag: "line", attrs: { x1: 32, y1: 20, x2: 32, y2: 58, stroke: "#b7c2de", strokeWidth: 3, strokeLinecap: "round" } },
        { tag: "line", attrs: { x1: 22, y1: 46, x2: 42, y2: 46, stroke: "#8a97b8", strokeWidth: 2.4, strokeLinecap: "round" } },
        { tag: "path", attrs: { d: "M32 6 C 29 12 29 18 32 24 C 35 18 35 12 32 6 Z", fill: "#e6ebf7" } },
        { tag: "path", attrs: { d: "M20 10 C 19 16 21 21 26 24 C 26 18 24 13 20 10 Z", fill: "#c7d1ec" } },
        { tag: "path", attrs: { d: "M44 10 C 45 16 43 21 38 24 C 38 18 40 13 44 10 Z", fill: "#c7d1ec" } },
      ],
    },
    {
      id: "damru",
      viewBox: "0 0 64 64",
      label: "Damru hand drum",
      shapes: [
        { tag: "path", attrs: { d: "M14 18 C 22 24 22 30 14 36 C 20 32 24 28 24 27 C 24 26 20 22 14 18 Z", fill: "#4a5b8c" } },
        { tag: "path", attrs: { d: "M50 18 C 42 24 42 30 50 36 C 44 32 40 28 40 27 C 40 26 44 22 50 18 Z", fill: "#4a5b8c" } },
        { tag: "ellipse", attrs: { cx: 14, cy: 20, rx: 7, ry: 4.2, fill: "#8493c2" } },
        { tag: "ellipse", attrs: { cx: 14, cy: 34, rx: 7, ry: 4.2, fill: "#8493c2" } },
        { tag: "ellipse", attrs: { cx: 50, cy: 20, rx: 7, ry: 4.2, fill: "#8493c2" } },
        { tag: "ellipse", attrs: { cx: 50, cy: 34, rx: 7, ry: 4.2, fill: "#8493c2" } },
        { tag: "line", attrs: { x1: 25.5, y1: 27, x2: 38.5, y2: 27, stroke: "#c98a3e", strokeWidth: 1.6 } },
      ],
    },
    {
      id: "crescent-moon",
      viewBox: "0 0 64 64",
      label: "Crescent moon of the night vigil",
      shapes: [
        { tag: "path", attrs: { d: "M40 12 C 28 12 18 22 18 34 C 18 46 28 56 40 56 C 30 52 24 44 24 34 C 24 24 30 16 40 12 Z", fill: "#e9edf9" } },
        { tag: "circle", attrs: { cx: 46, cy: 20, r: 1.6, fill: "#e9edf9" } },
        { tag: "circle", attrs: { cx: 50, cy: 26, r: 1.1, fill: "#c7d1ec" } },
      ],
    },
    {
      id: "serpent-coil",
      viewBox: "0 0 64 64",
      label: "Coiled serpent",
      shapes: [
        { tag: "path", attrs: { d: "M14 44 C 14 30 24 30 24 38 C 24 44 16 44 18 36 C 20 26 34 26 34 38 C 34 48 20 50 20 40 C 20 32 30 30 34 34", stroke: "#3d6b4a", strokeWidth: 3.2, fill: "none", strokeLinecap: "round" } },
        { tag: "path", attrs: { d: "M34 34 C 38 28 44 26 46 20", stroke: "#3d6b4a", strokeWidth: 3.2, fill: "none", strokeLinecap: "round" } },
        { tag: "path", attrs: { d: "M46 20 C 42 18 40 14 42 10 C 45 12 48 12 50 9 C 51 13 50 17 46 20 Z", fill: "#4d7f5c" } },
        { tag: "circle", attrs: { cx: 47, cy: 13, r: 0.9, fill: "#0b1330" } },
        { tag: "circle", attrs: { cx: 14, cy: 44, r: 2.6, fill: "#4d7f5c" } },
      ],
    },
    {
      id: "shiva-lingam",
      viewBox: "0 0 64 64",
      label: "Shiva lingam with bilva leaves",
      shapes: [
        { tag: "ellipse", attrs: { cx: 32, cy: 50, rx: 20, ry: 6, fill: "#3a4670" } },
        { tag: "path", attrs: { d: "M16 50 C 16 50 16 40 20 36 L 44 36 C 48 40 48 50 48 50 Z", fill: "#5a6796" } },
        { tag: "path", attrs: { d: "M24 36 C 24 22 28 14 32 10 C 36 14 40 22 40 36 Z", fill: "#c7d1ec" } },
        { tag: "path", attrs: { d: "M32 12 L 24 30 L 32 26 L 40 30 Z", fill: "#3d6b4a" } },
        { tag: "path", attrs: { d: "M18 44 C 18 42 22 38 26 40", stroke: "#e9edf9", strokeWidth: 1.4, fill: "none", strokeLinecap: "round" } },
        { tag: "circle", attrs: { cx: 32, cy: 20, r: 1.4, fill: "#c98a3e" } },
      ],
    },
    {
      id: "rudraksha-mala",
      viewBox: "0 0 64 64",
      label: "Rudraksha bead strand",
      shapes: [
        { tag: "path", attrs: { d: "M16 20 C 16 40 24 54 32 56 C 40 54 48 40 48 20", stroke: "#6b5a3e", strokeWidth: 1.6, fill: "none" } },
        { tag: "circle", attrs: { cx: 16, cy: 20, r: 4, fill: "#8a6f45" } },
        { tag: "circle", attrs: { cx: 18.4, cy: 30, r: 4, fill: "#8a6f45" } },
        { tag: "circle", attrs: { cx: 23.2, cy: 40, r: 4, fill: "#8a6f45" } },
        { tag: "circle", attrs: { cx: 32, cy: 47, r: 4.4, fill: "#c98a3e" } },
        { tag: "circle", attrs: { cx: 40.8, cy: 40, r: 4, fill: "#8a6f45" } },
        { tag: "circle", attrs: { cx: 45.6, cy: 30, r: 4, fill: "#8a6f45" } },
        { tag: "circle", attrs: { cx: 48, cy: 20, r: 4, fill: "#8a6f45" } },
      ],
    },
    {
      id: "vigil-flame",
      viewBox: "0 0 64 64",
      label: "Blue-tinted night vigil flame",
      shapes: [
        { tag: "ellipse", attrs: { cx: 32, cy: 52, rx: 12, ry: 4, fill: "#2c3f70" } },
        { tag: "path", attrs: { d: "M22 48 C 20 40 26 36 32 36 C 38 36 44 40 42 48 Z", fill: "#3a4670" } },
        { tag: "path", attrs: { d: "M32 14 C 26 24 24 32 32 38 C 40 32 38 24 32 14 Z", fill: "#7d9ce0" } },
        { tag: "path", attrs: { d: "M32 22 C 29 27 28 31 32 34 C 36 31 35 27 32 22 Z", fill: "#cfe0ff" } },
      ],
    },
  ],

  ambientPattern: {
    iconIds: ["crescent-moon", "rudraksha-mala", "serpent-coil", "vigil-flame"],
    count: 19,
    sizeRange: [18, 40],
    opacityRange: [0.05, 0.13],
    rotationRange: [-12, 12],
    seed: "maha-shivaratri-ambient",
  },

  heroPattern: {
    iconIds: ["trishul", "damru", "crescent-moon", "serpent-coil", "shiva-lingam", "rudraksha-mala", "vigil-flame"],
    count: 24,
    sizeRange: [26, 58],
    opacityRange: [0.12, 0.24],
    rotationRange: [-16, 16],
    seed: "maha-shivaratri-hero",
  },
};

export default mahaShivaratri;
