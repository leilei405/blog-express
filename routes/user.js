const express = require("express");
const router = express.Router();

router.post("/login", function (req, res, next) {
  const { username, password } = req.body;
  res.json({
    errno: 0,
    data: {
      username,
      password,
    },
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

module.exports = router;
