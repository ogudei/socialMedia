const userSchema = require("../schemas/user").users;

const userAuthLayer=async function (req, res, next) {
    try {
        var token = req.header('UserAuth').split('.')
        var id = token[0]
        var tokenAuth = token[1]

        var obj = await userSchema.findUserById(id)
        if (obj.token == tokenAuth) {
          req.id=obj._id
          console.log("User Auth Layer => Giriş Yaptı")
            next()
        }
        else {
            res.status(401).end()
        }
    }
    catch (e) {
        res.status(401).end()
    }
}

module.exports={
    userAuthLayer
}