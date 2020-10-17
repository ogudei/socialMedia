class UserModel {
  constructor(email = null, password = null, username = null, token = null) {
    (this.email = email), (this.password = password);
    this.username = username;
    this.token = token;
  }
}

module.exports = UserModel;
