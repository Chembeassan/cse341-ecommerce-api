const productsModel = require('../models/productsModel');
const { productSchema, updateProductSchema } = require('../validation/productValidation');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await productsModel.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single product by ID
const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsModel.getProductById(id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new product
const createProduct = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = productSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: error.details.map(detail => detail.message)
      });
    }

    const productData = {
      ...value,
      createdAt: new Date()
    };

    const result = await productsModel.createProduct(productData);
    res.status(201).json({
      message: 'Product created successfully',
      id: result.insertedId,
      product: productData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE product by ID
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate request body
    const { error, value } = updateProductSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: error.details.map(detail => detail.message)
      });
    }

    const updateData = {
      ...value,
      updatedAt: new Date()
    };

    const result = await productsModel.updateProduct(id, updateData);
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ 
      message: 'Product updated successfully',
      modifiedCount: result.modifiedCount 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE product by ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsModel.deleteProduct(id);
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ 
      message: 'Product deleted successfully',
      deletedCount: result.deletedCount 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct
};