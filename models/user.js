class User {
  constructor(username, password) {
    this.username = username;
    this.password = password; // Хэшированный пароль
  }

  static users = [];

  static findByUsername(username) {
    return User.users.find(user => user.username === username);
  }

  save() {
    User.users.push(this);
  }
}

module.exports = { User };
