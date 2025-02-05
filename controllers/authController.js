const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

// Регистрация
exports.register = async (req, res) => {
  const { username, password } = req.body;

  // Проверка на наличие username и password
  if (!username || !password) {
    return res.status(400).json({ message: 'Необходимы оба поля: username и password' });
  }

  const existingUser = await User.findByUsername(username);
  if (existingUser) {
    return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Хэширование пароля
    const newUser = new User(username, hashedPassword);
    await newUser.save();
    res.status(201).json({ message: 'Пользователь зарегистрирован' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при регистрации', error: error.message });
  }
};

// Логин
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findByUsername(username);
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Неверные данные авторизации' });
  }
  
  const token = jwt.sign({ userId: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
