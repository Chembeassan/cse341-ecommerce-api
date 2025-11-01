const productsModel = require('../models/productsModel');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await productsModel.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new product
const createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
      createdAt: new Date()
    };

    const result = await productsModel.createProduct(productData);
    res.status(201).json({
      message: 'Product created successfully',
      id: result.insertedId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct
};