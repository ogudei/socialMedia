const postSchema = require("../schemas/post").posts;
const Types = require("mongoose").Types;
const orm = require("../orm/methods");
const toHex = require("../utils/toHex").toHex;
async function posts(userId, status) {
  let queryResult = await orm.findOneBySchema("userSchema", "_id", userId);
  let followers = Array.from(queryResult.followers);

  let result = await postSchema
    .find()
    .or([{ userId: { $in: followers } }, { userId: userId }])
    .and([{ status: status }]);
  let posts = [];

  result.forEach((element) => {
    posts.push({
      username: element._doc.username,
      title: element._doc.title,
      post: element._doc.post,
      createdAt: element._doc.createdAt,
    });
  });
  return posts;
}
async function ownPosts(userId, status) {
  let result = await postSchema
    .find()
    .and([{ userId: userId },{ status: status }]);
  let posts = [];

  result.forEach((element) => {
    posts.push({
      username: element._doc.username,
      title: element._doc.title,
      post: element._doc.post,
      createdAt: element._doc.createdAt,
    });
  });
  return posts;
}

module.exports = { posts,ownPosts };
