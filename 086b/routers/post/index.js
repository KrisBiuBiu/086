const Router = require('koa-router');
const postRouter = new Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const mime = require("mime-types");
const fs = require("fs");

const threadModel = require(path.join(__dirname, "../../data/threadModel.js"));
const idsModel = require(path.join(__dirname, "../../data/idsModel.js"));
const plateModel = require(path.join(__dirname, "../../data/plateModel"));
const commentModel = require(path.join(__dirname, "../../data/commentModel"));

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
    ctx.body = { test: "123" }
  })
  .post("/topThreadList", async (ctx, next) => {
    const threads = await threadModel.find({});
    ctx.body = {
      list: threads
    }
  })
  .get("/thread/:tid", async (ctx, next) => {
    const { tid } = ctx.params;
    await threadModel.viewCountPlusOne(tid);
    const thread = await threadModel.findOne({ tid });
    ctx.body = { thread: thread }
  })
  .get("/thread/:tid/comments", async (ctx, next) => {
    const { tid } = ctx.params;
    const comments = await commentModel.getComments(tid);
    console.log(comments)
    ctx.body = { comments: comments }
  })
  .post("/comment", async (ctx, next) => {
    const { content, tid } = ctx.request.body;
    const commentId = await idsModel.getNewId("commentId");
    const comment = new commentModel({
      tid,
      commentId,
      uid: ctx.user.uid,
      content,
    });
    await threadModel.commentCountPlusOne(tid);
    await comment.save();
    ctx.body = { msg: "123" }
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
