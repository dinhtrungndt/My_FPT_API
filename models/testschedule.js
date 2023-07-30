const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const testschedule = new Schema(
  {
    id: { type: ObjectId }, // khóa chính
    idCate: { type: ObjectId, ref: "login" }, // khóa ngoại
    ngayHoc: { type: String, required: true },
    diaDiem: { type: String, required: true },
    username: {
      id: { type: ObjectId, ref: "login" },
      email: { type: String, required: true },
    },
    ca: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);
module.exports =
  mongoose.models.testschedule || mongoose.model("testschedule", testschedule);
