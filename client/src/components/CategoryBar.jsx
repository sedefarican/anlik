import React from 'react';

const CategoryBar = ({ categories, activeCategory, onCategoryClick }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '10px' }}>Kategoriler</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        {Object.entries(categories).map(([key, label]) => (
          <button
            key={key}
            onClick={() => onCategoryClick(key)}
            style={{
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: activeCategory === key ? '#2980b9' : '#ddd',
              color: activeCategory === key ? '#fff' : '#000',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
