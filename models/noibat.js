const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// POST tin tức
const noibat = new Schema(
  {
    id: { type: ObjectId }, //khóa chính
    title: { type: String, required: true },
    content: { type: String, required: true },
    img: { type: String, required: true },
    date: { type: String, required: true },
    dress: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.models.noibat || mongoose.model("noibat", noibat);
