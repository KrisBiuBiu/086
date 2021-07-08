const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
require('mongoose-long')(mongoose);
const { Types: { Long } } = mongoose;

const plateSchema = new Schema({
  pid: {
    type: Number,
    required: true,
  },
  cid: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: ''
  },
  threadCount: {
    type: Number,
    default: 0
  },
  followCount: {
    type: Number,
    default: 0
  },
  inUse: {
    type: Number,
    default: 1
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
  createTimeStamp: {
    type: String,
    default: (new Date()).getTime(),
    index: 1
  }
}, {
  collection: 'plate',
  toObject: {
    getters: true,
    virtuals: true
  }
});


plateSchema.statics.threadCountPlusOne = async (pids) => {
  const plateModel = mongoose.model('plate');
  for (let pid of pids) {
    await plateModel.updateOne({ pid }, { $inc: { threadCount: 1 } });
  }
}

module.exports = mongoose.model('plate', plateSchema);