const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// POST Lịch học
const schedule = new Schema(
  {
    id: { type: ObjectId }, //khóa chính
    idCate: { type: ObjectId, ref: "subject" },
    ngayHoc: { type: String, required: true },
    diaDiem: { type: String, required: true },
    Ca: { type: String, required: true },
    username: {
      id: { type: ObjectId, ref: "login" },
      email: { type: String, required: true },
    },
  },
  {
    versionKey: false,
  }
);

module.exports =
  mongoose.models.schedule || mongoose.model("schedule", schedule);
