import React, { useEffect, useMemo, useState } from "react";
import { assets } from "../assets/assets";
import "./Home.css";
import { motion } from "framer-motion";  // NEW

// ---------- Helpers (same as before) ----------
function getNextHarvest(now = new Date()) {
  const thisYearHarvest = new Date(now.getFullYear(), 10, 1, 0, 0, 0); 
  return now < thisYearHarvest
    ? thisYearHarvest
    : new Date(now.getFullYear() + 1, 10, 1, 0, 0, 0);
}

function diffParts(to, from = new Date()) {
  let delta = Math.max(0, to - from); 
  const sec = Math.floor(delta / 1000) % 60;
  const min = Math.floor(delta / (1000 * 60)) % 60;
  const hour = Math.floor(delta / (1000 * 60 * 60)) % 24;
  const days = Math.floor(delta / (1000 * 60 * 60 * 24));
  return { days, hours: hour, minutes: min, seconds: sec, ms: delta };
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
  if ((m === 10 && d >= 1) || m === 11 || m <= 0 || (m === 1 && d < 15)) {
    return "Dormancy — trees are resting.";
  } else if ((m === 1 && d >= 15) || m === 2 || m === 3) {
    return "Bud swelling & flowering — blossoms are forming.";
  } else if (m === 4 || m === 5) {
    return "Fruit set — tiny olives are developing.";
  } else if (m === 6) {
    return "Pit hardening — stones are forming inside the olives.";
  } else if (m === 7) {
    return "Oil accumulation — oil content is increasing.";
  } else if (m === 8) {
    return "Maturation — flavors and aromas are developing.";
  } else {
    return "Harvest time — hand-picking at peak ripeness.";
  }
}

// ---------- Big Countdown ----------
function BigCountdown() {
  const target = useMemo(() => getNextHarvest(), []);
  const [parts, setParts] = useState(() => diffParts(target));
  const [pct, setPct] = useState(() => seasonProgress());
  const [stage, setStage] = useState(() => getOliveStage());

  useEffect(() => {
    const tick = () => {
      setParts(diffParts(target));
      setPct(seasonProgress());
      setStage(getOliveStage());
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <motion.section 
      className="countdown-hero"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="cd-eyebrow">Countdown to Harvest</div>

      <div className="cd-wrap" role="timer">
        <div className="cd-seg"><div className="cd-num">{parts.days}</div><div className="cd-label">days</div></div>
        <div className="cd-sep">:</div>
        <div className="cd-seg"><div className="cd-num">{pad(parts.hours)}</div><div className="cd-label">hours</div></div>
        <div className="cd-sep">:</div>
        <div className="cd-seg"><div className="cd-num">{pad(parts.minutes)}</div><div className="cd-label">minutes</div></div>
        <div className="cd-sep">:</div>
        <div className="cd-seg"><div className="cd-num">{pad(parts.seconds)}</div><div className="cd-label">seconds</div></div>
      </div>

      <div className="cd-sub">Next harvest: November 1</div>
      <div className="cd-stage">{stage}</div>

      <div className="cd-progress"><div className="cd-progress-fill" style={{ width: `${pct}%` }} /></div>
      <div className="cd-progress-label">{Math.round(pct)}% of the season elapsed</div>
    </motion.section>
  );
}

// ---------- Home ----------
export default function Home() {
  return (
    <>
      {/* HERO */}
      <section id="home" className="home-hero">
        <motion.div 
          className="home-hero-content"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="hero-slogan-row">
            <span className="hero-slogan">When quality has a face.</span>
          </div>
          <h1 className="hero-title">Extra virgin Moroccan Olive Oil</h1>
          <p className="hero-desc">
            An authentic taste of Morocco. Hand-picked by our family, our
            Haouzia olives are pressed fresh at their peak harvest once a year,
            bringing you an exclusive, seasonal extra virgin olive oil unlike any other.
          </p>
        </motion.div>

        <motion.div 
          className="home-hero-img"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <img src={assets.riad} alt="Riad / grove scene" />
        </motion.div>
      </section>

      {/* BIG COUNTDOWN */}
      <BigCountdown />

      {/* TEASER SECTION */}
      <motion.section 
        className="teaser-section"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="teaser-left">
          <h2 className="teaser-heading">Discover our harvest</h2>
          <p className="teaser-text">
            Each drop carries the story of our family’s groves in Marrakech.
            A seasonal treasure, pressed fresh to preserve its golden soul.
          </p>
          <a href="#products" className="teaser-btn">Explore Products</a>
        </div>
        <motion.div 
          className="teaser-right"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="teaser-img-placeholder">Product Image</div>
        </motion.div>
      </motion.section>
    </>
  );
}




