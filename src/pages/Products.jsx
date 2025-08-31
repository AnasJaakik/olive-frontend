// src/pages/Products.jsx
import React from "react";
import "./Products.css";
import { motion } from "framer-motion";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.08 }
  }
};
const leftCol = { hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } } };
const rightCol = { hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.05 } } };
const fadeStep = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } };

export default function Products() {
  const PAYMENT_LINK = "https://buy.stripe.com/test_28EaEYb5n2aH6oHexUak000";

  return (
    <motion.main className="product-detail" variants={pageVariants} initial="hidden" animate="visible">
      {/* HERO: left images, right sticky info */}
      <section className="pd-hero">
        {/* LEFT: product images */}
        <motion.div className="pd-left" variants={leftCol}>
          <img
            src="https://via.placeholder.com/380x600.png?text=Bottle+Placeholder"
            alt="Olive Oil Bottle"
            className="pd-bottle"
          />
          <img
            src="https://via.placeholder.com/260x180.png?text=Nutritional+Information"
            alt="Nutritional information"
            className="pd-nutrition"
          />
        </motion.div>

        {/* RIGHT: sticky card with details and actions */}
        <motion.aside className="pd-right" variants={rightCol}>
          <h1 className="pd-title">Abdeljalil Olive Oil</h1>
          <div className="pd-price">€29.00</div>
          <div className="pd-size">750ml</div>

          <div className="pd-desc">
            <p>
              Haouzia olive oils are best appreciated when they are not overwhelmed by other ingredients. In Morocco
              olive oil is typically served with bread for dipping, often in combination with honey.
            </p>
            <p>Intense flavours are best appreciated when not overwhelmed by other ingredients or high heat.</p>
            <p>
              Typically olive oil in Morocco is used for dipping with bread, on soups or as a finish on cooked dishes
              like grilled fish to add a layer of fresh flavour.
            </p>
            <p>
              Due to its high polyphenol content and monounsaturated fats our olive oil can also be used to cook, fry
              and marinate.
            </p>
          </div>

          <div className="pd-actions">
            <button
              onClick={() => (window.location.href = PAYMENT_LINK)}
              className="pd-buy"
            >
              Buy Now
            </button>
          </div>
        </motion.aside>
      </section>

      {/* ORIGIN & PROCESS — always visible now */}
      <section className="pd-process">
        <motion.h2 variants={fadeStep} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          Our Process: From Flower to Fresh Press
        </motion.h2>

        {/* 1 */}
        <motion.div className="pd-step left" variants={fadeStep} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          <img src="https://via.placeholder.com/340x240.png?text=Haouzia+Blossoms" alt="Haouzia Blossoms" />
          <div>
            <h3>The Haouzia Olive’s Journey</h3>
            <p>
              Our olive oil begins its life each spring when our Haouzia olive trees awaken with their first blossoms,
              usually around <strong>late April to early May</strong>. These delicate white flowers mark the start of the
              season and rely heavily on wind pollination—a process that our dry Marrakech climate uniquely supports.
              Haouzia, a variety native to our region, has been cultivated for its remarkable ability to thrive in hot,
              dry summers and produce olives with high oil content and exceptional flavor.
            </p>
          </div>
        </motion.div>

        {/* … all the other steps stay unchanged … */}

        {/* Bottom CTA inside Process section */}
        <motion.div
          className="pd-process-cta"
          variants={fadeStep}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <button
            onClick={() => (window.location.href = PAYMENT_LINK)}
            className="pd-buy pd-buy-secondary"
          >
            Buy Now
          </button>
        </motion.div>
      </section>
    </motion.main>
  );
}


