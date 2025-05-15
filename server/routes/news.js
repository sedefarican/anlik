const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // .env dosyasını aktif hale getir

// 🔐 Token kontrol middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: "Token gerekli" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Geçersiz token" });
  }
};

// 🌐 GET /api/news?category=technology
router.get('/', verifyToken, async (req, res) => {
  try {
    const category = req.query.category || 'technology';
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ message: "API anahtarı tanımlı değil (NEWS_API_KEY boş)" });
    }

    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
    console.log("🔗 Haber API isteği:", url); // debug için log

    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    console.error("❌ Haber çekme hatası:", err.message);
    res.status(500).json({ message: "Haberler çekilemedi", error: err.message });
  }
});

module.exports = router;
