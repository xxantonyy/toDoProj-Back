const express = require('express');
const router = express.Router();
const { getUserStats } = require('../controllers/checkController');

// Получить данные о пользователе и статистику задач
router.get('/check', getUserStats);

module.exports = router;
