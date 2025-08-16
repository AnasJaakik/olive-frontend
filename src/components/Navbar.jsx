import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Main emblem */}
        <Link to="/" aria-label="Home">
          <img
            src={assets.logo}
            alt="Abdeljalil emblem"
            className="navbar-logo"
          />
        </Link>

        {/* Wordmark image (the ABDELJALIL / olive oil graphic) */}
        <Link to="/" aria-label="Home">
          <img
            src={assets.logo2}
            alt="Abdeljalil olive oil wordmark"
            className="navbar-logo secondary-logo"
          />
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/products" className="navbar-link">Products &amp; Process</Link>
        <Link to="/about" className="navbar-link">About Us</Link>
      </div>
    </nav>
  );
};

export default Navbar;

















