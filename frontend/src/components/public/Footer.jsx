import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="ply-stripe-horizontal site-footer-stripe" aria-hidden="true" />
      <div className="container site-footer-inner">
        <div>
          <div className="navbar-logo navbar-logo-dark">
            <span className="navbar-logo-mark" aria-hidden="true" />
            Ridgeline
            <span className="navbar-logo-sub">Plywood Co.</span>
          </div>
          <p className="site-footer-tag">
            Sheet goods, sourced straight and cut true, since day one.
          </p>
        </div>

        <div className="site-footer-links">
          <div>
            <p className="eyebrow site-footer-heading">Shop</p>
            <Link to="/categories">Categories</Link>
            <Link to="/contact">Get a quote</Link>
          </div>
          <div>
            <p className="eyebrow site-footer-heading">Yard</p>
            <p>Mon&ndash;Sat, 7am&ndash;5pm</p>
            <p>221 Millwork Row, Fall City</p>
          </div>
          <div>
            <p className="eyebrow site-footer-heading">Admin</p>
            <Link to="/admin/login">Staff login</Link>
          </div>
        </div>
      </div>
      <div className="container">
        <p className="site-footer-fine">
          &copy; {new Date().getFullYear()} Ridgeline Plywood Co. All boards sold as-is, grain and all.
        </p>
      </div>
    </footer>
  );
}
