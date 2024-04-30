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

module.exports = router;
