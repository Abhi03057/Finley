import React, { useState } from 'react';
import "./Currencydata.css";

// Sample data - Replace this with your actual data import
const sampleCoinData = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    current_price: 67234.56,
    price_change_24h: 1567.89,
    price_change_percentage_24h: 2.39,
    high_24h: 68900.12,
    low_24h: 65100.34,
    market_cap: 1320456789012,
    total_volume: 28456789012,
    circulating_supply: 19654321,
    ath: 69045.67,
    atl: 67.81,
    ath_date: '2021-11-10T14:24:11.849Z',
    atl_date: '2013-07-06T00:00:00.000Z',
    last_updated: '2024-01-15T10:30:45.123Z'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    current_price: 3567.89,
    price_change_24h: 65.43,
    price_change_percentage_24h: 1.87,
    high_24h: 3623.45,
    low_24h: 3456.78,
    market_cap: 428567890123,
    total_volume: 15678901234,
    circulating_supply: 120234567,
    ath: 4878.26,
    atl: 0.432,
    ath_date: '2021-11-10T14:24:11.849Z',
    atl_date: '2015-10-21T00:00:00.000Z',
    last_updated: '2024-01-15T10:30:45.123Z'
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    current_price: 189.45,
    price_change_24h: -0.95,
    price_change_percentage_24h: -0.50,
    high_24h: 195.67,
    low_24h: 185.23,
    market_cap: 84567890123,
    total_volume: 2345678901,
    circulating_supply: 446789012,
    ath: 259.96,
    atl: 0.500,
    ath_date: '2021-11-06T21:54:35.825Z',
    atl_date: '2020-05-11T19:35:23.449Z',
    last_updated: '2024-01-15T10:30:45.123Z'
  }
];

// Modal Component
function CryptoModal({ coin, isOpen, onClose }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatLargeNumber = (value) => {
    if (value >= 1e12) {
      return (value / 1e12).toFixed(2) + 'T';
    }
    if (value >= 1e9) {
      return (value / 1e9).toFixed(2) + 'B';
    }
    if (value >= 1e6) {
      return (value / 1e6).toFixed(2) + 'M';
    }
    return value.toLocaleString();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isPositive = coin.price_change_percentage_24h >= 0;

  // Calculate position of current price between high and low
  const priceRange = coin.high_24h - coin.low_24h;
  const currentPosition = ((coin.current_price - coin.low_24h) / priceRange) * 100;
  const barWidth = Math.abs(currentPosition - 50) * 2; // Distance from center

  if (!isOpen) return null;

  return (
    <div className="blur-overlay" onClick={onClose}>
      <div className="more-info-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-coin-info">
            <img 
              src={coin.image} 
              alt={coin.name}
              className="modal-coin-logo"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/60x60?text=' + coin.symbol;
              }}
            />
            <div className="modal-coin-details">
              <h3>{coin.name}</h3>
              <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-current-price">
            <div className="price">{formatCurrency(coin.current_price)}</div>
            <div className={`change ${isPositive ? 'positive' : 'negative'}`}>
              {isPositive ? '+' : ''}{formatCurrency(coin.price_change_24h)}
              <span>({isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%)</span>
            </div>
          </div>

          <div className="price-bar-section">
            <h4>24h Price Range</h4>
            <div className="price-bar">
              <div 
                className={`price-bar-inner ${isPositive ? 'up' : 'down'}`}
                style={{ width: `${barWidth}%`, left: currentPosition < 50 ? `${currentPosition}%` : '50%' }}
              />
              <div 
                className="price-bar-indicator"
                style={{ left: `${currentPosition}%` }}
              />
            </div>
            <div className="price-bar-labels">
              <span>Low: {formatCurrency(coin.low_24h)}</span>
              <div 
                className="current-position"
                style={{ left: `${currentPosition}%` }}
              >
                Current: {formatCurrency(coin.current_price)}
              </div>
              <span>High: {formatCurrency(coin.high_24h)}</span>
            </div>
          </div>

          <div className="modal-stats-grid">
            <div className="modal-stat-item">
              <div className="label">Market Cap</div>
              <div className="value">${formatLargeNumber(coin.market_cap)}</div>
            </div>
            <div className="modal-stat-item">
              <div className="label">24h Volume</div>
              <div className="value">${formatLargeNumber(coin.total_volume)}</div>
            </div>
            <div className="modal-stat-item">
              <div className="label">Circulating Supply</div>
              <div className="value">{formatLargeNumber(coin.circulating_supply)}</div>
              <div className="sub-value">{coin.symbol.toUpperCase()}</div>
            </div>
            <div className="modal-stat-item">
              <div className="label">All-Time High</div>
              <div className="value">{formatCurrency(coin.ath)}</div>
              <div className="sub-value">{formatDate(coin.ath_date)}</div>
            </div>
            <div className="modal-stat-item">
              <div className="label">All-Time Low</div>
              <div className="value">{formatCurrency(coin.atl)}</div>
              <div className="sub-value">{formatDate(coin.atl_date)}</div>
            </div>
            <div className="modal-stat-item">
              <div className="label">Last Updated</div>
              <div className="value">{formatDate(coin.last_updated)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Individual Crypto Card Component
function CryptoCard({ coin }) {
  const [showModal, setShowModal] = useState(false);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <>
      <div className="crypto-card">
        <div className="card-header">
          <div className="coin-info">
            <img 
              src={coin.image} 
              alt={coin.name}
              className="coin-logo"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/32x32?text=' + coin.symbol;
              }}
            />
            <div className="coin-details">
              <h3 className="coin-name">{coin.name}</h3>
              <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
            </div>
          </div>
          <div className="price-info">
            <div className="current-price">{formatCurrency(coin.current_price)}</div>
            <div className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
              {isPositive ? '+' : ''}{formatCurrency(coin.price_change_24h)}
              <span className="percentage">
                ({isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="high-low">
            <div className="high-low-item">
              <span className="label">24h High</span>
              <span className="value high">{formatCurrency(coin.high_24h)}</span>
            </div>
            <div className="high-low-item">
              <span className="label">24h Low</span>
              <span className="value low">{formatCurrency(coin.low_24h)}</span>
            </div>
          </div>

          <button 
            className="more-info-btn"
            onClick={() => setShowModal(true)}
          >
            More Info
            <span className="arrow down">▼</span>
          </button>
        </div>
      </div>

      <CryptoModal 
        coin={coin} 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
}

// Main Crypto List Component
function Currencydata() {
  // Replace sampleCoinData with your actual imported data
  const coinData = sampleCoinData;

  return (
    <section className="crypto-list-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Live Cryptocurrency Prices</h2>
          <p className="section-subtitle">
            Track real-time prices and market data for top cryptocurrencies
          </p>
        </div>
        
        <div className="coin-grid">
          {coinData.map((coin) => (
            <CryptoCard key={coin.id} coin={coin} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Currencydata;