var express = require("express");
var router = express.Router();
var modelSubject = require("../models/subject");

// Lấy danh sách môn học
router.get("/", async function (req, res, next) {
  var data = await modelSubject.find();
  res.json({ data });
});

// Thêm môn học
router.post("/add-subject", async function (req, res, next) {
  try {
    const { title, GV, room, lop, timeStart, timeEnd, idCate, ngayHoc } =
      req.body;

    // Tạo model
    const Data = { title, GV, room, lop, timeStart, timeEnd, idCate, ngayHoc };

    await modelSubject.create(Data);

    res.json({ status: 1, message: "Thêm mới thành công", Data });
  } catch (err) {
    res.json({ status: 0, message: "Thêm mới thất bại" });
  }
});

// Xóa môn học
router.delete("/delete-subject", async function (req, res, next) {
  try {
    const { id } = req.body;
    await modelSubject.findByIdAndDelete(id);
    res.json({ status: 1, message: "Xóa thành công" });
  } catch (err) {
    res.json({ status: 0, message: "Xóa thất bại" });
  }
});

// Cập nhật môn học
router.put("/update-subject", async function (req, res, next) {
  try {
    const { id, title, GV, room, lop, timeStart, timeEnd, idCate, ngayHoc } =
      req.body;

    await modelSubject.findByIdAndUpdate(id, {
      title,
      GV,
      room,
      timeStart,
      timeEnd,
      idCate,
      ngayHoc, // Thêm thông tin về ngày học vào cơ sở dữ liệu khi cập nhật môn học
    });

    res.json({ status: 1, message: "Cập nhập thành công" });
  } catch (err) {
    res.json({ status: 0, message: "Cập nhập thất bại" });
  }
});

// Lấy danh sách lịch học theo khóa ngoại idCate
router.get("/get-subject-by-idCate", async function (req, res, next) {
  try {
    const { idCate } = req.query;
    const data = await modelSubject.find({ idCate });
    res.json({ data });
  } catch (err) {
    res.json({ status: 0, message: "Lấy danh sách lịch học thất bại" });
  }
});

module.exports = router;
