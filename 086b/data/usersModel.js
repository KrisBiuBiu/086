const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
require('mongoose-long')(mongoose);
const { Types: { Long } } = mongoose;

const usersSchema = new Schema({
  uid: {
    type: Number,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  mobile: {
    type: String,
    default: ''
  },
  lastLoginTime: {
    type: Date,
    default: "",
  },
  registerTime: {
    type: Date,
    default: Date.now,
    index: 1
  },
  registerTimeStamp: {
    type: String,
    default: (new Date()).getTime(),
    index: 1
  },
  lastLoginTimeStamp: {
    type: String,
    default: (new Date()).getTime(),
    index: 1
  }
}, {
  collection: 'users',
  toObject: {
    getters: true,
    virtuals: true
  }
});

usersSchema.statics.updateLastLoginTimeStamp = async (uid) => {
  const usersModel = mongoose.model('users');
  await usersModel.updateOne({ uid }, { $set: { lastLoginTimeStamp: new Date().getTime() } });
}

usersSchema.statics.updateUserInfo = async (uid, username, description) => {
  const usersModel = mongoose.model("users");
  await usersModel.updateOne({ uid }, { $set: { username, description } })
}

usersSchema.statics.getUid = async (mobile) => {
  const usersModel = mongoose.model('users');
  let user = await usersModel.findOne({ mobile });
  return user.uid;
}

usersSchema.statics.getUserTokenInfo = async (uid) => {
  const usersModel = mongoose.model('users');
  let user = await usersModel.findOne({ uid });
  return {
    uid: user.uid,
    lastLoginTimeStamp: user.lastLoginTimeStamp
  };
}

usersSchema.statics.checkMobileRegistered = async (mobile) => {
  let exi = false;
  const usersModel = mongoose.model('users');
  let user = await usersModel.findOne({ mobile });
  if (user) exi = true;
  return exi;
}

usersSchema.statics.checkMobileExists = async (mobile) => {
  let exi = false;
  const usersModel = mongoose.model('users');
  let user = await usersModel.findOne({ mobile });
  if (user) exi = true;
  return exi;
}

usersSchema.statics.checkUsernameExists = async (username) => {
  let exi = false;
  const usersModel = mongoose.model('users');
  let user = await usersModel.findOne({ username });
  if (user) exi = true;
  return exi;
}

module.exports = mongoose.model('users', usersSchema);