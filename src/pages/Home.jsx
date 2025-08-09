// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import "./Home.css";

const phases = [
  { key: "dormancy",       title: "Dormancy",                 timeframe: "Nov – mid-Feb", desc: "Trees rest and store energy for the season ahead.",                     img: assets.dormancy },
  { key: "flowering",      title: "Bud Swelling & Flowering", timeframe: "mid-Feb – Apr", desc: "Delicate blossoms set the stage for fruit.",                            img: assets.flowering },
  { key: "fruitset",       title: "Fruit Set",                timeframe: "May – Jun",     desc: "Pollinated flowers become tiny olives.",                                img: assets.fruitset },
  { key: "pithardening",   title: "Pit Hardening",            timeframe: "Jul",           desc: "The stone forms, defining the olive’s structure.",                      img: assets.pit },
  { key: "oilaccumulation",title: "Oil Accumulation",         timeframe: "Aug",           desc: "Oil content rises; flavors deepen and round out.",                      img: assets.oilaccu },
  { key: "maturation",     title: "Maturation",               timeframe: "Sep – Oct",     desc: "Color shifts; aromas develop right before harvest.",                    img: assets.maturation },
  { key: "harvest",        title: "Harvest",                  timeframe: "Nov 1",         desc: "Hand-picked at peak ripeness and pressed within the hour.",             img: assets.harvest },
];

function CountdownCard() {
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
    <aside className="countdown-card">
      <div className="countdown-eyebrow">Season status</div>
      <div className="countdown-number">{daysLeft}</div>
      <div className="countdown-sub">days to harvest</div>
      <div className="countdown-date">November 1</div>
      <div className="progress">
        <div className="progress-fill" style={{ width: `${percentDone}%` }} />
      </div>
      <div className="progress-label">
        {Math.round(percentDone)}% of the season elapsed
      </div>
    </aside>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section id="home" className="home-hero">
        <div className="home-hero-content">
          <div className="hero-slogan-row">
            <span className="hero-slogan">When quality has a face.</span>
          </div>

          <h1 className="hero-title">Extra virgin Moroccan Olive Oil</h1>
          <p className="hero-tagline">
            <em>Harvested by hand. Pressed within the hour.</em>
          </p>
          <p className="hero-desc">
            Handcrafted from ancient Haouzia groves outside Marrakech.<br />
            Cold-pressed for exceptional flavor, health, and tradition.<br />
            Taste the story of our land in every golden drop.
          </p>
          <div className="hero-details">
            Family owned • Organic • Crafted in Marrakech
          </div>
        </div>

        <div className="home-hero-img">
          <img src={assets.riad} alt="Riad / grove scene" />
        </div>
      </section>

      {/* HAOUZIA SPOTLIGHT */}
      <section className="haouzia-section">
        <div className="haouzia-media">
          <img src={assets.haouzia} alt="Haouzia olive tree in Marrakech" />
        </div>
        <div className="haouzia-copy">
          <h2 className="haouzia-heading">Discover Haouzia — Marrakech’s Native Olive</h2>
          <p className="haouzia-blurb">
            Haouzia is the olive that grew with Marrakech—rooted in our red earth and dry winds.
            On our family grove we keep the lineage pure: <strong>no cloned, grafted, or lab-propagated stock</strong>.
            Just original, heritage trees tended by hand, season after season. It yields less, but gives more:
            depth, character, and a taste that’s truly of this place.
          </p>
        </div>
      </section>

      {/* PHASES (left) + COUNTDOWN (right) */}
      <section className="phases-section">
        <div className="phases-left">
          <h2 className="phases-heading">Discover How a Drop Becomes Gold</h2>

          <div className="phases-grid">
            {phases.map((p) => (
              <article key={p.key} className="phase-card">
                <div className="phase-media">
                  <img src={p.img} alt={p.title} />
                  <div className="phase-badge">{p.timeframe}</div>
                </div>
                <h3 className="phase-title">{p.title}</h3>
                <p className="phase-desc">{p.desc}</p>
              </article>
            ))}
          </div>

          {/* CTA: Read Our Story */}
          <div className="story-cta">
            <Link to="/about" className="story-btn">Read Our Story</Link>
          </div>
        </div>

        <div className="phases-right">
          <CountdownCard />
        </div>
      </section>
    </>
  );
}












