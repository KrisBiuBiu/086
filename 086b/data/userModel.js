const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
require('mongoose-long')(mongoose);
const { Types: { Long } } = mongoose;

const userSchema = new Schema({
  userId: {
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
  registerTime: {
    type: Date,
    default: () => Date.now(),
    index: 1
  },
  registerTimeStamp: {
    type: String,
    default: () => Date.now(),
    index: 1
  },
  lastLoginTime: {
    type: Date,
    default: () => Date.now(),
  },
  lastLoginTimeStamp: {
    type: String,
    default: () => Date.now(),
    index: 1
  }
}, {
  collection: 'user',
  toObject: {
    getters: true,
    virtuals: true
  }
});

userSchema.statics.updateLastLoginTimeStamp = async (userId) => {
  const userModel = mongoose.model('user');
  await userModel.updateOne({ userId }, { $set: { lastLoginTimeStamp: new Date().getTime() } });
}

userSchema.statics.updateUserInfo = async (userId, username, description) => {
  const userModel = mongoose.model("user");
  await userModel.updateOne({ userId }, { $set: { username, description } })
}

userSchema.statics.getUserId = async (mobile) => {
  const userModel = mongoose.model('user');
  let user = await userModel.findOne({ mobile });
  return user.userId;
}

userSchema.statics.getUserTokenInfo = async (userId) => {
  const userModel = mongoose.model('user');
  let user = await userModel.findOne({ userId });
  return {
    userId: user.userId,
    lastLoginTimeStamp: user.lastLoginTimeStamp
  };
}

userSchema.statics.checkMobileRegistered = async (mobile) => {
  let exi = false;
  const userModel = mongoose.model('user');
  let user = await userModel.findOne({ mobile });
  if (user) exi = true;
  return exi;
}

userSchema.statics.checkMobileExists = async (mobile) => {
  let exi = false;
  const userModel = mongoose.model('user');
  let user = await userModel.findOne({ mobile });
  if (user) exi = true;
  return exi;
}

userSchema.statics.checkUsernameExists = async (username) => {
  let exi = false;
  const userModel = mongoose.model('user');
  let user = await userModel.findOne({ username });
  if (user) exi = true;
  return exi;
}

module.exports = mongoose.model('user', userSchema);