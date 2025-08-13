// src/pages/About.jsx
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

const storyText = `**Our Story told by Marouane: From Marrakech Soil to Global Hearts**

**Roots in Red Earth**

Our story begins in the ancient city of Marrakech, where my brother and I grew up in a modest family, our childhood painted with the warm hues of Morocco's red earth. Our father, a high school life sciences teacher, was our first guide into the wonders of the natural world. With patient hands and an infectious curiosity—much like Richard Feynman's approach to understanding the world—he taught us that science isn’t just in textbooks—it was in every leaf, every season, every breath of life around us, he never taught us just the name of things, but why things evolved and how they delivered what they were designed for. 

Beyond the bustling medina, our family shared a farm with my father's brothers—a sanctuary where we learned nature's most profound lessons. Here, among bleating sheep, clucking chickens, and gentle rabbits, we discovered the sacred dance between human hands and Mother Earth. When you raise what you eat, when you tend what feeds you, respect for nature isn't taught—it's felt in your very bones.

**The Golden Grove**

And then there were the olive trees. Exactly 212 of them, over 100 years old, standing across our land. These weren't just any olive trees—they were **Haouzia**, a breed named after the very province where Marrakech sits. You won't find these trees anywhere else in the world, only here in Marrakech and some of its neighboring villages, making each drop of oil a true piece of our homeland.

The season of picking olives and pressing them was always hard work under the Moroccan sun, but that first taste of the season right out of the press was always so rewarding and memorable. We'd share some with friends and family, and honestly, it was more like a hobby than anything else. But each year, we noticed that friends of friends had told their friends, and we found ourselves with many people asking for olive oil each season within Morocco.

**Seeds of Wanderlust**

At 18, I left Morocco's embrace for Switzerland, trading the Atlas Mountains for the Alps to study computer science at EPFL. My journey took me across continents—France, Singapore, the United States—each destination teaching me something new about the world and myself. But no matter where I found myself, one tradition remained constant: my father would ship precious bottles of our olive oil to wherever I called home, to keep me connected back to true home.

I became an unofficial ambassador for our family's liquid treasure, sharing it with friends from every corner of the globe. Those playful blind tastings with Italian friends (and I'll diplomatically say both oils had their admirers) became legendary among my circle. Our Haouzia oil wasn't just a condiment—it was a conversation starter, a bridge between cultures, a taste of home I could share anywhere.

**Love in Singapore**

In Singapore's vibrant tapestry, I met Lea, my German-born partner in all adventures. Romance, for me, was never about flowers—it was about sharing what mattered most. So I sent her family 20 liters of our freshly pressed olive oil, straight from those 212 trees in Marrakech.

Her family didn't just love it—they shared it with friends, who shared it with neighbors, who told colleagues, who mentioned it to relatives. Before we knew it, we had a waiting list of people across Germany asking for "that incredible olive oil from Morocco."

**From Hobby to Heart**

We never dreamed of turning our family tradition into a business. In our hearts, we wished we could simply befriend the entire world and send everyone a bottle of our precious Haouzia oil. But when friend after friend, country after country, began asking for our olive oil, we realized something beautiful: we weren't just sharing oil—we were sharing our story, our heritage, our love for the land that raised us.

And so, our small family business was born—not from ambition, but from affection. Every bottle we send carries the same intention as that first one I shared with a friend: it's a gift from our family to yours, a taste of Marrakech's soul, a drop of liquid friendship.

**Our Promise**

When you receive our olive oil, know that it comes from exactly 212 trees that have been part of our family for generations. Each olive was picked by hands that know these trees personally, pressed by people who understand that this isn't just a product—it's a piece of our hearts, traveling from the red earth of Marrakech to your table.

We're still that modest family from Morocco, still amazed that our little tradition has touched lives across continents. Every new customer isn't just a sale—they're a new friend in our ever-growing global family.`;

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
        <p className="story-text">{storyText}</p>
      </section>
    </section>
  );
}










