const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const daySchema = new Schema({
	date: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: ''
  }
}, {toObject: {
		getters: true,
		virtuals: true
}});

module.exports = mongoose.model('day', daySchema);