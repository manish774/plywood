import type { CSSProperties } from "react";
import { useLanguage } from "../../i18n/useLanguage";
import FestivalIcon from "./FestivalIcon";
import type { FestivalTheme } from "../../themes/types";

// Announces the active festival theme, following the same structural
// convention as the existing AnnouncementBar strip.
export default function FestivalBanner({ theme }: { theme: FestivalTheme }) {
  const { lang } = useLanguage();
  const isHi = lang === "hi";

  const style = {
    "--festival-gradient-from": theme.colors.gradientFrom,
    "--festival-gradient-to": theme.colors.gradientTo,
    "--festival-gradient-angle": `${theme.colors.gradientAngle}deg`,
    "--festival-glow": theme.colors.glow,
  } as CSSProperties;

  return (
    <div className="festival-banner" style={style}>
      <div className="container festival-banner-inner">
        <FestivalIcon icon={theme.icons[0]} className="festival-banner-icon" />
        <span className="festival-banner-name">{isHi ? theme.nameHi : theme.nameEn}</span>
        <span className="festival-banner-tagline">{isHi ? theme.taglineHi : theme.taglineEn}</span>
        <span className="festival-banner-date">{isHi ? theme.dateRangeHi : theme.dateRangeEn}</span>
      </div>
    </div>
  );
}
