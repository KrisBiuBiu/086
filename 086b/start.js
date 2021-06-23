const mainRouter = require('./routers');
const Koa = require('koa');
const path = require("path");
const app = new Koa();
const views = require('koa-views');
const static = require('koa-static');
const bodyparser = require('koa-bodyparser');
const session = require('koa-session');
const koaBody = require('koa-body');
const mongoose = require("mongoose");
const appConfig = require("./config/appConfig");
const error = require("koa-json-error");
const cors = require('@koa/cors');
const routers = require("./routers")
const consoleOutput = require(path.join(__dirname, `./middleware/consoleOutput.js`));
const tokenCheck = require(path.join(__dirname, `./middleware/tokenCheck.js`));
// const consoleOutput = require("./middleware/consoleOutput.js");

const staticPath = './public'

app.use(cors())

app.use(tokenCheck);
app.keys = ['this is my secret and fuck you all'];
app.use(session({
  key: 'koa:sess', /** cookie的名称，可以不管 */
  maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
}, app));
app.use(
  error({
    postFormat: (e, { stack, ...rest }) =>
      process.env.NODE_ENV === "production" ? rest : { stack, ...rest }
  })
);
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024 * 1024	// 设置上传文件大小最大限制，默认2M
  }
}));


mongoose.Promise = global.Promise;
const options = {
  promiseLibrary: Promise,
  autoIndex: true,
  poolSize: 50,
  keepAlive: 120,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};
mongoose.connect('mongodb://127.0.0.1:27017/086', options);
app.use(static(path.join(__dirname, staticPath)))
app.use(static(path.join(__dirname, './node_modules')))
app.use(static(path.join(__dirname, './resource')))
// app.use(views('views', { map: {html: 'ejs' }}));
app.use(consoleOutput);
app.use(bodyparser())
app.use(views(path.join(__dirname, "./views"), {
  extension: "ejs"
}))
app.use(routers.routes()).use(routers.allowedMethods)
// .use(mainRouter.routes())

app.listen(appConfig.port);
console.log("server is ready")
console.log(`Web Service Ready At http://${appConfig.ip}:${appConfig.port}`);
