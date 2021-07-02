const jwt = require('jsonwebtoken');
const util = require('util');
const path = require("path");
const verify = util.promisify(jwt.verify);
const secret = "react-koa-bookiezilla"
const url = require("url");
const querystring = require("querystring");

async function main(ctx, next) {
  if (ctx.originalUrl === "/sign/login" || ctx.originalUrl.indexOf("statics") > -1 || ctx.originalUrl.indexOf("avator") > -1 || ctx.originalUrl.indexOf("/favicon.ico") > -1) {

    return next()
  } else {
    let token = ctx.header.authorization;  // Get the token carried in the request
    if (token === "undefined") {
      ctx.user = {}
    } else {
      let userInfo = await verify(token, secret);
      ctx.user = userInfo;
    }
    return next()
  }
}

module.exports = main;