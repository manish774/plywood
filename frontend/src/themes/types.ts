// Shared contract for site-wide Hindu festival themes. Every visual fact is
// plain data (hex strings, numbers, SVG-attribute object literals) — no JSX —
// so a theme can be authored in isolation and any mistake is a type error,
// not a broken render.

export type FestivalShapeTag = "path" | "circle" | "ellipse" | "polygon" | "rect" | "line" | "g";

// One SVG primitive. `attrs` are raw SVG attributes (d, fill, cx, cy, r,
// points, opacity, stroke, strokeWidth...) passed through verbatim — author
// them exactly as you would hand-write an <svg> child. `tag: "g"` may nest
// `children` to group + transform a cluster of shapes as one unit.
export interface FestivalShape {
  tag: FestivalShapeTag;
  attrs: Record<string, string | number>;
  children?: FestivalShape[];
}

// One self-contained decorative icon (e.g. "diya", "kite", "trishul").
export interface FestivalIcon {
  id: string;
  viewBox: string;
  shapes: FestivalShape[];
  label?: string;
}

// A scatter/background instruction: which icons, how many, how varied. The
// shared layout builder (themes/layout.ts) turns this into a deterministic
// placement list via a seeded PRNG — same seed always produces the same
// layout, so it isn't re-randomized on every render.
export interface FestivalBackgroundConfig {
  iconIds: string[];
  count: number;
  sizeRange: [number, number];
  opacityRange: [number, number];
  rotationRange: [number, number];
  seed: string;
}

export interface FestivalColors {
  primary: string; // -> --accent site-wide
  primaryDark: string; // -> --accent-hover
  soft: string; // -> --accent-soft
  textOnPrimary: string; // "#fff" or a dark hex -> --accent-ink (button text contrast)
  accent: string; // secondary/gold pop color -> --amber
  accentDark: string; // -> --amber-hover
  glow: string; // banner/hero decorative glow only
  gradientFrom: string; // banner/hero gradient only
  gradientTo: string;
  gradientAngle: number;
}

export interface FestivalTheme {
  id: string;
  nameEn: string;
  nameHi: string;
  taglineEn: string;
  taglineHi: string;
  dateRangeEn: string;
  dateRangeHi: string;
  colors: FestivalColors;
  icons: FestivalIcon[];
  ambientPattern: FestivalBackgroundConfig;
  heroPattern: FestivalBackgroundConfig;
  heroPhotoUrl?: string;
}

export type FestivalThemeId =
  | "none"
  | "makar-sankranti"
  | "vasant-panchami"
  | "maha-shivaratri"
  | "holi"
  | "ugadi-gudi-padwa"
  | "ram-navami"
  | "akshaya-tritiya"
  | "guru-purnima"
  | "raksha-bandhan"
  | "krishna-janmashtami"
  | "ganesh-chaturthi"
  | "durga-puja-navaratri"
  | "diwali";
