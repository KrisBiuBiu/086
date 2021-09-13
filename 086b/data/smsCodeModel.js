const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");


const smsCodeSchema = new Schema({
  smsCode: {
    type: String,
    default: ''
  },
  mobile: {
    type: String,
    default: ''
  },
  createTime: {
    type: Date,
    default: () => Date.now(),
    index: 1
  },
  createTimeStamp: {
    type: String,
    default: () => Date.now(),
    index: 1
  },
  expirationTime: {
    type: Date,
    default: () => Date.now() + 60 * 1000,
    index: 1
  },
  expirationTimeStamp: {
    type: String,
    default: () => Date.now() + 60 * 1000,
    index: 1
  }
}, {
  collection: "smsCode",
  toObject: {
    getters: true,
    virtuals: true
  }
});

smsCodeSchema.statics.checkSmsCodeSent = async (mobile) => {
  const smsCodeModel = mongoose.model('smsCode');
  const smsCodeRes = await smsCodeModel.find({ mobile, expirationTime: { "$gt": new Date() } }).lean();
  if (smsCodeRes.length > 0) {
    return true
  } else {
    return false
  }
}

smsCodeSchema.statics.checkSmsCodeSent = async (mobile, smsCode) => {
  const smsCodeModel = mongoose.model('smsCode');
  const smsCodeRes = await smsCodeModel.findOne({ mobile, expirationTime: { "$gt": new Date() } }).lean();
  if (!smsCodeRes) {
    return false
  } else {
    return true
  }
}

smsCodeSchema.statics.checkSmsCodeExpired = async (mobile, smsCode) => {
  const smsCodeModel = mongoose.model('smsCode');
  const smsCodeRes = await smsCodeModel.findOne({ mobile, smsCode, expirationTime: { "$gt": new Date() } }).lean();
  if (!smsCodeRes) {
    return false
  } else {
    return true
  }
}

smsCodeSchema.statics.expireSmsCode = async (smsCode) => {
  const smsCodeModel = mongoose.model('smsCode');
  await smsCodeModel.updateOne({ smsCode }, { $set: { expirationTime: Date.now(), expirationTimeStamp: Date.now() } });
}

module.exports = mongoose.model('smsCode', smsCodeSchema);