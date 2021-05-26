const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
	uid: {
        type: Number,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        default: ''
    },
    mobileNumber: {
        type: String,
        default: ''
    },
    registerTime: {
        type: Date,
        default: Date.now,
        index: 1
    }
}, {
    collection: 'users',
    toObject: {
        getters: true,
        virtuals: true
    }
});

usersSchema.statics.checkMobileExists = async (mobileNumber) => {
    let exi = false;
    const usersModel = mongoose.model('users');
    let user = await usersModel.findOne({mobileNumber});
    if(user) exi = true;
    return exi;
} 

module.exports = mongoose.model('users', usersSchema);