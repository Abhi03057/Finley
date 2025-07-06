import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <h3 className="footer-title">Finley</h3>
            <p className="footer-tagline">Real-Time Crypto Tracker</p>
            <p className="footer-description">
              Stay ahead of the market with real-time cryptocurrency prices, 
              trends, and portfolio tracking.
            </p>
          </div>

          {/* Social Links */}
          <div className="footer-social">
            <h4 className="footer-links-title">Connect</h4>
            <div className="footer-social-links">
              <a
                href="https://www.instagram.com/ab_pan07/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Instagram"
              >
                <i className="fa-brands fa-instagram"></i> Instagram
              </a>
              <a
                href="https://github.com/Abhi03057"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="GitHub"
              >
                <i className="fa-brands fa-github"></i> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/abhyuday-panwar-9579b2289/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin"></i> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © 2025 Finley. All rights reserved.
            </p>
            <p className="footer-attribution">
              Data powered by{' '}
              <a
                href="https://coingecko.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-attribution-link"
              >
                CoinGecko
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
