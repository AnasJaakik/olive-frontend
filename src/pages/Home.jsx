import React, { useEffect, useMemo, useState } from "react";
import { assets } from "../assets/assets";
import "./Home.css";
import { motion } from "framer-motion";

/* ---------- Helpers ---------- */
function getNextHarvest(now = new Date()) {
  const thisYearHarvest = new Date(now.getFullYear(), 10, 1, 0, 0, 0); // Nov 1
  return now < thisYearHarvest
    ? thisYearHarvest
    : new Date(now.getFullYear() + 1, 10, 1, 0, 0, 0);
}
function diffParts(to, from = new Date()) {
  const delta = Math.max(0, to - from);
  const days = Math.floor(delta / (1000 * 60 * 60 * 24));
  return { days, ms: delta };
}
function seasonProgress(now = new Date()) {
  const next = getNextHarvest(now);
  const prev = new Date(next.getFullYear() - 1, 10, 1, 0, 0, 0);
  const total = next - prev;
  const passed = now - prev;
  return Math.min(100, Math.max(0, (passed / total) * 100));
}
function getOliveStage(date = new Date()) {
  const m = date.getMonth();
  const d = date.getDate();
  if ((m === 10 && d >= 1) || m === 11 || m === 0 || (m === 1 && d < 15)) {
    return "Current status: Dormancy — trees are resting.";
  } else if ((m === 1 && d >= 15) || m === 2 || m === 3) {
    return "Current status: Bud swelling & flowering — blossoms are forming.";
  } else if (m === 4 || m === 5) {
    return "Current status: Fruit set — tiny olives are developing.";
  } else if (m === 6) {
    return "Current status: Pit hardening — stones are forming inside the olives.";
  } else if (m === 7) {
    return "Current status: Oil accumulation — oil content is increasing.";
  } else if (m === 8) {
    return "Current status: Maturation — flavors and aromas are developing.";
  } else {
    return "Current status: Harvest time — hand-picking at peak ripeness.";
  }
}
function getPhaseIndex(date = new Date()) {
  const m = date.getMonth();
  const d = date.getDate();
  if ((m === 10 && d >= 1) || m === 11 || m === 0 || (m === 1 && d < 15)) return 0;
  if ((m === 1 && d >= 15) || m === 2 || m === 3) return 1;
  if (m === 4 || m === 5) return 2;
  if (m === 6) return 3;
  if (m === 7) return 4;
  if (m === 8) return 5;
  return 6;
}

/* ---------- Countdown section ---------- */
function BigCountdown() {
  const target = useMemo(() => getNextHarvest(), []);
  const [{ days }, setParts] = useState(() => diffParts(target));
  const [pct, setPct] = useState(() => seasonProgress());
  const [phaseIdx, setPhaseIdx] = useState(() => getPhaseIndex());
  const [stageText, setStageText] = useState(() => getOliveStage());

  useEffect(() => {
    const tick = () => {
      setParts(diffParts(target));
      setPct(seasonProgress());
      setPhaseIdx(getPhaseIndex());
      setStageText(getOliveStage());
    };
    tick();
    const id = setInterval(tick, 1000 * 60 * 30);
    return () => clearInterval(id);
  }, [target]);

  const phases = [
    { key: "dormancy",   title: "Dormancy",         time: "Nov – mid-Feb", desc: "Trees rest and store energy." },
    { key: "flowering",  title: "Bud & Flower",     time: "Mid-Feb – Apr", desc: "Buds swell; delicate blossoms form." },
    { key: "fruitset",   title: "Fruit Set",        time: "May – Jun",     desc: "Tiny olives develop after pollination." },
    { key: "pit",        title: "Pit Hardening",    time: "July",          desc: "Stones form inside the olives." },
    { key: "oilaccu",    title: "Oil Accumulation", time: "August",        desc: "Oil content rises; flavors intensify." },
    { key: "maturation", title: "Maturation",       time: "September",     desc: "Aromas deepen; texture and taste round out." },
    { key: "harvest",    title: "Harvest",          time: "October",       desc: "Hand-picked at peak ripeness." },
  ];

  // fill calculations for each box
  const seg = 100 / phases.length;
  let completed = Math.floor(pct / seg);
  let partial = (pct - completed * seg) / seg;
  if (completed >= phases.length) { completed = phases.length - 1; partial = 1; }
  const fillFor = (i) => {
    if (i < completed) return 100;
    if (i === completed) return Math.max(0, Math.min(100, Math.round(partial * 100)));
    return 0;
  };

  return (
    <motion.section
      className="countdown-hero"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="cd-eyebrow">COUNTDOWN TO HARVEST</div>

      {/* Big DAYS */}
      <div className="cd-days-only" role="timer" aria-label="Days until harvest">
        <div className="cd-days-number">{days}</div>
        <div className="cd-days-label">DAYS</div>
      </div>

      <div className="cd-sub">Next harvest: November 1</div>
      <div className="cd-stage">{stageText}</div>

      {/* PHASE ROW */}
      <div className="cd-phase-row">
        {phases.map((p, i) => (
          <div
            key={p.key}
            className={`cd-phase-card ${i === phaseIdx ? "current" : ""}`}
            aria-current={i === phaseIdx ? "step" : undefined}
          >
            <div className="cd-phase-title">{p.title}</div>
            <div className="cd-phase-time">{p.time}</div>
            <div className="cd-phase-desc">{p.desc}</div>

            <div className="cd-mini-track">
              <div
                className="cd-mini-fill"
                style={{ width: `${fillFor(i)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

/* ---------- Teaser ---------- */


function Teaser() {
  return (
    <motion.section
      className="teaser-section"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <motion.div
        className="teaser-left"
        initial={{ scale: 0.96, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: true }}
      >
        {/* Replace placeholder with actual image */}
        <img
          src={assets.product}   // <-- make sure this exists in your assets
          alt="Abdeljalil Olive Oil Bottle"
          className="teaser-img"
          loading="lazy"
        />
      </motion.div>
      <div className="teaser-right">
        <h2 className="teaser-heading">Abdeljalil Olive Oil</h2>
        <div className="teaser-panel open">
          <p className="teaser-text">
            Crafted from 100% Haouzia olives, cultivated on family-owned farms,
            our oil offers an intense green fruitiness with distinct notes of
            artichoke, green almond, and fresh tomato with a peppery finish.
          </p>
        </div>
        <a href="/products" className="teaser-link">Learn more</a>
      </div>
    </motion.section>
  );
}




/* ---------- Page ---------- */
export default function Home() {
  return (
    <>
      {/* TEXT HERO */}
      <section className="home-hero-text">
        <motion.div
          className="home-hero-content"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="hero-slogan-row">
            <span className="hero-slogan">When quality has a face.</span>
          </div>
          <h1 className="hero-title">Moroccan Extra Virgin Olive Oil</h1>
          <p className="hero-desc">
            An authentic taste of Morocco. Hand-picked by our family, our
            Haouzia olives are pressed fresh at their peak harvest once a year,
            bringing you an exclusive, seasonal extra virgin olive oil.
          </p>
        </motion.div>
      </section>

      {/* VIDEO BACKDROP */}
      <section className="home-hero-video-wrap">
        <video
          className="home-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          {assets.heroVideoWebm && (
            <source src={assets.heroVideoWebm} type="video/webm" />
          )}
          <source src={assets.heroVideoMp4} type="video/mp4" />
        </video>
      </section>

      {/* COUNTDOWN */}
      <BigCountdown />

      {/* TEASER */}
      <Teaser />
    </>
  );
}






