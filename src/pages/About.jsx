// src/pages/About.jsx
import React from 'react';
import abdeljalil from '../assets/abdeljalil.png';
import anas        from '../assets/anas.png';
import lea         from '../assets/lea.png';
import marouane    from '../assets/marouane.png';
import './About.css';

const team = [
  { name: 'Abdeljalil', image: abdeljalil, role: 'Founder & Master Producer' },
  { name: 'Anas',        image: anas,        role: 'Brand & Design Visionary' },
  { name: 'Lea',         image: lea,         role: 'Quality & Tasting Director' },
  { name: 'Marouane',    image: marouane,    role: 'Pressing Lead' },
];

export default function About() {
  return (
    <section className="about">
      <h2 className="about-heading">Meet the Team</h2>

      <div className="team-row">
        {team.map(member => (
          <div className="team-member" key={member.name}>
            <img
              src={member.image}
              alt={member.name}
              className="team-photo"
            />
            <div className="member-info">
              <h4>{member.name}</h4>
              <p className="member-role">{member.role}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="story">
        <h2 className="story-heading">Our Story: From Marrakech Soil to Global Hearts</h2>

        <h3>Roots in Red Earth</h3>
        <p>
          Our story begins in the ancient city of Marrakech, where my brother and I grew up in a modest family,
          our childhood painted with the warm hues of Morocco’s red earth. Our father, a high school life
          sciences teacher, was our first guide into the wonders of the natural world. With patient hands and
          an infectious curiosity—much like Richard Feynman’s approach—he taught us that science isn’t just
          in textbooks: it was in every leaf, every season, every breath of life around us.
        </p>

        <h3>The Golden Grove</h3>
        <p>
          And then there were the olive trees. Exactly 212 of them, over 100 years old, standing across our land.
          These weren’t just any olive trees—they were <strong>Haouzia</strong>, a breed named after the very
          province where Marrakech sits. You won’t find these trees anywhere else in the world, only here in
          Marrakech and its neighboring villages.
        </p>

        <h3>Seeds of Wanderlust</h3>
        <p>
          At 18, I left Morocco’s embrace for Switzerland, trading the Atlas Mountains for the Alps to study
          computer science at EPFL. My journey spanned France, Singapore, and the United States—each destination
          teaching me something new about the world and myself, while my father shipped precious bottles back home.
        </p>

        <h3>Love in Singapore</h3>
        <p>
          In Singapore’s vibrant tapestry, I met Lea. Romance for me was never about flowers—it was about
          sharing what mattered most. So I sent her family 20 liters of our freshly pressed olive oil,
          straight from those 212 trees in Marrakech, sparking a ripple of demand across Germany.
        </p>

        <h3>From Hobby to Heart</h3>
        <p>
          We never dreamed of a business. But when friend after friend, country after country,
          began asking for our olive oil, we realized we weren’t just sharing oil—we were sharing our story,
          our heritage, our love for the land that raised us. Every bottle is a gift from our family to yours.
        </p>
      </div>
    </section>
  );
}





