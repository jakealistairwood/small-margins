const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    brand: String,
    desc: String, 
    price: Number,
    size: [{type: String}],
    color: String,
    category: String,
    link: String,
    img: String,
    onSale: Boolean
})

module.exports = mongoose.model('Product', ProductSchema)