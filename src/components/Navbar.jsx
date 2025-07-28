import React from 'react';
import { assets } from '../assets/assets';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <img src={assets.logo} alt="Logo" className="navbar-logo" />
    <div className="navbar-links">
      <a href="#home" className="navbar-link">Home</a>
      <a href="#about" className="navbar-link">About</a>
      <a href="#products" className="navbar-link">Products</a>
      <a href="#contact" className="navbar-link">Contact</a>
    </div>
  </nav>
);

export default Navbar;










