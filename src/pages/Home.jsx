// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { useI18n } from "../i18n/i18nContext";
import "./Home.css";

// Small helper: pick the right image for a phase key
const imgFor = (key) => {
  if (key === "pithardening") return assets.pit;
  if (key === "oilaccumulation") return assets.oilaccu;
  if (key === "fruitset") return assets.fruitset;
  return assets[key]; // dormancy, flowering, maturation, harvest
};

function CountdownCard() {
  const { t } = useI18n();
  const [daysLeft, setDaysLeft] = useState(0);
  const [percentDone, setPercentDone] = useState(0);

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      let nextHarvest = new Date(now.getFullYear(), 10, 1); // Nov 1
      if (now > nextHarvest) nextHarvest.setFullYear(nextHarvest.getFullYear() + 1);
      const prevHarvest = new Date(nextHarvest.getFullYear() - 1, 10, 1);

      const total = nextHarvest - prevHarvest;
      const passed = now - prevHarvest;

      setDaysLeft(Math.ceil((nextHarvest - now) / (1000 * 60 * 60 * 24)));
      setPercentDone(Math.min(100, Math.max(0, (passed / total) * 100)));
    };
    calc();
    const id = setInterval(calc, 60 * 60 * 1000); // hourly
    return () => clearInterval(id);
  }, []);

  return (
    <aside className="countdown-card" aria-label={t("countdown.eyebrow")}>
      <div className="countdown-eyebrow">{t("countdown.eyebrow")}</div>
      <div className="countdown-number" aria-live="polite">{daysLeft}</div>
      <div className="countdown-sub">{t("countdown.sub")}</div>
      <div className="countdown-date">{t("countdown.date")}</div>
      <div
        className="progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percentDone)}
      >
        <div className="progress-fill" style={{ width: `${percentDone}%` }} />
      </div>
      <div className="progress-label">
        {Math.round(percentDone)}{t("countdown.elapsed")}
      </div>
    </aside>
  );
}

export default function Home() {
  const { t, bundle } = useI18n();
  const items = bundle.phases.items; // localized phases array

  return (
    <>
      {/* HERO */}
      <section id="home" className="home-hero">
        <div className="home-hero-content">
          <div className="hero-slogan-row">
            <span className="hero-slogan">{t("hero.slogan")}</span>
          </div>

          <h1 className="hero-title">{t("hero.title")}</h1>
          <p className="hero-tagline">
            <em>{t("hero.tagline")}</em>
          </p>
          <p className="hero-desc">
            {t("hero.d1")}<br />
            {t("hero.d2")}<br />
            {t("hero.d3")}
          </p>
          <div className="hero-details">{t("hero.details")}</div>
        </div>

        <div className="home-hero-img">
          <img
            src={assets.riad}
            alt="Riad and olive grove scene"
            decoding="async"
            sizes="(max-width: 900px) 95vw, 50vw"
          />
        </div>
      </section>

      {/* HAOUZIA SPOTLIGHT */}
      <section className="haouzia-section">
        <div className="haouzia-media">
          <img
            src={assets.haouzia}
            alt="Haouzia olive tree in Marrakech"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 900px) 95vw, 50vw"
          />
        </div>
        <div className="haouzia-copy">
          <h2 className="haouzia-heading">{t("haouzia.heading")}</h2>
          <p className="haouzia-blurb">
            {t("haouzia.blurb1")} <strong>{t("haouzia.blurbStrong")}</strong> {t("haouzia.blurb2")}
          </p>
        </div>
      </section>

      {/* PHASES (left) + COUNTDOWN (right) */}
      <section className="phases-section">
        <div className="phases-left">
          <h2 className="phases-heading">{t("phases.heading")}</h2>

          <div className="phases-grid">
            {items.map((p) => (
              <article key={p.key} className="phase-card">
                <div className="phase-media">
                  <img
                    src={imgFor(p.key)}
                    alt={p.title}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 1200px) 48vw, (max-width: 900px) 95vw, 28vw"
                  />
                  <div className="phase-badge">{p.timeframe}</div>
                </div>
                <h3 className="phase-title">{p.title}</h3>
                <p className="phase-desc">{p.desc}</p>
              </article>
            ))}
          </div>

          {/* CTA: Read Our Story */}
          <div className="story-cta">
            <Link to="/about" className="story-btn">
              {t("cta.story")}
            </Link>
          </div>
        </div>

        <div className="phases-right">
          <CountdownCard />
        </div>
      </section>
    </>
  );
}














