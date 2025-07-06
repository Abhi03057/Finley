// src/Components/Navbar/Navbar.js

import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
  <div className="logo">Finley</div>
  <ul className="nav-links">
    <li><a href="#">Market</a></li>
    <li><a href="#">Watchlist</a></li>
    <li><a href="#">News</a></li> {/* Optional */}
    <li><a href="#">Sign In</a></li>
  </ul>
</nav>

  );
}

export default Navbar;
