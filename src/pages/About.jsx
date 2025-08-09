import React from "react";
import { assets } from "../assets/assets";
import "./About.css";

const team = [
  {
    key: "abdeljalil",
    name: "Abdeljalil",
    role: "Founder & Master Producer",
    img: assets.abdeljalil,
    story:
      "Raised among Haouzia groves outside Marrakech, Abdeljalil learned to read trees the way others read books. His pre-dawn field walks and tasting fruit straight from the branch shape every decision from pruning to pressing. Olive oil, to him, is a duty to land and lineage.",
  },
  {
    key: "anas",
    name: "Anas",
    role: "Brand & Operations",
    img: assets.anas,
    story:
      "Anas carried bottles across continents, turning friends into loyal tasters. Today he bridges tradition and technology—logistics, quality control, and the tiny details that make a small family press feel world-class.",
  },
  {
    key: "lea",
    name: "Lea",
    role: "Quality & Tasting Director",
    img: assets.lea,
    story:
      "Lea’s palate is our compass. She designs blind tastings, calibrates harvest windows, and defends freshness. Green almond, artichoke, pepper—her notes guide our blends and set the standard for what makes the cut.",
  },
  {
    key: "marouane",
    name: "Marouane",
    role: "Pressing Lead",
    img: assets.marouane,
    story:
      "At the mill, seconds matter. Marouane choreographs the rush from field to press so every olive meets the stone at peak vitality. Temperatures, wash cycles, batch timing—his discipline keeps our oil bright and intensely aromatic.",
  },
];

export default function About() {
  return (
    <section className="about-v3">
      {/* Hero */}
      <header className="av3-hero">
        <h1 className="av3-title">The People Behind the Press</h1>
        <p className="av3-lead">
          Original Haouzia trees. Family hands. A single promise: harvest by hand
          and press within the hour—so a grove can taste like a place, not a factory.
        </p>
        <div className="av3-rule" aria-hidden="true" />
      </header>

      {/* Value badges */}
      <ul className="av3-badges">
        <li>Original trees</li>
        <li>Pressed within the hour</li>
        <li>Family-run</li>
      </ul>

      {/* Horizontal snap-scroll rail */}
      <div className="av3-rail">
        {team.map((m) => (
          <article key={m.key} className="bio-card" tabIndex={0}>
            <figure className="bio-media">
              <img src={m.img} alt={`${m.name} — ${m.role}`} loading="lazy" />
              <figcaption className="bio-caption">
                <span className="bio-name">{m.name}</span>
                <span className="bio-role">{m.role}</span>
              </figcaption>
            </figure>

            {/* Expandable story — no JS */}
            <details className="bio-details">
              <summary>Read {m.name.split(" ")[0]}'s story</summary>
              <p>{m.story}</p>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}








