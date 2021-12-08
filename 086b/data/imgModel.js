const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const imgSchema = new Schema({
  imgId: {
    type: String,
    default: '',
  },
  ext: {
    type: String,
    default: ''
  }
}, {
  toObject: {
    getters: true,
    virtuals: true
  }
});

module.exports = mongoose.model('img', imgSchema);