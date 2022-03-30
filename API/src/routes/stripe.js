const express = require('express');
const route = express.Router();
const stripe = require('stripe')(123123);

route.post('/payment', (req, res) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: 'usd',
        }
    )
})

module.exports = route;