const orm = require("../../orm/methods");

const userAuthLayer = async function (req, res, next) {
  try {
    var token = req.header("UserAuth").split(".");
    var id = token[0];
    var tokenAuth = token[1];

    var obj = await orm.findOneBySchema("userSchema", "_id", id);
    if (obj.token == tokenAuth) {
      req.id = obj._id;
      req.user = obj._doc;
      console.log("User Auth Layer => Giriş Yaptı");
      next();
    } else {
      res.status(401).end();
    }
  } catch (e) {
    res.status(401).end();
  }
};

module.exports = {
  userAuthLayer,
};
