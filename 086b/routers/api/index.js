const Router = require('koa-router');
const apiRouter = new Router();
const path = require("path");
const plateModel = require("../../data/plateModel.js");
const fs = require("fs");
const idsModel = require('../../data/idsModel.js');
const categoryModel = require(path.join(__dirname, `../../data/categoryModel.js`));
const fn = require(path.join(__dirname, `../../utils/fn`));

apiRouter
  .get("/plates", async (ctx, next) => {
    const list = [];
    const res = await plateModel.find({});
    ctx.body = { list: res }
  })
  .post("/plates", async (ctx, next) => {
    const list = [];
    const res = await plateModel.find({});
    ctx.body = { list: res }
  })
  .post("/plate", async (ctx, next) => {
    const { name, description, base64Url, cid } = ctx.request.body;
    if (!name || !description) return ctx.throw(404, "请填写板块名称和介绍");
    if (!base64Url) return ctx.throw(404, "请上传板块图标")
    const pid = await idsModel.getNewId("pid");
    // 转存图片
    if (base64Url) {
      let base64Data = base64Url.replace(/^data:image\/\w+;base64,/, "");
      let dataBuffer = Buffer.from(base64Data, 'base64');
      let plateIconPath = fn.mkDir("resource\\plateIcon");
      fs.writeFileSync(`${plateIconPath}/${pid}.png`, dataBuffer);
    }
    // 新建板块
    const plateTmp = new plateModel({
      pid,
      name,
      description,
      cid
    });
    await plateTmp.save();
    await categoryModel.addPlateToCategory(cid, pid);
    ctx.body = { msg: "创建成功" };
  })
  .get("/plate/icon/:pid", async (ctx, next) => {
    const { pid } = ctx.params;
    ctx.body = { pid }
  })
  .post("/plate/category", async (ctx, next) => {
    const { name } = ctx.request.body;
    const cid = await idsModel.getNewId("cid");
    const categoryTmp = new categoryModel({
      cid,
      name,
    });
    await categoryTmp.save();
    ctx.body = { msg: "创建成功" }
  })
  .get("/plate/categorys", async (ctx, next) => {
    const res = await categoryModel.getPlateCategorys();
    ctx.body = { list: res }
  })

module.exports = apiRouter;
