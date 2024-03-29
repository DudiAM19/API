const User = require('../models/User');

// update
exports.updateUser = async (req, res) => {
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            anjay123
        ).toString();
    }

    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json(error);
    }
};

// delete
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been delete...');
    } catch (error) {
        res.status(500).json(error);
    }
};

// get user
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = others._doc;
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error);
    }
}

// get all user
exports.getAllUser = async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

//get stats
exports.getStat = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            {
                $match : 
                {
                    createdAt: 
                    {
                        $gte: lastYear
                    }
                }
            },
            {
                $project: {
                    _id: '$mounth',
                    total: {$sum: 1},
                }
            }
        ]);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error);
    }
};