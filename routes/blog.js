const express = require("express");
const router = express.Router();
const {
  getBlogList,
  getBlogDetail,
  createBlogArticle,
  updateBlogArticle,
  deleteBlogArticle,
} = require("../controller/blog/blog");
const { SuccessModel, ErrorModel } = require("../model/blogResModel");

router.get("/list", function (req, res, next) {
  const { author = "", keyword = "" } = req.query || {};
  const result = getBlogList(author, keyword);
  if (req.query.isadmin) {
    author = req.session.username;
  }
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
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
