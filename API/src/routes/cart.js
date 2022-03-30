const express = require('express');
const router = express.Router();
const {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
} = require('./verifyToken');
const blogController = require('../controllers/cart');

// create
router.post('/', verifyToken, blogController.createBlog);
// update
router.put('/:id', verifyTokenAndAuthorization, blogController.updateBlog)
// delete
router.delete('/:id', verifyTokenAndAuthorization, blogController.deleteBlog);
// get user cart
router.get('/find/:userId', verifyTokenAndAuthorization, );
// get all
router.get('/', verifyTokenAndAdmin, blogController.getAll);

module.exports = router