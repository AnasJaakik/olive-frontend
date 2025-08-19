// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to top on route change.
 * - If there's a hash (#anchor), scrolls that element into view.
 * - Temporarily disables CSS smooth scrolling to avoid starting "from the bottom".
 */
export default function ScrollToTop() {
  const { pathname, hash, search } = useLocation();

  useEffect(() => {
    // temporarily turn off smooth scrolling to avoid animation from old position
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    if (hash) {
      // #anchor navigation within a page
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: "start", inline: "nearest" });
      } else {
        window.scrollTo({ top: 0, left: 0 });
      }
    } else {
      // normal route change
      window.scrollTo({ top: 0, left: 0 });
    }

    // restore whatever the site uses (often 'smooth' for anchor links)
    // do it on next tick to keep the jump instant
    const t = setTimeout(() => {
      root.style.scrollBehavior = prev || "";
    }, 0);

    return () => clearTimeout(t);
  }, [pathname, search, hash]);

  return null;
}
