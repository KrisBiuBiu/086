const Router = require('koa-router');
const signRouter = new Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const usersModel = require("../../data/usersModel.js");
const idsModel = require("../../data/idsModel.js");
const fn = require(path.join(__dirname, `../../utils/fn`));

signRouter
  .get("/login", async (ctx, next) => {
    console.log(ctx.request);
    ctx.body = { "user": "123" }
  })
  .post("/login", async (ctx, next) => {
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
  .post("/register", async (ctx, next) => {
    console.log(ctx);
    // 检测用户名和手机号是否已存在
    const usernameExi = await usersModel.checkUsernameExists("username");
    if (usernameExi) {
      ctx.throw(404, "用户名已存在")
    }
    const mobileExi = await usersModel.checkMobileRegistered(13547829667);
    if (mobileExi) {
      ctx.throw(404, "该手机号已被注册");
    }
    // 创建用户
    const uid = await idsModel.getNewId("uid");
    const user = new usersModel({
      uid,
      mobile: 13547829667,
    });
    await user.save();
    ctx.body = { "token": "123" }
  })
  .post("/getSmsCode", async (ctx, next) => {
    const { mobile } = ctx.request.body;
    let smsCode = fn.sixRandom();
    ctx.body = { smsCode }
  })

module.exports = signRouter;
