const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const newSchema = new Schema({
	title: {
    type: String,
    default: '',
  },
  time: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  frame: {
    type: String,
    default: ''
  }
}, {toObject: {
		getters: true,
		virtuals: true
}});

module.exports = mongoose.model('news', newSchema);