const Router = require('koa-router');
const router = new Router();
router
  .post("/login", async(ctx, next) => {
    let result = JSON.stringify({
      accessIds:"1,2,3"
    })
    ctx.body = {code:200,result}
  })
module.exports = router;
