class UserModel {
  constructor(
    email = null,
    password = null,
    username = null,
    token = null,
    followers = null,
    following = null
  ) {
    (this.email = email), (this.password = password);
    this.username = username;
    this.token = token;
    this.followers = followers;
    this.following = following;
  }
}

module.exports = UserModel;
