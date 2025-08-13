import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';
import { assets } from '../assets/assets';
import { useI18n } from '../i18n/I18nContext';

const Footer = () => {
  const { t } = useI18n();
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
              href="https://instagram.com"
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

      <nav className="footer-legal-row" aria-label={t('footer.legalNav')}>
  <Link to="/impressum" className="footer-link">{t('footer.impressum')}</Link>
  <span className="footer-sep">•</span>
  <Link to="/privacy" className="footer-link">{t('footer.privacy')}</Link>
  <span className="footer-sep">•</span>
  <Link to="/terms" className="footer-link">{t('footer.terms')}</Link>
  <span className="footer-sep">•</span> {/* NEW */}
  <Link to="/contact" className="footer-link">{t('footer.contact')}</Link> {/* NEW */}
</nav>


      {/* Bottom lines */}
      <div className="footer-copy">© {year} Zaytun Olive Oil. All rights reserved.</div>
      <div className="footer-tagline">Family-owned, Moroccan olive oil, crafted with love.</div>
    </footer>
  );
};

export default Footer;





