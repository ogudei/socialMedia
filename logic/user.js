const NotificationType = require("../constants/notificationType");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const orm = require("../orm/methods");

const tokenCreator = require("hiz").objectId;

async function signIn(userReq) {
  let isAuthenticated = false;
  let user = await orm.findOneBySchema("userSchema", "email", userReq.email);
  if (!user) {
    return NotificationType.WARNING;
  } else {
    isAuthenticated = await bcrypt
      .compare(userReq.password, user.password)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
    if (isAuthenticated) {
      let updateResult = await orm.findOneAndUpdateBySchema(
        "userSchema",
        { _id: user._id },
        { token: user._id + tokenCreator() }
      );
      if (updateResult) {
        return NotificationType.SUCCESS;
      } else NotificationType.WARNING;
    } else {
      return NotificationType.WARNING;
    }
  }
}

async function signUp(userReq) {
  let user = null;
  user = await orm.findOneBySchema("userSchema", "email", userReq.email);
  if (user) {
    return NotificationType.INFO;
  } else {
    user = await orm.findOneBySchema("userSchema", "username", userReq.email);
    if (user) {
      return NotificationType.INFO;
    }
    let password = await bcrypt
      .hash(userReq.password, saltRounds)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
    userReq.password = password;
    let result = await orm.createBySchema("userSchema", userReq);
    if (result._doc) {
      return NotificationType.SUCCESS;
    } else return NotificationType.WARNING;
  }
}

function findUserById(id) {
  return orm.findOneBySchema("userSchema", "_id", id);
}
function switchUserActivity(id, isActive) {
  return orm.findOneAndUpdateBySchema(
    "userSchema",
    { _id: id },
    { isActive: isActive }
  );
}

module.exports = {
  findUserById,
  switchUserActivity,
  signIn,
  signUp,
};
