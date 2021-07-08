const Router = require('koa-router');
const postRouter = new Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const threadModel = require("../../data/threadModel.js");
const idsModel = require("../../data/idsModel.js");
const plateModel = require("../../data/plateModel");
const fn = require(path.join(__dirname, `../../utils/fn`));

postRouter
  .post("/thread", async (ctx, next) => {
    const { title, content, selectedPlates } = ctx.request.body;
    const tid = await idsModel.getNewId("tid");
    const thread = new threadModel({
      tid,
      uid: ctx.user.uid,
      title,
      content,
      plates: selectedPlates
    });
    await plateModel.threadCountPlusOne(selectedPlates);
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
  .post("/topThreadList", async (ctx, next) => {
    const threads = await threadModel.find({});
    ctx.body = {
      list: threads
    }
  })
  .post("/oneThread", async (ctx, next) => {
    const { tid } = ctx.request.body;
    await threadModel.viewCountPlusOne(tid);
    const thread = await threadModel.findOne({ tid });
    ctx.body = { thread: thread }
  })

module.exports = postRouter;
