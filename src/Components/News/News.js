import React, { useState, useEffect, useCallback } from 'react';
import "./News.css";

// Sample data - replace with API call
const sampleNewsData = [
  {
    id: 1,
    title: "Bitcoin hits $70K as ETF inflows surge",
    source: "CoinDesk",
    time: "2 hours ago",
    category: "Bitcoin",
    summary: "Bitcoin crossed the $70,000 mark for the first time this year as institutional inflows surge and retail interest picks up.",
    url: "#",
    isNew: true
  },
  {
    id: 2,
    title: "Ethereum Foundation announces roadmap upgrade",
    source: "The Block",
    time: "4 hours ago",
    category: "Ethereum",
    summary: "The Ethereum Foundation released details of upcoming upgrades focused on scalability, security, and lower gas fees.",
    url: "#",
    isNew: false
  },
  {
    id: 3,
    title: "Solana's network sees record daily transactions",
    source: "CryptoSlate",
    time: "1 day ago",
    category: "Solana",
    summary: "Solana processes over 65 million transactions in a single day, driven by DeFi and gaming dApps.",
    url: "#",
    isNew: false
  },
  {
    id: 4,
    title: "DeFi protocol launches new yield farming opportunities",
    source: "DeFiPulse",
    time: "6 hours ago",
    category: "DeFi",
    summary: "Major DeFi protocol introduces innovative yield farming strategies with APY rates reaching up to 12%.",
    url: "#",
    isNew: true
  },
  {
    id: 5,
    title: "NFT marketplace reports 200% increase in daily volume",
    source: "OpenSea",
    time: "8 hours ago",
    category: "NFT",
    summary: "Leading NFT marketplace sees unprecedented trading volumes as new collections and utility tokens gain traction.",
    url: "#",
    isNew: false
  }
];

// Skeleton component for loading states
const NewsSkeleton = () => (
  <div className="news-skeleton">
    <div className="skeleton-title"></div>
    <div className="skeleton-meta"></div>
    <div className="skeleton-summary"></div>
    <div className="skeleton-summary"></div>
  </div>
);

// Individual news card component
const NewsCard = ({ news, onClick }) => (
  <div 
    className={`news-card ${news.isNew ? 'new-article' : ''}`}
    onClick={() => onClick(news)}
    role="button"
    tabIndex={0}
    onKeyPress={(e) => e.key === 'Enter' && onClick(news)}
  >
    <div className="news-card-header">
      <h3 className="news-title">{news.title}</h3>
      <span className="news-category">{news.category}</span>
    </div>
    <div className="news-meta">
      <span>{news.source}</span> • <span>{news.time}</span>
    </div>
    <p className="news-summary">{news.summary}</p>
    <div className="news-card-actions">
      <a href={news.url} className="news-read-more" onClick={(e) => e.stopPropagation()}>
        Read Full Article →
      </a>
      <div className="news-engagement">
        <div className="news-engagement-item">
          <span>👍</span>
          <span>{Math.floor(Math.random() * 100)}</span>
        </div>
        <div className="news-engagement-item">
          <span>💬</span>
          <span>{Math.floor(Math.random() * 50)}</span>
        </div>
      </div>
    </div>
  </div>
);

function News() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const categories = ['all', 'Bitcoin', 'Ethereum', 'Solana', 'DeFi', 'NFT'];

  // Simulate API call - replace with actual API integration
  const fetchNews = useCallback(async (pageNum = 1, category = 'all', append = false) => {
    try {
      setLoading(pageNum === 1 && !append);
      setError(null);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Filter by category if not 'all'
      let filteredData = sampleNewsData;
      if (category !== 'all') {
        filteredData = sampleNewsData.filter(news => news.category === category);
      }

      // Simulate pagination
      const itemsPerPage = 3;
      const startIndex = (pageNum - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = filteredData.slice(startIndex, endIndex);

      if (append) {
        setNewsData(prev => [...prev, ...paginatedData]);
      } else {
        setNewsData(paginatedData);
      }

      setHasMore(endIndex < filteredData.length);
      setPage(pageNum);
    } catch (err) {
      setError('Failed to load news. Please try again.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Load initial data
  useEffect(() => {
    fetchNews(1, selectedCategory);
  }, [fetchNews, selectedCategory]);

  // Handle category filter
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);
    setNewsData([]);
    fetchNews(1, category);
  };

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setNewsData([]);
    fetchNews(1, selectedCategory);
  };

  // Handle load more
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchNews(page + 1, selectedCategory, true);
    }
  };

  // Handle news card click
  const handleNewsClick = (news) => {
    console.log('News clicked:', news);
    // Add your navigation logic here
    // e.g., navigate to full article or open modal
  };

  return (
    <div className="news-section">
      <h2 className="news-heading">📰 Crypto Market News</h2>
      
      {/* Controls */}
      <div className="news-controls">
        {categories.map(category => (
          <button
            key={category}
            className={`news-filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category === 'all' ? 'All News' : category}
          </button>
        ))}
        <button
          className="news-refresh-btn"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <span>{refreshing ? '⟳' : '🔄'}</span>
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* News List */}
      <div className="news-list">
        {/* Loading skeletons */}
        {loading && newsData.length === 0 && (
          <>
            <NewsSkeleton />
            <NewsSkeleton />
            <NewsSkeleton />
          </>
        )}

        {/* Error state */}
        {error && (
          <div className="news-error">
            {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && newsData.length === 0 && (
          <div className="news-empty">
            No news found for the selected category.
          </div>
        )}

        {/* News cards */}
        {newsData.map((news) => (
          <NewsCard
            key={news.id}
            news={news}
            onClick={handleNewsClick}
          />
        ))}

        {/* Load more button */}
        {hasMore && newsData.length > 0 && (
          <button
            className="news-load-more"
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More News'}
          </button>
        )}
      </div>
    </div>
  );
}

export default News;