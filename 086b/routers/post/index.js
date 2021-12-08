const Router = require('koa-router');
const postRouter = new Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const mime = require("mime-types");
const fs = require("fs");

const threadModel = require(path.join(__dirname, "../../data/threadModel.js"));
const idsModel = require(path.join(__dirname, "../../data/idsModel.js"));
const topicModel = require(path.join(__dirname, "../../data/topicModel"));
const commentModel = require(path.join(__dirname, "../../data/commentModel"));

const fn = require(path.join(__dirname, `../../utils/fn`));

postRouter
  .post("/thread", async (ctx, next) => {
    const { title, content, selectedTopics, threadCover } = ctx.request.body;
    const threadId = await idsModel.getNewId("threadId");
    // 转存图片
    if (threadCover) {
      let base64Data = threadCover.replace(/^data:image\/\w+;base64,/, "");
      let dataBuffer = Buffer.from(base64Data, 'base64');
      let threadCoverPath = fn.mkDir("resource\\threadCover");
      fs.writeFileSync(`${threadCoverPath}/${threadId}.png`, dataBuffer);
    }
    const thread = new threadModel({
      threadId,
      userId: ctx.user,
      title,
      content,
      topics: selectedTopics,
      cover: threadCover && threadCover.length !== 0 ? true : false
    });
    await topicModel.threadCountPlusOne(selectedTopics);
    await thread.save();
    ctx.body = { test: "123" }
  })
  .post("/topThreadList", async (ctx, next) => {
    const threads = await threadModel.find({});
    ctx.body = {
      list: threads
    }
  })
  .get("/thread/:threadId", async (ctx, next) => {
    const { threadId } = ctx.params;
    await threadModel.viewCountPlusOne(threadId);
    const thread = await threadModel.getThread(threadId);
    ctx.body = { thread: thread }
  })
  .get("/thread/:threadId/comments", async (ctx, next) => {
    const { threadId } = ctx.params;
    const comments = await commentModel.getComments(threadId);
    ctx.body = { comments: comments }
  })
  .post("/comment", async (ctx, next) => {
    const { content, threadId } = ctx.request.body;
    const commentId = await idsModel.getNewId("commentId");
    const comment = new commentModel({
      threadId,
      commentId,
      userId: ctx.user,
      content,
    });
    await threadModel.commentCountPlusOne(threadId);
    await comment.save();
    ctx.body = { msg: "123" }
  })
  .get("/threadCover/:threadId", async (ctx, next) => {
    const { threadId } = ctx.params;
    const filePath = path.join(__dirname, '../../resource/threadCover') + `/${threadId}.png`;
    const file = fs.readFileSync(filePath);
    let mimeType = mime.lookup(filePath);
    ctx.set("content-type", mimeType);
    ctx.body = file;
  })

module.exports = postRouter;
