const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const diendan = new Schema(
  {
    id: { type: ObjectId }, //khóa chính
    avatar: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: String, required: true },
    website: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    like: { type: String, required: true },
    comment: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.models.diendan || mongoose.model("diendan", diendan);
