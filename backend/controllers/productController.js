const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');


exports.getProducts = asyncHandler(async (req, res) => {
    if (req.query.keyword) {
        const products = await Product.find(
            { $text: { $search: req.query.keyword } },
            { score: { $meta: 'textScore' } }
        ).sort({ score: { $meta: 'textScore' } });
        return res.json(products);
    }

    const products = await Product.find();
    res.json(products);
});


exports.getProductsByCategory = asyncHandler(async (req, res) => {
    const products = await Product.find({ category: req.params.category })

    if (products.length === 0) {
        return res.status(404).json({
            message: "No products found in this category"
        })
    }

    res.json(products)
});