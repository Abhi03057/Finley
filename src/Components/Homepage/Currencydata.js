// ✅ Currencydata.js (modal takes full screen and graph is prominent)
import React, { useEffect, useState } from 'react';
import './Currencydata.css';
import { Sparklines, SparklinesLine } from 'react-sparklines';

function Currencydata() {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h,7d`
      );
      const data = await res.json();
      setCoins(data);
    };

    fetchData();
  }, []);

  const handleCoinClick = (coin) => {
    setSelectedCoin(coin);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCoin(null);
  };

  return (
    <>
      <div className={`market-table-container ${showModal ? 'blurred' : ''}`}>
        <h2 className="market-heading">🚀 Top 10 Cryptocurrencies</h2>
        <div className="market-table-wrapper">
          <table className="market-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Coin</th>
                <th>Price</th>
                <th>24h %</th>
                <th>7d %</th>
                <th>Market Cap</th>
                <th>Volume (24h)</th>
                <th>Circulating Supply</th>
                <th>Last 7d</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin, idx) => (
                <tr className="coin-row" key={coin.id} onClick={() => handleCoinClick(coin)}>
                  <td>{idx + 1}</td>
                  <td className="coin-cell">
                    <img src={coin.image} alt={coin.name} />
                    <span>{coin.name}</span>
                  </td>
                  <td>${coin.current_price.toLocaleString()}</td>
                  <td className={coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </td>
                  <td className={coin.price_change_percentage_7d_in_currency >= 0 ? 'positive' : 'negative'}>
                    {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
                  </td>
                  <td>${coin.market_cap.toLocaleString()}</td>
                  <td>${coin.total_volume.toLocaleString()}</td>
                  <td>{coin.circulating_supply.toLocaleString()}</td>
                  <td>
                    <Sparklines data={coin.sparkline_in_7d.price} width={100} height={30}>
                      <SparklinesLine color="#3b82f6" />
                    </Sparklines>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedCoin && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-fullscreen" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>
            <div className="modal-content">
              <div className="modal-header">
                <img src={selectedCoin.image} alt={selectedCoin.name} className="modal-logo" />
                <h2>{selectedCoin.name} ({selectedCoin.symbol.toUpperCase()})</h2>
              </div>
              <div className="modal-body">
                <h3 className="section-heading">📉 Price History (7 days)</h3>
                <div className="modal-graph">
                  <Sparklines data={selectedCoin.sparkline_in_7d.price} width={700} height={150}>
                    <SparklinesLine color="#60a5fa" style={{ fill: "none", strokeWidth: 2 }} />
                  </Sparklines>
                </div>
                <h3 className="section-heading">📊 Market Data</h3>
                <div className="modal-info-grid">
                  <div><strong>Current Price:</strong><br />${selectedCoin.current_price.toLocaleString()}</div>
                  <div><strong>24h %:</strong><br />{selectedCoin.price_change_percentage_24h.toFixed(2)}%</div>
                  <div><strong>7d %:</strong><br />{selectedCoin.price_change_percentage_7d_in_currency.toFixed(2)}%</div>
                  <div><strong>Market Cap:</strong><br />${selectedCoin.market_cap.toLocaleString()}</div>
                  <div><strong>Volume (24h):</strong><br />${selectedCoin.total_volume.toLocaleString()}</div>
                  <div><strong>Circulating Supply:</strong><br />{selectedCoin.circulating_supply.toLocaleString()}</div>
                  <div><strong>Max Supply:</strong><br />{selectedCoin.max_supply ? selectedCoin.max_supply.toLocaleString() : '∞'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Currencydata;
