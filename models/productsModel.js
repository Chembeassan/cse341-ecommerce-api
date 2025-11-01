const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

// Get all products
const getAllProducts = async () => {
  const db = getDb();
  const products = await db.collection('products').find().toArray();
  console.log(`📦 Found ${products.length} products`);
  return products;
};

// Create new product
const createProduct = async (productData) => {
  const db = getDb();
  const result = await db.collection('products').insertOne(productData);
  console.log(`➕ Created new product with ID: ${result.insertedId}`);
  return result;
};

module.exports = {
  getAllProducts,
  createProduct
};