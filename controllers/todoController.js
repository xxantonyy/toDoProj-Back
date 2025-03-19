const { Todo } = require('../models/todo');

// Получить все задачи для пользователя
exports.getTodos = async (req, res) => {
  try {
    const { sortBy, order } = req.query;
    const sortOptions = {};

    if (sortBy) {
      const validSortFields = ['completed', 'priority', 'category', 'date'];
      if (validSortFields.includes(sortBy)) {
        sortOptions[sortBy] = order === 'desc' ? -1 : 1;
      }
    }

    const todos = await Todo.find({ userId: req.userId }).sort(sortOptions);
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении задач', error: err.message });
  }
};


// Создать новую задачу
exports.addTodo = async (req, res) => {
  const { title, description, priority, category, date, completed } = req.body;
  const newTodo = new Todo({
    userId: req.userId,
    title,
    description,
    priority,
    category,
    date,
    completed
  });

  try {
    await newTodo.save();
    res.status(201).json({ message: 'Задача создана', success: true, data: newTodo });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при создании задачи', error: err.message });
  }
};

// Обновить задачу
exports.updateTodo = async (req, res) => {
  const { todoId } = req.params;
  const { title, description, completed, date, priority, category } = req.body;

  try {
    const todo = await Todo.findByIdAndUpdate(
      todoId,
      { title, description, completed, date, priority, category },
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при обновлении задачи', error: err.message });
  }
};

// Удалить задачу
exports.deleteTodo = async (req, res) => {
  const { todoId } = req.params;

  try {
    const todo = await Todo.findByIdAndDelete(todoId);
    if (!todo) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }
    res.json({ message: 'Задача удалена' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при удалении задачи', error: err.message });
  }
};
