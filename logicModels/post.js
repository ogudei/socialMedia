class PostModel {
    constructor(
        userId  = null,
        title=null,
        post=null
       
    ) {
      this.userId  = userId,
      this.title=title
      this.post=post
    }
  }
  
  module.exports = PostModel;