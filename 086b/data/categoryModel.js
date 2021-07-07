const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const categorySchema = new Schema({
  cid: {
    type: Number,
  },
  name: {
    type: String,
    default: ''
  },
  plates: {
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

categorySchema.statics.addPlateToCategory = async (cid, pid) => {
  const categoryModel = mongoose.model('category');
  await categoryModel.updateOne({ cid }, { $addToSet: { plates: pid } });
}

categorySchema.statics.getPlateCategorys = async () => {
  const categoryModel = mongoose.model('category');
  const plateModel = mongoose.model('plate');
  const categorys = await categoryModel.find({}).lean();
  for (let category of categorys) {
    let plates = category.plates;
    let plateArr = [];
    for (let pid of plates) {
      const plate = await plateModel.findOne({ pid }).lean();
      if (plate) {
        plateArr.push(plate)
      }
    }
    category["plateArr"] = plateArr
  }
  return categorys;
}

module.exports = mongoose.model('category', categorySchema);