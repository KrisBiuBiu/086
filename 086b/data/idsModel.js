const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const idsSchema = new Schema({
	type: {
        type: String,
        unique: true,
        required: true,
    },
    count: {
        type: Number,
        default: 1
    }
}, {toObject: {
		getters: true,
		virtuals: true
}});

async function getNewId(type) {
    const idsModel = mongoose.model('ids');
    const ids = await idsModel.findOne({type});
    if(!ids) {
        const newIds = new idsModel({
            type
        });
        await newIds.save();
        return 1;
    }else{
        ids.count += 1;
        await ids.updateOne({$set:{type, count:ids.count}})
        return ids.count++;
    }
}
  
idsSchema.statics.getNewId = getNewId;

module.exports = mongoose.model('ids', idsSchema);