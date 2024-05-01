const { ErrorModel } = require("../model/blogResModel");

module.exports = (req, res, next) => {
  if (req.session.username) {
    next();
    return;
  }
  res.json(new ErrorModel("请先登录", "/login", "请先登录，才能查看该页面"));
};
