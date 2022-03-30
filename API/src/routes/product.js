const express = require('express');
const router = express.Router();
const {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
} = require('./verifyToken')
const productController = require('../controllers/product');

// create
router.post('/', verifyTokenAndAdmin, productController.createProduct);
// update
router.put('/:id', verifyTokenAndAdmin, productController.updateProduct);
// delete
router.delete('/:id', verifyTokenAndAdmin, productController.deleteProduct);
// get product
router.get('/find/:id', productController.getProduct);
// get all product
router.get('/', productController.getAllProduct);

module.exports = router;