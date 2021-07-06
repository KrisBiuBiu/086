const Router = require('koa-router');
const apiRouter = new Router();
const path = require("path");
const plateModel = require("../../data/plateModel.js");
const fs = require("fs");
const idsModel = require('../../data/idsModel.js');
const fn = require(path.join(__dirname, `../../utils/fn`));

apiRouter
  .get("/plates", async (ctx, next) => {
    const list = [];
    const res = await plateModel.find({});
    console.log(res);
    ctx.body = { list: res }
  })
  .post("/plates", async (ctx, next) => {
    const list = [];
    const res = await plateModel.find({});
    console.log(res);
    ctx.body = { list: res }
  })
  .post("/plate", async (ctx, next) => {
    const { name, description, base64Url } = ctx.request.body;
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
      description
    });
    await plateTmp.save();
    ctx.body = { msg: "创建成功" };
  })
  .get("/plate/icon/:pid", async (ctx, next) => {
    const { pid } = ctx.params;
    console.log(pid);
    ctx.body = { pid }
  })

module.exports = apiRouter;
