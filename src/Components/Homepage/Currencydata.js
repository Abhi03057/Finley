// src/Components/Currencydata.js
// ✅ Fully guarded version – no more “toFixed of null” errors
import React, { useEffect, useState } from 'react';
import './Currencydata.css';
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
} from 'react-sparklines';

function Currencydata() {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ---------- helpers ----------
  const safeToFixed = (num, digits = 2, fallback = '—') =>
    num != null ? num.toFixed(digits) : fallback;

  const formatPrice = (price) => {
    if (price == null) return '$0.00';
    if (price >= 1_000) return `$${(price / 1_000).toFixed(1)}K`;
    if (price >= 1) return `$${price.toFixed(2)}`;
    return `$${price.toFixed(4)}`;
  };

  const getPriceRange = (arr = []) => {
    if (!arr.length) return { min: 0, max: 0, avg: 0 };
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
    return { min, max, avg };
  };

  const generateTimeLabels = () => {
    const labels = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      labels.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    return labels;
  };

  // ---------- data fetch ----------
  useEffect(() => {
    (async () => {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d,24h'
      );
      setCoins(await res.json());
    })();
  }, []);

  const handleCoinClick = async (coin) => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin.id}?sparkline=true`
      );
      setSelectedCoin(await res.json());
      setShowModal(true);
    } catch (err) {
      console.error('Error fetching full coin data:', err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCoin(null);
  };

  // ---------- UI ----------
  return (
    <>
      {/* -------- Market table -------- */}
      <div className={`market-table-container ${showModal ? 'blurred' : ''}`}>
        <h2 className="market-heading">🚀 Top 100 Cryptocurrencies</h2>
        <div className="market-table-wrapper">
          <table className="market-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Coin</th>
                <th>Price</th>
                <th>24h %</th>
                <th>7d %</th>
                <th>Market Cap</th>
                <th>Volume (24h)</th>
                <th>Circulating Supply</th>
                <th>Last 7d</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin, idx) => (
                <tr
                  className="coin-row"
                  key={coin.id}
                  onClick={() => handleCoinClick(coin)}
                >
                  <td>{idx + 1}</td>
                  <td className="coin-cell">
                    <img src={coin.image} alt={coin.name} />
                    <span>{coin.name}</span>
                  </td>
                  <td>${coin.current_price.toLocaleString('en-US')}</td>

                  {/* 24 h % */}
                  <td
                    className={
                      coin.price_change_percentage_24h >= 0
                        ? 'positive'
                        : 'negative'
                    }
                  >
                    {safeToFixed(coin.price_change_percentage_24h)}%
                  </td>

                  {/* 7 d % */}
                  <td
                    className={
                      coin.price_change_percentage_7d_in_currency > 0
                        ? 'positive'
                        : coin.price_change_percentage_7d_in_currency < 0
                        ? 'negative'
                        : ''
                    }
                  >
                    {safeToFixed(coin.price_change_percentage_7d_in_currency)}%
                  </td>

                  <td>${coin.market_cap.toLocaleString('en-US')}</td>
                  <td>${coin.total_volume.toLocaleString('en-US')}</td>
                  <td>{coin.circulating_supply.toLocaleString('en-US')}</td>
                  <td>
                    <Sparklines
                      data={coin.sparkline_in_7d?.price || []}
                      width={100}
                      height={30}
                    >
                      <SparklinesLine color="#3b82f6" />
                    </Sparklines>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* -------- Modal -------- */}
      {showModal && selectedCoin && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-fullscreen"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={closeModal}>
              ×
            </button>

            <div className="modal-content">
              {/* Header */}
              <div className="modal-header">
                <img
                  src={selectedCoin.image?.large}
                  alt={selectedCoin.name}
                  className="modal-logo"
                />
                <h2>
                  {selectedCoin.name} ({selectedCoin.symbol.toUpperCase()})
                </h2>
              </div>

              {/* 7‑day chart */}
              <h3 className="section-heading">📈 7‑Day Price Chart</h3>
              <div className="modal-graph">
                <div className="graph-container">
                  {/* Indicators */}
                  <div className="price-indicators">
                    {(() => {
                      const range = getPriceRange(
                        selectedCoin.market_data?.sparkline_7d?.price
                      );
                      return (
                        <>
                          <div className="price-max">
                            High: {formatPrice(range.max)}
                          </div>
                          <div className="price-avg">
                            Avg: {formatPrice(range.avg)}
                          </div>
                          <div className="price-min">
                            Low: {formatPrice(range.min)}
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  {/* Graph */}
                  <div className="chart-area">
                    <Sparklines
                      data={selectedCoin.market_data?.sparkline_7d?.price || []}
                      width={600}
                      height={200}
                    >
                      <SparklinesLine
                        color="#60a5fa"
                        style={{ fill: 'none', strokeWidth: 2 }}
                      />
                      <SparklinesReferenceLine
                        type="avg"
                        style={{
                          stroke: '#94a3b8',
                          strokeOpacity: 0.5,
                          strokeDasharray: '2,2',
                        }}
                      />
                    </Sparklines>
                  </div>

                  {/* X‑axis labels */}
                  <div className="time-axis">
                    {generateTimeLabels().map((label, i) => (
                      <span key={i} className="time-label">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Chart stats */}
                <div className="chart-stats">
                  <div className="stat-item">
                    <span className="stat-label">7d Change:</span>
                    <span
                      className={`stat-value ${
                        selectedCoin.market_data?.price_change_percentage_7d >= 0
                          ? 'positive'
                          : 'negative'
                      }`}
                    >
                      {safeToFixed(
                        selectedCoin.market_data?.price_change_percentage_7d
                      )}
                      %
                    </span>
                  </div>

                  <div className="stat-item">
                    <span className="stat-label">Price Range:</span>
                    {(() => {
                      const { min, max } = getPriceRange(
                        selectedCoin.market_data?.sparkline_7d?.price
                      );
                      return (
                        <span className="stat-value">
                          {formatPrice(min)} – {formatPrice(max)}
                        </span>
                      );
                    })()}
                  </div>

                  <div className="stat-item">
                    <span className="stat-label">Current Price:</span>
                    <span className="stat-value">
                      $
                      {selectedCoin.market_data?.current_price?.usd?.toLocaleString() ||
                        '—'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Market data grid */}
              <h3 className="section-heading">📊 Market Data</h3>
              <div className="modal-info-grid">
                <div>
                  <strong>Current Price:</strong>
                  <br />$
                  {selectedCoin.market_data?.current_price?.usd?.toLocaleString() ||
                    '—'}
                </div>
                <div>
                  <strong>24h Change:</strong>
                  <br />
                  <span
                    className={
                      selectedCoin.market_data?.price_change_percentage_24h >= 0
                        ? 'positive'
                        : 'negative'
                    }
                  >
                    {safeToFixed(
                      selectedCoin.market_data?.price_change_percentage_24h
                    )}
                    %
                  </span>
                </div>
                <div>
                  <strong>7d Change:</strong>
                  <br />
                  <span
                    className={
                      selectedCoin.market_data?.price_change_percentage_7d >= 0
                        ? 'positive'
                        : 'negative'
                    }
                  >
                    {safeToFixed(
                      selectedCoin.market_data?.price_change_percentage_7d
                    )}
                    %
                  </span>
                </div>
                <div>
                  <strong>Market Cap:</strong>
                  <br />$
                  {selectedCoin.market_data?.market_cap?.usd?.toLocaleString() ||
                    '—'}
                </div>
                <div>
                  <strong>Volume (24h):</strong>
                  <br />$
                  {selectedCoin.market_data?.total_volume?.usd?.toLocaleString() ||
                    '—'}
                </div>
                <div>
                  <strong>Circulating Supply:</strong>
                  <br />
                  {selectedCoin.market_data?.circulating_supply?.toLocaleString() ||
                    '—'}{' '}
                  {selectedCoin.symbol.toUpperCase()}
                </div>
                <div>
                  <strong>Max Supply:</strong>
                  <br />
                  {selectedCoin.market_data?.max_supply
                    ? selectedCoin.market_data.max_supply.toLocaleString()
                    : '∞'}
                </div>
                <div>
                  <strong>Market Cap Rank:</strong>
                  <br />#{selectedCoin.market_cap_rank || '—'}
                </div>
              </div>

              {/* Description */}
              <h3 className="section-heading">📘 Description</h3>
              <p
                className="description-text"
                dangerouslySetInnerHTML={{
                  __html:
                    selectedCoin.description?.en || 'No description available.',
                }}
              ></p>

              {/* Links */}
              <h3 className="section-heading">🔗 Useful Links</h3>
              <ul className="coin-links">
                {selectedCoin.links?.homepage[0] && (
                  <li>
                    <a
                      href={selectedCoin.links.homepage[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🌐 Website
                    </a>
                  </li>
                )}
                {selectedCoin.links?.blockchain_site[0] && (
                  <li>
                    <a
                      href={selectedCoin.links.blockchain_site[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ⛓ Blockchain Explorer
                    </a>
                  </li>
                )}
                {selectedCoin.links?.subreddit_url && (
                  <li>
                    <a
                      href={selectedCoin.links.subreddit_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      👽 Reddit
                    </a>
                  </li>
                )}
                {selectedCoin.links?.twitter_screen_name && (
                  <li>
                    <a
                      href={`https://twitter.com/${selectedCoin.links.twitter_screen_name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      🐦 Twitter
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Currencydata;
