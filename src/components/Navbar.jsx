import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-left">
      {/* Primary Logo */}
      <img src={assets.logo} alt="Main Logo" className="navbar-logo" />

      {/* Secondary Logo */}
      <img src={assets.logo2} alt="Secondary Logo" className="navbar-logo secondary-logo" />
      
      {/* Brand name next to logos if needed */}
     
    </div>

    <div className="navbar-links">
      <Link to="/" className="navbar-link">Home</Link>
      <Link to="/about" className="navbar-link">About</Link>
      <Link to="/products" className="navbar-link">Products</Link>
      <Link to="/process" className="navbar-link">Process</Link>
      <Link to="/contact" className="navbar-link">Contact</Link>
    </div>
  </nav>
);

export default Navbar;














