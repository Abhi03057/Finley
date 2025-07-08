import React, { useEffect, useState } from 'react';
import "./Herosection.css";

function Herosection() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=7&page=1'
        );
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching hero section data:", error);
      }
    };

    fetchCoins();
  }, []);

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
                  <span></span><span></span><span></span>
                </div>
                <div className="mockup-title">Live Markets</div>
              </div>
              <div className="mockup-content">
                {coins.slice(0, 5).map((coin) => (
                  <div className="crypto-card" key={coin.id}>
                    <div className="crypto-info">
                      <span className="crypto-symbol">{coin.symbol.toUpperCase()}</span>
                      <span className="crypto-price">${coin.current_price.toLocaleString()}</span>
                      <span className={`crypto-change ${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
                        {coin.price_change_percentage_24h?.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="market-ticker">
        <div className="ticker-content">
          {coins.map((coin) => (
            <div className="ticker-item" key={coin.id}>
              <span className="ticker-symbol">{coin.symbol.toUpperCase()}</span>
              <span className="ticker-price">${coin.current_price.toLocaleString()}</span>
              <span className={`ticker-change ${coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}`}>
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Herosection;
