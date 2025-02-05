class User {
  constructor(username, password) {
    this.username = username;
    this.password = password; // Хэшированный пароль
  }

  static users = [
    new User('test', 'test123'),
  ];

  static findByUsername(username) {
    return User.users.find(user => user.username === username);
  }

  save() {
    User.users.push(this);
  }
}

module.exports = { User };
