const jwt = require('jsonwebtoken');
const util = require('util');
const path = require("path");
const verify = util.promisify(jwt.verify);
const secret = "react-koa-bookiezilla"
const url = require("url");
const querystring = require("querystring");

async function main(ctx, next) {
  let token = ctx.header.authorization;  // Get the token carried in the request
  let userInfo = await verify(token, secret);
  ctx.user = userInfo;
  return next()
}

module.exports = main;