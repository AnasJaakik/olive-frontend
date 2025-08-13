import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { useI18n } from '../i18n/I18nContext';
import './Navbar.css';

const Navbar = () => {
  const { t, lang, setLang } = useI18n();
  const next = lang === 'en' ? 'de' : 'en';

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

        {/* If you still want the text lockup too, uncomment this block */}
        {/*
        <div className="navbar-brand">
          <span className="brand-main">Abdeljalil</span>
          <span className="brand-sub">Olive Oil</span>
        </div>
        */}
      </div>

      <div className="navbar-links">
        <Link to="/" className="navbar-link">{t('nav.home')}</Link>
        <Link to="/products" className="navbar-link">{t('nav.products')}</Link>
        <Link to="/about" className="navbar-link">{t('nav.about')}</Link>
       
        
       

        <button
          type="button"
          className="lang-toggle"
          onClick={() => setLang(next)}
          aria-label={lang === 'en' ? 'Switch language to German' : 'Sprache auf Englisch umstellen'}
          title={lang === 'en' ? 'DE' : 'EN'}
        >
          {lang === 'en' ? 'DE' : 'EN'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
















