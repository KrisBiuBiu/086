const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const homeSchema = new Schema({
	firstTitle: {
    type: String,
    default: '',
  },
	firstCnCon: {
    type: String,
    default: '',
  },
	firstEnCon: {
    type: String,
    default: '',
  },
	serEasyTitle: {
    type: String,
    default: '',
  },
	serNameOne: {
    type: String,
    default: '',
  },
	serTextOne: {
    type: String,
    default: '',
  },
	serNameTwo: {
    type: String,
    default: '',
  },
	serTextTwo: {
    type: String,
    default: '',
  },
	serNameThr: {
    type: String,
    default: '',
  },
	serTextThr: {
    type: String,
    default: '',
  },
	midLeftImg: {
    type: String,
    default: '',
  },
	midRightTitle: {
    type: String,
    default: '',
  },
	midRightConOne: {
    type: String,
    default: '',
  },
	midRightConTwo: {
    type: String,
    default: '',
  },
	groTitle: {
    type: String,
    default: '',
  },
	groImgArr: {
    type: Array,
    default: [],
  },
	kehuTitle: {
    type: String,
    default: '',
  },
	kehuImgArr: {
    type: Array,
    default: [],
  },
	type: {
    type: String,
    default: 'home',
  },
}, {toObject: {
		getters: true,
		virtuals: true
}});

module.exports = mongoose.model('home', homeSchema);