const Router = require('koa-router');
const plateRouter = new Router();
const plateModel = require("../../data/plateModel.js");
const fn = require("../../module/fn");
const fs = require("fs");
const path = require("path");
const idsModel = require('../../data/idsModel.js');

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

module.exports = plateRouter;
