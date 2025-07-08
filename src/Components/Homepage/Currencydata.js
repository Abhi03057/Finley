import React, { useState } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import "./Currencydata.css";

// Sample data with 7-day price history
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
    market_cap_rank: 1,
    sparkline_in_7d: [
      65432, 66123, 64789, 67234, 68123, 66789, 67234
    ],
    price_change_percentage_7d: 3.24
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
    market_cap_rank: 2,
    sparkline_in_7d: [
      3456, 3512, 3489, 3567, 3623, 3534, 3567
    ],
    price_change_percentage_7d: 2.18
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
    market_cap_rank: 3,
    sparkline_in_7d: [
      185, 192, 188, 195, 189, 187, 189
    ],
    price_change_percentage_7d: -1.24
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
    current_price: 0.4567,
    price_change_24h: 0.0234,
    price_change_percentage_24h: 5.41,
    high_24h: 0.4689,
    low_24h: 0.4321,
    market_cap: 15678901234,
    total_volume: 567890123,
    circulating_supply: 34567890123,
    ath: 3.09,
    atl: 0.017,
    market_cap_rank: 4,
    sparkline_in_7d: [
      0.42, 0.44, 0.43, 0.45, 0.46, 0.44, 0.456
    ],
    price_change_percentage_7d: 8.57
  },
  {
    id: 'binancecoin',
    name: 'BNB',
    symbol: 'BNB',
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    current_price: 312.45,
    price_change_24h: -8.67,
    price_change_percentage_24h: -2.70,
    high_24h: 325.67,
    low_24h: 308.23,
    market_cap: 46789012345,
    total_volume: 1234567890,
    circulating_supply: 149567890,
    ath: 686.31,
    atl: 0.096,
    market_cap_rank: 5,
    sparkline_in_7d: [
      320, 315, 318, 312, 325, 310, 312
    ],
    price_change_percentage_7d: -2.36
  },
  {
    id: 'ripple',
    name: 'XRP',
    symbol: 'XRP',
    image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    current_price: 0.6234,
    price_change_24h: 0.0456,
    price_change_percentage_24h: 7.89,
    high_24h: 0.6456,
    low_24h: 0.5987,
    market_cap: 33456789012,
    total_volume: 2345678901,
    circulating_supply: 53678901234,
    ath: 3.84,
    atl: 0.002,
    market_cap_rank: 6,
    sparkline_in_7d: [
      0.58, 0.60, 0.59, 0.62, 0.64, 0.61, 0.623
    ],
    price_change_percentage_7d: 7.41
  }
];

// Mini chart component
function MiniChart({ data, isPositive }) {
  const chartData = data.map((price, index) => ({
    price: price,
    index: index
  }));

  return (
    <div className="mini-chart">
      <ResponsiveContainer width="100%" height={50}>
        <LineChart data={chartData}>
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke={isPositive ? '#16a34a' : '#dc2626'}
            strokeWidth={2}
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function CryptoTable() {
  const [sortBy, setSortBy] = useState('market_cap_rank');
  const [sortOrder, setSortOrder] = useState('asc');

  const formatCurrency = (value) => {
    if (value < 1) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
      }).format(value);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatLargeNumber = (value) => {
    if (value >= 1e12) {
      return '$' + (value / 1e12).toFixed(2) + 'T';
    }
    if (value >= 1e9) {
      return '$' + (value / 1e9).toFixed(2) + 'B';
    }
    if (value >= 1e6) {
      return '$' + (value / 1e6).toFixed(2) + 'M';
    }
    return '$' + value.toLocaleString();
  };

  const formatSupply = (value) => {
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

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedData = [...sampleCoinData].sort((a, b) => {
    let valueA = a[sortBy];
    let valueB = b[sortBy];
    
    if (sortOrder === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  return (
    <div className="crypto-table-container">
      <div className="table-header">
        <h2>Cryptocurrency Prices by Market Cap</h2>
        <p>The global cryptocurrency market cap today is $2.45 Trillion with a 2.1% change in the last 24 hours.</p>
      </div>

      <div className="table-wrapper">
        <table className="crypto-table">
          <thead>
            <tr>
              <th className="rank-header">#</th>
              <th className="name-header">Name</th>
              <th className="price-header clickable" onClick={() => handleSort('current_price')}>
                Price
                {sortBy === 'current_price' && (
                  <span className="sort-arrow">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="change-header clickable" onClick={() => handleSort('price_change_percentage_24h')}>
                24h %
                {sortBy === 'price_change_percentage_24h' && (
                  <span className="sort-arrow">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="change-header clickable" onClick={() => handleSort('price_change_percentage_7d')}>
                7d %
                {sortBy === 'price_change_percentage_7d' && (
                  <span className="sort-arrow">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="market-cap-header clickable" onClick={() => handleSort('market_cap')}>
                Market Cap
                {sortBy === 'market_cap' && (
                  <span className="sort-arrow">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="volume-header clickable" onClick={() => handleSort('total_volume')}>
                Volume(24h)
                {sortBy === 'total_volume' && (
                  <span className="sort-arrow">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th className="supply-header">Circulating Supply</th>
              <th className="chart-header">Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((coin, index) => {
              const is24hPositive = coin.price_change_percentage_24h >= 0;
              const is7dPositive = coin.price_change_percentage_7d >= 0;
              
              return (
                <tr key={coin.id} className="crypto-row">
                  <td className="rank-cell">{coin.market_cap_rank}</td>
                  <td className="name-cell">
                    <div className="coin-info">
                      <img 
                        src={coin.image} 
                        alt={coin.name}
                        className="coin-logo"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/24x24?text=' + coin.symbol;
                        }}
                      />
                      <div className="coin-names">
                        <span className="coin-name">{coin.name}</span>
                        <span className="coin-symbol">{coin.symbol.toUpperCase()}</span>
                      </div>
                    </div>
                  </td>
                  <td className="price-cell">{formatCurrency(coin.current_price)}</td>
                  <td className={`change-cell ${is24hPositive ? 'positive' : 'negative'}`}>
                    {is24hPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className={`change-cell ${is7dPositive ? 'positive' : 'negative'}`}>
                    {is7dPositive ? '+' : ''}{coin.price_change_percentage_7d.toFixed(2)}%
                  </td>
                  <td className="market-cap-cell">{formatLargeNumber(coin.market_cap)}</td>
                  <td className="volume-cell">{formatLargeNumber(coin.total_volume)}</td>
                  <td className="supply-cell">
                    <div className="supply-info">
                      <span className="supply-amount">{formatSupply(coin.circulating_supply)}</span>
                      <span className="supply-symbol">{coin.symbol.toUpperCase()}</span>
                    </div>
                  </td>
                  <td className="chart-cell">
                    <MiniChart data={coin.sparkline_in_7d} isPositive={is7dPositive} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CryptoTable;