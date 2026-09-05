import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useLanguage } from "../../i18n/useLanguage";
import { useUserAuth } from "../../context/UserAuthContext";
import { SITE } from "../../config/site";

interface NavbarLink {
  to: string;
  label: string;
  end?: boolean;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { scrollY } = useScroll();
  const { isAuthenticated, logout } = useUserAuth();
  const navigate = useNavigate();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
  });

  const links: NavbarLink[] = [
    { to: "/", label: t("nav.home"), end: true },
    { to: "/categories", label: t("nav.categories") },
    { to: "/contact", label: t("nav.contact") },
    isAuthenticated
      ? { to: "/my-queries", label: t("nav.myQueries") }
      : { to: "/account", label: t("nav.login") },
  ];

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  const toggleLanguage = () => {
    setLang(lang === "en" ? "hi" : "en");
    setOpen(false);
  };

  return (
    <header className={"navbar" + (scrolled ? " navbar-scrolled" : "")}>
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-logo" onClick={() => setOpen(false)}>
          <span className="navbar-logo-mark" aria-hidden="true" />
          {SITE.shortName}
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
          {isAuthenticated && (
            <button className="navbar-lang-switch" type="button" onClick={handleLogout}>
              {t("common.logOut")}
            </button>
          )}
          <button
            className="navbar-lang-switch"
            type="button"
            onClick={toggleLanguage}
            aria-label={t("nav.toggleAria")}
          >
            {t("nav.toggle")}
          </button>
          <Link to="/contact" className="btn btn-accent btn-sm">
            {t("common.getQuote")}
          </Link>
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
          {isAuthenticated && (
            <button className="navbar-lang-switch-mobile" type="button" onClick={handleLogout}>
              {t("common.logOut")}
            </button>
          )}
          <button className="navbar-lang-switch-mobile" type="button" onClick={toggleLanguage}>
            {t("nav.toggle")}
          </button>
          <Link to="/contact" className="btn btn-accent" style={{ margin: "4px 24px 16px" }} onClick={() => setOpen(false)}>
            {t("common.getQuote")}
          </Link>
        </motion.nav>
      )}
    </header>
  );
}
