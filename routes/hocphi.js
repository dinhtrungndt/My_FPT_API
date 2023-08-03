var express = require("express");
var router = express.Router();
var modelHocPhi = require("../models/hocphi");

//http://localhost:3000/hocphi
router.get("/", async function (req, res, next) {
  var data = await modelHocPhi.find();
  res.json({ data });
});

// thêm danh sách hocphi
// http://localhost:3000/hocphi/add-hocphi
router.post("/add-hocphi", async function (req, res, next) {
  try {
    const { name, hocPhi, idCate } = req.body;
    console.log(req.body);

    // tạo model
    const Data = {
      name,
      hocPhi,
      idCate,
    };

    await modelHocPhi.create(Data);

    res.json({ status: 1, message: "Thêm mới thành công", Data });
  } catch (err) {
    console.error("Error while adding new hocphi:", err);
    res
      .status(500)
      .json({ error: "Failed to add new hocphi", message: err.errors });
  }
});

// Xóa hocphi
//http://localhost:3000/hocphi/delete-hocphi
router.delete("/delete-hocphi", async function (req, res, next) {
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

// Sửa hocphi
//http://localhost:3000/hocphi/update-hocphi
router.put("/update-hocphi", async function (req, res, next) {
  try {
    const { id, name, hocPhi, idCate } = req.body;
    console.log(req.body);

    await modelHocPhi.findByIdAndUpdate(id, { name, hocPhi, idCate });

    res.json({ status: 1, message: "Sửa thành công" });
  } catch (err) {
    console.error("Error while update hocphi:", err);
    res
      .status(500)
      .json({ error: "Failed to update hocphi", message: err.errors });
  }
});

module.exports = router;
