var express = require("express");
var router = express.Router();
var modelLichSu = require("../models/lichsu");

// lấy danh sách bảng điểm
// http://localhost:3000/lichsu
router.get("/", async function (req, res, next) {
  var data = await modelLichSu.find();
  res.json({ data });
});

// Thêm bảng điểm
// http://localhost:3000/lichsu/add-lichsu
router.post("/add-lichsu", async function (req, res, next) {
  try {
    const { name, ki, status, idCate } = req.body;

    // Tạo model
    const Data = { name, ki, status, idCate };

    await modelLichSu.create(Data);

    res.json({ status: 1, message: "Thêm mới thành công", Data });
  } catch (err) {
    res.json({ status: 0, message: "Thêm mới thất bại" });
  }
});

// Xóa bảng điểm
// http://localhost:3000/lichsu/delete-lichsu
router.delete("/delete-lichsu", async function (req, res, next) {
  try {
    const { id } = req.body;
    await modelLichSu.findByIdAndDelete(id);
    res.json({ status: 1, message: "Xóa thành công" });
  } catch (err) {
    res.json({ status: 0, message: "Xóa thất bại" });
  }
});

module.exports = router;
