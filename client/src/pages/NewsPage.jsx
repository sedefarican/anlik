import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNews } from '../services/api';


const categories = {
  technology: '💻 Teknoloji',
  sports: '🏀 Spor',
  business: '💼 Ekonomi',
  health: '🩺 Sağlık',
  science: '🔬 Bilim',
  entertainment: '🎬 Eğlence'
};

const DashboardPage = ({ token, theme }) => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [activeCategory, setActiveCategory] = useState('general');
  const darkMode = theme === 'dark';

  const storeInterest = (category) => {
    let interests = JSON.parse(localStorage.getItem('interests')) || {};
    interests[category] = (interests[category] || 0) + 1;
    localStorage.setItem('interests', JSON.stringify(interests));
  };

  const getTopInterest = () => {
    const data = JSON.parse(localStorage.getItem('interests')) || {};
    const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? sorted[0][0] : null;
  };

  const topCategory = getTopInterest();

  const fetchNews = async (category) => {
    try {
      const res = await getNews(token, category);
      setNews(res.data.articles);
    } catch (err) {
      console.error("Haber alınamadı:", err.message);
    }
  };

  useEffect(() => {
    fetchNews(activeCategory);
  }, [activeCategory]);

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    storeInterest(cat);
    navigate(`/news/${cat}`);
  };

  return (
    <div
      style={{
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: darkMode ? '#121212' : '#f5f5f5',
        color: darkMode ? '#f1f1f1' : '#111',
        minHeight: '100vh'
      }}
    >
      <style>
        {`
          @media (max-width: 768px) {
            .category-buttons {
              flex-direction: column !important;
              align-items: stretch;
            }
            .news-card {
              padding: 15px !important;
              margin: 10px 5px !important;
            }
            h2 {
              font-size: 22px !important;
            }
            img {
              max-height: 180px !important;
            }
          }
        `}
      </style>

      <h2
        style={{
          fontSize: '32px',
          marginBottom: '30px',
          backgroundImage: darkMode
            ? 'linear-gradient(to right, #00c6ff, #0072ff)'
            : 'linear-gradient(to right, #ff6a00, #ee0979)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: darkMode
            ? '0 0 1px rgba(0,0,0,0.4)'
            : '0 0 1px rgba(255,255,255,0.4)',
          fontWeight: 'bold',
          transition: 'all 0.3s ease'
        }}
      >
        🌐 Genel Haber Akışı
      </h2>

      <div className="category-buttons" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '40px' }}>
        {Object.entries(categories).map(([cat, label]) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            style={{
              padding: '12px 24px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: activeCategory === cat ? '#2980b9' : darkMode ? '#1e1e1e' : '#ddd',
              color: darkMode ? '#fff' : '#000',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {topCategory && (
        <div style={{ marginBottom: '30px', fontSize: '18px', fontStyle: 'italic' }}>
          👀 Sık tıkladığın kategori: <strong>{categories[topCategory]}</strong>
          <button
            style={{
              marginLeft: '10px',
              padding: '6px 14px',
              borderRadius: '6px',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => {
              setActiveCategory(topCategory);
              fetchNews(topCategory);
            }}
          >
            Bu Kategoriye Git
          </button>
        </div>
      )}

      <h3 style={{ marginBottom: '20px' }}>
        {categories[activeCategory] || '📰 Genel'} haberleri:
      </h3>

      {news.length === 0 ? (
        <p>Haber bulunamadı.</p>
      ) : (
        news.slice(0, 8).map((item, i) => (
          <div
            key={i}
            className="news-card"
            style={{
              backgroundColor: darkMode ? '#1a1a1a' : '#fff',
              padding: '20px',
              marginBottom: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            {item.urlToImage && (
              <img
                src={item.urlToImage}
                alt=""
                style={{
                  width: '100%',
                  maxHeight: '250px',
                  objectFit: 'cover',
                  borderRadius: '6px'
                }}
              />
            )}
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'block', marginTop: '10px', color: '#3498db' }}
            >
              Habere Git
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default DashboardPage;
