const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const fileSchema = new Schema({
  fileId: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: ""
  },
  oname: {
    type: String,
    default: ''
  },
  ext: {
    type: String,
    default: ""
  },
  userId: {
    type: String,
    default: ""
  },
  toc: {
    type: Date,
    default: Date.now,
    index: 1
  },
  // home work
  mode: {
    type: String,
    default: 'home'
  }
}, {
  collection: 'file',
  toObject: {
    getters: true,
    virtuals: true
  }
});

module.exports = mongoose.model('file', fileSchema);