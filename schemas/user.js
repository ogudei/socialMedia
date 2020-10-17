const mongoose = require("mongoose");
// const objectIdConstructor = require("hiz").objectId;

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const user = new Schema({
  id: ObjectId,
  email: {
    type: String,
    required: [true, "Email zorunludur."],
  },
  username: {
    type: String,
    required: [true, "Kullanıcı adı zorunludur."],
  },
  password: {
    type: String,
    required: [true, "Şifre zorunludur."],
  },
  token: {
    type: String,
  },
  following: Array,
  followers: Array,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
  isActive: Boolean,
});

const users = mongoose.model("user", user);
module.exports = { users };
