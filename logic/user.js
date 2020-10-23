const NotificationType = require("../constants/notificationType");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const orm = require("../orm/methods");
const followingOperations = require("../models/followingOperations");
const tokenGenerator = require("hiz").objectId;
const postOperations = require("../models/postOperations");
const { userSchema } = require("../orm/schemas");

async function signIn(userReq) {
  let isAuthenticated = false;
  let user = await orm.findOneBySchema("userSchema", "email", userReq.email);
  if (!user) {
    return {
      value: {},
      result: NotificationType.INFO,
    };
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
      let token = tokenGenerator();
      let updateResult = await orm.findOneAndUpdateBySchema(
        "userSchema",
        { _id: user._id },
        { token: token }
      );
      if (updateResult) {
        return {
          value: user._id + "." + token,
          result: NotificationType.SUCCESS,
        };
      } else
        return {
          value: {},
          result: NotificationType.ERROR,
        };
    } else {
      return {
        value: {},
        result: NotificationType.WARNING,
      };
    }
  }
}

async function signUp(userReq) {
  let user = null;
  user = await orm.findOneBySchema("userSchema", "email", userReq.email);
  if (user) {
    return {
      value: {},
      result: NotificationType.INFO,
    };
  } else {
    user = await orm.findOneBySchema("userSchema", "username", userReq.email);
    if (user) {
      return {
        value: {},
        result: NotificationType.INFO,
      };
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
    userReq.token = tokenGenerator();
    let result = await orm.createBySchema("userSchema", userReq);
    if (result._doc) {
      return {
        value: result._id + "." + userReq.token,
        result: NotificationType.SUCCESS,
      };
    } else
      return {
        value: {},
        result: NotificationType.ERROR,
      };
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

async function follow(userId, followedUserId) {
  let followResult = await followingOperations.follow(userId, followedUserId);
  if (followResult) {
    return NotificationType.SUCCESS;
  } else if (followResult === false) {
    return NotificationType.INFO;
  } else return NotificationType.WARNING;
}

async function unfollow(userId, unfollowedUserId) {
  let unFollowResult = await followingOperations.unfollow(
    userId,
    unfollowedUserId
  );
  if (unFollowResult) {
    return NotificationType.SUCCESS;
  } else if (unFollowResult === false) {
    return NotificationType.INFO;
  } else return NotificationType.WARNING;
}

async function following(userId) {
  let result = await orm.findOneFieldBySchema(
    "userSchema",
    "_id",
    userId,
    "following"
  );
  if (result.following.length > 0) {
    let followingArray = await orm.findFieldBySchema("userSchema", "_id", {
      $in: result.following,
    });
    let users=[]
    followingArray.forEach((element) => {
      users.push({
        username: element._doc.username,
        _id: element._doc._id,
      });
    });
    return await followingArray;
  } else {
    return [];
  }
}

async function followers(userId) {
  let result = await orm.findOneFieldBySchema(
    "userSchema",
    "_id",
    userId,
    "followers"
  );
  if (result.followers.length > 0) {
    let followersArray = await orm.findFieldBySchema("userSchema", "_id", {
      $in: result.followers,
    });
    let users=[]
    followersArray.forEach((element) => {
      users.push({
        username: element._doc.username,
        _id: element._doc._id,
      });
    });
    return await users;
  } else {
    return [];
  }
}

async function whoToFollow(userId) {
  let queryResult = await orm.findOneBySchema("userSchema", "_id", userId);
  let following = Array.from(queryResult.following);

  let results = await userSchema
    .find()
    .and([
      { _id: { $nin: following } },
      { _id: { $ne: userId } },
      { isActive: true },
    ]);
  let users = [];

  results.forEach((element) => {
    users.push({
      username: element._doc.username,
      _id: element._doc._id,
    });
  });

  return {
    value: users,
    result: NotificationType.SUCCESS,
  };
}

async function me(userId) {
  let me = await orm.findOneBySchema("userSchema", "_id", userId);
  if (me._doc) {
    let ownPosts = await postOperations.ownPosts(userId, "public");
    let followersArray = await followers(userId);
    let followingArray = await following(userId);
    return {
      value: {
        profile: {
          information: me._doc,
          followers: followersArray,
          following: followingArray,
        },
        posts: ownPosts,
      },
      result: NotificationType.SUCCESS,
    };
  } else {
    return {
      value: {},
      result: NotificationType.INFO,
    };
  }
}

module.exports = {
  findUserById,
  switchUserActivity,
  signIn,
  signUp,
  follow,
  unfollow,
  following,
  followers,
  whoToFollow,
  me,
};
