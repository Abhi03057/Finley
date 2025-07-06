import React from 'react';
import "./Herosection.css";

function Herosection() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Real-time crypto
              <strong>market intelligence</strong>
            </h1>
            <p className="hero-tagline">
              Professional-grade cryptocurrency tracking with institutional-level data feeds, 
              advanced charting, and portfolio analytics. Built for serious traders.
            </p>
            
            <div className="hero-buttons">
              <button className="btn btn-primary">Start Trading</button>
              <button className="btn btn-secondary">View Markets</button>
            </div>
            
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-value">$2,847.2B</span>
                <span className="stat-label">Total Market Cap</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">$125.8B</span>
                <span className="stat-label">24h Volume</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">2,847</span>
                <span className="stat-label">Active Markets</span>
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
                <div className="mockup-title">Live Markets</div>
              </div>
              <div className="mockup-content">
                <div className="crypto-card">
                  <div className="crypto-info">
                    <span className="crypto-symbol">BTC</span>
                    <span className="crypto-price">$67,234.50</span>
                    <span className="crypto-change positive">+2.34%</span>
                  </div>
                </div>
                <div className="crypto-card">
                  <div className="crypto-info">
                    <span className="crypto-symbol">ETH</span>
                    <span className="crypto-price">$3,567.89</span>
                    <span className="crypto-change positive">+1.87%</span>
                  </div>
                </div>
                <div className="crypto-card">
                  <div className="crypto-info">
                    <span className="crypto-symbol">SOL</span>
                    <span className="crypto-price">$189.42</span>
                    <span className="crypto-change negative">-0.52%</span>
                  </div>
                </div>
                <div className="crypto-card">
                  <div className="crypto-info">
                    <span className="crypto-symbol">ADA</span>
                    <span className="crypto-price">$0.4567</span>
                    <span className="crypto-change positive">+3.21%</span>
                  </div>
                </div>
                <div className="crypto-card">
                  <div className="crypto-info">
                    <span className="crypto-symbol">DOT</span>
                    <span className="crypto-price">$7.23</span>
                    <span className="crypto-change negative">-1.45%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="market-ticker">
        <div className="ticker-content">
          <div className="ticker-item">
            <span className="ticker-symbol">BTC</span>
            <span className="ticker-price">$67,234.50</span>
            <span className="ticker-change positive">+2.34%</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-symbol">ETH</span>
            <span className="ticker-price">$3,567.89</span>
            <span className="ticker-change positive">+1.87%</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-symbol">SOL</span>
            <span className="ticker-price">$189.42</span>
            <span className="ticker-change negative">-0.52%</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-symbol">ADA</span>
            <span className="ticker-price">$0.4567</span>
            <span className="ticker-change positive">+3.21%</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-symbol">DOT</span>
            <span className="ticker-price">$7.23</span>
            <span className="ticker-change negative">-1.45%</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-symbol">MATIC</span>
            <span className="ticker-price">$0.8934</span>
            <span className="ticker-change positive">+4.12%</span>
          </div>
          <div className="ticker-item">
            <span className="ticker-symbol">AVAX</span>
            <span className="ticker-price">$34.56</span>
            <span className="ticker-change negative">-2.78%</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Herosection;