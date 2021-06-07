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
  email: {
    type: String,
    default: ""
  },
  mobileNumber: {
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
    type: Long,
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

usersSchema.statics.checkMobileExists = async (mobileNumber) => {
  let exi = false;
  const usersModel = mongoose.model('users');
  let user = await usersModel.findOne({ mobileNumber });
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