// src/Components/News/News.js
import React, { useEffect, useState } from 'react';
import './News.css';

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        // 👇 Calculate "from" date = 2 days ago
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 2);
        const formattedFrom = fromDate.toISOString().split('T')[0]; // YYYY-MM-DD

        const res = await fetch(
          `https://gnews.io/api/v4/search?q=cryptocurrency&lang=en&sortby=publishedAt&from=${formattedFrom}&max=10&token=350ea51f4fdb51c7519e4a745428ddf3`
        );

        const data = await res.json();

        if (data.articles) {
          setArticles(data.articles);
        } else {
          setError('No articles found.');
        }
      } catch (err) {
        setError('Error fetching news.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <h2>📰 Latest Crypto News</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'tomato' }}>{error}</p>}

      <div className="news-grid">
        {articles.map((article, index) => (
          <a className="news-card" key={index} href={article.url} target="_blank" rel="noopener noreferrer">
            <img 
              src={article.image || "https://tse4.mm.bing.net/th/id/OIP.bgvMu8vQcELlufCQPSZivgHaEK?pid=Api&P=0&h=180"} 
              alt={article.title} 
            />

            <div className="news-text">
              <h4>{article.title}</h4>
              <p>{article.description}</p>
              <span>{article.source.name} • {new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default News;
