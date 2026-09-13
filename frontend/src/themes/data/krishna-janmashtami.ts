import type { FestivalTheme } from "../types";

const krishnaJanmashtami: FestivalTheme = {
  id: "krishna-janmashtami",
  nameEn: "Krishna Janmashtami",
  nameHi: "कृष्ण जन्माष्टमी",
  taglineEn: "Birth of the Divine Cowherd",
  taglineHi: "दिव्य गोपाल का जन्मोत्सव",
  dateRangeEn: "August / September — 8th day of Krishna Paksha, Bhadrapada",
  dateRangeHi: "अगस्त / सितंबर — भाद्रपद कृष्ण पक्ष अष्टमी",

  colors: {
    primary: "#1b3a6b",
    primaryDark: "#0f2547",
    soft: "#dbe4f5",
    textOnPrimary: "#fff",
    accent: "#e8b923",
    accentDark: "#b8890f",
    glow: "#4fd3c4",
    gradientFrom: "#0f2547",
    gradientTo: "#1a6b63",
    gradientAngle: 135,
  },

  icons: [
    {
      id: "peacock-feather",
      viewBox: "0 0 64 64",
      label: "Peacock feather",
      shapes: [
        { tag: "line", attrs: { x1: 32, y1: 58, x2: 32, y2: 32, stroke: "#3f6b2b", strokeWidth: 2, strokeLinecap: "round" } },
        { tag: "path", attrs: { d: "M32 8 C 18 15 14 28 21 37 C 25 42 39 42 43 37 C 50 28 46 15 32 8 Z", fill: "#2f8f6b" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 22, rx: 13, ry: 17, fill: "#16305c" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 22, rx: 10, ry: 13, fill: "#1f7a6c" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 22, rx: 7, ry: 9, fill: "#e8b923" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 22, rx: 4, ry: 5.5, fill: "#16305c" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 22, rx: 1.6, ry: 2.2, fill: "#0a1830" } },
      ],
    },
    {
      id: "bansuri",
      viewBox: "0 0 64 64",
      label: "Bansuri flute",
      shapes: [
        { tag: "rect", attrs: { x: 8, y: 29, width: 48, height: 6, rx: 3, fill: "#c9974a" } },
        { tag: "rect", attrs: { x: 9, y: 27, width: 3, height: 10, fill: "#5c3416" } },
        { tag: "rect", attrs: { x: 52, y: 27, width: 3, height: 10, fill: "#5c3416" } },
        { tag: "circle", attrs: { cx: 20, cy: 32, r: 1.3, fill: "#3a2410" } },
        { tag: "circle", attrs: { cx: 26, cy: 32, r: 1.3, fill: "#3a2410" } },
        { tag: "circle", attrs: { cx: 32, cy: 32, r: 1.3, fill: "#3a2410" } },
        { tag: "circle", attrs: { cx: 38, cy: 32, r: 1.3, fill: "#3a2410" } },
        { tag: "circle", attrs: { cx: 44, cy: 32, r: 1.3, fill: "#3a2410" } },
        { tag: "path", attrs: { d: "M8 30 C 4 34 4 38 8 42", stroke: "#2f8f6b", strokeWidth: 1.6, fill: "none", strokeLinecap: "round" } },
      ],
    },
    {
      id: "matki",
      viewBox: "0 0 64 64",
      label: "Butter pot (matki)",
      shapes: [
        { tag: "path", attrs: { d: "M20 30 C 16 30 15 35 18 41 C 21 49 26 55 32 55 C 38 55 43 49 46 41 C 49 35 48 30 44 30 Z", fill: "#a85c3f" } },
        { tag: "rect", attrs: { x: 27, y: 21, width: 10, height: 10, fill: "#a85c3f" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 21, rx: 7, ry: 3, fill: "#8c4a30" } },
        { tag: "path", attrs: { d: "M19 36 C 26 40 38 40 45 36", stroke: "#6b3722", strokeWidth: 1.4, fill: "none", strokeLinecap: "round" } },
        { tag: "circle", attrs: { cx: 32, cy: 16, r: 5.5, fill: "#fff2b8" } },
        { tag: "ellipse", attrs: { cx: 30, cy: 14, rx: 2, ry: 1.4, fill: "#fffde0" } },
      ],
    },
    {
      id: "lotus",
      viewBox: "0 0 64 64",
      label: "Lotus flower",
      shapes: [
        { tag: "path", attrs: { d: "M32 44 C 26 44 20 48 18 54 C 26 52 38 52 46 54 C 44 48 38 44 32 44 Z", fill: "#2f8f6b" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 30, rx: 5, ry: 15, fill: "#f4a6c1", transform: "rotate(0 32 38)" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 30, rx: 5, ry: 15, fill: "#fff0f5", transform: "rotate(40 32 38)" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 30, rx: 5, ry: 15, fill: "#f4a6c1", transform: "rotate(80 32 38)" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 30, rx: 5, ry: 15, fill: "#fff0f5", transform: "rotate(-40 32 38)" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 30, rx: 5, ry: 15, fill: "#f4a6c1", transform: "rotate(-80 32 38)" } },
        { tag: "circle", attrs: { cx: 32, cy: 38, r: 6, fill: "#e8b923" } },
      ],
    },
    {
      id: "mukut",
      viewBox: "0 0 64 64",
      label: "Krishna's crown (mukut) with peacock feather",
      shapes: [
        { tag: "polygon", attrs: { points: "8,50 12,30 20,38 32,20 44,38 52,30 56,50", fill: "#e8b923" } },
        { tag: "rect", attrs: { x: 8, y: 48, width: 48, height: 8, rx: 2, fill: "#b8890f" } },
        { tag: "circle", attrs: { cx: 32, cy: 44, r: 3, fill: "#c0392b" } },
        { tag: "circle", attrs: { cx: 20, cy: 46, r: 2, fill: "#1f7a6c" } },
        { tag: "circle", attrs: { cx: 44, cy: 46, r: 2, fill: "#1f7a6c" } },
        { tag: "ellipse", attrs: { cx: 32, cy: 14, rx: 4, ry: 9, fill: "#2f8f6b" } },
        { tag: "circle", attrs: { cx: 32, cy: 12, r: 2.6, fill: "#16305c" } },
        { tag: "circle", attrs: { cx: 32, cy: 12, r: 1, fill: "#e8b923" } },
      ],
    },
  ],

  ambientPattern: {
    iconIds: ["peacock-feather", "lotus", "matki"],
    count: 26,
    sizeRange: [20, 42],
    opacityRange: [0.05, 0.12],
    rotationRange: [-15, 15],
    seed: "krishna-janmashtami-ambient",
  },

  heroPattern: {
    iconIds: ["peacock-feather", "bansuri", "matki", "lotus", "mukut"],
    count: 32,
    sizeRange: [28, 60],
    opacityRange: [0.22, 0.42],
    rotationRange: [-20, 20],
    seed: "krishna-janmashtami-hero",
  },

  heroPhotoUrl: "https://images.unsplash.com/photo-1703736417070-fbb012b10007?w=1600&q=80",
};

export default krishnaJanmashtami;
