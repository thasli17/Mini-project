const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    categoryName: {type:String, required:true},
    categoryDesc: {type:String, required:true}
})

const CategoryCollection = mongoose.model('category',categorySchema)
module.exports = CategoryCollection;