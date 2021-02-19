const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/new', async (req, res) => {
    res.render('items/new');
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('reviews');
    if(!product) {
        req.flash('error', 'Sorry, we were unable to find the item you are looking for.')
        return res.redirect('/');
    }
    res.render('items/product', { product })
})

router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('items/edit', { product });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { ... req.body.product });
    req.flash('success', 'Changes to product updated successfully!')
    res.redirect(`/products/${product._id}`);
})

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    req.flash('success', 'The current product has been successfully deleted.')
    res.redirect('/');
})

module.exports = router;