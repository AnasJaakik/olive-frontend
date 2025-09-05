import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaInstagram, FaEnvelope } from "react-icons/fa";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-inner">
          {/* Logo */}
          <Link to="/" className="footer-brand" aria-label="Home">
            <img
              src={assets.mainlogo || assets.logo}
              alt="Abdeljalil Olive Oil"
              className="footer-logo"
              loading="lazy"
              decoding="async"
            />
          </Link>

          {/* Legal links centered */}
          <nav className="footer-legal-row" aria-label="Legal navigation">
            <Link to="/impressum" className="footer-link">Impressum</Link>
            <span className="footer-sep">•</span>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <span className="footer-sep">•</span>
            <Link to="/terms" className="footer-link">Terms &amp; Conditions</Link>
          </nav>

          {/* Socials */}
          <div className="footer-right">
            <div className="footer-socials" aria-label="Social links">
              <a
                href="https://www.instagram.com/abdeljaliloliveoil?igsh=YmZxdjBkZzRhcGN4"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="footer-social"
              >
                <FaInstagram size={22} aria-hidden />
              </a>
              <a
                href="mailto:info@abdeljaliloliveoil.com"
                aria-label="Email"
                className="footer-social"
              >
                <FaEnvelope size={22} aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
