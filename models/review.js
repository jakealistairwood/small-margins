const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema for the user review and merge with the productSchema in product.js (One product to many reviews)

const reviewSchema = new Schema({
    rating: Number,
    headline: String,
    body: String, 
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Review', reviewSchema);