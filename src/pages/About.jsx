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

const imgReveal = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About() {
  return (
    <main className="about-page">
      {/* PANORAMA HERO */}
      <motion.section
        className="about-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <img
          className="about-hero-img"
          src={assets.haouzia}
          alt="Haouzia grove panorama"
        />
        <div className="about-hero-overlay" />
        <motion.h1
          className="about-hero-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          Our Story: From Marrakech Soil to Global Hearts
        </motion.h1>
      </motion.section>

      {/* CONTENT WITH SIDE PLACEHOLDERS */}
      <section className="about-body">
        {/* Left image rail (placeholder) */}
        <div className="about-rail left-rail">
          <motion.div
            className="about-rail-card"
            variants={imgReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="about-ph">Image Placeholder</div>
          </motion.div>
          <motion.div
            className="about-rail-card"
            variants={imgReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="about-ph tall">Image Placeholder</div>
          </motion.div>
        </div>

        {/* Main narrative */}
        <div className="about-content">
          <motion.h2 custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Roots in Red Earth
          </motion.h2>
          <motion.p custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Our story begins in the ancient city of Marrakech, where my brother and I grew up in a modest family, our childhood painted with the warm hues of Morocco's red earth. Our father, a high school life sciences teacher, was our first guide into the wonders of the natural world. With patient hands and an infectious curiosity—much like Richard Feynman's approach to understanding the world—he taught us that science isn’t just in textbooks—it was in every leaf, every season, every breath of life around us, he never taught us just the name of things, but why things evolved and how they delivered what they were designed for. 
          </motion.p>
          <motion.p custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Beyond the bustling medina, our family shared a farm with my father's brothers—a sanctuary where we learned nature's most profound lessons. Here, among bleating sheep, clucking chickens, and gentle rabbits, we discovered the sacred dance between human hands and Mother Earth. When you raise what you eat, when you tend what feeds you, respect for nature isn't taught—it's felt in your very bones.
          </motion.p>

          <motion.h2 custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            The Golden Grove
          </motion.h2>
          <motion.p custom={4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            And then there were the olive trees. Exactly 212 of them, over 100 years old, standing across our land. These weren't just any olive trees—they were <strong>Haouzia</strong>, a breed named after the very province where Marrakech sits. You won't find these trees anywhere else in the world, only here in Marrakech and some of its neighboring villages, making each drop of oil a true piece of our homeland.
          </motion.p>
          <motion.p custom={5} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            The season of picking olives and pressing them was always hard work under the Moroccan sun, but that first taste of the season right out of the press was always so rewarding and memorable. We'd share some with friends and family, and honestly, it was more like a hobby than anything else. But each year, we noticed that friends of friends had told their friends, and we found ourselves with many people asking for olive oil each season within Morocco.
          </motion.p>

          <motion.h2 custom={6} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Seeds of Wanderlust
          </motion.h2>
          <motion.p custom={7} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            At 18, I left Morocco's embrace for Switzerland, trading the Atlas Mountains for the Alps to study computer science at EPFL. My journey took me across continents—France, Singapore, the United States—each destination teaching me something new about the world and myself. But no matter where I found myself, one tradition remained constant: my father would ship precious bottles of our olive oil to wherever I called home, to keep me connected back to true home.
          </motion.p>
          <motion.p custom={8} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            I became an unofficial ambassador for our family's liquid treasure, sharing it with friends from every corner of the globe. Those playful blind tastings with Italian friends (and I'll diplomatically say both oils had their admirers) became legendary among my circle. Our Haouzia oil wasn't just a condiment—it was a conversation starter, a bridge between cultures, a taste of home I could share anywhere.
          </motion.p>

          <motion.h2 custom={9} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Love in Singapore
          </motion.h2>
          <motion.p custom={10} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            In Singapore's vibrant tapestry, I met Lea, my German-born partner in all adventures. Romance, for me, was never about flowers—it was about sharing what mattered most. So I sent her family 20 liters of our freshly pressed olive oil, straight from those 212 trees in Marrakech.
          </motion.p>
          <motion.p custom={11} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Her family didn't just love it—they shared it with friends, who shared it with neighbors, who told colleagues, who mentioned it to relatives. Before we knew it, we had a waiting list of people across Germany asking for "that incredible olive oil from Morocco."
          </motion.p>

          <motion.h2 custom={12} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            From Hobby to Heart
          </motion.h2>
          <motion.p custom={13} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            We never dreamed of turning our family tradition into a business. In our hearts, we wished we could simply befriend the entire world and send everyone a bottle of our precious Haouzia oil. But when friend after friend, country after country, began asking for our olive oil, we realized something beautiful: we weren't just sharing oil—we were sharing our story, our heritage, our love for the land that raised us.
          </motion.p>
          <motion.p custom={14} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            And so, our small family business was born—not from ambition, but from affection. Every bottle we send carries the same intention as that first one I shared with a friend: it's a gift from our family to yours, a taste of Marrakech's soul, a drop of liquid friendship.
          </motion.p>

          <motion.h2 custom={15} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Our Promise
          </motion.h2>
          <motion.p custom={16} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            When you receive our olive oil, know that it comes from exactly 212 trees that have been part of our family for generations. Each olive was picked by hands that know these trees personally, pressed by people who understand that this isn't just a product—it's a piece of our hearts, traveling from the red earth of Marrakech to your table.
          </motion.p>
          <motion.p custom={17} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            We're still that modest family from Morocco, still amazed that our little tradition has touched lives across continents. Every new customer isn't just a sale—they're a new friend in our ever-growing global family.
          </motion.p>
        </div>

        {/* Right image rail (placeholder) */}
        <div className="about-rail right-rail">
          <motion.div
            className="about-rail-card"
            variants={imgReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="about-ph tall">Image Placeholder</div>
          </motion.div>
          <motion.div
            className="about-rail-card"
            variants={imgReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="about-ph">Image Placeholder</div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}











