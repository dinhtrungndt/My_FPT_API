const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// POST tin tức
const news = new Schema(
  {
    id: { type: ObjectId }, //khóa chính
    title: { type: String, required: true },
    content: { type: String, required: true },
    img: { type: String, required: true },
    date: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.models.news || mongoose.model("news", news);
