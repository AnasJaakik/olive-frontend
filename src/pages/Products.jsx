import React, { useState } from "react";
import "./Products.css";
import { motion } from "framer-motion";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.1 }
  }
};

const leftColVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const rightColVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.1 } }
};

const bottleVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut", delay: 0.05 } }
};

const nutritionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.15 } }
};

const stepVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
};

export default function ProductDetail() {
  const [showProcess, setShowProcess] = useState(false);

  return (
    <motion.main
      className="product-detail"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Top layout: bottle + info */}
      <section className="pd-hero">
        <motion.div className="pd-left" variants={leftColVariants}>
          <motion.img
            variants={bottleVariants}
            src="https://via.placeholder.com/350x500.png?text=Bottle+Placeholder"
            alt="Olive Oil Bottle"
            className="pd-bottle"
          />
          <motion.img
            variants={nutritionVariants}
            src="https://via.placeholder.com/200x80.png?text=Nutritional+Info"
            alt="Nutritional Information"
            className="pd-nutrition"
          />
        </motion.div>

        <motion.div className="pd-right" variants={rightColVariants}>
          <h1 className="pd-title">Abdeljalil Olive Oil</h1>
          <div className="pd-price">€29.00</div>
          <div className="pd-size">750ml</div>

          <div className="pd-desc">
            <p>
              Haouzia olive oils are best appreciated when they are not
              overwhelmed by other ingredients. In Morocco olive oil is typically
              served with bread for dipping, often in combination with honey.
            </p>
            <p>
              intense flavours are best appreciated when not overwhelmed by other
              ingredients or high heat
            </p>
            <p>
              typically olive oil in morocco is used for dipping with bread, on
              soups or as a finish on cooked dishes like grilled fish to add a
              layer of fresh flavour
            </p>
            <p>
              due to its high polyphenol content and monounsaturated fats our
              olive oil can also be used to cook, fry and marinate
            </p>
          </div>

          {/* Order Now button */}
          <motion.button
            className="pd-order"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Order Now
          </motion.button>

          {/* Toggle button */}
          <motion.button
            className="pd-toggle"
            onClick={() => setShowProcess(!showProcess)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            {showProcess ? "Hide Origin & Process ▲" : "Show Origin & Process ▼"}
          </motion.button>
        </motion.div>
      </section>

      {/* Process Section */}
      {showProcess && (
        <motion.section
          className="pd-process"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            variants={stepVariants}
            style={{ marginBottom: 30, textAlign: "center" }}
          >
            Our Process: From Flower to Fresh Press
          </motion.h2>

          <motion.div className="pd-step left" variants={stepVariants} viewport={{ once: true }}>
            <img
              src="https://via.placeholder.com/300x200.png?text=Blossoms"
              alt="Blossoms"
            />
            <div>
              <h3>The Haouzia Olive’s Journey</h3>
              <p>
                Our olive oil begins its life each spring when our Haouzia olive
                trees awaken with their first blossoms, usually around <b>late
                April to early May</b>. These delicate white flowers mark the
                start of the season and rely heavily on wind pollination—a
                process that our dry Marrakech climate uniquely supports. Haouzia,
                a variety native to our region, has been cultivated for its
                remarkable ability to thrive in hot, dry summers and produce
                olives with high oil content and exceptional flavor.
              </p>
            </div>
          </motion.div>

          <motion.div className="pd-step right" variants={stepVariants} viewport={{ once: true }}>
            <img
              src="https://via.placeholder.com/300x200.png?text=Sustainable"
              alt="Sustainability"
            />
            <div>
              <h3>Sustainable by Nature</h3>
              <p>
                Though Haouzia trees are <b>naturally drought-adapted</b>, we
                choose to support them with moderate watering during the peak
                summer months. This isn’t industrial irrigation—just a respectful
                gesture to help the trees cope with the extreme Moroccan heat.
                This balance ensures strong, healthy fruit without sacrificing the
                concentrated flavors that come from the tree’s natural stress
                response.
              </p>
            </div>
          </motion.div>

          <motion.div className="pd-step left" variants={stepVariants} viewport={{ once: true }}>
            <img
              src="https://via.placeholder.com/300x200.png?text=Harvest"
              alt="Harvest"
            />
            <div>
              <h3>Picked Green, Pressed Swiftly</h3>
              <p>
                Our harvest begins in <b>late October</b>, when the olives are
                still green—early in their ripening cycle. This timing results in
                lower yield, but a <b>richer concentration of polyphenols</b>,
                giving the oil its peppery bite, bitterness, and long shelf life.
              </p>
              <p>
                The moment the olives are picked, the clock starts ticking.
                Within <b>less than an hour</b>, we transport them from tree to
                mill—no delays, no storage. This is what sets us apart. Every
                batch is <b>pressed fresh</b>, in small quantities, ensuring
                maximum preservation of aroma, antioxidants, and nutrients.
              </p>
            </div>
          </motion.div>

          <motion.div className="pd-step right" variants={stepVariants} viewport={{ once: true }}>
            <img
              src="https://via.placeholder.com/300x200.png?text=Extraction"
              alt="Cold Extraction"
            />
            <div>
              <h3>Cold Extraction, No Additives</h3>
              <p>
                We never add water, and we never heat the paste. Our olives are
                cold-extracted under <b>27°C</b> in stainless steel equipment.
                First, they are gently crushed into a fine paste. Then, through a
                method called <b>malaxation</b>, the paste is slowly stirred to
                allow the microscopic oil droplets to merge. This process takes
                around 30 minutes and is done under precise temperature control.
              </p>
              <p>
                Unlike some industrial producers, we <b>do not dilute</b> our
                paste with added water, and we never use chemical aids. Our oil
                is separated using a <b>two-phase centrifugal system</b>, which
                helps retain more of the olive’s natural polyphenols and aromatic
                compounds.
              </p>
            </div>
          </motion.div>

          <motion.div className="pd-step left" variants={stepVariants} viewport={{ once: true }}>
            <img
              src="https://via.placeholder.com/300x200.png?text=Settling"
              alt="Natural Settling"
            />
            <div>
              <h3>Unfiltered Purity, Naturally Settled</h3>
              <p>
                Right after pressing, the oil is vivid green and cloudy—a sign of
                freshness. Rather than filter it mechanically, we let the oil{" "}
                <b>settle naturally</b> in stainless steel tanks for several
                weeks. The sediment gently sinks, and we carefully decant only the
                purest top layer.
              </p>
              <p>
                This method respects the oil’s natural structure while enhancing
                stability and flavor.
              </p>
            </div>
          </motion.div>

          <motion.div className="pd-step right" variants={stepVariants} viewport={{ once: true }}>
            <img
              src="https://via.placeholder.com/300x200.png?text=Final+Result"
              alt="Final Oil"
            />
            <div>
              <h3>The Final Result</h3>
              <p>
                The result? A <b>deep golden-green olive oil</b> that captures the
                scent of fresh grass, green almonds, and a hint of artichoke. It’s
                robust yet balanced, with a peppery finish that lingers on the
                palate—a true signature of early-harvest Haouzia olives.
              </p>
              <p>
                Every drop you taste has been part of a story that begins with
                Marrakech’s red earth, continues with our family's care, and ends
                with a bottle lovingly sent to your table.
              </p>
            </div>
          </motion.div>
        </motion.section>
      )}
    </motion.main>
  );
}
