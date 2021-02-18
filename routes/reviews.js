const express = require('express');
const router = express.Router({ mergeParams: true }); 
const Product = require('../models/product');
const Review = require('../models/review');

router.post('/', async(req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    // Create new review for current product
    const review = new Review(req.body.review);
    // Push new review onto the reviews object within the product
    product.reviews.push(review);
    // Save review and product
    await review.save();
    await product.save();
    res.redirect(`/products/${product._id}`);
})

router.delete('/:reviewId', async(req, res) => {
    const { id, reviewId } = req.params;
    await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/products/${id}`);
})

module.exports = router;