import React from 'react';
import "./Herosection.css";

function Herosection() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              💹 Finley – Real-Time Crypto Tracker
            </h1>
            <p className="hero-tagline">
              Track all your favorite coins, live prices, and trends in one clean dashboard.
            </p>
            
            <div className="hero-buttons">
              <button className="btn btn-primary">Get Started</button>
              <button className="btn btn-secondary">View Market</button>
            </div>
            
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-value">$2.1T</span>
                <span className="stat-label">Market Cap</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">+5.2%</span>
                <span className="stat-label">Top Gainer</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">$89.5B</span>
                <span className="stat-label">24h Volume</span>
              </div>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="dashboard-mockup">
              <div className="mockup-header">
                <div className="mockup-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="mockup-title">Finley Dashboard</div>
              </div>
              <div className="mockup-content">
                <div className="crypto-card">
                  <div className="crypto-info">
                    <span className="crypto-symbol">BTC</span>
                    <span className="crypto-price">$67,234</span>
                    <span className="crypto-change positive">+2.4%</span>
                  </div>
                </div>
                <div className="crypto-card">
                  <div className="crypto-info">
                    <span className="crypto-symbol">ETH</span>
                    <span className="crypto-price">$3,567</span>
                    <span className="crypto-change positive">+1.8%</span>
                  </div>
                </div>
                <div className="crypto-card">
                  <div className="crypto-info">
                    <span className="crypto-symbol">SOL</span>
                    <span className="crypto-price">$189</span>
                    <span className="crypto-change negative">-0.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Herosection;