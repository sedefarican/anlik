import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 yönlendirme için ekledik
import { login } from '../services/api';

const LoginPage = ({ setToken }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate(); // 👈 yönlendirme hook'u

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await login(form);
      
      if (res && res.data && res.data.token) {
        setToken(res.data.token);
        alert("Giriş başarılı!");
        navigate('/dashboard'); // ✅ giriş sonrası yönlendirme
      } else {
        alert("Sunucudan beklenen veri alınamadı.");
      }

    } catch (err) {
      console.error("Giriş hatası:", err);
      alert("Giriş başarısız: " + (err.response?.data?.message || "Sunucuya ulaşılamadı"));
    }
  };

  return (
    <div>
      <h2>Giriş Yap</h2>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Şifre" onChange={handleChange} />
      <button onClick={handleSubmit}>Giriş</button>
    </div>
  );
};

export default LoginPage;

