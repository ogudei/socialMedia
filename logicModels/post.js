class PostModel {
  constructor(
    userId = null,
    username = null,
    title = null,
    post = null,
    status = null,
    isActive = null
  ) {
    (this.userId = userId), (this.username = username), (this.title = title);
    this.post = post;
    this.status = status;
    this.isActive = isActive;
  }
}

module.exports = PostModel;
