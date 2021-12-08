const Router = require('koa-router');
const fileRouter = new Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const userModel = require("../../data/userModel.js");
const idsModel = require("../../data/idsModel.js");
const fn = require(path.join(__dirname, `../../utils/fn`));

fileRouter
  .post("/upload", async (ctx, next) => {
    const { mobile } = ctx.request.body;
    // 检查手机号
    const mobileRegistered = await userModel.checkMobileRegistered(mobile);
    if (!mobileRegistered) ctx.throw(401, "手机号不存在");
    // 获取uid
    let uid = await userModel.getUid(mobile);
    // 更新用户最后登录时间
    await userModel.updateLastLoginTimeStamp(uid);
    // 获取用户信息
    const userInfo = await userModel.getUserTokenInfo(uid);
    const secret = "react-koa-bookiezilla"; // 指定密钥，这是之后用来判断token合法性的标志
    const token = jwt.sign(userInfo, secret); // 签发token
    ctx.body = { token }
  })

module.exports = fileRouter;






























