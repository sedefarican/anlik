import React, { useState } from 'react';
import { updateCategories } from '../services/api';
import Footer from '../components/Footer';

const allCategories = ['technology', 'sports', 'business', 'health', 'science', 'entertainment'];

const CategoryPage = ({ token, theme }) => {
  const [selected, setSelected] = useState([]);
  const [success, setSuccess] = useState(false);

  const darkMode = theme === 'dark';

  const toggleCategory = (cat) => {
    if (selected.includes(cat)) {
      setSelected(selected.filter(c => c !== cat));
    } else {
      setSelected([...selected, cat]);
    }
  };

  const handleSave = async () => {
    try {
      await updateCategories({ categories: selected }, token);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert("Kategori güncelleme başarısız: " + err.message);
    }
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
      **
      <h2
        style={{
          fontSize: '28px',
          marginBottom: '20px',
          background: darkMode
            ? 'linear-gradient(to right, #16a085, #27ae60)'
            : 'linear-gradient(to right, #f12711, #f5af19)',
          WebkitBackgroundClip: 'text',
          color: 'transparent'
        }}
      >
        İlgi Alanlarını Seç
      </h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '30px' }}>
        {allCategories.map(cat => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            style={{
              padding: '12px 20px',
              fontSize: '15px',
              borderRadius: '8px',
              border: selected.includes(cat)
                ? '2px solid #2ecc71'
                : '1px solid #bbb',
              backgroundColor: selected.includes(cat)
                ? (darkMode ? '#27ae60' : '#2ecc71')
                : (darkMode ? '#1e1e1e' : '#eaeaea'),
              color: darkMode ? '#fff' : '#111',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <button
        onClick={handleSave}
        style={{
          padding: '10px 24px',
          fontSize: '16px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Kaydet
      </button>

      {success && <p style={{ marginTop: '15px', color: '#2ecc71' }}>Tercihler kaydedildi ✅</p>}

      
    </div>

    
  );
};

export default CategoryPage;
