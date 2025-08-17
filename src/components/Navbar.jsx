import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useCart } from "../cart/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const { count, open } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="navbar-wrap">
      <nav className="navbar">
        {/* Left: logos */}
        <div className="navbar-left">
          <Link to="/" aria-label="Home" className="navbar-brand">
            <img src={assets.logo} alt="Abdeljalil emblem" className="navbar-logo" />
          </Link>

          <Link to="/" aria-label="Home" className="navbar-wordmark">
            <img src={assets.logo2} alt="Abdeljalil wordmark" className="navbar-logo secondary-logo" />
          </Link>
        </div>

        {/* Desktop links */}
        <div className="navbar-links">
          <NavLink to="/" className="navbar-link" onClick={closeMobile}>Home</NavLink>
          <NavLink to="/products" className="navbar-link" onClick={closeMobile}>Products &amp; Process</NavLink>
          <NavLink to="/about" className="navbar-link" onClick={closeMobile}>About Us</NavLink>
         

          <button className="navbar-cart" onClick={() => { open(); closeMobile(); }} aria-label="Open cart">
            Cart <span className="navbar-cart-badge">{count}</span>
          </button>
        </div>

        {/* Mobile toggler */}
        <button
          className={`navbar-burger ${mobileOpen ? "is-open" : ""}`}
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div id="mobile-menu" className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <NavLink to="/" className="mobile-link" onClick={closeMobile}>Home</NavLink>
        <NavLink to="/products" className="mobile-link" onClick={closeMobile}>Products &amp; Process</NavLink>
        <NavLink to="/about" className="mobile-link" onClick={closeMobile}>About Us</NavLink>
        <NavLink to="/contact" className="mobile-link" onClick={closeMobile}>Contact</NavLink>
        <button className="mobile-cart" onClick={() => { open(); closeMobile(); }}>
          Cart <span className="navbar-cart-badge">{count}</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
