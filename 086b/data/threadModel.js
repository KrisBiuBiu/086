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
  commentCount: {
    type: Number,
    default: 0
  },
  cover: {
    type: Boolean,
    default: false
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
  lastTime: {
    type: Date,
    default: () => Date.now(),
    index: 1
  },
  lastTimeStamp: {
    type: String,
    default: () => Date.now(),
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

threadSchema.statics.commentCountPlusOne = async (tid) => {
  const threadModel = mongoose.model('thread');
  await threadModel.updateOne({ tid }, { $inc: { commentCount: 1 } })
}

module.exports = mongoose.model('thread', threadSchema);