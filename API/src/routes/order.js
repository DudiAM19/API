const express = require('express');
const router = express.Router();
const {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
} = require('./verifyToken');
const orderController = require('../controllers/order');

// create
router.post('/', verifyToken, orderController.createOrder);
// update
router.put('/:id', verifyTokenAndAdmin, orderController.updateOrder);
// delete
router.delete('/:id', verifyTokenAndAdmin, orderController.deleteOrder);
// get user orders
router.get('/find/:userId', verifyTokenAndAuthorization, orderController.getUserOrder);
// get all
router.get('/', verifyTokenAndAdmin, orderController.getAll);
// get monthly income
router.get('/income', verifyTokenAndAdmin, orderController.getMonthly);

module.exports = router;