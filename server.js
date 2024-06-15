const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const Product = require('./models/Product');
const app = express();

const port = 8083;
const mongoDB = 'mongodb://localhost:27017/mydata_manage';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.set('view engine', 'ejs');
app.use(express.json());
app.use('/api', productRoutes);

app.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('index', { data: { products: products } });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error occurred while fetching products');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
