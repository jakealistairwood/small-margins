const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const catchAsync = require('../utils/catchAsync');

router.get('/new', catchAsync(async (req, res) => {
    res.render('items/new');
}))

router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('reviews');
    if(!product) {
        req.flash('error', 'Sorry, we were unable to find the item you are looking for.')
        return res.redirect('/');
    }
    res.render('items/product', { product })
}))

router.get('/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('items/edit', { product });
}))

router.put('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { ... req.body.product });
    req.flash('success', 'Changes to product updated successfully!')
    res.redirect(`/products/${product._id}`);
}))

router.delete('/:id', catchAsync(async(req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    req.flash('success', 'The current product has been successfully deleted.')
    res.redirect('/');
}))

module.exports = router;