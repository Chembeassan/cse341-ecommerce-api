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
    const { name, price, category, description, brand, stockQuantity } = req.body;
    
    // Basic validation
    if (!name || !price || !category) {
      return res.status(400).json({ 
        error: 'Name, price, and category are required' 
      });
    }

    const productData = {
      name,
      price: parseFloat(price),
      category,
      description: description || '',
      brand: brand || '',
      stockQuantity: stockQuantity || 0,
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