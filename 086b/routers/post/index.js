const Router = require('koa-router');
const postRouter = new Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const mime = require("mime-types");
const fs = require("fs");

const threadModel = require(path.join(__dirname, "../../data/threadModel.js"));
const idsModel = require(path.join(__dirname, "../../data/idsModel.js"));
const plateModel = require(path.join(__dirname, "../../data/plateModel"));

const fn = require(path.join(__dirname, `../../utils/fn`));

postRouter
  .post("/thread", async (ctx, next) => {
    const { title, content, selectedPlates, threadCover } = ctx.request.body;
    const tid = await idsModel.getNewId("tid");
    // 转存图片
    if (threadCover) {
      let base64Data = threadCover.replace(/^data:image\/\w+;base64,/, "");
      let dataBuffer = Buffer.from(base64Data, 'base64');
      let threadCoverPath = fn.mkDir("resource\\threadCover");
      fs.writeFileSync(`${threadCoverPath}/${tid}.png`, dataBuffer);
    }
    const thread = new threadModel({
      tid,
      uid: ctx.user.uid,
      title,
      content,
      plates: selectedPlates,
      cover: threadCover && threadCover.length !== 0 ? true : false
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
  .get("/threadCover/:tid", async (ctx, next) => {
    const { tid } = ctx.params;
    const filePath = path.join(__dirname, '../../resource/threadCover') + `/${tid}.png`;
    const file = fs.readFileSync(filePath);
    let mimeType = mime.lookup(filePath);
    ctx.set("content-type", mimeType);
    ctx.body = file;
  })

module.exports = postRouter;
