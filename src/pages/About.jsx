// src/pages/About.jsx
import React from "react";
import "./About.css";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.08 },
  }),
};

export default function About() {
  return (
    <main className="about-page">
      {/* HERO IMAGE */}
      <section className="about-hero">
        <img
          className="about-hero-img"
          src={assets.haouzia}
          alt="Haouzia grove panorama"
        />
      </section>

      {/* STORY + GALLERY (2 columns) */}
      <section className="about-body">
        {/* LEFT: STORY */}
        <div className="about-content">
          <motion.h2
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Our Story
          </motion.h2>

          <motion.p custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            The story of our olive oil begins with a man: <strong>Abdeljalil</strong>. Raised with six siblings in the vibrant old town of Marrakesh, he grew up with an insatiable curiosity for the world. That passion led him to become a life science teacher, dedicated to showing how nature evolves and works together. He passed this same spirit to his sons, Marouane and Anas, teaching them to see the world, its people, and its wonders with open minds.
          </motion.p>

          <motion.p custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Abdeljalil spent much of his free time on the family farm, teaching his children to care for their <strong>century-old Haouzia olive trees</strong>. These trees, unique to Marrakesh’s Haouz province, thrive only in this land’s particular climate, producing olives with an intense, unmistakable flavor.
          </motion.p>

          <motion.p custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Our approach is simple: a <strong>regenerative ecosystem</strong>. No chemicals, just a diverse balance of plants, animals, and olive trees coexisting. It’s farming as it was meant to be—alive, sustainable, and deeply respectful of the land.
          </motion.p>

          <motion.p custom={4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            When harvest arrives, it’s more than work—it’s celebration. Every olive is hand-picked under the Moroccan sun and pressed within 24 hours. The first drop of oil each season carries a joy you can taste: fresh, pure, alive.
          </motion.p>

          <motion.p custom={5} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            This is what sets us apart. For us, <strong>quality has a face</strong>—and it’s Abdeljalil’s. His legacy of knowledge, care, and passion lives in every bottle we produce.
          </motion.p>

          <motion.p custom={6} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            What began as a family tradition—sharing oil with friends—has blossomed into a mission: bringing authentic Haouzia olive oil from Marrakesh to tables around the world, without ever losing the purity and heart that define it.
          </motion.p>
        </div>

        {/* RIGHT: GALLERY */}
        <div className="about-gallery-col">
          <h2 className="gallery-header">Gallery</h2>
          <div className="gallery-grid">
            <div className="gallery-ph">
              <img src={assets.gallery1} alt="Gallery placeholder" className="gallery-img" />
            </div>
            <div className="gallery-ph">
              <img src={assets.gallery2}  alt="Gallery placeholder" className="gallery-img" />
            </div>
            <div className="gallery-ph">
              <img src={assets.gallery3}  alt="Gallery placeholder" className="gallery-img" />
            </div>
            <div className="gallery-ph">
              <img src={assets.gallery4}  alt="Gallery placeholder" className="gallery-img" />
            </div>
            <div className="gallery-ph">
              <img src={assets.gallery5}  alt="Gallery placeholder" className="gallery-img" />
            </div>
            <div className="gallery-ph">
              <img src={assets.gallery6}  alt="Gallery placeholder" className="gallery-img" />
            </div>
          </div>
        </div>
      </section>

      {/* MEET THE TEAM (full width) */}
      <section className="team-section">
        <h2 className="team-header">Meet the Team</h2>
        <div className="team-gallery">
          <div className="team-ph">
            <img src={assets.abdeljalil} alt="Team member" className="team-img" />
            <div className="team-caption">Name</div>
          </div>
          <div className="team-ph">
            <img src={assets.anas} alt="Team member" className="team-img" />
            <div className="team-caption">Name</div>
          </div>
          <div className="team-ph">
            <img src={assets.lea} alt="Team member" className="team-img" />
            <div className="team-caption">Name</div>
          </div>
        </div>
      </section>
    </main>
  );
}











