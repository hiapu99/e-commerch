const productModels = require('../models/product.models');

module.exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, images, category } = req.body

        const newProduct = await productModels.create({
            name: name,
            description: description,
            price: price,
            category: category,
            images: images
        })
        const products = await newProduct.save();
        res.status(201).json({
            success: true,
            products
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}


module.exports.getallproduct = async (req, res) => {
    try {
        const product = await productModels.find();
        res.status(201).json({
            success: true,
            product
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

module.exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id; // Assuming the product ID is provided in the request parameters
        const { name, description, price, category, images } = req.body;

        // Find the product by ID and update its fields
        const updatedProduct = await productModels.findByIdAndUpdate(productId, {
            name: name,
            description: description,
            price: price,
            category: category,
            images: images
        }, { new: true }); // { new: true } ensures that the updated document is returned

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                error: "Product not found"
            });
        }

        // Send the updated product as a JSON response
        res.status(200).json({
            success: true,
            product: updatedProduct
        });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};
module.exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id; // Assuming the product ID is provided in the request parameters

        // Find the product by ID and delete it
        const deletedProduct = await productModels.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                error: "Product not found"
            });
        }

        // Send a success response indicating the product has been deleted
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

module.exports.getProductDetails = async (req, res) => {
    try {
        const productId = req.params.id; // Assuming the product ID is provided in the request parameters

        // Find the product by ID
        const product = await productModels.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                error: "Product not found"
            });
        }

        // Send the product details as a JSON response
        res.status(200).json({
            success: true,
            product: product
        });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};