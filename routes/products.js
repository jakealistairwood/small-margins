const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/new', async (req, res) => {
    res.render('items/new');
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('reviews');
    console.log(product);
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
    res.redirect(`/products/${product._id}`);
})

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/');
})

module.exports = router;