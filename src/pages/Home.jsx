import React from "react";
import { assets } from "../assets/assets";
import faceLogo from "../assets/face.png"; // Import the new logo
import './Home.css';

const Home = () => (
  <section id="home" className="home-hero">
    <div className="home-hero-content">
      {/* Slogan Row: Slogan left, Logo right */}
      <div className="hero-slogan-row">
        <span className="hero-slogan">When quality has a face.</span>
        <img src={faceLogo} alt="Abdeljalil face logo" className="hero-slogan-img" />
      </div>
      <h1 className="hero-title">Extra virgin Moroccan Olive Oil</h1>
      <p className="hero-tagline">
        <em>Harvested by hand. Pressed within the hour. </em>
      </p>
      <p className="hero-desc">
        Handcrafted from ancient Haouzia groves outside Marrakech.<br />
        Cold-pressed for exceptional flavor, health, and tradition.<br />
        Taste the story of our land in every golden drop.
      </p>
      <a href="#products" className="hero-btn">
        Shop Now
      </a>
      <div className="hero-details">
        Family owned &bull; Organic &bull; Crafted in Marrakech
      </div>
    </div>
    <div className="home-hero-img">
      <img src={assets.riad} alt="Olive branch with olives" />
    </div>
  </section>
);

export default Home;





