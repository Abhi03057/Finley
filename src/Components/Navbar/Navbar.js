import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-link">Finley</Link>
      </div>
      <ul className="nav-links">
        {/* <li><Link to="/">Market</Link></li>
        <li><Link to="/watchlist">Watchlist</Link></li> */}
        <li><Link to="/news">News</Link></li>
        <li><Link to="/signin">Sign In</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
