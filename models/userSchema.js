const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    
    username:{
        type:String,
        required:true,
    },   
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isBlocked:{
        type:Boolean,
        default:false,   // By default, a user is not blocked
    },
    cart:{
        type:[{
            productName:{
                type:String
            },
            quantity:{type:Number},
            productPrice:{type:Number},
            productImg:{type:[String], required:[true, "imges cannote be empty"]},

        }]
    }
})

const User = mongoose.model('User',userSchema);

module.exports = User;