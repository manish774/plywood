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
// their hover/soft/ink companions) plus the banner/hero gradient vars. The
// caller applies `style` to a wrapper div scoped to the public site only
// (see PublicLayout) so the admin panel — which never renders that wrapper —
// is never affected.
export function useFestivalTheme(): FestivalThemeResult {
  const { settings } = useSettings();

  return useMemo(() => {
    const theme = FESTIVAL_THEMES[settings.festivalTheme || "none"] || null;
    if (!theme) return { theme: null, style: {} };

    const style = {
      "--accent": theme.colors.primary,
      "--accent-hover": theme.colors.primaryDark,
      "--accent-soft": theme.colors.soft,
      "--accent-ink": theme.colors.textOnPrimary,
      "--amber": theme.colors.accent,
      "--amber-hover": theme.colors.accentDark,
      "--festival-glow": theme.colors.glow,
      "--festival-gradient-from": theme.colors.gradientFrom,
      "--festival-gradient-to": theme.colors.gradientTo,
      "--festival-gradient-angle": `${theme.colors.gradientAngle}deg`,
    } as CSSProperties;

    return { theme, style };
  }, [settings.festivalTheme]);
}
