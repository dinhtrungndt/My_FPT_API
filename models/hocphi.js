const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const hocphi = new Schema(
  {
    id: { type: ObjectId }, //khóa chính
    name: { type: String, required: true },
    hocPhi: { type: String, required: true },
    idCate: { type: ObjectId, required: true },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.models.hocphi || mongoose.model("hocphi", hocphi);
