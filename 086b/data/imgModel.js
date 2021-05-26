const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const imgSchema = new Schema({
	id: {
    type: String,
    default: '',
  },
  ext: {
    type: String,
    default: ''
  }
}, {toObject: {
		getters: true,
		virtuals: true
}});

module.exports = mongoose.model('imgs', imgSchema);