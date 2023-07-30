const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// POST môn học
const subject = new Schema(
  {
    id: { type: ObjectId }, // khóa chính
    name: { type: String, required: true },
    GV: { type: String, required: true },
    room: { type: String, required: true },
    time: { type: String, required: true },
    idCate: { type: ObjectId, ref: "typesubject" }, // khóa ngoại
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.models.subject || mongoose.model("subject", subject);
