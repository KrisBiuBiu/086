const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
require('mongoose-long')(mongoose);
const { Types: { Long } } = mongoose;

const threadSchema = new Schema({
  uid: {
    type: Number,
    required: true,
  },
  tid: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ""
  },
  plates: {
    type: Array,
    default: []
  },
  viewCount: {
    type: Number,
    default: 0
  },
  createTime: {
    type: Date,
    default: Date.now,
    index: 1
  },
  createTimeStamp: {
    type: String,
    default: (new Date()).getTime(),
    index: 1
  },
  lastTime: {
    type: Date,
    default: Date.now,
    index: 1
  },
  lastTimeStamp: {
    type: String,
    default: (new Date()).getTime(),
    index: 1
  }
}, {
  collection: 'thread',
  toObject: {
    getters: true,
    virtuals: true
  }
});

threadSchema.statics.updateLastLoginTimeStamp = async (uid) => {
  const threadModel = mongoose.model('thread');
  await threadModel.updateOne({ uid }, { $set: { lastLoginTimeStamp: new Date().getTime() } });
}

threadSchema.statics.viewCountPlusOne = async (tid) => {
  const threadModel = mongoose.model('thread');
  await threadModel.updateOne({ tid }, { $inc: { viewCount: 1 } })
}

module.exports = mongoose.model('thread', threadSchema);