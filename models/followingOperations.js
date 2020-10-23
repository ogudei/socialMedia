const userSchema = require("../schemas/user").users;
const Types = require("mongoose").Types;

async function follow(userId, followedUserId) {
  if (userId === followedUserId) {
    return false;
  } else {
    //Kullanıcının olup olmadığı kontrol edilecek
    let bulk = userSchema.collection.initializeUnorderedBulkOp();

    bulk
      .find({ _id: Types.ObjectId(userId) })
      .upsert()
      .updateOne({
        $addToSet: {
          following: Types.ObjectId(followedUserId),
        },
      });
    bulk
      .find({ _id: Types.ObjectId(followedUserId) })
      .upsert()
      .updateOne({
        $addToSet: {
          followers: Types.ObjectId(userId),
        },
      });

    return await bulk
      .execute()
      .then((doc) => {
        return doc;
      })
      .catch((err) => {
        throw err;
      });
  }
}

async function unfollow(userId, unFollowedUserId) {
  if (userId === Types.ObjectId(unFollowedUserId)) {
    return false;
  } else {
    //Kullanıcının olup olmadığı kontrol edilecek
    let bulk = userSchema.collection.initializeUnorderedBulkOp();

    bulk
      .find({ _id: Types.ObjectId(userId) })
      .upsert()
      .updateOne({
        $pull: {
          following: Types.ObjectId(unFollowedUserId),
        },
      });
    bulk
      .find({ _id: Types.ObjectId(unFollowedUserId) })
      .upsert()
      .updateOne({
        $pull: {
          followers: Types.ObjectId(userId),
        },
      });

    let bulkOpResult = await bulk
      .execute()
      .then((doc) => {
        return doc;
      })
      .catch((err) => {
        throw err;
      });
    if (bulkOpResult) {
      return NotificationType.SUCCESS;
    } else return NotificationType.WARNING;
  }
}

module.exports = { follow, unfollow };
