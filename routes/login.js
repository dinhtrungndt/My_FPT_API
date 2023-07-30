var express = require("express");
var router = express.Router();
var modelLogin = require("../models/login");
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// lấy danh sách đăng nhập
//http://localhost:3000/login/get-login
router.get("/get-login", async function (req, res, next) {
  var data = await modelLogin.find();
  res.json(data);
});

//http://localhost:3000/login
// Đăng nhập
router.post("/", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    // Tìm người dùng trong cơ sở dữ liệu dựa trên email
    const user = await modelLogin.findOne({ email });

    if (!user) {
      return res.json({ status: 0, message: "Người dùng không tồn tại" });
    }

    // So sánh mật khẩu đã nhập với mật khẩu đã lưu trong cơ sở dữ liệu
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.json({ status: 0, message: "Mật khẩu không chính xác" });
    }

    // Tạo token xác thực
    const token = jwt.sign({ userId: user._id }, "your_secret_key");
    res.json({
      status: 1,
      message: "Đăng nhập thành công",
      user: {
        id: user._id,
        email: user.email,
        password: user.password,
        name: user.name,
        sbd: user.sbd,
        img: user.img,
      },
      token: token,
    });
  } catch (err) {
    res.json({ status: 0, message: "Đăng nhập thất bại" });
  }
});

// Thêm người dùng
//http://localhost:3000/login/add-login
router.post("/add-login", async function (req, res, next) {
  try {
    const { name, email, sbd, password } = req.body;
    console.log(req.body);

    // kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu hay không
    const exitstingUser = await modelLogin.findOne({ email });

    if (exitstingUser) {
      return res.json({ status: 0, message: "Email đã tồn tại" });
    }

    // Hash mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(password, 10);

    // tạo model
    const Data = {
      name,
      email,
      sbd,
      password: hashedPassword,
      img: "",
    };

    await modelLogin.create(Data);
    res.json({ status: 1, message: "Đăng ký thành công", Data });
  } catch (err) {
    console.error(err); // Ghi log lỗi cho mục đích gỡ lỗi
    res.json({ status: 0, message: "Đăng ký thất bại", error: err.message });
  }
});

// Xóa người dùng
//http://localhost:3000/login/delete-login
router.delete("/delete-login", async function (req, res, next) {
  try {
    const { id } = req.body;
    console.log(req.body);

    await modelLogin.findByIdAndDelete(id);

    res.json({ status: 1, message: "Xóa thành công" });
  } catch (err) {
    res.json({ status: 0, message: "Xóa thất bại" });
  }
});

// Cập nhập người dùng
//http://localhost:3000/login/update-login/:id
router.put("/update-login/:id", async function (req, res, next) {
  try {
    const { id } = req.params;

    // kiểm tra xem id có đúng định dạng ObjectID hay không
    if (!mongoose.isValidObjectId(id)) {
      return res.json({ status: 0, message: "Id không hợp lệ" });
    }

    // Tìm người dùng trong cơ sở dữ liệu dựa trên id
    const user = await modelLogin.findById(id);
    if (!user) {
      return res.json({ status: 0, message: "Người dùng không tồn tại" });
    }

    // Các bước cập nhập thông tin người dùng
    const { name, email, sbd, password, img } = req.body;

    // Cập nhập trường Name nếu có tồn tại trong yếu cầu
    if (name) {
      user.name = name;
    }

    user.email = email || user.email;
    user.sbd = sbd || user.sbd;
    user.img = img || user.img;

    // Hash mật khẩu trước khi cập nhập (nếu có)
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();
    res.json({ status: 1, message: "Cập nhập thành công", Data: user });
  } catch (err) {
    console.error(err); // Ghi log lỗi cho mục đích gỡ lỗi
    res.json({ status: 0, message: "Cập nhật thất bại", error: err.message });
  }
});

module.exports = router;
