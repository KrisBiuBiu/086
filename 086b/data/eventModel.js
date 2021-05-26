const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const eventSchema = new Schema({
	title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  }
}, {toObject: {
		getters: true,
		virtuals: true
}});

module.exports = mongoose.model('event', eventSchema);