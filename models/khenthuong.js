const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const khenthuong = new Schema(
  {
    id: { type: ObjectId }, //khóa chính
    name: { type: String, required: true },
    khenthuong: { type: String, required: true },
    idCate: { type: ObjectId, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports =
  mongoose.models.khenthuong || mongoose.model("khenthuong", khenthuong);
