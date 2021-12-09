const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
require('mongoose-long')(mongoose);
const { Types: { Long } } = mongoose;

const threadSchema = new Schema({
  userId: {
    type: Number,
    required: true,
  },
  threadId: {
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
  topics: {
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

threadSchema.statics.updateLastLoginTimeStamp = async (userId) => {
  const threadModel = mongoose.model('thread');
  await threadModel.updateOne({ userId }, { $set: { lastLoginTimeStamp: new Date().getTime() } });
}

threadSchema.statics.viewCountPlusOne = async (threadId) => {
  const threadModel = mongoose.model('thread');
  await threadModel.updateOne({ threadId }, { $inc: { viewCount: 1 } })
}

threadSchema.statics.commentCountPlusOne = async (threadId) => {
  const threadModel = mongoose.model('thread');
  await threadModel.updateOne({ threadId }, { $inc: { commentCount: 1 } })
}

threadSchema.statics.getThread = async (threadId) => {
  const threadModel = mongoose.model("thread");
  const topicModel = mongoose.model("topic");
  let thread = await threadModel.findOne({ threadId }).lean();
  let topicArr = await topicModel.find({ topicId: { $in: thread.topics } }).lean();
  thread.topicArr = topicArr;
  return thread;
}

module.exports = mongoose.model('thread', threadSchema);