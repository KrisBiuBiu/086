const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const serviceSchema = new Schema({
	title: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  }
}, {toObject: {
		getters: true,
		virtuals: true
}});

module.exports = mongoose.model('service', serviceSchema);