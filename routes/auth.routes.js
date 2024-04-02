const express = require('express');
const { createProduct, getallproduct, updateProduct, getProductDetails, deleteProduct } = require('../controller/product.ctrl');
const { register, loginuser } = require('../controller/user.ctrl');
const { requireSignIn, isAdmin } = require('../medillware/auth.middleware.js');

const router = express.Router();

// Define route for creating a product
router.post("/product", createProduct);
router.get("/allproduct", getallproduct);
router.put("/updateproduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct); // Corrected route definition
router.get("/detailsProduct/:id", getProductDetails);

// user routes
router.post('/register', register)
router.post('/login', loginuser)
router.get('/test',requireSignIn,isAdmin);

module.exports = router;
