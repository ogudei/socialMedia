const mongoose = require("mongoose");
const users = require("../schemas/user").users;

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const post = new Schema({
  id: ObjectId,
  userId: {
    type: ObjectId,
    ref: users,
  },
  username: {
    type: String,
    ref: users,
  },
  title: {
    type: String,
    required: [true, "Başlık zorunludur."],
  },
  post: {
    type: String,
    required: [true, "Post zorunludur."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: ["private", "public"],
    default: "public",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const posts = mongoose.model("post", post);
module.exports = { posts };
