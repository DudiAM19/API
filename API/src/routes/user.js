const express = require('express');
const router = express.Router();
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require('./verifyToken');
const userController = require('../controllers/user');

//update
router.put('/:id', verifyTokenAndAuthorization, userController.updateUser);
// delete
router.delete('/:id', verifyTokenAndAuthorization, userController.deleteUser);
// get user
router.get('/find/:id', verifyTokenAndAdmin, userController.getUser);
// get all user
router.get('/', verifyTokenAndAdmin, userController.getAllUser);
router.get('/stats', verifyTokenAndAdmin, userController.getStat);

module.exports = router;