import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/categories", label: "Categories" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-logo" onClick={() => setOpen(false)}>
          <span className="navbar-logo-mark" aria-hidden="true" />
          Ridgeline
          <span className="navbar-logo-sub">Plywood Co.</span>
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
        </nav>

        <button
          className="navbar-burger"
          aria-label="Toggle menu"
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
        </motion.nav>
      )}
    </header>
  );
}
