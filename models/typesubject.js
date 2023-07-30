const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const typesubject = new Schema(
  {
    id: { type: ObjectId }, // khóa chính
    name: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);
module.exports =
  mongoose.models.typesubject || mongoose.model("typesubject", typesubject);
