const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
// const sass = require('node-sass-middleware');
const methodOverride = require('method-override');
const Product = require('./models/product');
const Review = require('./models/review');

const products = require('./routes/products');
const reviews = require('./routes/reviews');

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
app.use('/products', products);
app.use('/products/:id/reviews', reviews);

// CRUD functionality
app.get('/', async (req, res) => {
    const products = await Product.find({});
    res.render('home', { products });
})



app.post('/', async (req, res) => {
    const product = new Product(req.body.product);
    await product.save();
    res.redirect(`/products/${product._id}`);
})


app.listen(3000, () => {
    console.log("Listening on Port 3000");
})
