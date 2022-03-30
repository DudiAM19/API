const stripe = require('stripe')(123123);

// stripes
exports.stripes = (req, res) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: 'usd',
        }
    )
}