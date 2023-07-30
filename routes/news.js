const express = require("express");
const router = express.Router();
const modelNews = require("../models/news");
const multer = require("multer");
const cloudinary = require("cloudinary");

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
    const { title, content, img, date, dress } = req.body;
    console.log(req.body);

    // tạo model
    const Data = { title, content, img, date, dress };

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
    const { id, title, content, img, date, dress } = req.body;
    console.log(req.body);

    await modelNews.findByIdAndUpdate(id, { title, content, img, date, dress });

    res.json({ status: 1, message: "Cập nhập thành công" });
  } catch (err) {
    res.json({ status: 0, message: "Cập nhập thất bại" });
  }
});

// Cấu hình Cloudinary
cloudinary.v2.config({
  cloud_name: "dqo8whkdr",
  api_key: "217742758864799",
  api_secret: "WsiHN2cYF97vPkTKHbG1YoBwtTM",
  secure: true,
});

// Sử dụng Multer để xử lý upload file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  },
});

// Upload ảnh
// http://localhost:3000/news/upload-img-news
router.post(
  "/upload-img-news",
  upload.single("skst"),
  async (req, res, next) => {
    try {
      const { file } = req;
      if (!file) {
        return res.json({ status: 0, url: "" });
      } else {
        // Upload ảnh lên Cloudinary
        const result = await cloudinary.uploader.upload(file.path);
        const imageUrl = result.secure_url;

        // Sau khi đã upload lên Cloudinary, có thể xóa tệp tạm trên máy chủ
        // fs.unlinkSync(file.path);

        return res.json({ status: 1, url: imageUrl });
      }
    } catch (error) {
      console.log("Upload image error: ", error);
      return res.json({ status: 0, url: "" });
    }
  }
);

// Lấy chi tiết một bài viết
// http://localhost:3000/news/get-news-by-id/:id
router.get("/get-news-by-id/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const data = await modelNews.findById(id);
    res.json({ status: 1, data });
  } catch (err) {
    console.error("Lỗi khi lấy chi tiết bài viết:", err);
    res.json({ status: 0, message: "Đã xảy ra lỗi khi lấy chi tiết bài viết" });
  }
});

module.exports = router;
