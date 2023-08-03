const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const bangdiem = new Schema(
  {
    id: { type: ObjectId }, //khóa chính
    name: { type: String, required: true },
    dtb: { type: String, required: true },
    status: { type: String, required: true },
    idCate: { type: ObjectId, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports =
  mongoose.models.bangdiem || mongoose.model("bangdiem", bangdiem);
