import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaInstagram, FaEnvelope } from "react-icons/fa";
import { assets } from "../assets/assets";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Top row: logo + socials */}
      <div className="footer-inner">
        <Link to="/" className="footer-brand" aria-label="Home">
          <img
            src={assets.mainlogo || assets.logo}
            alt="Abdeljalil Olive Oil"
            className="footer-logo"
            loading="lazy"
            decoding="async"
          />
        </Link>

        <div className="footer-right">
          <div className="footer-socials">
            <a
              href="https://www.instagram.com/abdeljaliloliveoil?igsh=YmZxdjBkZzRhcGN4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="footer-social"
            >
              <FaInstagram size={22} />
            </a>
            <a href="mailto:info@zaytun.com" aria-label="Email" className="footer-social">
              <FaEnvelope size={22} />
            </a>
          </div>
        </div>
      </div>

      <nav className="footer-legal-row" aria-label="Legal navigation">
        <Link to="/impressum" className="footer-link">Impressum</Link>
        <span className="footer-sep">•</span>
        <Link to="/privacy" className="footer-link">Privacy-policy</Link>
        <span className="footer-sep">•</span>
        <Link to="/terms" className="footer-link">Terms & conditions</Link>
        <span className="footer-sep">•</span>
        <Link to="/contact" className="footer-link">Contact</Link>
      </nav>

      {/* Bottom lines */}
      <div className="footer-copy">© {year} Abdeljalil Olive Oil. All rights reserved.</div>
      <div className="footer-tagline">Family-owned, Moroccan olive oil, crafted with love.</div>
    </footer>
  );
};

export default Footer;
