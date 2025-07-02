// src/pages/Home.jsx
import React from 'react';
import './Home.css'; // We'll add this next

const Home = () => (
  <section className="home-hero">
    <div className="home-hero-content">
      <h1 className="home-hero-title">Pure Moroccan Olive Oil</h1>
      <p className="home-hero-desc">
        Experience the tradition. Handcrafted from ancient groves, cold-pressed for maximum flavor and health.
      </p>
      <a href="/products" className="home-hero-btn">Shop Now</a>
    </div>
  </section>
);

export default Home;

