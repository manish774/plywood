import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";

interface BackButtonProps {
  // Where to send the user if there's no in-app history to go back to
  // (e.g. they landed straight on this page from an external link/share).
  fallbackTo: string;
  className?: string;
}

export default function BackButton({ fallbackTo, className = "" }: BackButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const handleClick = () => {
    // React Router sets location.key to "default" when there's no real
    // history entry behind this one (fresh tab / direct link) — going back
    // in that case would leave the site entirely, so fall back instead.
    if (location.key && location.key !== "default") {
      navigate(-1);
    } else {
      navigate(fallbackTo);
    }
  };

  return (
    <button type="button" className={`btn btn-outline btn-sm back-button ${className}`} onClick={handleClick}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
      {t("common.back")}
    </button>
  );
}
