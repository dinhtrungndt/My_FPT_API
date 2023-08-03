var express = require("express");
var router = express.Router();
var modelDienDan = require("../models/diendan");

// lấy danh sách diễn đàn
// http://localhost:3000/diendan
router.get("/", async (req, res) => {
  const data = await modelDienDan.find();
  res.json({ data });
});

// thêm danh sách diễn đàn
// http://localhost:3000/diendan/add-dien-dan
router.post("/add-dien-dan", async (req, res) => {
  try {
    const { avatar, name, date, website, title, image, like, comment } =
      req.body;
    console.log(req.body); // sửa thành console.log

    // tạo model
    const Data = {
      avatar,
      name,
      date,
      website,
      title,
      image,
      like,
      comment,
    };
    const diendan = await modelDienDan.create(Data);
    res.json(diendan);
  } catch (error) {
    res.json({ message: error });
  }
});

// Tăng số lượng like
// http://localhost:3000/diendan/like/:postId
router.post("/like/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await diendanModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Bài viết không tồn tại" });
    }
    post.like = (parseInt(post.like) + 1).toString();
    await post.save();
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
});

// Giảm số lượng like
// http://localhost:3000/diendan/unlike/:postId
router.post("/unlike/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await diendanModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Bài viết không tồn tại" });
    }
    post.like = (parseInt(post.like) - 1).toString();
    await post.save();
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
});

// xóa danh sách diễn đàn
// http://localhost:3000/diendan/delete-dien-dan
router.delete("/delete-dien-dan/:id", async (req, res) => {
  const { id } = req.params;
  const diendan = await modelDienDan.findByIdAndDelete(id);
  res.json(diendan);
});

// sửa danh sách diễn đàn
// http://localhost:3000/diendan/update-dien-dan
router.put("/update-dien-dan/:id", async (req, res) => {
  const { id } = req.params;
  const { avatar, name, date, website, title, image, like, comment } = req.body;

  const Data = {
    avatar,
    name,
    date,
    website,
    title,
    image,
    like,
    comment,
  };
  const diendan = await modelDienDan.findByIdAndUpdate(id, Data);
  res.json(diendan);
});

module.exports = router;
