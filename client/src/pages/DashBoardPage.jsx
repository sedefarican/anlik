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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [news, setNews] = useState([]);
  const darkMode = theme === 'dark';

  // İlgi alanlarını sakla
  const storeInterest = (category) => {
    let interests = JSON.parse(localStorage.getItem('interests')) || {};
    interests[category] = (interests[category] || 0) + 1;
    localStorage.setItem('interests', JSON.stringify(interests));
  };

  // Çoklu kategoriye göre haberleri çek
useEffect(() => {
  const fetchAllNews = async () => {
    try {
      const all = [];

      for (let cat of selectedCategories) {
        const res = await getNews(token, cat);
        all.push(...res.data.articles.map(a => ({ ...a, sourceCategory: cat })));
      }

      // 🆕 Yayınlanma tarihine göre (en yeni en önce)
      all.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

      setNews(all);
    } catch (err) {
      console.error("Haber alınamadı:", err.message);
    }
  };

  if (selectedCategories.length > 0) {
    fetchAllNews();
  } else {
    setNews([]);
  }
}, [selectedCategories]);


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
      {/* Çoklu kategori checkbox'ları */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
        {Object.entries(categories).map(([cat, label]) => (
          <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={(e) => {
                const updated = e.target.checked
                  ? [...selectedCategories, cat]
                  : selectedCategories.filter(c => c !== cat);
                setSelectedCategories(updated);
              }}
            />
            {label}
          </label>
        ))}
      </div>

      <h3 style={{ marginBottom: '20px' }}>
        {selectedCategories.length === 0
          ? 'Lütfen kategori seçin'
          : `${selectedCategories.length} kategoriye ait haberler:`}
      </h3>

      {news.length === 0 ? (
        <p>Haber bulunamadı.</p>
      ) : (
        news.map((item, i) => (
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

      <style>
        {`
          @media (max-width: 768px) {
            .news-card {
              padding: 15px !important;
              margin: 10px 5px !important;
            }
            h2 {
              font-size: 24px !important;
              text-align: center;
            }
            img {
              max-height: 180px !important;
            }
            button {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default DashboardPage;

