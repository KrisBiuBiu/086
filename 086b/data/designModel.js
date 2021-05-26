const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const designSchema = new Schema({
    id: {
        type: String,
        default: '',
    },
    mode: {
        type: String,
        default: ''
    },
    style: {
        type: String,
        default: ''
    },
    styleName: {
        type: String,
        default: ''
    },
    sketch: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    img: {
        type: Array,
        default: [String]
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
}, {
    collection: 'design',
    toObject: {
        getters: true,
        virtuals: true
    }
});

// designSchema.virtual('styleName')
// .get(function() {
//   return this._styleName;
// })
// .set(function(styleName) {
//   this._styleName = styleName;
// });

designSchema.statics.extendDesigns = async (designs) => {
    let designStyleModel = mongoose.model('designStyle');
    designs.map(async(design) => {
        let style = await designStyleModel.findOne({id:design.style});
        design.styleName = style.name;
        // design = design.toObject();
        return design
    })
    console.log(designs)
    return designs;
}

module.exports = mongoose.model('design', designSchema);