const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const materSchema = new Schema({
    id: {
        type: String,
        default: '',
    },
    materType: {
        type: String,
        default: ''
    },
    materName: {
        type: String,
        default: ""
    },
    price: {
        type: String,
        default: ''
    }
}, {
    collection: 'mater',
    toObject: {
        getters: true,
        virtuals: true
    }
});

module.exports = mongoose.model('mater', materSchema);