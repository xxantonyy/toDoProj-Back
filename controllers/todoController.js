const { Todo } = require('../models/todo');

// Получить все задачи для пользователя
exports.getTodos = async (req, res) => {
  try {
    const { sortBy, order, priority, category } = req.query;
    const filter = { userId: req.userId };

    // Фильтрация по приоритету
    if (priority !== undefined) {
      filter.priority = Number(priority);
    }

    // Фильтрация по категории
    if (category !== undefined) {
      filter.category = Number(category);
    }

    // Определение порядка сортировки
    const sortOptions = { date: 1, completed: 1 }; // По умолчанию сортировка по дате и статусу выполнения
    if (sortBy) {
      const validSortFields = ['priority', 'category'];
      if (validSortFields.includes(sortBy)) {
        sortOptions[sortBy] = order === 'desc' ? -1 : 1;
      }
    }

    // Запрос в базу данных
    const todos = await Todo.find(filter).sort(sortOptions);
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
