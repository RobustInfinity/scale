const mongoose = require('mongoose')
const {Schema} = mongoose

const SessionSchema = new Schema({
    sessionId : {
        type :String,
        required : true,
        unique : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Session',SessionSchema)