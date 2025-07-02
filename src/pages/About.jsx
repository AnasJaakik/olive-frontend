
import React from 'react';
import './About.css';

const About = () => (
  <section className="about">
    <div className="about-container">
      <h1 className="about-title">About Zaytun Olive Oil</h1>
      <p className="about-lead">
        Our family has been cultivating olives in Morocco for generations, using time-honored traditions and pure, sustainable methods. Every drop of our oil reflects the sun, soil, and spirit of our land.
      </p>
      <div className="about-details">
        <div>
          <h3>🌿 Authentic & Pure</h3>
          <p>
            Cold-pressed from hand-picked olives, our oil is rich in flavor, nutrients, and tradition.
          </p>
        </div>
        <div>
          <h3>🏺 Heritage Craft</h3>
          <p>
            Produced with a blend of ancestral knowledge and modern standards, ensuring both taste and quality.
          </p>
        </div>
        <div>
          <h3>🤝 Community & Care</h3>
          <p>
            We’re passionate about sharing healthy food and supporting our local growers, from tree to table.
          </p>
        </div>
      </div>
      
    </div>
  </section>
);

export default About;

