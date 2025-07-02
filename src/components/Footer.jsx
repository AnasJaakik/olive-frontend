import React from 'react';
import './Footer.css';
import { FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa';

const Footer = () => (
  <footer className="footer">
    <div className="footer-links">
      <a href="/" className="footer-link">Home</a>
      <a href="/about" className="footer-link">About</a>
      <a href="/products" className="footer-link">Products</a>
      <a href="/contact" className="footer-link">Contact</a>
    </div>
    <div className="footer-socials">
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <FaInstagram size={24} color="#335432" />
      </a>
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
      >
        <FaFacebook size={24} color="#335432" />
      </a>
      <a href="mailto:info@zaytun.com" aria-label="Email">
        <FaEnvelope size={24} color="#335432" />
      </a>
    </div>
    <div>
      © {new Date().getFullYear()} Zaytun Olive Oil. All rights reserved.
    </div>
    <div style={{ fontSize: "0.9rem", marginTop: 6, color: "#888" }}>
      Family-owned, Moroccan olive oil, crafted with love.
    </div>
  </footer>
);

export default Footer;

