const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Регистрация
router.post('/register', register);

// Логин
router.post('/login', login);

// Получить данные о пользователе и статистику задач
router.get('/check', authenticateToken, getUserStats);

module.exports = router;
