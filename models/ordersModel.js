const { ObjectId } = require('mongodb');
const database = require('../db/connect');

const getAllOrders = async () => {
  try {
    const db = database.getDb();
    const result = await db.collection('orders').find();
    return result.toArray();
  } catch (error) {
    throw error;
  }
};

const getOrderById = async (id) => {
  try {
    const db = database.getDb();
    const orderId = new ObjectId(id);
    const result = await db.collection('orders').findOne({ _id: orderId });
    return result;
  } catch (error) {
    throw error;
  }
};

const createOrder = async (orderData) => {
  try {
    const db = database.getDb();
    const result = await db.collection('orders').insertOne(orderData);
    return result;
  } catch (error) {
    throw error;
  }
};

const updateOrder = async (id, updateData) => {
  try {
    const db = database.getDb();
    const orderId = new ObjectId(id);
    const result = await db.collection('orders').updateOne(
      { _id: orderId },
      { $set: updateData }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteOrder = async (id) => {
  try {
    const db = database.getDb();
    const orderId = new ObjectId(id);
    const result = await db.collection('orders').deleteOne({ _id: orderId });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
};