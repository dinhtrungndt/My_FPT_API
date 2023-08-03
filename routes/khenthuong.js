var express = require("express");
var router = express.Router();
var modelKhenThuong = require("../models/khenthuong");

//http://localhost:3000/khenthuong
router.get("/", async function (req, res, next) {
  var data = await modelKhenThuong.find();
  res.json({ data });
});

// thêm danh sách khenthuong
// http://localhost:3000/khenthuong/add-khenthuong
router.post("/add-khenthuong", async function (req, res, next) {
  try {
    const { name, khenthuong, idCate } = req.body;
    console.log(req.body);

    // tạo model
    const Data = {
      name,
      khenthuong,
      idCate,
    };

    await modelKhenThuong.create(Data);

    res.json({ status: 1, message: "Thêm mới thành công", Data });
  } catch (err) {
    console.error("Error while adding new khenthuong:", err);
    res
      .status(500)
      .json({ error: "Failed to add new khenthuong", message: err.errors });
  }
});

// Xóa khenthuong
//http://localhost:3000/khenthuong/delete-khenthuong
router.delete("/delete-khenthuong", async function (req, res, next) {
  try {
    const { id } = req.body;
    console.log(req.body);

    await modelTestschedule.findByIdAndDelete(id);

    res.json({ status: 1, message: "Xóa thành công" });
  } catch (err) {
    console.error("Error while delete testschedule:", err);
    res
      .status(500)
      .json({ error: "Failed to delete testschedule", message: err.errors });
  }
});

// Sửa khenthuong
//http://localhost:3000/khenthuong/update-khenthuong
router.put("/update-khenthuong", async function (req, res, next) {
  try {
    const { id, name, khenthuong, idCate } = req.body;
    console.log(req.body);

    await modelKhenThuong.findByIdAndUpdate(id, { name, khenthuong, idCate });

    res.json({ status: 1, message: "Sửa thành công" });
  } catch (err) {
    console.error("Error while update khenthuong:", err);
    res
      .status(500)
      .json({ error: "Failed to update khenthuong", message: err.errors });
  }
});

module.exports = router;
