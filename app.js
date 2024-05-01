// 引入依赖模块
var createError = require("http-errors"); // 引入错误处理模块
var express = require("express"); // 引入Express框架
var path = require("path"); // 引入路径处理模块

// 引入解析cookie的中间件
var cookieParser = require("cookie-parser");

// 引入日志记录中间件
var logger = require("morgan");

// 引入处理session的中间件
const session = require("express-session");

// 引入Redis存储模块，用于session的持久化存储
const RedisStore = require("connect-redis").default;

// // 引入Redis客户端实例
const redisClient = require("./db/redis");

// 引入路由模块
const blogRouter = require("./routes/blog");
const userRouter = require("./routes/user");

// 创建Express应用实例
var app = express();

// 使用中间件
app.use(logger("dev")); // 使用日志记录中间件
app.use(express.json()); // 解析JSON格式的请求体
app.use(express.urlencoded({ extended: false })); // 解析URL编码的请求体
app.use(cookieParser()); // 使用cookie解析中间件

// 配置session（这里使用了内存存储，Redis存储被注释掉了）
app.use(
  session({
    secret: "bcakljsfb_cmsnckl!321", // session的签名密钥
    cookie: {
      path: "/", // cookie的路径
      httpOnly: true, // cookie只能通过http(s)访问，不能通过客户端脚本访问
      maxAge: 24 * 60 * 60 * 1000, // cookie的有效期，这里设置为24小时
    },
    store: new RedisStore({ client: redisClient }), // session的存储实例
    resave: false, // 每次请求时重新设置session
    saveUninitialized: false, // 初始化时保存session
  })
);

// 使用路由中间件
app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

// 错误处理中间件
app.use(function (err, req, res, next) {
  // 设置本地变量，只在开发环境下提供错误信息
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "dev" ? err : {};

  // 渲染错误页面
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
