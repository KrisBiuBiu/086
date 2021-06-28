const Router = require('koa-router');
const userRouter = new Router();
const jwt = require("jsonwebtoken");
const threadModel = require("../../data/threadModel.js");
const idsModel = require("../../data/idsModel.js");
const fn = require("../../module/fn");

userRouter
  .post("/getInfo", async (ctx, next) => {
    const { title, content, selectedPlates } = ctx.request.body;
    const tid = await idsModel.getNewId("tid");
    const thread = new threadModel({
      tid,
      uid: ctx.user.uid,
      title,
      content,
      plates: selectedPlates
    });
    await thread.save();
    // 检查手机号
    // const mobileRegistered = await usersModel.checkMobileRegistered(mobile);
    // if (!mobileRegistered) ctx.throw(401, "手机号不存在");
    // // 获取uid
    // let uid = await usersModel.getUid(mobile);
    // // 更新用户最后登录时间
    // await usersModel.updateLastLoginTimeStamp(uid);
    // // 获取用户信息
    // const userInfo = await usersModel.getUserTokenInfo(uid);
    // const secret = "react-koa-bookiezilla"; // 指定密钥，这是之后用来判断token合法性的标志
    // const token = jwt.sign(userInfo, secret); // 签发token
    ctx.body = { test: "123" }
  })

module.exports = userRouter;
