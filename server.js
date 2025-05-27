const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { authenticateToken } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');
const cors = require('cors');

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

// Если нужно ограничить доступ только для определенного домена, можно сделать так:
app.use(cors({
  origin: ['http://localhost:3000', 'https://todo-forme.vercel.app'],
  credentials: true,
}));

// app.use(express.json());

// Маршруты
app.use('/auth', authRoutes);
app.use('/todos', authenticateToken, todoRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
