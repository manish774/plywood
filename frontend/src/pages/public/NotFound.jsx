import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container section" style={{ textAlign: "center" }}>
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
