class Todo {
  constructor(userId, title, description) {
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.completed = false;
  }

  static todos = [];

  static getByUser(userId) {
    return Todo.todos.filter(todo => todo.userId === userId);
  }

  static create(userId, title, description) {
    const newTodo = new Todo(userId, title, description);
    Todo.todos.push(newTodo);
    return newTodo;
  }

  static update(todoId, title, description, completed) {
    const todo = Todo.todos.find(todo => todo.id === todoId);
    if (!todo) throw new Error('Задача не найдена');
    todo.title = title;
    todo.description = description;
    todo.completed = completed;
    return todo;
  }

  static delete(todoId) {
    const index = Todo.todos.findIndex(todo => todo.id === todoId);
    if (index === -1) throw new Error('Задача не найдена');
    Todo.todos.splice(index, 1);
  }
}

module.exports = { Todo };
