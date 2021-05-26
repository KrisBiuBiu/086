const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const materTypesSchema = new Schema({
    // id: {
    //     type: Number,
    //     default: '',
    // },
    name: {
        type: String,
        default: ''
    },
    types: {
        type: Array,
        default: []
    },
    inUse: {
        type: Boolean,
        default: true
    }
}, {
    collection: 'materTypes',
    toObject: {
        getters: true,
        virtuals: true
    }
});

module.exports = mongoose.model('materTypes', materTypesSchema);