const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoute = require('./src/routes/auth');
const cartRoute = require('./src/routes/cart');
const orderRoute = require('./src/routes/order');
const productRoute = require('./src/routes/product');
const stripeRoute = require('./src/routes/stripe');
const userRoute = require('./src/routes/user');


dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(5000, () => {
        console.log('Backend server is running');
    });
})
.catch(err => {
    console.log(err);
});

app.use(cors());
app.use(express.json);
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);