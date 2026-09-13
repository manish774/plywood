import { useMemo, type CSSProperties } from "react";
import { useSettings } from "../../context/SettingsContext";
import { FESTIVAL_THEMES } from "../../themes";
import type { FestivalTheme } from "../../themes/types";

export interface FestivalThemeResult {
  theme: FestivalTheme | null;
  style: CSSProperties;
}

// Looks up the admin-selected festival theme and turns it into an inline
// style object re-skinning the two accent-token pairs (--accent/--amber and
// their hover/soft/ink companions), tinting the neumorphic surface/shadow
// tokens (--bg/--bg-alt/--bg-panel/--neu-light/--neu-dark) toward the
// theme's primary hue so every card and shadow across the site picks up the
// festival's color, and setting the banner/hero gradient vars. `color-mix(...,
// var(--x))` blends the theme color INTO whatever --x is already cascaded
// from :root, so this adapts automatically to light/dark mode instead of
// hardcoding one scheme's values. The caller applies `style` to a wrapper
// div scoped to the public site only (see PublicLayout) so the admin panel
// — which never renders that wrapper — is never affected.
export function useFestivalTheme(): FestivalThemeResult {
  const { settings } = useSettings();

  return useMemo(() => {
    const theme = FESTIVAL_THEMES[settings.festivalTheme || "none"] || null;
    if (!theme) return { theme: null, style: {} };

    const { primary } = theme.colors;

    const style = {
      "--accent": theme.colors.primary,
      "--accent-hover": theme.colors.primaryDark,
      "--accent-soft": theme.colors.soft,
      "--accent-ink": theme.colors.textOnPrimary,
      "--amber": theme.colors.accent,
      "--amber-hover": theme.colors.accentDark,
      "--bg": `color-mix(in srgb, ${primary} 10%, var(--bg))`,
      "--bg-alt": `color-mix(in srgb, ${primary} 13%, var(--bg-alt))`,
      "--bg-panel": `color-mix(in srgb, ${primary} 10%, var(--bg-panel))`,
      "--neu-light": `color-mix(in srgb, ${primary} 18%, var(--neu-light))`,
      "--neu-dark": `color-mix(in srgb, ${primary} 22%, var(--neu-dark))`,
      "--festival-glow": theme.colors.glow,
      "--festival-gradient-from": theme.colors.gradientFrom,
      "--festival-gradient-to": theme.colors.gradientTo,
      "--festival-gradient-angle": `${theme.colors.gradientAngle}deg`,
    } as CSSProperties;

    return { theme, style };
  }, [settings.festivalTheme]);
}
