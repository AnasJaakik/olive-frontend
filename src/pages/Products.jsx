import React, { useState } from "react";
import { assets } from "../assets/assets";
import "./Products.css";

export default function Products() {
  // change this to your final inbox later
  const MAIL_TO = "info@yourdomain.com";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState(
    "I'm interested in the 750ml bottle. Please keep me posted on the first release."
  );

  // graceful fallback if you haven't added a bottle image yet
  const bottleImg = assets.bottle750 || assets.oliveHero || assets.riad;

  const sendInterest = (e) => {
    e.preventDefault();
    const subject = "Invitation Request — 750ml Abdeljalil Olive Oil";
    const body = [
      `Name: ${name || "(not provided)"}`,
      `Email: ${email || "(not provided)"}`,
      "",
      note
    ].join("\n");

    window.location.href = `mailto:${MAIL_TO}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="products-v2">
      {/* HERO */}
      <header className="pv2-hero">
        <div className="pv2-eyebrow">First Harvest Release</div>
        <h1 className="pv2-title">750 ml — Extra Virgin Moroccan Olive Oil</h1>
        <p className="pv2-lead">
          Haouzia single-varietal • Hand-picked • Pressed within the hour • Marrakech
        </p>
      </header>

      {/* SHOWCASE */}
      <div className="pv2-showcase">
        {/* Bottle pedestal */}
        <figure className="pv2-pedestal" aria-label="750ml bottle showcase">
          <div className="pv2-halo" aria-hidden="true" />
          <div className="pv2-bottle">
            <img
              src={bottleImg}
              alt="750ml bottle — Abdeljalil Olive Oil"
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption className="pv2-ribbon">Invite-Only</figcaption>
        </figure>

        {/* Info panel */}
        <aside className="pv2-panel">
          <h2 className="pv2-name">750 ml Bottle</h2>

          <ul className="pv2-highlights">
            <li>Haouzia single varietal</li>
            <li>Marrakech, Morocco</li>
            <li>Harvest: November 1</li>
            <li>Cold-pressed (≤ 27 °C)</li>
          </ul>

          {/* Disabled order state */}
          <div className="pv2-status" role="status" aria-live="polite">
            Ordering opens after harvest
          </div>

          {/* Invitation / interest form */}
          <div className="pv2-invite">
            <h3 className="pv2-invite-title">Request an Invitation</h3>
            <p className="pv2-invite-copy">
              Our olive oil is released in small seasonal allocations. Tell us a bit about
              you and we’ll reach out ahead of the public drop.
            </p>

            <form className="pv2-form" onSubmit={sendInterest}>
              <div className="pv2-row">
                <label className="pv2-field">
                  <span>Name</span>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
                <label className="pv2-field">
                  <span>Email</span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
              </div>

              <label className="pv2-field">
                <span>Message</span>
                <textarea
                  rows="4"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </label>

              <div className="pv2-actions">
                <button type="submit" className="pv2-btn">
                  Send interest email
                </button>
                <div className="pv2-tiny">
                  This opens your email app with a pre-filled message.
                </div>
              </div>
            </form>
          </div>
        </aside>
      </div>
    </section>
  );
}








