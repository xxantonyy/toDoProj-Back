const { Todo } = require('../models/todo');

// Получить все задачи пользователя
exports.getTodos = (req, res) => {
  const todos = Todo.getByUser(req.userId);
  res.json(todos);
};

// Добавить задачу
exports.addTodo = (req, res) => {
  const { title, description } = req.body;
  const newTodo = Todo.create(req.userId, title, description);
  res.status(201).json(newTodo);
};

// Обновить задачу
exports.updateTodo = (req, res) => {
  const { todoId } = req.params;
  const { title, description, completed } = req.body;
  const updatedTodo = Todo.update(todoId, title, description, completed);
  res.json(updatedTodo);
};

// Удалить задачу
exports.deleteTodo = (req, res) => {
  const { todoId } = req.params;
  Todo.delete(todoId);
  res.json({ message: 'Задача удалена' });
};
