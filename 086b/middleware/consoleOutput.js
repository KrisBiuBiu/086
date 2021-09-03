const moment = require("moment");
const path = require("path");

async function main(ctx, next) {
  let stime = new Date().getTime();
  await next();
  let etime = new Date().getTime();
  let processTime = etime - stime;

  let username = ctx.user ? ctx.user.username : "nobody";

  let node_env = process.env && process.env.NODE_ENV ? `${process.env.NODE_ENV}` : "none env";

  let funcNames = "";
  if (ctx.path === "/graphql" && typeof (ctx.body) === "string") {
    let bodyObj = JSON.parse(ctx.body);
    let data = bodyObj.data ? bodyObj.data : {};
    funcNames = `${Object.keys(data)}`;
  } else {
    funcNames = `none`
  }
  console.log(`\x1b[37m[${moment().format('YYYY/MM/DD HH:mm:ss')}] \x1b[37m-- \x1b[33m${node_env} \x1b[37m-- \x1b[34m${ctx.method} \x1b[34m${ctx.path} \x1b[37m-- \x1b[35m${funcNames} \x1b[36m${username} \x1b[32m<${processTime}ms>`)
}

module.exports = main;