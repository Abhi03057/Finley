// src/Components/Navbar/Navbar.js

import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Finley</div>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Market</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Sign In</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
