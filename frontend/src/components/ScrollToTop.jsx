// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // "Instant" takes you there immediately, "smooth" scrolls there
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant" // Use "smooth" if you want a scrolling animation
    });
  }, [pathname]); // <-- This runs every time the URL path changes

  return null;
};

export default ScrollToTop;