const postSchema = require("../schemas/post").posts;
const Types = require("mongoose").Types;
const orm = require("../orm/methods");
const toHex = require("../utils/toHex").toHex;
async function posts(userId, status) {
  let queryResult = await orm.findOneBySchema("userSchema", "_id", userId);
  let following = Array.from(queryResult.following);

  let result = await postSchema
    .find()
    .or([{ userId: { $in: following } }, { userId: userId }])
    .and([{ status: status }]);
  let posts = [];

  result.forEach((element) => {
    posts.push({
      _id: element._doc._id,
      username: element._doc.username,
      title: element._doc.title,
      post: element._doc.post,
      createdAt: element._doc.createdAt,
    });
  });
  return posts;
}
async function ownPosts(userId) {
  let result = await postSchema
    .find({ userId: userId })
  let posts = [];

  result.forEach((element) => {
    posts.push({
      _id: element._doc._id,
      username: element._doc.username,
      title: element._doc.title,
      post: element._doc.post,
      createdAt: element._doc.createdAt,
      status: element._doc.status
    });
  });
  return posts;
}

module.exports = { posts,ownPosts };
