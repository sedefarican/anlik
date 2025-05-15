const authRoutes = require('./routes/auth');
const newsRoutes = require('./routes/news');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);

// Geçici test endpoint'i
app.get('/', (req, res) => {
  res.send('API çalışıyor 🚀');
});

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB bağlantısı başarılı");
  app.listen(5000, () => console.log("🚀 Sunucu 5000 portunda çalışıyor"));
}).catch(err => console.error("❌ Veritabanı bağlantı hatası:", err));
