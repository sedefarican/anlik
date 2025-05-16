import React, { useState } from 'react';
import { register } from '../services/api';

const RegisterPage = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await register(form);
      alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
    } catch (err) {
      alert("Kayıt hatası: " + err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Kayıt Ol</h2>
      <input name="username" placeholder="Kullanıcı Adı" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Şifre" onChange={handleChange} />
      <button onClick={handleSubmit}>Kayıt</button>
    </div>
  );
};

export default RegisterPage;
