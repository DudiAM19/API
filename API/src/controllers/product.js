const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.updateProduct = async (req, res) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true},
        );
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json(error);
    };
};

// delete
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json('product berhasil dihapus');
    } catch (error) {
        res.status(500).json(error);
    }
}

// get product
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
};

// get all 
exports.getAllProduct = async (req, res) => {
    const qnew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
        if(qnew){
            products = await Product.find().sort({createdAt: -1}).limit(1);
        }else if(qCategory){
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            });
        }else{
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
};