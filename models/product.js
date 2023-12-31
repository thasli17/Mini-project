const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    productName:{type:String, required:true},
    productPrice:{type:Number, required:true},
    productQuantity:{type:Number, required:true},
    productCategory:{type:String, required:true},
    productDescription:{type:String, required:true},
    productImg:{type:[String], required:[true, "imges cannote be empty"]},
    isAvailable : {type:Boolean ,default:true, required:true},
    size: { type: [String], required: true }, // Add this line for size option
})

const ProductCollection = mongoose.model('product', productSchema)

module.exports = ProductCollection