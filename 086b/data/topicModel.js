const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
require('mongoose-long')(mongoose);
const { Types: { Long } } = mongoose;

const topicSchema = new Schema({
  topicId: {
    type: Number,
    required: true,
  },
  categoryId: {
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
  color: {
    type: String,
    default: '#325437'
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
  collection: 'topic',
  toObject: {
    getters: true,
    virtuals: true
  }
});


topicSchema.statics.threadCountPlusOne = async (topicIds) => {
  const topicModel = mongoose.model('topic');
  for (let topicId of topicIds) {
    await topicModel.updateOne({ topicId }, { $inc: { threadCount: 1 } });
  }
}

module.exports = mongoose.model('topic', topicSchema);