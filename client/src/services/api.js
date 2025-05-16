import axios from 'axios';

// Axios örneği (backend bağlantı noktası)
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Gerekirse burayı değiştir
});

// Kullanıcı girişi
export const login = (data) =>
  API.post('/auth/login', data);

// Yeni kullanıcı kaydı
export const register = (data) =>
  API.post('/auth/register', data);

// Kategori güncelleme (kategori seçme)
export const updateCategories = (data, token) =>
  API.put('/auth/categories', data, {
    headers: { Authorization: `Bearer ${token}` }
  });

// Kullanıcı bilgilerini alma (kategori bilgisi dahil)
export const getUserInfo = (token) =>
  API.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  });

// Belirli kategoriden haberleri alma
export const getNews = (token, category) =>
  API.get(`/news?category=${category}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export default API;
