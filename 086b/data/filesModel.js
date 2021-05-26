const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const filesSchema = new Schema({
    id: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        default:""
    },
    oname: {
        type: String,
        default: ''
    },
    ext: {
        type: String,
        default: ""
    },
    uid: {
        type: String,
        default:""
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
        collection: 'files',
        toObject: {
            getters: true,
            virtuals: true
        }
    });

module.exports = mongoose.model('files', filesSchema);