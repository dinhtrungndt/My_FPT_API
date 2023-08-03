const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const lichsu = new Schema(
  {
    id: { type: ObjectId }, //khóa chính
    ki: { type: String, required: true },
    name: { type: String, required: true },
    status: { type: String, required: true },
    idCate: { type: ObjectId, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.models.lichsu || mongoose.model("lichsu", lichsu);
