const Router = require('koa-router');
const controlRouter = new Router();
// const designStyleModel = require("../../data/designStyleModel.js");
// const designModel = require("../../data/designModel.js");
// const idsModel = require("../../data/designModel.js");
const {materTypesModel, designModel, idsModel, materModel} = require("../../data");
const fn = require("../../module/fn");

controlRouter
.post("/getMaterTypeList", async(ctx, next) => {
    // const {mode} = ctx.request.body;
    let typesList = await materTypesModel.find({},{_id:0});
    let result = JSON.stringify({
        typesList
    })
    ctx.body = {code:200, result}
})
.post("/getMaterTypeArr", async(ctx, next) => {
    // const {mode} = ctx.request.body;
    let typesList = await materTypesModel.find({},{_id:0});
    let typesArr = [];
    for(var i in typesList) {
        let arr = [];
        let types = typesList[i].types;
        for(var a in types) {
            let op = {
                value : types[a],
                label : types[a]
            }
            arr.push(op)
        }
        let option = {
            value : typesList[i].name,
            label : typesList[i].name,
            children: arr
        };
        typesArr.push(option)
    }
    let result = JSON.stringify({
        typesArr
    })
    ctx.body = {code:200, result}
})

module.exports = controlRouter;
