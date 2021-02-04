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
            description: `${products[i].description}`,
            price: `${products[i].price}`,
            size: `${products[i].size}`,
            color: `${products[i].color}`,
            category: `${products[i].category}`,
            link: `${products[i].link}`,
            img: `${products[i].img}`,
            onSale: `${products[i].onSale}`,
        })
        await productGallery.save();
    }
}

productDatabase().then(() => {
    mongoose.connection.close();
})