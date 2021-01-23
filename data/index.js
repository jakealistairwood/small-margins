const mongoose = require('mongoose');
const products = require('./products');
const Product = require('../models/product');

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

const productDatabase = async () => {
    await Product.deleteMany({}); 
    for (let i = 0; i < products.length; i++) {
        const productGallery = new Product({
            name: `${products[i].name}`,
            brand: `${products[i].brand}`,
            desc: `${product[i].desc}`
        })
        await productGallery.save();
    }
}

productDatabase().then(() => {
    mongoose.connection.close();
})