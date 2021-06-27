const Router = require('koa-router');
const fileRouter = new Router();
const jwt = require("jsonwebtoken");
const usersModel = require("../../data/usersModel.js");
const idsModel = require("../../data/idsModel.js");
const fn = require("../../module/fn");

fileRouter
  .post("/upload", async (ctx, next) => {
    const { mobile } = ctx.request.body;
    // 检查手机号
    const mobileRegistered = await usersModel.checkMobileRegistered(mobile);
    if (!mobileRegistered) ctx.throw(401, "手机号不存在");
    // 获取uid
    let uid = await usersModel.getUid(mobile);
    // 更新用户最后登录时间
    await usersModel.updateLastLoginTimeStamp(uid);
    // 获取用户信息
    const userInfo = await usersModel.getUserTokenInfo(uid);
    const secret = "react-koa-bookiezilla"; // 指定密钥，这是之后用来判断token合法性的标志
    const token = jwt.sign(userInfo, secret); // 签发token
    ctx.body = { token }
  })

module.exports = fileRouter;






























