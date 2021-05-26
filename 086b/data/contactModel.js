const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const contactSchema = new Schema({
	position: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: ''
  },
  mobile: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  }
}, {toObject: {
		getters: true,
		virtuals: true
}});

module.exports = mongoose.model('contact', contactSchema);