const Router = require('koa-router');
const plateRouter = new Router();
const path = require("path");
const plateModel = require("../../data/plateModel.js");
const fn = require(path.join(__dirname, `../../utils/fn`));
const fs = require("fs");
const idsModel = require('../../data/idsModel.js');
const categoryModel = require('../../data/categoryModel.js');
const mime = require("mime-types");
const threadModel = require('../../data/threadModel.js');

plateRouter
  .post("/create", async (ctx, next) => {
    const { name, description } = ctx.request.body;
    if (!name || !description) return ctx.throw(404, "请填写板块名称和介绍");
    const pid = await idsModel.getNewId("pid");
    const plateTmp = new plateModel({
      pid,
      name,
      description
    });
    await plateTmp.save();
    ctx.body = { msg: "创建成功" };
  })
  .post("/plates", async (ctx, next) => {
    const list = [];
    const res = await plateModel.find({});
    console.log(res);
    ctx.body = { list: res }
  })
  .post("/plate", async (ctx, next) => {
    const { name, description, base64Url } = ctx.request.body;
    ctx.body = { msg: "创建成功" };
  })
  .get("/categorys", async (ctx, next) => {
    const res = await categoryModel.getPlateCategorys();
    ctx.body = { list: res }
  })
  .get("/icon/:pid", async (ctx, next) => {
    const { pid } = ctx.params;
    let filePath = path.join(__dirname, '../../resource/plateIcon') + `/${pid}.png`;
    const fileExists = fs.existsSync(filePath);
    if (!fileExists) {
      filePath = path.join(__dirname, '../../resource/plateIcon') + `/default.png`;
    }
    const file = fs.readFileSync(filePath);
    let mimeType = mime.lookup(filePath);
    ctx.set("content-type", mimeType);
    ctx.body = file;
  })
  .get("/info/:pid", async (ctx, next) => {
    const { pid } = ctx.params;
    const res = await plateModel.findOne({ pid }).lean();
    ctx.body = { info: res };
  })
  .get("/threads/:pid", async (ctx, next) => {
    const { pid } = ctx.params;
    const res = await threadModel.find({ plates: { $all: [parseInt(pid)] } }).lean();
    ctx.body = { list: res }
  })

module.exports = plateRouter;
