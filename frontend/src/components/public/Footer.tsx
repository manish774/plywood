import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Parallax from "./Parallax";
import { staggerContainer, fadeUp } from "../motionVariants";
import { useLanguage } from "../../i18n/useLanguage";
import { useSettings } from "../../context/SettingsContext";
import { listCategories } from "../../api/categories";
import type { Category } from "../../types/models";
import SwastikIcon from "../icons/SwastikIcon";
import InstagramIcon from "../icons/InstagramIcon";
import FacebookIcon from "../icons/FacebookIcon";

export default function Footer() {
  const { t } = useLanguage();
  const { settings } = useSettings();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    listCategories()
      .then((cats) => setCategories(cats.slice(0, 5)))
      .catch(() => setCategories([]));
  }, []);

  return (
    <footer className="site-footer">
      <Parallax range={24} className="ply-stripe-horizontal site-footer-stripe" />
      <motion.div
        className="container site-footer-inner"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={fadeUp}>
          <div className="navbar-logo navbar-logo-dark">
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt="" className="navbar-logo-mark" />
            ) : (
              <SwastikIcon className="navbar-logo-mark" />
            )}
            {settings.shortName}
            <span className="navbar-logo-sub">{settings.tagline}</span>
          </div>
          <p className="site-footer-tag">{t("contact.companyCopy")}</p>
          {settings.ownerName && (
            <p className="site-footer-owner">{t("nav.footerOwnedBy", { name: settings.ownerName })}</p>
          )}
          {(settings.instagramUrl || settings.facebookUrl) && (
            <div className="site-footer-social">
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("nav.footerInstagram")}
                  className="site-footer-social-link"
                >
                  <InstagramIcon />
                </a>
              )}
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("nav.footerFacebook")}
                  className="site-footer-social-link"
                >
                  <FacebookIcon />
                </a>
              )}
            </div>
          )}
        </motion.div>

        <motion.div className="site-footer-links" variants={fadeUp}>
          <div>
            <p className="eyebrow site-footer-heading">{t("nav.footerShop")}</p>
            <Link to="/categories">{t("nav.footerBrowseHeading")}</Link>
            {categories.map((cat) => (
              <Link key={cat._id} to={`/categories/${cat._id}`}>
                {cat.name}
              </Link>
            ))}
            <Link to="/contact">{t("common.getQuote")}</Link>
          </div>
          <div>
            <p className="eyebrow site-footer-heading">{t("nav.footerYard")}</p>
            <p>{settings.hours}</p>
            <a href={settings.mapUrl} target="_blank" rel="noopener noreferrer">
              {settings.address}
            </a>
          </div>
          <div>
            <p className="eyebrow site-footer-heading">{t("nav.footerAdmin")}</p>
            <Link to="/admin/login">{t("nav.footerStaffLogin")}</Link>
          </div>
        </motion.div>
      </motion.div>
      <div className="container">
        <p className="site-footer-fine">
          {t("nav.footerFine", { year: new Date().getFullYear(), shopName: settings.shopName })}
        </p>
      </div>
    </footer>
  );
}
