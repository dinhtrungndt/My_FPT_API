var express = require("express");
var router = express.Router();
var modelTypesubject = require("../models/typesubject");

//http://localhost:3000/typesubject
router.get("/", async function (req, res, next) {
  var data = await modelTypesubject.find();
  res.json({ data });
});

// thêm danh sách loại môn học
// http://localhost:3000/typesubject/add-typesubject
router.post("/add-typesubject", async function (req, res, next) {
  try {
    const { name } = req.body;
    console.log(req.body);

    // tạo model
    const Data = { name };

    await modelTypesubject.create(Data);

    res.json({ status: 1, message: "Thêm mới thành công", Data });
  } catch (err) {
    console.error("Error while adding new testschedule:", err);
    res
      .status(500)
      .json({ error: "Failed to add new testschedule", message: err.errors });
  }
});

// xóa danh sách loại môn học
// http://localhost:3000/typesubject/delete-typesubject
router.delete("/delete-typesubject", async function (req, res, next) {
  try {
    const { id } = req.body;
    console.log(req.body);

    await modelTypesubject.findByIdAndDelete(id);

    res.json({ status: 1, message: "Xóa thành công" });
  } catch (err) {
    console.error("Error while delete testschedule:", err);
    res
      .status(500)
      .json({ error: "Failed to delete testschedule", message: err.errors });
  }
});

// cập nhập danh sách loại môn học
// http://localhost:3000/typesubject/update-typesubject
router.put("/update-typesubject", async function (req, res, next) {
  try {
    const { id, name } = req.body;
    console.log(req.body);

    await modelTypesubject.findByIdAndUpdate(id, { name });

    res.json({ status: 1, message: "Cập nhập thành công" });
  } catch (err) {
    console.error("Error while update testschedule:", err);
    res
      .status(500)
      .json({ error: "Failed to update testschedule", message: err.errors });
  }
});

module.exports = router;
