const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
require('mongoose-long')(mongoose);
const { Types: { Long } } = mongoose;

const commentSchema = new Schema({
  userId: {
    type: Number,
    required: true,
  },
  commentId: {
    type: Number,
    required: true,
  },
  threadId: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    default: ""
  },
  topics: {
    type: Array,
    default: []
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
  }
}, {
  collection: 'comment',
  toObject: {
    getters: true,
    virtuals: true
  }
});

commentSchema.statics.getComments = async (threadId) => {
  const commentModel = mongoose.model("comment");
  const userModel = mongoose.model("user");
  let comments = await commentModel.find({ threadId }).sort({ createTime: -1 }).lean();
  comments.map(async (comment) => {
    let user = await userModel.findOne({ userId: comment.userId }).lean();
    comment.user = user;
    return comment
  })
  return comments
}

commentSchema.statics.updateLastLoginTimeStamp = async (userId) => {
  const threadModel = mongoose.model('thread');
  await threadModel.updateOne({ userId }, { $set: { lastLoginTimeStamp: new Date().getTime() } });
}

commentSchema.statics.viewCountPlusOne = async (threadId) => {
  const threadModel = mongoose.model('thread');
  await threadModel.updateOne({ threadId }, { $inc: { viewCount: 1 } })
}

module.exports = mongoose.model('comment', commentSchema);