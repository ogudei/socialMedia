const orm = require("../orm/methods");

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
  return await orm.findOneAndUpdateBySchema(
    "postSchema",
    { _id: id },
    { status: status }
  );
}
module.exports = {
  searchPostByTitle,
  createPost,
  switchPostActivity,
  switchPostStatus,
};
