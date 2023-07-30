const express = require("express");
const router = express.Router();
const modelNoiBat = require("../models/noibat");
const multer = require("multer");
const cloudinary = require("cloudinary");

//http://localhost:3000/noibat
// Lấy danh sách nổi bật
router.get("/", async function (req, res, next) {
  var data = await modelNoiBat.find();
  res.json({ data });
});

//http://localhost:3000/noibat/add-noibat
// Thêm nổi bật
router.post("/add-noibat", async function (req, res, next) {
  try {
    const { title, content, img, date, dress } = req.body;
    console.log(req.body);

    // tạo model
    const Data = { title, content, img, date, dress };

    await modelNoiBat.create(Data);

    res.json({ status: 1, message: "Thêm mới thành công", Data });
  } catch (err) {
    res.json({ status: 0, message: "Thêm mới thất bại" });
  }
});

// xóa nổi bật
//http://localhost:3000/noibat/delete-noibat
router.delete("/delete-noibat", async function (req, res, next) {
  try {
    const { id } = req.body;
    console.log(req.body);

    await modelNoiBat.findByIdAndDelete(id);

    res.json({ status: 1, message: "Xóa thành công" });
  } catch (err) {
    res.json({ status: 0, message: "Xóa thất bại" });
  }
});

// cập nhập nổi bật
//http://localhost:3000/noibat/update-noibat
router.put("/update-noibat", async function (req, res, next) {
  try {
    const { id, title, content, img, date, dress } = req.body;
    console.log(req.body);

    await modelNoiBat.findByIdAndUpdate(id, {
      title,
      content,
      img,
      date,
      dress,
    });

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
// http://localhost:3000/noibat/upload-img-noibat
router.post(
  "/upload-img-noibat",
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
// http://localhost:3000/noibat/get-noibat-by-id/:id
router.get("/get-noibat-by-id/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const data = await modelNoiBat.findById(id);
    res.json({ status: 1, data });
  } catch (err) {
    console.error("Lỗi khi lấy chi tiết bài viết:", err);
    res.json({ status: 0, message: "Đã xảy ra lỗi khi lấy chi tiết bài viết" });
  }
});

module.exports = router;
