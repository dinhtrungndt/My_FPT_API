var express = require("express");
var router = express.Router();
var modelSubject = require("../models/subject");

//http://localhost:3000/subject
// lấy danh sách môn học
router.get("/", async function (req, res, next) {
  var data = await modelSubject.find();
  res.json({ data });
});

// Thêm môn học
//http://localhost:3000/subject/add-subject
router.post("/add-subject", async function (req, res, next) {
  try {
    const { name, GV, room, time, idCate } = req.body;
    console.log(req.body);

    // tạo model
    const Data = { name, GV, room, time, idCate };

    await modelSubject.create(Data);

    res.json({ status: 1, message: "Thêm mới thành công", Data });
  } catch (err) {
    res.json({ status: 0, message: "Thêm mới thất bại" });
  }
});

// xóa môn học
//http://localhost:3000/subject/delete-subject
router.delete("/delete-subject", async function (req, res, next) {
  try {
    const { id } = req.body;
    console.log(req.body);

    await modelSubject.findByIdAndDelete(id);

    res.json({ status: 1, message: "Xóa thành công" });
  } catch (err) {
    res.json({ status: 0, message: "Xóa thất bại" });
  }
});

// cập nhập môn học
//http://localhost:3000/subject/update-subject
router.put("/update-subject", async function (req, res, next) {
  try {
    const { id, name, GV, room, time, idCate } = req.body;
    console.log(req.body);

    await modelSubject.findByIdAndUpdate(id, { name, GV, room, time, idCate });

    res.json({ status: 1, message: "Cập nhập thành công" });
  } catch (err) {
    res.json({ status: 0, message: "Cập nhập thất bại" });
  }
});

module.exports = router;
