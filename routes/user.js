const express = require("express");
const router = express.Router();
const { login, registerCheck } = require("../controller/blog/user");
const { SuccessModel, ErrorModel } = require("../model/blogResModel");

router.post("/login", function (req, res, next) {
  const { username, password } = req.query;
  console.log(req.session.username, "====userName1====");
  console.log(username, "====userName2====");

  const data = login(username, password);
  return data.then((user) => {
    if (user.username) {
      // 设置Session
      req.session.username = user.username;
      req.session.realname = user.realname;

      res.json(new SuccessModel());
      return;
    }

    res.json(new ErrorModel("登录失败"));
  });
});

router.post("/register", function (req, res, next) {
  res.json({
    errno: 0,
    data: "注册",
  });
});

// session 测试
router.get("/session-test", function (req, res, next) {
  const session = req.session;
  if (session.viewNum == null) {
    session.viewNum = 0;
  }
  session.viewNum++;
  res.json({
    errno: 0,
    data: session.viewNum,
  });
});

// 登录测试
router.get("/login-test", function (req, res, next) {
  const session = req.session;
  if (session.username == null) {
    res.json(new ErrorModel("请先登录"));
    return;
  } else {
    res.json(new SuccessModel("登录成功"));
  }
});

module.exports = router;
