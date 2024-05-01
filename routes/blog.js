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
// 登录验证中间件
const loginCheck = require("../middleware/loginCheck");

router.get("/list", (req, res, next) => {
  const { author = "", keyword = "" } = req.query || {};
  const result = getBlogList(author, keyword);
  // 管理员登录界面
  if (req.query.isadmin) {
    if (req.session.username == null) {
      res.json(new ErrorModel("未登录"));
      return;
    }
    author = req.session.username;
  }

  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

router.get("/detail", (req, res, next) => {
  const blogDetailResult = getBlogDetail(req.query.id);
  return blogDetailResult.then((data) => {
    res.json(new SuccessModel(data));
  });
});

router.post("/create", loginCheck, (req, res, next) => {
  req.body.author = req.session.username;
  const result = createBlogArticle(req.body);
  return result.then((data) => {
    res.json(new SuccessModel(data));
  });
});

router.post("/update", (req, res, next) => {
  res.json({
    errno: 0,
    data: "更新",
  });
});

router.post("/del", (req, res, next) => {
  res.json({
    errno: 0,
    data: "删除",
  });
});

module.exports = router;
