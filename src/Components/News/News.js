import React from 'react';
import "./News.css";

const newsData = [
  {
    title: "Bitcoin hits $70K as ETF inflows surge",
    source: "CoinDesk",
    time: "2 hours ago",
    summary: "Bitcoin crossed the $70,000 mark for the first time this year as institutional inflows surge and retail interest picks up.",
  },
  {
    title: "Ethereum Foundation announces roadmap upgrade",
    source: "The Block",
    time: "4 hours ago",
    summary: "The Ethereum Foundation released details of upcoming upgrades focused on scalability, security, and lower gas fees.",
  },
  {
    title: "Solana's network sees record daily transactions",
    source: "CryptoSlate",
    time: "1 day ago",
    summary: "Solana processes over 65 million transactions in a single day, driven by DeFi and gaming dApps.",
  },
];

function News() {
  return (
    <div className="news-section">
      <h2 className="news-heading">📰 Crypto Market News</h2>
      <div className="news-list">
        {newsData.map((news, index) => (
          <div className="news-card" key={index}>
            <h3 className="news-title">{news.title}</h3>
            <div className="news-meta">
              <span>{news.source}</span> • <span>{news.time}</span>
            </div>
            <p className="news-summary">{news.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
