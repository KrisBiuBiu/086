const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  categoryId: {
    type: Number,
  },
  name: {
    type: String,
    default: ''
  },
  topics: {
    type: Array,
    default: []
  },
  inUse: {
    type: Boolean,
    default: true
  }
}, {
  collection: "category",
  toObject: {
    getters: true,
    virtuals: true
  }
});

categorySchema.statics.addTopicToCategory = async (categoryId, topicId) => {
  const categoryModel = mongoose.model('category');
  await categoryModel.updateOne({ categoryId }, { $addToSet: { topics: topicId } });
}

categorySchema.statics.getAllCategories = async () => {
  const categoryModel = mongoose.model('category');
  const topicModel = mongoose.model('topic');
  const categories = await categoryModel.find({}).lean();
  for (let category of categories) {
    let topics = category.topics;
    let topicArr = [];
    for (let topicId of topics) {
      const topic = await topicModel.findOne({ topicId }).lean();
      if (topic) {
        topicArr.push(topic)
      }
    }
    category["topicArr"] = topicArr
  }
  return categories;
}

module.exports = mongoose.model('category', categorySchema);