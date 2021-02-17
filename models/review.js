const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Create schema for the user review and merge with the productSchema in product.js (One product to many reviews)

const reviewSchema = new Schema({
    body: String, 
    rating: Number,
})

module.exports = mongoose.model('Review', reviewSchema);