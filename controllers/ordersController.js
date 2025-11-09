const ordersModel = require('../models/ordersModel');
const { orderSchema, updateOrderSchema } = require('../validation/orderValidation');

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await ordersModel.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single order by ID
const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await ordersModel.getOrderById(id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new order
const createOrder = async (req, res) => {
  try {
    // Validate request body
    const { error, value } = orderSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: error.details.map(detail => detail.message)
      });
    }

    const orderData = {
      ...value,
      orderDate: new Date(),
      createdAt: new Date()
    };

    const result = await ordersModel.createOrder(orderData);
    res.status(201).json({
      message: 'Order created successfully',
      id: result.insertedId,
      order: orderData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order by ID
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate request body
    const { error, value } = updateOrderSchema.validate(req.body);
    
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

    const result = await ordersModel.updateOrder(id, updateData);
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ 
      message: 'Order updated successfully',
      modifiedCount: result.modifiedCount 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete order by ID
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ordersModel.deleteOrder(id);
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ 
      message: 'Order deleted successfully',
      deletedCount: result.deletedCount 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder
};