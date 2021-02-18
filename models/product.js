const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const ProductSchema = new Schema({
    name: String,
    brand: String,
    description: String, 
    price: Number,
    size: [
        {
            type: String
        }
    ],
    color: String,
    category: String,
    link: String,
    img: String,
    onSale: Boolean,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

ProductSchema.post('findOneAndDelete', async function (doc) {
    if(doc) {
        await Review.remove({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Product', ProductSchema)