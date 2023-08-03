var express = require("express");
var router = express.Router();
var modelTestschedule = require("../models/testschedule");

//http://localhost:3000/testschedule
router.get("/", async function (req, res, next) {
  var data = await modelTestschedule.find();
  res.json({ data });
});

// thêm danh sách testschedule
// http://localhost:3000/testschedule/add-testschedule
router.post("/add-testschedule", async function (req, res, next) {
  try {
    const {
      idCate,
      timeStart,
      timeEnd,
      ngayThi,
      diaDiem,
      ca,
      username,
      Gv,
      name,
    } = req.body;
    console.log(req.body);

    // tạo model
    const Data = {
      idCate,
      timeStart,
      timeEnd,
      ngayThi,
      diaDiem,
      ca,
      username,
      Gv,
      name,
    };

    await modelTestschedule.create(Data);

    res.json({ status: 1, message: "Thêm mới thành công", Data });
  } catch (err) {
    console.error("Error while adding new testschedule:", err);
    res
      .status(500)
      .json({ error: "Failed to add new testschedule", message: err.errors });
  }
});

// Xóa testschedule
//http://localhost:3000/testschedule/delete-testschedule

router.delete("/delete-testschedule", async function (req, res, next) {
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

// Cập nhập lịch thi
//http://localhost:3000/testschedule/update-testschedule
router.put("/update-testschedule", async function (req, res, next) {
  try {
    const {
      id,
      idCate,
      timeStart,
      timeEnd,
      ngayThi,
      diaDiem,
      ca,
      username,
      Gv,
      name,
    } = req.body;
    console.log(req.body);

    // tạo model
    const Data = {
      id,
      idCate,
      timeStart,
      timeEnd,
      ngayThi,
      diaDiem,
      ca,
      username,
      Gv,
      name,
    };

    await modelTestschedule.updateOne({ _id: id }, Data);

    res.json({ status: 1, message: "Cập nhập thành công", data: Data });
  } catch (err) {
    console.error("Error while updating testschedule:", err);
    res
      .status(500)
      .json({ error: "Failed to update testschedule", message: err.errors });
  }
});

module.exports = router;
