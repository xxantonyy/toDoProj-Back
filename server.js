const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { authenticateToken } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

// Инициализация приложения
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Строка подключения к MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/todoApp';

// Подключение к базе данных MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Подключено к MongoDB');
  })
  .catch(err => {
    console.error('Ошибка подключения к MongoDB:', err);
  });

// Мидлвар для парсинга JSON
app.use(bodyParser.json());

// Маршруты
app.use('/auth', authRoutes);
app.use('/todos', authenticateToken, todoRoutes); // Добавляем маршрут с префиксом /todos

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
