var createError = require("http-errors");
var express = require("express");
var path = require("path");
// 解析cookie
var cookieParser = require("cookie-parser");
// 生成日志
var logger = require("morgan");
// 处理session
const session = require("express-session");

// 路由
// const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/users");
const blogRouter = require("./routes/blog");
const userRouter = require("./routes/user");

// 创建应用
var app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "bcakljsfb_cmsnckl!321",
    cookie: {
      path: "/", // 默认配置
      httpOnly: true, // 默认配置
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "dev" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
