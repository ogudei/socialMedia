const orm = require("../orm/methods");

async function searchPostByTitle(title) {
  return await orm.findBySchema("postSchema", {}, {});
}

async function createPost(post) {
  let result = await orm.createBySchema("postSchema", post);
  if (result) {
    return NotificationType.SUCCESS;
  } else return NotificationType.WARNING;
}
async function switchPostActivity(id, isActive) {
  return await orm.findOneAndUpdateBySchema(
    "postSchema",
    { _id: id },
    { isActive: isActive }
  );
}
module.exports = {
  searchPostByTitle,
  createPost,
  switchPostActivity,
};
