const Order = require('../models/Order');

// create
exports.createOrder = async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const saveOrder = await newOrder.save();
        res.status(200).json(saveOrder);
    } catch (error) {
        res.status(500).json(error);
    }
};

// update
exports.updateOrder = async (req, res) => {
    try {
        const updateOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updateOrder);
    } catch (error) {
        res.status(500).json(error);
    }
};

// delete
exports.deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json('order berhasil dihapus');
    } catch (error) {
        res.status(500).json(error);
    }
};

// get user order 
exports.getUserOrder = async (req, res) => {
    try {
        const order = await Order.find({userId: req.params.userId});
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error);
    }
};

// get all
exports.getAll = async (req, res) => {
    try {
        const order = await Order.find();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error)
    }
};

// get monthly income
exports.getMonthly = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            {$match: {createdAt: {$gte: previousMonth}}},
            {
                $project: {
                    month: {$month: '$createdAt'},
                    sales: '$amount',
                },
            },
            {
                $group: {
                    _id: '$month',
                    total: {$sum: '$sales'},
                },
            },
        ]);
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json(error);
    }
};