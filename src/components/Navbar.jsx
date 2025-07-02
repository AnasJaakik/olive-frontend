import React from 'react';
import './Navbar.css';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <div className="navbar">
    <img src={assets.logo} alt="Zaytun Logo" className="navbar-logo" />
    <div className="navbar-links">
      <NavLink to="/" className="navbar-link">Home</NavLink>
      <NavLink to="/about" className="navbar-link">About</NavLink>
      <NavLink to="/products/1" className="navbar-link">Products</NavLink>
      <NavLink to="/cart" className="navbar-link">Cart</NavLink>
      <NavLink to="/login" className="navbar-link">Login</NavLink>
    </div>
  </div>
);

export default Navbar;





