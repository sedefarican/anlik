const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Token kontrolü için middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: "Token eksik" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token geçersiz" });
  }
};

// PUT /api/auth/categories
router.put('/categories', verifyToken, async (req, res) => {
  const { categories } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { categories },
      { new: true }
    );

    res.json({ message: "Kategoriler güncellendi", categories: user.categories });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası", error: err.message });
  }
});
