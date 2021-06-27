const Router = require('koa-router');
const resourceRouter = new Router();
const filesModel = require("../../data/filesModel.js");
const idsModel = require("../../data/idsModel.js");
const fn = require("../../module/fn");
const fs = require("fs");
const path = require("path");

resourceRouter
  .post("/upload", async (ctx, next) => {
    const filePaths = [];
    const files = ctx.request.body.files || {};

    // for (let key in files) {
    const file = files.file;
    let ext = fn.getFileType(file.name);
    const rid = await idsModel.getNewId("rid");
    const filePath = path.join(__dirname, '../../resource/statics') + `/${rid}.${ext}`;
    const fileData = new filesModel({
      id: rid,
      oname: file.name,
      name: `${rid}.${ext}`,
      ext
    });
    await fileData.save();

    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer);
    filePaths.push(filePath);
    // }
    let result = JSON.stringify({
      id: `${rid}.${ext}`
    })
    ctx.body = { filename: `${rid}.${ext}` }
  })

module.exports = resourceRouter;
