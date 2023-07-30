const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// POST đăng nhập
const login = new Schema(
  {
    id: { type: ObjectId }, //khóa chính
    name: { type: String, required: true },
    sbd: { type: String, required: true },
    email: {
      type: String,
      required: true,
      trim: true,
      match: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    },
    password: { type: String, required: true },
    img: { type: String },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.models.login || mongoose.model("login", login);
