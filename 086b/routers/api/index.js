const Router = require('koa-router');
const apiRouter = new Router();
const plateModel = require("../../data/plateModel.js");
const fn = require("../../module/fn");
const fs = require("fs");
const path = require("path");
const idsModel = require('../../data/idsModel.js');

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

module.exports = apiRouter;
