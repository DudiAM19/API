const express = require('express');
const route = express.Router();
const stripeController = require('../controllers/stripe');

route.post('/payment', stripeController.stripes);

module.exports = route;