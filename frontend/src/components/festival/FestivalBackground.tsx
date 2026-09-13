import { useMemo } from "react";
import FestivalIcon from "./FestivalIcon";
import { buildScatterLayout } from "../../themes/layout";
import type { FestivalTheme } from "../../themes/types";

interface FestivalBackgroundProps {
  theme: FestivalTheme;
  variant: "ambient" | "hero";
}

// Scatters a theme's icons as a low-opacity, non-interactive decorative
// layer. `ambient` is mounted once in PublicLayout (fixed, behind every
// public page); `hero` is mounted only inside Home's hero section (bolder,
// plus an optional background photo) — same component, different config.
export default function FestivalBackground({ theme, variant }: FestivalBackgroundProps) {
  const config = variant === "hero" ? theme.heroPattern : theme.ambientPattern;
  const placements = useMemo(() => buildScatterLayout(config), [config]);
  const iconById = useMemo(() => new Map(theme.icons.map((icon) => [icon.id, icon])), [theme.icons]);

  return (
    <div className={`festival-background festival-background-${variant}`} aria-hidden="true">
      {variant === "hero" && theme.heroPhotoUrl && (
        <div className="festival-background-photo" style={{ backgroundImage: `url(${theme.heroPhotoUrl})` }} />
      )}
      {placements.map((p, i) => {
        const icon = iconById.get(p.iconId);
        if (!icon) return null;
        return (
          <FestivalIcon
            key={i}
            icon={icon}
            className="festival-background-icon"
            style={{
              left: `${p.xPct}%`,
              top: `${p.yPct}%`,
              width: p.size,
              height: p.size,
              transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
              opacity: p.opacity,
            }}
          />
        );
      })}
    </div>
  );
}
