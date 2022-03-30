const Cart = require('../models/Cart');

// create
exports.createBlog = async (req, res, next) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json(error);
    }
}

// update
exports.updateBlog = async (req, res) => {
    try {
        const updateCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updateCart);
    } catch (error) {
        res.status(500).json(error);
    }
}

// delete
exports.deleteBlog = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json('cart berhasil dihapus');
    } catch (error) {
        res.status(500).json(error);
    }
}

// get user cart
exports.getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
    }
}

// get all
exports.getAll = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error);
    }
}