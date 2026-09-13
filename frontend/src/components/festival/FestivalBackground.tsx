import { useMemo } from "react";
import FestivalIcon from "./FestivalIcon";
import { buildScatterLayout } from "../../themes/layout";
import type { FestivalTheme } from "../../themes/types";

interface FestivalBackgroundProps {
  theme: FestivalTheme;
  variant: "ambient" | "hero";
}

// Scatters a theme's icons as a decorative layer, plus (when the theme has
// one) its real background photo. `ambient` is mounted once in PublicLayout
// — fixed behind every public page, photo kept subtle so body copy stays
// legible; `hero` is mounted only inside Home's hero section — bolder icons,
// bolder photo. Same component, different config/intensity per variant.
export default function FestivalBackground({ theme, variant }: FestivalBackgroundProps) {
  const config = variant === "hero" ? theme.heroPattern : theme.ambientPattern;
  const placements = useMemo(() => buildScatterLayout(config), [config]);
  const iconById = useMemo(() => new Map(theme.icons.map((icon) => [icon.id, icon])), [theme.icons]);

  return (
    <div className={`festival-background festival-background-${variant}`} aria-hidden="true">
      {theme.heroPhotoUrl && (
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
