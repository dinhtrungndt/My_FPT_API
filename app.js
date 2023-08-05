var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// mongoose
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("./models/login");
require("./models/testschedule");
require("./models/typesubject");
require("./models/subject");
require("./models/news");
require("./models/schedule");
require("./models/noibat");
require("./models/bangdiem");
require("./models/lichsu");
require("./models/hocphi");
require("./models/khenthuong");
require("./models/diendan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/login");
var testscheduleRouter = require("./routes/testschedule");
var typeSubjectRouter = require("./routes/typesubject");
var subjectRouter = require("./routes/subject");
var newsRouter = require("./routes/news");
var scheduleRouter = require("./routes/schedule");
var noibatRouter = require("./routes/noibat");
var bangdiemRouter = require("./routes/bangdiem");
var lichsuRouter = require("./routes/lichsu");
var hocphiRouter = require("./routes/hocphi");
var khenthuongRouter = require("./routes/khenthuong");
var diendanRouter = require("./routes/diendan");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Sử dụng body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//connect database
mongoose
  .connect("https://my-fpt.onrender.com", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(">>>>>>>>>> DB Connected!!!!!!"));

// Continue with the rest of your code...

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/testschedule", testscheduleRouter);
app.use("/typesubject", typeSubjectRouter);
app.use("/subject", subjectRouter);
app.use("/news", newsRouter);
app.use("/schedule", scheduleRouter);
app.use("/noibat", noibatRouter);
app.use("/bangdiem", bangdiemRouter);
app.use("/lichsu", lichsuRouter);
app.use("/hocphi", hocphiRouter);
app.use("/khenthuong", khenthuongRouter);
app.use("/diendan", diendanRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
