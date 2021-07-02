const Router = require('koa-router');
const userRouter = new Router();
const jwt = require("jsonwebtoken");
const threadModel = require("../../data/threadModel.js");
const idsModel = require("../../data/idsModel.js");
const fn = require("../../module/fn");
const usersModel = require('../../data/usersModel.js');
const path = require("path");
const fs = require("fs")
const mime = require("mime-types")

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
  .post("/updateInfo", async (ctx, next) => {
    const { username, description } = ctx.request.body;
    const { user } = ctx;
    await usersModel.updateUserInfo(user.uid, username, description)
    ctx.body = { text: "132" }
  })
  .post("/uploadAvator", async (ctx, next) => {
    const { user } = ctx;
    const files = ctx.request.body.files || {};
    const file = files.file;
    let ext = fn.getFileType(file.name);
    const filePath = path.join(__dirname, '../../resource/avator') + `/${user.uid}.png`;
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer);
    ctx.body = { status: "success", msg: `${user.uid}` }
  })
  //https://blog.csdn.net/lihefei_coder/article/details/105435358
  .get("/avator/:uid", async (ctx, next) => {
    const { uid } = ctx.params;
    const filePath = path.join(__dirname, '../../resource/avator') + `/${uid}.png`;
    const file = fs.readFileSync(filePath);
    let mimeType = mime.lookup(filePath);
    ctx.set("content-type", mimeType);
    ctx.body = file;
  })

module.exports = userRouter;
