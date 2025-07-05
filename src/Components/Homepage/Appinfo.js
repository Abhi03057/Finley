import React from 'react';
import "./Appinfo.css";

function Appinfo() {
  return (
    <section className="why-finley">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why Choose Finley?</h2>
          <p className="section-subtitle">
            Everything you need to track and analyze cryptocurrency markets in one powerful platform
          </p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <span className="icon-emoji">⚡</span>
            </div>
            <h3 className="feature-title">Real-Time Crypto Prices</h3>
            <p className="feature-description">
              Get live price updates for thousands of cryptocurrencies with zero delay and maximum accuracy.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <span className="icon-emoji">📈</span>
            </div>
            <h3 className="feature-title">Clean, Intuitive Dashboard</h3>
            <p className="feature-description">
              Navigate through complex market data with our beautifully designed, user-friendly interface.
            </p>
          </div>
          

          
          <div className="feature-card">
            <div className="feature-icon">
              <span className="icon-emoji">🌐</span>
            </div>
            <h3 className="feature-title">CoinGecko API Powered</h3>
            <p className="feature-description">
              Reliable data from CoinGecko's trusted API ensures you get the most accurate market information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Appinfo;