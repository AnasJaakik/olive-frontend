import React from "react";
import { assets } from "../assets/assets";
import "./About.css";

const team = [
  {
    key: "abdeljalil",
    name: "Abdeljalil",
    role: "Father",
    img: assets.abdeljalil,
    note: "The heart of the grove.",
    story:
      "Raised among Haouzia trees, Abdeljalil carries the rituals of pruning, picking, and timing the press. His calm precision sets the standard for everything we bottle.",
  },
  {
    key: "anas",
    name: "Anas",
    role: "Son",
    img: assets.anas,
    note: "From Marrakech to the world.",
    story:
      "Anas bridges tradition and modern craft—brand, operations, and the tiny details that make a small press feel world-class.",
  },
  {
    key: "marouane",
    name: "Marouane",
    role: "Son",
    img: assets.marouane,
    note: "Field to press—no seconds wasted.",
    story:
      "Marouane choreographs harvest days: fruit in, leaves out, temperature right. Bright, clean oil—every single batch.",
  },
  {
    key: "lea",
    name: "Lea",
    role: "Partner",
    img: assets.lea,
    note: "Palate, notes, and discipline.",
    story:
      "Lea leads our tasting. If it’s not fresh enough for her table, it doesn’t make it into your bottle.",
  },
];

export default function About() {
  return (
    <section className="about-simple">
      <header className="about-head">
        <h1 className="about-title">Meet the Team</h1>
        <p className="about-intro">
          A family project rooted in Marrakech—original Haouzia trees, hand-picked and pressed within the hour.
        </p>
      </header>

      <div className="team-grid">
        {team.map((m) => (
          <article className="member-card" key={m.key}>
            <div className="member-media">
              <img src={m.img} alt={`${m.name} — ${m.role}`} loading="lazy" />
            </div>
            <h3 className="member-name">{m.name}</h3>
            <div className="member-role">{m.role}</div>
            <p className="member-note">{m.note}</p>
            <p className="member-story">{m.story}</p>
          </article>
        ))}
      </div>

      <section className="team-story">
        <h2 className="story-title">Our Story</h2>
        <p className="story-text">
          We grew up between Marrakech’s red earth and the shade of Haouzia trees. What began as family harvest days
          became a yearly ritual our friends asked to share. Today, we still work the same way: original trees, careful
          hands, and a press that runs only when fruit is perfect. The result is simple—oil that tastes like the place
          it came from.
        </p>
      </section>
    </section>
  );
}










