require('dotenv').config();
const express = require('express');
const app = express()
const products_routes = require('./routes/products')
const connectDB = require('./db/connect')

const PORT = process.env.PORT || 5000;

app.get("/", (req,res) => {
    res.send("Hello Everyone")
})

// middleware or to set router
app.use("/api/products", products_routes)


// Server Connection

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`Yes i am connected with ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}


start()


