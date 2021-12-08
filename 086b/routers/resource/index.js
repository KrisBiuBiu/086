const Router = require('koa-router');
const resourceRouter = new Router();
const path = require("path");
const fileModel = require("../../data/fileModel.js");
const idsModel = require("../../data/idsModel.js");
const fn = require(path.join(__dirname, `../../utils/fn`));
const fs = require("fs");

resourceRouter
  .post("/upload", async (ctx, next) => {
    const filePaths = [];
    const files = ctx.request.body.files || {};

    // for (let key in files) {
    const file = files.file;
    let ext = fn.getFileType(file.name);
    const resourceId = await idsModel.getNewId("resourceId");
    const filePath = path.join(__dirname, '../../resource/statics') + `/${resourceId}.${ext}`;
    const fileData = new fileModel({
      id: resourceId,
      oname: file.name,
      name: `${resourceId}.${ext}`,
      ext
    });
    await fileData.save();

    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer);
    filePaths.push(filePath);
    // }
    let result = JSON.stringify({
      id: `${resourceId}.${ext}`
    })
    ctx.body = { filename: `${resourceId}.${ext}` }
  })

module.exports = resourceRouter;
