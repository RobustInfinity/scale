
const mongoose = require('mongoose')
const {Schema} = mongoose

const ImageSchema = new Schema({
    imageId : {
        type : String,
        required : true,
        unique : true
    },
    public_id : {
        type : String,
        required : true,
        unique : true
    },
    user : {
        required : true,
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    url : {
        type : String,
        required : true
    },
    enableSharing : {
        type : Boolean,
        required  :true
    },
    createdAt : {
        type : Date,
        required : true,
        default : Date.now()
    }
})

module.exports = mongoose.model('Image',ImageSchema)