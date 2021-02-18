const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
// const sass = require('node-sass-middleware');
const methodOverride = require('method-override');
const Product = require('./models/product');
const Review = require('./models/review');

mongoose.connect('mongodb://localhost:27017/small-margins', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
    console.log("Database Connected")
})

const app = express();

// Middleware
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
// app.use(
//     sass({
//         src: __dirname + '/public',
//         dest: __dirname + '/public/css',
//         indentedSyntax: false,
//         debug: true,
//         sourceMap: true
//     })
// )
app.use(express.static(path.join(__dirname + "/public")));
app.use(methodOverride('_method'));

// CRUD functionality
app.get('/', async (req, res) => {
    const products = await Product.find({});
    res.render('home', { products });
})

app.get('/products/new', async (req, res) => {
    res.render('items/new');
})

app.post('/', async (req, res) => {
    const product = new Product(req.body.product);
    await product.save();
    res.redirect(`/products/${product._id}`);
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('reviews');
    console.log(product);
    res.render('items/product', { product })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('items/edit', { product });
});

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { ... req.body.product });
    res.redirect(`/products/${product._id}`);
})

app.delete('/products/:id', async(req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/');
})

app.post('/products/:id/reviews', async(req, res) => {
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

app.listen(3000, () => {
    console.log("Listening on Port 3000");
})
