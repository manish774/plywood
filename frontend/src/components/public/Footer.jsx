import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/useLanguage";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="ply-stripe-horizontal site-footer-stripe" aria-hidden="true" />
      <div className="container site-footer-inner">
        <div>
          <div className="navbar-logo navbar-logo-dark">
            <span className="navbar-logo-mark" aria-hidden="true" />
            Ridgeline
            <span className="navbar-logo-sub">{t("nav.logoSub")}</span>
          </div>
          <p className="site-footer-tag">{t("contact.companyCopy")}</p>
        </div>

        <div className="site-footer-links">
          <div>
            <p className="eyebrow site-footer-heading">{t("nav.footerShop")}</p>
            <Link to="/categories">{t("nav.categories")}</Link>
            <Link to="/contact">{t("nav.getQuote")}</Link>
          </div>
          <div>
            <p className="eyebrow site-footer-heading">{t("nav.footerYard")}</p>
            <p>{t("contact.hoursValue")}</p>
            <p>{t("contact.yardAddressValue")}</p>
          </div>
          <div>
            <p className="eyebrow site-footer-heading">{t("nav.footerAdmin")}</p>
            <Link to="/admin/login">{t("nav.footerStaffLogin")}</Link>
          </div>
        </div>
      </div>
      <div className="container">
        <p className="site-footer-fine">{t("nav.footerFine", { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}
