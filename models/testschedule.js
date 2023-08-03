const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const testschedule = new Schema(
  {
    id: { type: ObjectId }, // khóa chính
    idCate: { type: ObjectId, ref: "login" }, // khóa ngoại
    timeStart: { type: String, required: true },
    timeEnd: { type: String, required: true },
    ngayThi: { type: String, required: true },
    diaDiem: { type: String, required: true },
    username: { type: ObjectId, ref: "login" },
    ca: { type: Number, required: true },
    Gv: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);
module.exports =
  mongoose.models.testschedule || mongoose.model("testschedule", testschedule);
