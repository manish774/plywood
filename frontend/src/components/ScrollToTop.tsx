import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// react-router doesn't reset scroll position on navigation, so opening an
// item/category from further down a list leaves the new page scrolled to
// wherever the old one was. Force it back to the top on every route change.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
