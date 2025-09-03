// src/pages/Products.jsx
import React from "react";
import "./Products.css";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.08 }
  }
};
const leftCol = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};
const rightCol = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.05 } }
};
const fadeStep = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
};

// Stripe Payment Link (test mode)
const STRIPE_LINK = "https://buy.stripe.com/test_28EaEYb5n2aH6oHexUak000";

export default function Products() {
  const handleBuy = () => {
    window.location.href = STRIPE_LINK;
  };

  return (
    <motion.main
      className="product-detail"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* HERO: left images, right sticky info */}
      <section className="pd-hero">
        {/* LEFT: product images */}
        <motion.div className="pd-left" variants={leftCol}>
          <img
            src={assets.product}
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
  Our extra virgin olive oil is a true single-origin product from 
  <span class="highlight"> Morocco</span>.
  While Moroccan tradition often calls for serving olive oil with warm bread or as a final flourish on soups and other dishes, we encourage you to use our oil in any way you desire. Its complex flavor profile makes it suitable for a wide range of culinary applications.
  Due to its high concentration of polyphenols and monounsaturated fats, our olive oil is not only ideal for finishing, but it can also be used for cooking, frying, and marinating.
</p>

         </div>

          <div className="pd-actions">
            {/* Stripe Buy Now button */}
            <button onClick={handleBuy} className="pd-buy">
              Buy Now
            </button>
          </div>
        </motion.aside>
      </section>

      {/* ORIGIN & PROCESS — always visible now */}
      <section className="pd-process">
        <motion.h2
          variants={fadeStep}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          Our Process: From Flower to Fresh Press
        </motion.h2>

        {/* Optional extra CTA at the top of Process */}
        <motion.div
          className="pd-process-cta"
          variants={fadeStep}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        ></motion.div>

        {/* 1 */}
        <motion.div
          className="pd-step left"
          variants={fadeStep}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img
            src={assets.flowering}
            alt="Haouzia Blossoms"
          />
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

        {/* 2 */}
        <motion.div
          className="pd-step right"
          variants={fadeStep}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img
            src={assets.care}
            alt="Sustainable Care"
          />
          <div>
            <h3>Sustainable by Nature</h3>
            <p>
              Though Haouzia trees are <strong>naturally drought-adapted</strong>, we choose to support them with moderate
              watering during the peak summer months. This isn’t industrial irrigation—just a respectful gesture to help
              the trees cope with the extreme Moroccan heat. This balance ensures strong, healthy fruit without sacrificing
              the concentrated flavors that come from the tree’s natural stress response.
            </p>
          </div>
        </motion.div>

        {/* 3 */}
        <motion.div
          className="pd-step left"
          variants={fadeStep}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img
            src={assets.maturation}
            alt="Early Harvest"
          />
          <div>
            <h3>Picked Green, Pressed Swiftly</h3>
            <p>
              Our harvest begins in <strong>late October</strong>, when the olives are still green—early in their ripening
              cycle. This timing results in lower yield, but a <strong>richer concentration of polyphenols</strong>, giving
              the oil its peppery bite, bitterness, and long shelf life.
            </p>
            <p>
              The moment the olives are picked, the clock starts ticking. Within <strong>less than an hour</strong>, we
              transport them from tree to mill—no delays, no storage. This is what sets us apart. Every batch is
              <strong> pressed fresh</strong>, in small quantities, ensuring maximum preservation of aroma, antioxidants,
              and nutrients.
            </p>
          </div>
        </motion.div>

        {/* 4 */}
        <motion.div
          className="pd-step right"
          variants={fadeStep}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img
            src="https://via.placeholder.com/340x240.png?text=Cold+Extraction"
            alt="Cold Extraction"
          />
          <div>
            <h3>Cold Extraction, No Additives</h3>
            <p>
              We never add water, and we never heat the paste. Our olives are cold-extracted under <strong>27°C</strong> in
              stainless steel equipment. First, they are gently crushed into a fine paste. Then, through a method called
              <strong> malaxation</strong>, the paste is slowly stirred to allow the microscopic oil droplets to merge. This
              process takes around 30 minutes and is done under precise temperature control.
            </p>
            <p>
              Unlike some industrial producers, we <strong>do not dilute</strong> our paste with added water, and we never
              use chemical aids. Our oil is separated using a <strong>two-phase centrifugal system</strong>, which helps
              retain more of the olive’s natural polyphenols and aromatic compounds.
            </p>
          </div>
        </motion.div>

        {/* 5 */}
        <motion.div
          className="pd-step left"
          variants={fadeStep}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img
            src="https://via.placeholder.com/340x240.png?text=Natural+Settling"
            alt="Natural Settling"
          />
          <div>
            <h3>Unfiltered Purity, Naturally Settled</h3>
            <p>
              Right after pressing, the oil is vivid green and cloudy—a sign of freshness. Rather than filter it mechanically,
              we let the oil <strong>settle naturally</strong> in stainless steel tanks for several weeks. The sediment gently
              sinks, and we carefully decant only the purest top layer.
            </p>
            <p>This method respects the oil’s natural structure while enhancing stability and flavor.</p>
          </div>
        </motion.div>

        {/* 6 */}
        <motion.div
          className="pd-step right"
          variants={fadeStep}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <img
            src="https://via.placeholder.com/340x240.png?text=Final+Result"
            alt="Final Result"
          />
          <div>
            <h3>The Final Result</h3>
            <p>
              The result? A <strong>deep golden-green olive oil</strong> that captures the scent of fresh grass, green almonds,
              and a hint of artichoke. It’s robust yet balanced, with a peppery finish that lingers on the palate—a true
              signature of early-harvest Haouzia olives.
            </p>
            <p>
              Every drop you taste has been part of a story that begins with Marrakech’s red earth, continues with our
              family's care, and ends with a bottle lovingly sent to your table.
            </p>
          </div>
        </motion.div>

        {/* Bottom CTA inside Process section */}
        <motion.div
          className="pd-process-cta"
          variants={fadeStep}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
         
        </motion.div>
      </section>
    </motion.main>
  );
}






