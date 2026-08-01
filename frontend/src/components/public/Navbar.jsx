import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../../i18n/useLanguage";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const links = [
    { to: "/", label: t("nav.home"), end: true },
    { to: "/categories", label: t("nav.categories") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const toggleLanguage = () => {
    setLang(lang === "en" ? "hi" : "en");
    setOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-logo" onClick={() => setOpen(false)}>
          <span className="navbar-logo-mark" aria-hidden="true" />
          Ridgeline
          <span className="navbar-logo-sub">{t("nav.logoSub")}</span>
        </NavLink>

        <nav className="navbar-links navbar-links-desktop">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                "navbar-link" + (isActive ? " navbar-link-active" : "")
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-underline"
                      className="navbar-underline"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <button
            className="navbar-lang-switch"
            type="button"
            onClick={toggleLanguage}
            aria-label={t("nav.toggleAria")}
          >
            {t("nav.toggle")}
          </button>
        </nav>

        <button
          className="navbar-burger"
          aria-label={t("nav.burgerAria")}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <motion.nav
          className="navbar-links-mobile"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                "navbar-link-mobile" + (isActive ? " navbar-link-active" : "")
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button className="navbar-lang-switch-mobile" type="button" onClick={toggleLanguage}>
            {t("nav.toggle")}
          </button>
        </motion.nav>
      )}
    </header>
  );
}
