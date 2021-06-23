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
  createTime: {
    type: Date,
    default: "",
  },
  createTimeStamp: {
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

module.exports = mongoose.model('thread', threadSchema);