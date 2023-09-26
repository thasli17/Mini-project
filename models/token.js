const mongoose = require('mongoose');
const { schema } = require('./userSchema');

const tokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User', 
        required:true
    },
    expiration:{
        type:Date,
        required:true
    }

})

const TokenCollection = mongoose.model('TokenCollection',tokenSchema)
module.exports = TokenCollection;