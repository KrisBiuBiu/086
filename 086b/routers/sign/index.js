const Router = require('koa-router');
const signRouter = new Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const usersModel = require("../../data/usersModel.js");
const idsModel = require("../../data/idsModel.js");
const smsCodeModel = require('../../data/smsCodeModel.js');
const fn = require(path.join(__dirname, `../../utils/fn`));
const regular = require(path.join(__dirname, `../../configuration/regular`));

signRouter
  .get("/login", async (ctx, next) => {
    console.log(ctx.request);
    ctx.body = { "user": "123" }
  })
  .post("/smsCode", async (ctx, next) => {
    const { mobile } = ctx.request.body;
    // 检验是否在一分钟之内发送过验证码
    const ifCodeSent = await smsCodeModel.checkSmsCodeSent(mobile);
    if (ifCodeSent) {
      ctx.throw(400, "一分钟内只可发送一次验证码");
    }
    // 生成验证码以及记录
    let smsCode = fn.sixRandom();
    console.log(smsCode, typeof (smsCode))
    const smsCodeData = new smsCodeModel({
      smsCode,
      mobile
    })
    await smsCodeData.save();
    // 返回验证码

    ctx.body = { "status": "success" }
  })
  .post("/loginWithSmsCode", async (ctx, next) => {
    const { mobile, smsCode } = ctx.request.body;

    // 校验手机号
    if (!mobile || regular.mobileReg.test(mobile)) ctx.throw(400, "手机号码格式不正确")
    const mobileRegistered = await usersModel.checkMobileRegistered(mobile);
    if (!mobileRegistered) ctx.throw(401, "手机号不存在");

    // 校验6位数字验证码
    if (!smsCode || regular.smsCodeReg.test(smsCode)) ctx.throw(400, "验证码格式不正确");


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
