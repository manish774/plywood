import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./styles/tokens.css";
import "./styles/base.css";
import App from "./App";

// index.html ships static meta/OG tags (marked data-default) as a fallback
// for crawlers that fetch the raw HTML and never run JS (e.g. WhatsApp,
// Facebook's link-preview bot). Once React takes over, the Seo component
// renders the real, page-specific versions via react-helmet-async — drop
// the static ones here so the two are never both present in the DOM.
document.querySelectorAll('[data-default="true"]').forEach((el) => el.remove());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
