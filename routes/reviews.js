const express = require('express');
const router = express.Router({ mergeParams: true }); 
const Product = require('../models/product');
const Review = require('../models/review');
const {isLoggedIn} = require('../middleware');

router.post('/', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    // Create new review for current product
    const review = new Review(req.body.review);
    review.author = req.user._id;
    // Push new review onto the reviews object within the product
    product.reviews.push(review);
    // Save review and product
    await review.save();
    await product.save();
    req.flash('success', 'Thank you, your review has successfully been submitted.')
    res.redirect(`/products/${product._id}`);
})

router.delete('/:reviewId', isLoggedIn, async(req, res) => {
    const { id, reviewId } = req.params;
    await Product.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Your review has been successfully deleted.')
    res.redirect(`/products/${id}`);
})

module.exports = router;