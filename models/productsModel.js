const { ObjectId } = require('mongodb');
const database = require('../db/connect');

const getAllProducts = async () => {
  try {
    const db = database.getDb();
    const result = await db.collection('products').find();
    return result.toArray();
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const db = database.getDb();
    const productId = new ObjectId(id);
    const result = await db.collection('products').findOne({ _id: productId });
    return result;
  } catch (error) {
    throw error;
  }
};

const createProduct = async (productData) => {
  try {
    const db = database.getDb();
    const result = await db.collection('products').insertOne(productData);
    return result;
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (id, updateData) => {
  try {
    const db = database.getDb();
    const productId = new ObjectId(id);
    const result = await db.collection('products').updateOne(
      { _id: productId },
      { $set: updateData }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const db = database.getDb();
    const productId = new ObjectId(id);
    const result = await db.collection('products').deleteOne({ _id: productId });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};