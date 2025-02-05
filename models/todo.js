const mongoose = require('mongoose');

// Создаем схему для задач
const todoSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false }
});

// Создаем модель Todo
const Todo = mongoose.model('Todo', todoSchema);

module.exports = { Todo };
