// src/pages/Products.jsx
import React from "react";
import "./Products.css";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

const leftCol = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

/**
 * IMPORTANT: Avoid translate animations on the sticky column,
 * because transforms on ancestors can interfere with sticky in some browsers.
 */
const rightCol = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.05 },
  },
};

const fadeStep = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

// Google Form Link (pre-order)
const PREORDER_LINK = "https://forms.gle/NCd8m2HVoQ851BDf7";

export default function Products() {
  const handleBuy = () => {
    window.open(PREORDER_LINK, "_blank");
  };

  return (
    <motion.main
      id="main"
      className="product-detail"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      role="main"
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
            src={assets.nutri}
            alt="Nutritional information"
            className="pd-nutrition"
          />
        </motion.div>

        {/* RIGHT: sticky card with details and actions */}
        <motion.aside
          className="pd-right"
          variants={rightCol}
          aria-label="Product details"
        >
          <div className="pd-right-sticky">
            <h1 className="pd-title">Abdeljalil Olive Oil</h1>
            <div className="pd-price">€29.00</div>
            <div className="pd-size">750ml</div>

            <div className="pd-desc">
              <p>
                Our extra virgin olive oil is a true single-origin product from
                <span className="highlight"> Morocco</span>. While Moroccan
                tradition often calls for serving olive oil with warm bread or
                as a final flourish on soups and other dishes, we encourage you
                to use our oil in any way you desire. Its complex flavor profile
                makes it suitable for a wide range of culinary applications.
              </p>
              <p>
                Due to its high concentration of polyphenols and monounsaturated
                fats, our olive oil is not only ideal for finishing, but it can
                also be used for cooking, frying, and marinating.
              </p>

              <div className="pd-actions" aria-label="Purchase actions">
                <button onClick={handleBuy} className="pd-buy">
                  Pre-order Now!
                </button>
              </div>

              {/* NEW SECTION */}
              <div className="pd-special">
                <h3>What is special about our oil?</h3>
                <p>
                  Our Extra Virgin Olive Oil is a testament to quality, with
                  this year’s harvest aiming for an acidity level of less than{" "}
                  <strong>0.4%</strong>. This estimation is based on our
                  extensive experience in producing olive oil from our family’s
                  farm and distributing it to family and friends inside and
                  outside Morocco. The consistency of our process and the health
                  of our olive trees contribute to this result. Our previous
                  harvests have undergone rigorous testing, confirming our
                  ability to produce an oil that far exceeds the strict criteria
                  for extra virgin which requires an acidity level of{" "}
                  <strong>0.8%</strong> or less.
                </p>
                <p>
                  This low acidity level is a key indicator of olive oil
                  quality. It measures the amount of free fatty acids present in
                  the oil, expressed as a percentage of oleic acid. Contrary to
                  its name, this acidity does not affect the oil’s taste. A
                  lower acidity indicates that the oil was produced from
                  healthy, undamaged olives with minimal processing time. When
                  the olive fruits are damaged or processing is delayed, fatty
                  acids are released, which increases the acidity. Our careful
                  production process ensures a low acidity, reflecting our
                  commitment to quality.
                </p>
              </div>
            </div>
          </div>
        </motion.aside>
      </section>

      {/* ORIGIN & PROCESS — text-only section */}
      <section className="pd-process">
        <motion.h2
          variants={fadeStep}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          From Tree to Bottle
        </motion.h2>

        <motion.div
          className="pd-process-cta"
          variants={fadeStep}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p>
            We begin our harvest in late October and early November, when the
            olives are still green and early in their ripening cycle. While this
            results in a lower yield, it ensures a richer concentration of
            polyphenols, which are responsible for the oil&apos;s distinctive
            peppery and bitter notes. We hand-pick all our olives. The olives
            get collected in a big open pick-up truck which then transports them
            to our partner in Sidi Bou Othmane for processing and bottling. To
            ensure the best quality and make sure the olives get processed in 24
            hours, we chose a partner that is only two hours drive from our
            farm.
          </p>
          <p>
            Once arrived, all our olives will be added to the processing
            machine. This machine can process up to ten tonnes of olives and
            takes care of all the following steps. The final product is the
            freshly pressed oil in the end. First, they are stripped of any
            leaves and branches, then carefully washed and rinsed with cold
            water to remove any dirt. After cleaning, the olives are crushed and
            kneaded for at least 40 minutes, a process that gently releases all
            their oil. We handle the olives in small quantities to preserve
            their delicate aroma, antioxidants, and nutrients. This step creates
            a paste, a mixture of oil, water, and olive pulp.
          </p>
          <p>
            Following the mixing phase is the separation &amp; extraction of the
            pure oil. This crucial step is purely mechanical, using no
            chemicals, heat, or solvents. The olive paste is fed into a large,
            high-speed centrifuge, a horizontal separator, also called decanter.
            The machine spins the paste with incredible force, and because oil,
            water, and solids have different densities, the centrifugal force
            separates them into distinct layers. The heaviest materials, which
            is the solid pulp, pits, and skins, known as &quot;pomace&quot;,
            are forced to the outer wall. The lighter vegetable water is held in
            the middle, and the lightest component, the pure olive oil,
            collects at the center. The separated oil, which still contains a
            small amount of residual water and tiny solid particles, is then fed
            into a vertical centrifuge. This machine spins even faster,
            polishing the oil and separating the remaining water and
            micro-impurities from the pure, final product.
          </p>
          <p>
            The fresh oil is stored in stainless steel vats for about four days
            so that any remaining sediment can settle before it gets bottled for
            your delivery.
          </p>
        </motion.div>
      </section>
    </motion.main>
  );
}





