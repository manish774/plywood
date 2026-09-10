import { Link } from "react-router-dom";
import Seo from "../../components/Seo";
import { useLanguage } from "../../i18n/useLanguage";
import { useSettings } from "../../context/SettingsContext";

export default function NotFound() {
  const { t } = useLanguage();
  const { settings } = useSettings();

  return (
    <div className="container section" style={{ textAlign: "center" }}>
      <Seo
        title={t("seo.notFoundTitle", { shopName: settings.shopName })}
        description="Page not found."
        path="/404"
        noindex
      />

      <span className="eyebrow">404</span>
      <h1 style={{ marginTop: 10, fontSize: "2.6rem" }}>Wrong aisle.</h1>
      <p style={{ marginTop: 14, color: "var(--ink-soft)" }}>
        That page isn't in the yard. Let's get you back to the catalog.
      </p>
      <div style={{ marginTop: 28 }}>
        <Link to="/" className="btn btn-accent">
          Back to home
        </Link>
      </div>
    </div>
  );
}
