const Router = require('koa-router');
const resourceRouter = new Router();
const usersModel = require("../../data/usersModel.js");
const designStyleModel = require("../../data/designStyleModel.js");
const filesModel = require("../../data/filesModel.js");
const idsModel = require("../../data/idsModel.js");
const fn = require("../../module/fn");
const fs = require("fs");
const path = require("path");
const os = require("os");

resourceRouter
.post("/uploadImage", async(ctx, next) => {
    const filePaths = [];
    const files = ctx.request.body.files || {};
  
    // for (let key in files) {
    const file = files.file;
    let ext = fn.getFileType(file.name);
    const fid = await idsModel.getNewId("fid");
    const filePath = path.join(__dirname, '../../resource/') + `/${fid}.${ext}`;
    const fileData = new filesModel({
        id: fid,
        oname: file.name,
        name:`${fid}.${ext}`,
        ext
    });
    await fileData.save();

    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer);
    filePaths.push(filePath);
    // }
    let result = JSON.stringify({
        id:`${fid}.${ext}`
    })
    ctx.body = {code:200, result}
})

module.exports = resourceRouter;
