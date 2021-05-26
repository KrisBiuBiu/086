const Router = require('koa-router');
const router = new Router();
router
  .post("/login", async(ctx, next) => {
    ctx.body = {result:"123"}
  })
module.exports = router;
