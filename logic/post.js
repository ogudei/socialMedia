const orm = require("../orm/methods");
const NotificationType = require("../constants/notificationType");
const postOperations = require("../models/postOperations");
const { Types } = require("mongoose");

async function searchPostByTitle(title) {
  return await orm.findBySchema("postSchema", {}, {});
}

async function createPost(post) {
  let result = await orm.createBySchema("postSchema", post);
  if (result) {
    return NotificationType.SUCCESS;
  } else return NotificationType.ERROR;
}
async function switchPostActivity(id, isActive) {
  return await orm.findOneAndUpdateBySchema(
    "postSchema",
    { _id: id },
    { isActive: isActive }
  );
}
async function switchPostStatus(id, status) {
  return await orm
    .findOneAndUpdateBySchema(
      "postSchema",
      { _id: Types.ObjectId(id) },
      { status: status }
    )
    .then((data) => {
      if (data._doc) {
        return {
          value: data._doc,
          result: NotificationType.SUCCESS,
        };
      }
      return {
        value: {},
        result: NotificationType.INFO,
      };
    })
    .catch((err) => {
      throw err;
    });
}

async function getPostsByUser(userId, status) {
  let posts = await postOperations.posts(userId, status);
  if (posts.length > 0) {
    return { value: posts, result: NotificationType.SUCCESS };
  } else {
    return { value: [], result: NotificationType.INFO };
  }
}
module.exports = {
  searchPostByTitle,
  createPost,
  switchPostActivity,
  switchPostStatus,
  getPostsByUser,
};
