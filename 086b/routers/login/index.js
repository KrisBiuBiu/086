const Router = require('koa-router');
const router = new Router();
router
  .post("/login", async(ctx, next) => {
    ctx.body = {code:200, result:{result:"123"}}
  })
module.exports = router;
