var express = require("express");
var router = express.Router();
var modelSchedule = require("../models/schedule");

//http://localhost:3000/schedule
// Lấy danh sách lịch học
router.get("/", async function (req, res, next) {
  var data = await modelSchedule.find();
  res.json({ data });
});

//http://localhost:3000/schedule/add-schedule
// Thêm lịch học
router.post("/add-schedule", async function (req, res, next) {
  try {
    const { idCate, ngayHoc, diaDiem, Ca, username } = req.body;
    console.log(req.body);

    // tạo model
    const Data = { idCate, ngayHoc, diaDiem, Ca, username };

    await modelSchedule.create(Data);

    res.json({ status: 1, message: "Thêm mới thành công", Data });
  } catch (err) {
    res.json({ status: 0, message: "Thêm mới thất bại" });
  }
});

// Xóa lịch học
//http://localhost:3000/schedule/delete-schedule
router.delete("/delete-schedule", async function (req, res, next) {
  try {
    const { id } = req.body;
    console.log(req.body);

    await modelSchedule.findByIdAndDelete(id);

    res.json({ status: 1, message: "Xóa thành công" });
  } catch (err) {
    res.json({ status: 0, message: "Xóa thất bại" });
  }
});

// cập nhập lịch học
//http://localhost:3000/schedule/update-schedule
router.put("/update-schedule", async function (req, res, next) {
  try {
    const { id, idCate, ngayHoc, diaDiem, Ca, username } = req.body;
    console.log(req.body);

    await modelSchedule.findByIdAndUpdate(id, {
      idCate,
      ngayHoc,
      diaDiem,
      Ca,
      username,
    });

    res.json({ status: 1, message: "Cập nhập thành công" });
  } catch (err) {
    res.json({ status: 0, message: "Cập nhập thất bại" });
  }
});

module.exports = router;
