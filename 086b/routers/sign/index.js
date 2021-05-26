const Router = require('koa-router');
const signRouter = new Router();
const usersModel = require("../../data/usersModel.js");
const idsModel = require("../../data/idsModel.js");
const fn = require("../../module/fn");

signRouter
.get("/login", async(ctx, next) => {
  console.log(ctx.request);
  ctx.body = {"user":"123"}
})
.post("/getSmsCode", async(ctx, next) => {
  const { mobileNumber } = ctx.request.body;
  let smsCode = fn.sixRandom();
  ctx.body = {smsCode}
})
.post("/register", async(ctx, next) => {
  const {mobileNumber, smsCode} = ctx.request.body;
  const uid = await idsModel.getNewId("uid");
  const userExi = await usersModel.checkMobileExists(mobileNumber);
  if(userExi) ctx.throw(400, "手机号已存在");
  const user = new usersModel({
    uid,
    mobileNumber,
  });
  await user.save();

  ctx.body = {status:"success", data:"注册成功"};
})

module.exports = signRouter;
