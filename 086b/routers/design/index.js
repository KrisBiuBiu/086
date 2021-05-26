const Router = require('koa-router');
const designRouter = new Router();
// const designStyleModel = require("../../data/designStyleModel.js");
// const designModel = require("../../data/designModel.js");
// const idsModel = require("../../data/designModel.js");
const {designStyleModel, designModel, idsModel, materModel} = require("../../data");
const fn = require("../../module/fn");

designRouter
.post("/getDesignStyleList", async(ctx, next) => {
    const {mode} = ctx.request.body;
    let styleList = await designStyleModel.find({mode});
    let result = JSON.stringify({
        styleList
    })
    ctx.body = {code:200, result}
})
.post("/addDesign", async(ctx, next) => {
    const {mode, style, sketch, description, img} = ctx.request.body;
    let styleData = await designStyleModel.findOne({id:style});
    const designId = await idsModel.getNewId("designId");
    const designData = new designModel({
        id: designId,
        mode,
        style,
        styleName: styleData.name,
        sketch,
        description,
        img
    });
    await designData.save();
    let result = JSON.stringify({
        id:"123"
    });
    ctx.body = {code:200, result}
})
.post("/getDesignList", async(ctx,next) =>{
    let designList = [];
    designList = await designModel.find({});

    let result = JSON.stringify({
        designList
    });
    ctx.body = {code:200, result};
})
.post("/getMaterList", async(ctx, next) => {
    let materList = [];
    materList = await materModel.find({});

    let result = JSON.stringify({
        materList
    });
    ctx.body = {code:200, result};
})
.post("/addNewMater", async(ctx, next) => {
    const {materType, materName, price} = ctx.request.body;
    // await materTypesModel.deleteMany({});
    // await materTypesModel.insertMany(typesList);
    const materId = await idsModel.getNewId("materId");
    const materData = new materModel({
        id: materId,
        materType,
        materName,
        price,
    });
    await materData.save();
    let materList = [];
    materList = await materModel.find({});

    let result = JSON.stringify({
        materList
    });
    ctx.body = {code:200, result}
})
.post("/deleteMater", async(ctx, next) => {
    const {id} = ctx.request.body;
    await materModel.remove({id:id})
    let materList = [];
    materList = await materModel.find({});

    let result = JSON.stringify({
        materList
    });
    // let result = JSON.stringify({
    //     status:"success"
    // })
    ctx.body = {code:200, result}
})
module.exports = designRouter;
