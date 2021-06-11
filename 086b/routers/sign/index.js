const Router = require('koa-router');
const signRouter = new Router();
const usersModel = require("../../data/usersModel.js");
const idsModel = require("../../data/idsModel.js");
const fn = require("../../module/fn");

signRouter
  .get("/login", async (ctx, next) => {
    console.log(ctx.request);
    ctx.body = { "user": "123" }
  })
  .post("/login", async (ctx, next) => {
    console.log(ctx.request);
    console.log(123456);
    ctx.throw(401, "用户名或密码不正确")
    ctx.body = { "user": "123" }
  })
  .post("/register", async (ctx, next) => {
    console.log(ctx);
    // 检测用户名和手机号是否已存在
    const usernameExi = await usersModel.checkUsernameExists("username");
    if (usernameExi) {
      ctx.throw(404, "用户名已存在")
    }
    const mobileNumberExi = await usersModel.checkMobileExists(13547829667);
    if (mobileNumberExi) {
      ctx.throw(404, "该手机号已被注册");
    }
    // 创建用户
    const uid = await idsModel.getNewId("uid");
    const user = new usersModel({
      uid,
      mobileNumber: 13547829667,
    });
    await user.save();
    ctx.body = { "token": "123" }
  })
  .post("/getSmsCode", async (ctx, next) => {
    const { mobileNumber } = ctx.request.body;
    let smsCode = fn.sixRandom();
    ctx.body = { smsCode }
  })
  .post("/register", async (ctx, next) => {
    const { mobileNumber, smsCode } = ctx.request.body;
    const uid = await idsModel.getNewId("uid");
    const userExi = await usersModel.checkMobileExists(mobileNumber);
    if (userExi) ctx.throw(400, "手机号已存在");
    const user = new usersModel({
      uid,
      mobileNumber,
    });
    await user.save();

    ctx.body = { status: "success", data: "注册成功" };
  })

module.exports = signRouter;
