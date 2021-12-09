const Router = require('koa-router');
const topicRouter = new Router();
const path = require("path");
const topicModel = require("../../data/topicModel.js");
const fn = require(path.join(__dirname, `../../utils/fn`));
const fs = require("fs");
const idsModel = require('../../data/idsModel.js');
const categoryModel = require('../../data/categoryModel.js');
const mime = require("mime-types");
const threadModel = require('../../data/threadModel.js');

topicRouter
  .post("/create", async (ctx, next) => {
    const { name, description } = ctx.request.body;
    if (!name || !description) return ctx.throw(404, "请填写板块名称和介绍");
    const topicId = await idsModel.getNewId("topicId");
    const topicTmp = new topicModel({
      topicId,
      name,
      description
    });
    await topicTmp.save();
    ctx.body = { msg: "创建成功" };
  })
  .post("/topics", async (ctx, next) => {
    const list = [];
    const res = await topicModel.find({});
    console.log(res);
    ctx.body = { list: res }
  })
  .post("/topic", async (ctx, next) => {
    const { name, description, base64Url } = ctx.request.body;
    ctx.body = { msg: "创建成功" };
  })
  .get("/categories", async (ctx, next) => {
    const categories = await categoryModel.getAllCategories();
    console.log(categories)
    ctx.body = { categories }
  })
  .get("/icon/:topicId", async (ctx, next) => {
    const { topicId } = ctx.params;
    let filePath = path.join(__dirname, '../../resource/topicIcon') + `/${topicId}.png`;
    const fileExists = fs.existsSync(filePath);
    if (!fileExists) {
      filePath = path.join(__dirname, '../../resource/topicIcon') + `/default.png`;
    }
    const file = fs.readFileSync(filePath);
    let mimeType = mime.lookup(filePath);
    ctx.set("content-type", mimeType);
    ctx.body = file;
  })
  .get("/info/:topicId", async (ctx, next) => {
    const { topicId } = ctx.params;
    const res = await topicModel.findOne({ topicId }).lean();
    ctx.body = { info: res };
  })
  .get("/threads/:topicId", async (ctx, next) => {
    const { topicId } = ctx.params;
    const res = await threadModel.find({ topics: { $all: [parseInt(topicId)] } }).lean();
    ctx.body = { list: res }
  })
  .post("/saveTopic", async (ctx, next) => {
    const { topicId, topicInfo, topicIconBase64Url } = ctx.request.body;
    // 转存图标
    if (topicIconBase64Url) {
      let base64Data = topicIconBase64Url.replace(/^data:image\/\w+;base64,/, "");
      let dataBuffer = Buffer.from(base64Data, 'base64');
      let topicIconPath = fn.mkDir("resource\\topicIcon");
      fs.writeFileSync(`${topicIconPath}/${topicId}.png`, dataBuffer);
    }
    await topicModel.updateOne(
      { topicId },
      {
        $set: {
          name: topicInfo.name,
          description: topicInfo.description,
          color: topicInfo.color
        }
      })
    ctx.body = { msg: "修改成功" };
  })

module.exports = topicRouter;
