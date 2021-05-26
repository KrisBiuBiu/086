const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const designStyleSchema = new Schema({
    id: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        default: ''
    },
    // home work
    mode: {
        type: String,
        default: 'home'
    }
    }, {
        collection: 'designStyle',
        toObject: {
            getters: true,
            virtuals: true
        }
    });

module.exports = mongoose.model('designStyle', designStyleSchema);