var express = require("express");
var router = express.Router();
var modelNews = require("../models/news");

//http://localhost:3000/news
// Lấy danh sách tin tức
router.get("/", async function (req, res, next) {
  var data = await modelNews.find();
  res.json({ data });
});

//http://localhost:3000/news/add-news
// Thêm tin tức
router.post("/add-news", async function (req, res, next) {
  try {
    const { title, content, img, date } = req.body;
    console.log(req.body);

    // tạo model
    const Data = { title, content, img, date };

    await modelNews.create(Data);

    res.json({ status: 1, message: "Thêm mới thành công", Data });
  } catch (err) {
    res.json({ status: 0, message: "Thêm mới thất bại" });
  }
});

// xóa tin tức
//http://localhost:3000/news/delete-news
router.delete("/delete-news", async function (req, res, next) {
  try {
    const { id } = req.body;
    console.log(req.body);

    await modelNews.findByIdAndDelete(id);

    res.json({ status: 1, message: "Xóa thành công" });
  } catch (err) {
    res.json({ status: 0, message: "Xóa thất bại" });
  }
});

// cập nhập tin tức
//http://localhost:3000/news/update-news
router.put("/update-news", async function (req, res, next) {
  try {
    const { id, title, content, img, date } = req.body;
    console.log(req.body);

    await modelNews.findByIdAndUpdate(id, { title, content, img, date });

    res.json({ status: 1, message: "Cập nhập thành công" });
  } catch (err) {
    res.json({ status: 0, message: "Cập nhập thất bại" });
  }
});

module.exports = router;
