const connectDB = require('./db/connect');
require('dotenv').config();
const Product = require('./model/products')
const ProductJson = require('./products.json')

const start = async( ) =>{
    try {
        await connectDB(process.env.MONGODB_URL)
        // await Product.deleteMany()
        await Product.create(ProductJson)
        console.log('Data Added!');
    } catch (error) {
        console.log(error);
    }
}

start()