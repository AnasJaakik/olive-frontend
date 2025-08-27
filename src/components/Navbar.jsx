// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import "./Navbar.css";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);
  const toggleMobile = () => setMobileOpen(v => !v);

  // Lock body scroll when menu is open + Escape to close
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") closeMobile(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="navbar-wrap" role="banner">
        <a href="#main" className="skip-link">Skip to content</a>

        <nav className="navbar" aria-label="Primary">
          {/* Left: brand */}
          <div className="navbar-left">
            <Link to="/" aria-label="Home" className="navbar-brand">
              <img src={assets.logo} alt="Abdeljalil emblem" className="navbar-logo" />
            </Link>

            {/* Secondary wordmark — always visible, scales safely */}
            <Link to="/" aria-label="Home" className="navbar-wordmark">
              <img
                src={assets.logo2}
                alt="Abdeljalil wordmark"
                className="navbar-logo secondary-logo"
              />
            </Link>
          </div>

          {/* Desktop links */}
          <div className="navbar-links" role="menubar">
            <NavLink to="/" className="navbar-link" onClick={closeMobile}>HOME</NavLink>
            <NavLink to="/products" className="navbar-link" onClick={closeMobile}>PRODUCTS &amp; PROCESS</NavLink>
            <NavLink to="/about" className="navbar-link" onClick={closeMobile}>ABOUT US</NavLink>
            <NavLink to="/contact" className="navbar-link" onClick={closeMobile}>CONTACT</NavLink>
          </div>

          {/* Mobile toggler */}
          <button
            className={`navbar-burger ${mobileOpen ? "is-open" : ""}`}
            onClick={toggleMobile}
            aria-label="Toggle menu"
            aria-haspopup="menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span /><span /><span />
          </button>
        </nav>

        {/* Drop-down mobile menu */}
        <div
          id="mobile-menu"
          className={`mobile-menu mobile-drop ${mobileOpen ? "open" : ""}`}
          role="menu"
          aria-label="Mobile"
        >
          <NavLink to="/" className="mobile-link tile" onClick={closeMobile}>Home</NavLink>
          <NavLink to="/products" className="mobile-link tile" onClick={closeMobile}>Products &amp; Process</NavLink>
          <NavLink to="/about" className="mobile-link tile" onClick={closeMobile}>About Us</NavLink>
          <NavLink to="/contact" className="mobile-link tile" onClick={closeMobile}>Contact</NavLink>
        </div>
      </header>

      {/* Spacer so content sits below the fixed header */}
      <div className="nav-spacer" aria-hidden />
    </>
  );
};

export default Navbar;

