const { User } = require('../models/user');
const { Todo } = require('../models/todo');

// Получить статистику
exports.getUserStats = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.userId }).select('-password');
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    const totalTasks = await Todo.countDocuments({ userId: req.userId });
    const completedTasks = await Todo.countDocuments({ userId: req.userId, completed: true });

    res.json({
      user,
      stats: {
        totalTasks,
        completedTasks
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении информации', error: err.message });
  }
};