const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { authenticateToken } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

// Инициализация приложения
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Мидлвар для парсинга JSON
app.use(bodyParser.json());

// Маршруты
app.use('/auth', authRoutes);
app.use('/todos', authenticateToken, todoRoutes); // Авторизация для маршрутов задач

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
