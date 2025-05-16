import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CategoryPage from './pages/CategoryPage';
import DashboardPage from './pages/DashBoardPage';
import NewsPage from './pages/NewsPage';
import ProfilePage from './pages/ProfilePage';
import Layout from './components/Layout';


const App = () => {
  const [token, setToken] = useState(null);

  // 🎨 Tema ayarı (default: dark)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  // 🌙 Tema değiştikçe body'e uygula + localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.style.backgroundColor = theme === 'dark' ? '#121212' : '#ffffff';
    document.body.style.color = theme === 'dark' ? '#f1f1f1' : '#111111';
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <BrowserRouter>
      {/* Sayfa yönlendirmeleri */}
      <Routes>
        <Route path="/" element={<LoginPage setToken={setToken} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/categories" element={<CategoryPage token={token} />} />
        <Route path="/news/:category" element={<NewsPage token={token} theme={theme} setTheme={setTheme} />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route
          path="/dashboard"
          element={
            <Layout theme={theme} setTheme={setTheme}>
              <DashboardPage token={token} theme={theme} />
            </Layout>
          }
        />


      </Routes>
    </BrowserRouter>
  );
};

export default App;
