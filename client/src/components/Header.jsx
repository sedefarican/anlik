import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ onThemeToggle }) => {
  const navigate = useNavigate();

  const getTopInterest = () => {
    const data = JSON.parse(localStorage.getItem('interests')) || {};
    const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? sorted[0][0] : null;
  };

  const handleTopCategoryClick = () => {
    const topCategory = getTopInterest();
    if (topCategory) {
      navigate(`/news/${topCategory}`, { state: { fromRecommendation: true } });
    }
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', padding: '20px', borderBottom: '1px solid #ccc' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '32px'}}>ANLIK</h1>
        <p style={{ margin: 0 }}>Her an, her yerde, sadece sana özel haberler</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
        <button
          onClick={handleTopCategoryClick}
          style={{
            padding: '8px 14px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            backgroundColor: '#eee',
            cursor: 'pointer'
          }}
        >
          En senlik kategori
        </button>

        <span title="Ana Sayfa" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>🏠</span>
        <span title="Kullanıcı İşlemleri" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>👤</span>
        <button onClick={onThemeToggle} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}>🌗</button>
      </div>
    </header>
  );
};

export default Header;
