const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Получаем токен из заголовков
  if (!token) return res.status(401).json({ message: 'Нет токена' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Неверный токен' });
    req.userId = decoded.userId; // Добавляем userId в запрос
    next();
  });
};

module.exports = { authenticateToken };
