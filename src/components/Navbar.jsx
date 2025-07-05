import React from 'react';
import './Navbar.css';
import { assets } from '../assets/assets';

const Navbar = () => (
  <div className="navbar">
    <img src={assets.logo} alt="Zaytun Logo" className="navbar-logo" />
    <div className="navbar-links">
      <a href="#home" className="navbar-link">Home</a>
      <a href="#about" className="navbar-link">About</a>
      <a href="#products" className="navbar-link">Products</a>
      <a href="#contact" className="navbar-link">Contact</a>
      {/* If you want Login/Cart as scroll links, add here; 
          but best to use separate page/modal for those */}
    </div>
  </div>
);

export default Navbar;









