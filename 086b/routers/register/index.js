const Router = require('koa-router');
const router = new Router();
router
  .use("/", async(ctx, next) => {
    console.log("register")
    await next();
  })
  .get("/", async(ctx, next) => {
    await ctx.render('register', {
      post:"123",
    })
    await next();
  });
module.exports = router;
