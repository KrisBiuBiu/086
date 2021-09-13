const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
require('mongoose-long')(mongoose);
const { Types: { Long } } = mongoose;

const commentSchema = new Schema({
  uid: {
    type: Number,
    required: true,
  },
  commentId: {
    type: Number,
    required: true,
  },
  tid: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    default: ""
  },
  plates: {
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

commentSchema.statics.getComments = async (tid) => {
  const commentModel = mongoose.model("comment");
  const userModel = mongoose.model("users");
  let comments = await commentModel.find({ tid }).sort({ createTime: -1 }).lean();
  comments.map(async (comment) => {
    let user = await userModel.findOne({ uid: comment.uid }).lean();
    comment.user = user;
    return comment
  })
  return comments
}

commentSchema.statics.updateLastLoginTimeStamp = async (uid) => {
  const threadModel = mongoose.model('thread');
  await threadModel.updateOne({ uid }, { $set: { lastLoginTimeStamp: new Date().getTime() } });
}

commentSchema.statics.viewCountPlusOne = async (tid) => {
  const threadModel = mongoose.model('thread');
  await threadModel.updateOne({ tid }, { $inc: { viewCount: 1 } })
}

module.exports = mongoose.model('comment', commentSchema);