const orm = require("../orm/methods");
const tokenGenerator = require("hiz").objectId;
async function create(user) {
  user.token = tokenGenerator();
  return await orm.createBySchema("userSchema", user);
}
async function updateToken(userId) {
  let token = userId + tokenGenerator();
  return await orm.findOneAndUpdateBySchema(
    "userSchema",
    { _id: userId },
    { token: token }
  );
}

module.exports = { create, updateToken };
