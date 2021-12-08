const Router = require('koa-router');
const apiRouter = new Router();
const path = require("path");
const topicModel = require("../../data/topicModel.js");
const fs = require("fs");
const idsModel = require('../../data/idsModel.js');
const categoryModel = require(path.join(__dirname, `../../data/categoryModel.js`));
const fn = require(path.join(__dirname, `../../utils/fn`));

apiRouter
  .get("/topics", async (ctx, next) => {
    const list = [];
    const res = await topicModel.find({});
    ctx.body = { list: res }
  })
  .post("/topics", async (ctx, next) => {
    const list = [];
    const res = await topicModel.find({});
    ctx.body = { list: res }
  })
  .get("/topic/icon/:pid", async (ctx, next) => {
    const { pid } = ctx.params;
    ctx.body = { pid }
  })
  .get("/topic/categorys", async (ctx, next) => {
    const res = await categoryModel.gettopicCategorys();
    ctx.body = { list: res }
  })
  .get("/categories", async (ctx, next) => {
    const categories = await categoryModel.getAllCategories();
    ctx.body = { categories }
  })
  .post("/category", async (ctx, next) => {
    const { name } = ctx.request.body;
    const categoryId = await idsModel.getNewId("categoryId");
    const categoryTmp = new categoryModel({
      categoryId,
      name,
    });
    await categoryTmp.save();
    ctx.body = { msg: "创建成功" }
  })
  .post("/topic", async (ctx, next) => {
    const { name, description, base64Url, categoryId } = ctx.request.body;
    if (!name || !description) return ctx.throw(404, "请填写话题名称和介绍");
    if (!base64Url) return ctx.throw(404, "请上传话题图标")
    const topicId = await idsModel.getNewId("topicId");
    // 转存图片
    if (base64Url) {
      let base64Data = base64Url.replace(/^data:image\/\w+;base64,/, "");
      let dataBuffer = Buffer.from(base64Data, 'base64');
      let topicIconPath = fn.mkDir("resource\\topicIcon");
      fs.writeFileSync(`${topicIconPath}/${topicId}.png`, dataBuffer);
    }
    // 新建板块
    const topicTmp = new topicModel({
      topicId,
      name,
      description,
      categoryId
    });
    await topicTmp.save();
    await categoryModel.addTopicToCategory(categoryId, topicId);
    ctx.body = { msg: "创建成功" };
  })

module.exports = apiRouter;
