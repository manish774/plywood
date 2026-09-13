import type { FestivalTheme } from "../types";

const holi: FestivalTheme = {
  id: "holi",
  nameEn: "Holi",
  nameHi: "होली",
  taglineEn: "Festival of Colors",
  taglineHi: "रंगों का त्योहार",
  dateRangeEn: "March (Phalguna Purnima)",
  dateRangeHi: "मार्च (फाल्गुन पूर्णिमा)",

  colors: {
    primary: "#e6007e",
    primaryDark: "#b3005f",
    soft: "#fce4f0",
    textOnPrimary: "#fff",
    accent: "#ffb300",
    accentDark: "#cc8f00",
    glow: "#ff6f91",
    gradientFrom: "#e6007e",
    gradientTo: "#ffcc00",
    gradientAngle: 120,
  },

  icons: [
    {
      id: "splash-magenta",
      viewBox: "0 0 64 64",
      label: "Magenta gulal powder splash",
      shapes: [
        { tag: "path", attrs: { d: "M20 32 C 14 24 20 14 30 16 C 38 10 48 16 46 26 C 54 30 50 42 40 42 C 38 50 24 50 20 42 C 10 40 12 32 20 32 Z", fill: "#e6007e" } },
        { tag: "circle", attrs: { cx: 10, cy: 20, r: 3.2, fill: "#e6007e" } },
        { tag: "circle", attrs: { cx: 54, cy: 14, r: 2.4, fill: "#e6007e" } },
        { tag: "circle", attrs: { cx: 50, cy: 50, r: 2.8, fill: "#e6007e" } },
        { tag: "circle", attrs: { cx: 12, cy: 48, r: 2, fill: "#e6007e" } },
      ],
    },
    {
      id: "splash-yellow",
      viewBox: "0 0 64 64",
      label: "Golden yellow gulal powder splash",
      shapes: [
        { tag: "path", attrs: { d: "M24 30 C 16 26 16 14 28 14 C 32 6 46 8 46 18 C 56 20 54 34 44 34 C 46 44 32 50 26 42 C 14 42 14 32 24 30 Z", fill: "#ffd400" } },
        { tag: "circle", attrs: { cx: 8, cy: 16, r: 2.6, fill: "#ffd400" } },
        { tag: "circle", attrs: { cx: 56, cy: 40, r: 3, fill: "#ffd400" } },
        { tag: "circle", attrs: { cx: 44, cy: 54, r: 2.2, fill: "#ffd400" } },
      ],
    },
    {
      id: "splash-green",
      viewBox: "0 0 64 64",
      label: "Green gulal powder splash",
      shapes: [
        { tag: "path", attrs: { d: "M22 34 C 12 30 14 18 24 18 C 28 10 42 12 42 22 C 52 24 52 38 40 38 C 40 48 26 50 22 40 C 12 42 12 34 22 34 Z", fill: "#22c55e" } },
        { tag: "circle", attrs: { cx: 52, cy: 16, r: 2.6, fill: "#22c55e" } },
        { tag: "circle", attrs: { cx: 10, cy: 46, r: 3, fill: "#22c55e" } },
        { tag: "circle", attrs: { cx: 50, cy: 52, r: 2, fill: "#22c55e" } },
      ],
    },
    {
      id: "splash-blue",
      viewBox: "0 0 64 64",
      label: "Blue gulal powder splash",
      shapes: [
        { tag: "path", attrs: { d: "M26 28 C 16 26 14 14 26 14 C 30 6 44 10 42 20 C 52 22 50 36 40 34 C 42 44 28 48 24 38 C 14 40 16 30 26 28 Z", fill: "#2196f3" } },
        { tag: "circle", attrs: { cx: 54, cy: 30, r: 2.8, fill: "#2196f3" } },
        { tag: "circle", attrs: { cx: 12, cy: 18, r: 2.2, fill: "#2196f3" } },
        { tag: "circle", attrs: { cx: 40, cy: 54, r: 2.6, fill: "#2196f3" } },
      ],
    },
    {
      id: "pichkari",
      viewBox: "0 0 64 64",
      label: "Pichkari water gun spraying colors",
      shapes: [
        { tag: "rect", attrs: { x: 14, y: 29, width: 8, height: 6, rx: 1.5, fill: "#8a4b1f" } },
        { tag: "rect", attrs: { x: 22, y: 25, width: 20, height: 12, rx: 4, fill: "#2f855a" } },
        { tag: "rect", attrs: { x: 42, y: 28, width: 12, height: 5, rx: 2, fill: "#1a6f46" } },
        { tag: "path", attrs: { d: "M28 37 L26 44 L32 42 Z", fill: "#1a6f46" } },
        { tag: "circle", attrs: { cx: 58, cy: 26, r: 2.4, fill: "#e6007e" } },
        { tag: "circle", attrs: { cx: 61, cy: 32, r: 1.8, fill: "#ffd400" } },
        { tag: "circle", attrs: { cx: 57, cy: 36, r: 2, fill: "#2196f3" } },
        { tag: "circle", attrs: { cx: 62, cy: 21, r: 1.4, fill: "#22c55e" } },
      ],
    },
    {
      id: "colored-handprint",
      viewBox: "0 0 64 64",
      label: "Handprint made of colored powder",
      shapes: [
        { tag: "ellipse", attrs: { cx: 32, cy: 40, rx: 12, ry: 14, fill: "#ff2e7e" } },
        { tag: "ellipse", attrs: { cx: 14, cy: 34, rx: 4, ry: 9, fill: "#ff2e7e", transform: "rotate(-40 14 34)" } },
        { tag: "ellipse", attrs: { cx: 20, cy: 20, rx: 4, ry: 10, fill: "#ff2e7e", transform: "rotate(-15 20 20)" } },
        { tag: "ellipse", attrs: { cx: 27, cy: 15, rx: 4, ry: 11, fill: "#ff2e7e", transform: "rotate(-5 27 15)" } },
        { tag: "ellipse", attrs: { cx: 35, cy: 14, rx: 4, ry: 11, fill: "#ff2e7e", transform: "rotate(5 35 14)" } },
        { tag: "ellipse", attrs: { cx: 42, cy: 17, rx: 4, ry: 10, fill: "#ff2e7e", transform: "rotate(15 42 17)" } },
        { tag: "circle", attrs: { cx: 20, cy: 20, r: 2, fill: "#ffd400" } },
        { tag: "circle", attrs: { cx: 35, cy: 14, r: 2, fill: "#2196f3" } },
        { tag: "circle", attrs: { cx: 42, cy: 17, r: 1.8, fill: "#22c55e" } },
      ],
    },
    {
      id: "holika-bonfire",
      viewBox: "0 0 64 64",
      label: "Holika Dahan bonfire",
      shapes: [
        { tag: "path", attrs: { d: "M14 52 L50 52 L46 48 L18 48 Z", fill: "#7a4a25" } },
        { tag: "path", attrs: { d: "M18 48 L46 48 L42 44 L22 44 Z", fill: "#8a5a30" } },
        { tag: "path", attrs: { d: "M32 44 C 24 38 22 28 32 16 C 42 28 40 38 32 44 Z", fill: "#ff6b1a" } },
        { tag: "path", attrs: { d: "M32 40 C 27 35 26 29 32 20 C 38 29 37 35 32 40 Z", fill: "#ffb020" } },
        { tag: "path", attrs: { d: "M32 37 C 29 33 29 29 32 24 C 35 29 35 33 32 37 Z", fill: "#fff2b0" } },
      ],
    },
  ],

  ambientPattern: {
    iconIds: ["splash-magenta", "splash-yellow", "splash-green", "splash-blue", "colored-handprint"],
    count: 22,
    sizeRange: [18, 42],
    opacityRange: [0.06, 0.16],
    rotationRange: [-25, 25],
    seed: "holi-ambient",
  },

  heroPattern: {
    iconIds: ["splash-magenta", "splash-yellow", "splash-green", "splash-blue", "pichkari", "colored-handprint", "holika-bonfire"],
    count: 30,
    sizeRange: [26, 60],
    opacityRange: [0.14, 0.3],
    rotationRange: [-30, 30],
    seed: "holi-hero",
  },
};

export default holi;
