import React, { useEffect, useMemo, useRef, useState } from "react";
import { assets } from "../assets/assets";
import "./Home.css";
import { motion } from "framer-motion";

/* ---------- Season & Phase Helpers (date-accurate) ---------- */

/** Season runs from last Nov 1 (inclusive) to next Nov 1 (exclusive). */
function getSeasonBounds(now = new Date()) {
  const year = now.getFullYear();
  const nov1ThisYear = new Date(year, 10, 1, 0, 0, 0); // Nov = month 10
  const seasonStart = now >= nov1ThisYear ? nov1ThisYear : new Date(year - 1, 10, 1, 0, 0, 0);
  const seasonEnd = new Date(seasonStart.getFullYear() + 1, 10, 1, 0, 0, 0); // next Nov 1
  return { seasonStart, seasonEnd };
}

function getNextHarvest(now = new Date()) {
  const { seasonEnd } = getSeasonBounds(now);
  return seasonEnd; // Nov 1 of the current/next season
}

/** Build the canonical phase list with real calendar ranges inside the season. */
function buildPhases(now = new Date()) {
  const { seasonStart, seasonEnd } = getSeasonBounds(now);

  const seasonYear = seasonStart.getFullYear(); // e.g., 2024 if season start is Nov 1, 2024
  const nextYear = seasonYear + 1;
  const d = (y, m, day) => new Date(y, m, day, 0, 0, 0);

  const phases = [
    {
      key: "dormancy",
      title: "Dormancy",
      time: "Nov – mid-Feb",
      desc: "Trees rest and store energy.",
      start: d(seasonYear, 10, 1),
      end: d(nextYear, 1, 15),
    },
    {
      key: "flowering",
      title: "Bud & Flower",
      time: "Mid-Feb – Apr",
      desc: "Buds swell; delicate blossoms form.",
      start: d(nextYear, 1, 15),
      end: d(nextYear, 3, 30 + 1),
    },
    {
      key: "fruitset",
      title: "Fruit Set",
      time: "May – Jun",
      desc: "Tiny olives develop after pollination.",
      start: d(nextYear, 4, 1),
      end: d(nextYear, 6, 1),
    },
    {
      key: "pit",
      title: "Pit Hardening",
      time: "July",
      desc: "Stones form inside the olives.",
      start: d(nextYear, 6, 1),
      end: d(nextYear, 7, 1),
    },
    {
      key: "oilaccu",
      title: "Oil Accumulation",
      time: "August",
      desc: "Oil content rises; flavors intensify.",
      start: d(nextYear, 7, 1),
      end: d(nextYear, 8, 1),
    },
    {
      key: "maturation",
      title: "Maturation",
      time: "Sept – Oct",
      desc: "Aromas deepen; texture and taste round out.",
      start: d(nextYear, 8, 1),
      end: d(nextYear, 10, 1),
    },
    {
      key: "harvest",
      title: "Harvest",
      time: "Nov 1st",
      desc: "Hand-picked at peak ripeness.",
      start: d(seasonEnd.getFullYear(), 10, 1),
      end: d(seasonEnd.getFullYear(), 10, 2),
    },
  ];

  return { phases, seasonStart, seasonEnd };
}

/** % of the way through the entire season. */
function seasonProgress(now = new Date()) {
  const { seasonStart, seasonEnd } = getSeasonBounds(now);
  const total = seasonEnd - seasonStart;
  const passed = now - seasonStart;
  return Math.min(100, Math.max(0, (passed / total) * 100));
}

/** Which phase index are we currently in? */
function getPhaseIndexByRanges(phases, now = new Date()) {
  const t = +now;
  for (let i = 0; i < phases.length; i++) {
    const { start, end } = phases[i];
    if (t >= +start && t < +end) return i;
  }
  return phases.length - 1;
}

/** Fill % for a specific phase card given the current time. */
function fillPercentForPhase(phase, now = new Date()) {
  const { start, end } = phase;
  const total = +end - +start;
  if (total <= 0) return 0;
  if (now >= end) return 100;
  if (now <= start) return 0;
  return Math.round(((+now - +start) / total) * 100);
}

/* ---------- Countdown section ---------- */
function BigCountdown() {
  const target = useMemo(() => getNextHarvest(), []);
  const [{ days }, setParts] = useState(() => {
    const delta = Math.max(0, target - new Date());
    return { days: Math.floor(delta / (1000 * 60 * 60 * 24)), ms: delta };
  });

  const [pct, setPct] = useState(() => seasonProgress());
  const [{ phases }, setPhasesData] = useState(() => buildPhases());
  const [phaseIdx, setPhaseIdx] = useState(() => getPhaseIndexByRanges(phases));
  const [stageText, setStageText] = useState(() => {
    const p = phases[phaseIdx]?.title || "";
    return p ? `Current status: ${p}.` : "Current status: —";
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const delta = Math.max(0, target - now);
      setParts({
        days: Math.floor(delta / (1000 * 60 * 60 * 24)),
        ms: delta,
      });

      setPct(seasonProgress(now));
      const built = buildPhases(now);
      setPhasesData(built);

      const idx = getPhaseIndexByRanges(built.phases, now);
      setPhaseIdx(idx);

      const label = built.phases[idx]?.title || "";
      setStageText(label ? `Current status: ${label}.` : "Current status: —");
    };

    tick();
    const id = setInterval(tick, 1000 * 60 * 30); // every 30 minutes
    return () => clearInterval(id);
  }, [target]);

  return (
    <motion.section
      className="countdown-hero"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="cd-eyebrow">COUNTDOWN TO HARVEST</div>

      <div className="cd-days-only" role="timer" aria-label="Days until harvest">
        <div className="cd-days-number">{days}</div>
        <div className="cd-days-label">DAYS</div>
      </div>

      <div className="cd-sub">Next harvest: November 1</div>
      <div className="cd-stage">{stageText}</div>

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
                style={{ width: `${fillPercentForPhase(p)}%` }}
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
        <img
          src={assets.product}
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
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.50; // ✅ Set speed
    }
  }, []);

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
          ref={videoRef}
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








