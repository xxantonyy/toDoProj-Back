const mongoose = require('mongoose');

// Создаем схему для пользователей
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Добавляем метод для поиска пользователя по имени
userSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });  // Поиск пользователя по имени
};

// Создаем модель User
const User = mongoose.model('User', userSchema);

module.exports = { User };
