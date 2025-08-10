import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';
import { assets } from '../assets/assets';
import { useI18n } from '../i18n/i18nContext';

const Footer = () => {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Left: Logo */}
        <Link to="/" className="footer-brand" aria-label="Home">
          <img
            src={assets.mainlogo || assets.logo}
            alt="Abdeljalil Olive Oil"
            className="footer-logo"
            loading="lazy"
            decoding="async"
          />
        </Link>

        {/* Center: Site links (translated) */}
        <nav className="footer-links" aria-label={t('footer.siteNav')}>
          <Link to="/" className="footer-link">{t('nav.home')}</Link>
          <Link to="/about" className="footer-link">{t('nav.about')}</Link>
          <Link to="/products" className="footer-link">{t('nav.products')}</Link>
          <Link to="/contact" className="footer-link">{t('nav.contact')}</Link>
        </nav>

        {/* Right: Legal + Social (translated labels) */}
        <div className="footer-right">
          <nav className="footer-legal-links" aria-label={t('footer.legalNav')}>
            <Link to="/impressum" className="footer-link">{t('footer.impressum')}</Link>
            <span className="footer-sep">•</span>
            <Link to="/privacy" className="footer-link">{t('footer.privacy')}</Link>
            <span className="footer-sep">•</span>
            <Link to="/terms" className="footer-link">{t('footer.terms')}</Link>
          </nav>

          <div className="footer-socials">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="footer-social"
            >
              <FaInstagram size={22} />
            </a>
            <a
              href="mailto:info@zaytun.com"
              aria-label="Email"
              className="footer-social"
            >
              <FaEnvelope size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom line (kept from your original) */}
      <div className="footer-copy">© {year} Abdeljalil Olive Oil. All rights reserved.</div>
      <div className="footer-tagline">Family-owned, Moroccan olive oil, crafted with love.</div>
    </footer>
  );
};

export default Footer;



