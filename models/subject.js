const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// POST môn học
const subject = new Schema(
  {
    id: { type: ObjectId }, // khóa chính
    title: { type: String, required: true },
    lop: { type: String, required: true },
    GV: { type: String, required: true },
    room: { type: String, required: true },
    timeStart: { type: String, required: true },
    timeEnd: { type: String, required: true },
    idCate: { type: ObjectId, ref: "typesubject" }, // khóa ngoại
    ngayHoc: { type: Date, required: true }, // Thêm trường ngayHoc kiểu Date để lưu thông tin về ngày học
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.models.subject || mongoose.model("subject", subject);
