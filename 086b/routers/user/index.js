const Router = require('koa-router');
const userRouter = new Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const threadModel = require("../../data/threadModel.js");
const idsModel = require("../../data/idsModel.js");
const fn = require(path.join(__dirname, `../../utils/fn`));
const userModel = require('../../data/userModel.js');
const fs = require("fs")
const mime = require("mime-types")

userRouter
  .post("/getInfo", async (ctx, next) => {
    const { title, content, selectedTopics } = ctx.request.body;
    const threadId = await idsModel.getNewId("threadId");
    const thread = new threadModel({
      threadId,
      userId: ctx.user.userId,
      title,
      content,
      topics: selectedTopics
    });
    await thread.save();
    // 检查手机号
    // const mobileRegistered = await userModel.checkMobileRegistered(mobile);
    // if (!mobileRegistered) ctx.throw(401, "手机号不存在");
    // // 获取userId
    // let userId = await userModel.getUserId(mobile);
    // // 更新用户最后登录时间
    // await userModel.updateLastLoginTimeStamp(userId);
    // // 获取用户信息
    // const userInfo = await userModel.getUserTokenInfo(userId);
    // const secret = "react-koa-bookiezilla"; // 指定密钥，这是之后用来判断token合法性的标志
    // const token = jwt.sign(userInfo, secret); // 签发token
    ctx.body = { test: "123" }
  })
  .post("/updateInfo", async (ctx, next) => {
    const { username, description } = ctx.request.body;
    const { user } = ctx;
    await userModel.updateUserInfo(user.userId, username, description)
    ctx.body = { text: "132" }
  })
  .post("/uploadAvator", async (ctx, next) => {
    const { user } = ctx;
    const files = ctx.request.body.files || {};
    const file = files.file;
    let ext = fn.getFileType(file.name);
    const filePath = path.join(__dirname, '../../resource/avator') + `/${user.userId}.png`;
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer);
    ctx.body = { status: "success", msg: `${user.userId}` }
  })
  //https://blog.csdn.net/lihefei_coder/article/details/105435358
  .get("/avator/:userId", async (ctx, next) => {
    const { userId } = ctx.params;
    const filePath = path.join(__dirname, '../../resource/avator') + `/${userId}.png`;
    const file = fs.readFileSync(filePath);
    let mimeType = mime.lookup(filePath);
    ctx.set("content-type", mimeType);
    ctx.body = file;
  })

module.exports = userRouter;
