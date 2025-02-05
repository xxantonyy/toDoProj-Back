const express = require('express');
const router = express.Router();
const { getTodos, addTodo, updateTodo, deleteTodo } = require('../controllers/todoController');

// Получить все задачи
router.get('/', getTodos);

// Добавить задачу
router.post('/', addTodo);

// Обновить задачу
router.put('/:todoId', updateTodo);

// Удалить задачу
router.delete('/:todoId', deleteTodo);

module.exports = router;
