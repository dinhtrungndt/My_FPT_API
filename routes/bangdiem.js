var express = require("express");
var router = express.Router();
var modelBangdiem = require("../models/bangdiem");

// lấy danh sách bảng điểm
// http://localhost:3000/bangdiem
router.get("/", async function (req, res, next) {
  var data = await modelBangdiem.find();
  res.json({ data });
});

// Thêm bảng điểm
// http://localhost:3000/bangdiem/add-bangdiem
router.post("/add-bangdiem", async function (req, res, next) {
  try {
    const { name, dtb, status, idCate } = req.body;

    // Tạo model
    const Data = { name, dtb, status, idCate };

    await modelBangdiem.create(Data);

    res.json({ status: 1, message: "Thêm mới thành công", Data });
  } catch (err) {
    res.json({ status: 0, message: "Thêm mới thất bại" });
  }
});

// Xóa bảng điểm
// http://localhost:3000/bangdiem/delete-bangdiem
router.delete("/delete-bangdiem", async function (req, res, next) {
  try {
    const { id } = req.body;
    await modelBangdiem.findByIdAndDelete(id);
    res.json({ status: 1, message: "Xóa thành công" });
  } catch (err) {
    res.json({ status: 0, message: "Xóa thất bại" });
  }
});

module.exports = router;
