const express = require("express");
const router = express.Router();

router.get("/list", function (req, res, next) {
  res.json({
    errno: 0,
    data: "列表",
  });
});

router.get("/detail", function (req, res, next) {
  res.json({
    errno: 0,
    data: "详情",
  });
});

router.post("/create", function (req, res, next) {
  res.json({
    errno: 0,
    data: "创建",
  });
});

router.post("/update", function (req, res, next) {
  res.json({
    errno: 0,
    data: "更新",
  });
});

router.post("/del", function (req, res, next) {
  res.json({
    errno: 0,
    data: "删除",
  });
});

module.exports = router;
