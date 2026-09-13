import type { FestivalBackgroundConfig } from "./types";

export interface ScatterPlacement {
  iconId: string;
  xPct: number;
  yPct: number;
  size: number;
  rotation: number;
  opacity: number;
}

// Deterministic string -> uint32 hash, used to seed the PRNG below so the
// same `seed` string always produces the same scatter layout.
function hashSeed(seed: string): number {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

// Small, fast, seeded PRNG (mulberry32) — good enough for decorative layout,
// not cryptographic use.
function mulberry32(seed: number): () => number {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function lerp(min: number, max: number, t: number): number {
  return min + (max - min) * t;
}

// Builds a stable scatter of icon placements (percentage-based position so it
// scales with its container) from a background config. Pure function — safe
// to call inside useMemo keyed on the theme id + variant.
export function buildScatterLayout(config: FestivalBackgroundConfig): ScatterPlacement[] {
  const rand = mulberry32(hashSeed(config.seed));
  const placements: ScatterPlacement[] = [];

  for (let i = 0; i < config.count; i++) {
    const iconId = config.iconIds[Math.floor(rand() * config.iconIds.length) % config.iconIds.length];
    placements.push({
      iconId,
      xPct: lerp(2, 96, rand()),
      yPct: lerp(2, 96, rand()),
      size: lerp(config.sizeRange[0], config.sizeRange[1], rand()),
      rotation: lerp(config.rotationRange[0], config.rotationRange[1], rand()),
      opacity: lerp(config.opacityRange[0], config.opacityRange[1], rand()),
    });
  }

  return placements;
}
