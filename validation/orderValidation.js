const Joi = require('joi');

const orderItemSchema = Joi.object({
  productId: Joi.string().required().messages({
    'string.empty': 'Product ID is required',
    'any.required': 'Product ID is required'
  }),
  productName: Joi.string().required().messages({
    'string.empty': 'Product name is required',
    'any.required': 'Product name is required'
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    'number.integer': 'Quantity must be an integer',
    'number.min': 'Quantity must be at least 1',
    'any.required': 'Quantity is required'
  }),
  price: Joi.number().positive().precision(2).required().messages({
    'number.positive': 'Price must be a positive number',
    'any.required': 'Price is required'
  })
});

const orderSchema = Joi.object({
  customerName: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Customer name is required',
    'string.min': 'Customer name must be at least 2 characters long',
    'any.required': 'Customer name is required'
  }),
  customerEmail: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Customer email is required',
    'any.required': 'Customer email is required'
  }),
  products: Joi.array().items(orderItemSchema).min(1).required().messages({
    'array.min': 'At least one product is required',
    'any.required': 'Products are required'
  }),
  total: Joi.number().positive().precision(2).required().messages({
    'number.positive': 'Total must be a positive number',
    'any.required': 'Total is required'
  }),
  status: Joi.string().valid('pending', 'confirmed', 'shipped', 'delivered', 'cancelled').default('pending').messages({
    'any.only': 'Status must be one of: pending, confirmed, shipped, delivered, cancelled'
  }),
  shippingAddress: Joi.string().min(10).max(500).required().messages({
    'string.empty': 'Shipping address is required',
    'string.min': 'Shipping address must be at least 10 characters long',
    'any.required': 'Shipping address is required'
  }),
  // UPDATED: BOTH International AND Malawian payment methods
  paymentMethod: Joi.string().valid(
    // International methods
    'credit_card', 
    'paypal', 
    'bank_transfer',
    // Malawian methods
    'airtel_money', 
    'tnm_mpamba', 
    'cash_on_delivery'
  ).default('credit_card').messages({
    'any.only': 'Payment method must be: credit_card, paypal, bank_transfer, airtel_money, tnm_mpamba, or cash_on_delivery'
  })
});

const updateOrderSchema = Joi.object({
  customerName: Joi.string().min(2).max(100).optional().messages({
    'string.min': 'Customer name must be at least 2 characters long'
  }),
  customerEmail: Joi.string().email().optional().messages({
    'string.email': 'Please provide a valid email address'
  }),
  products: Joi.array().items(orderItemSchema).min(1).optional().messages({
    'array.min': 'At least one product is required'
  }),
  total: Joi.number().positive().precision(2).optional().messages({
    'number.positive': 'Total must be a positive number'
  }),
  status: Joi.string().valid('pending', 'confirmed', 'shipped', 'delivered', 'cancelled').optional().messages({
    'any.only': 'Status must be one of: pending, confirmed, shipped, delivered, cancelled'
  }),
  shippingAddress: Joi.string().min(10).max(500).optional().messages({
    'string.min': 'Shipping address must be at least 10 characters long'
  }),
  // UPDATED: BOTH International AND Malawian payment methods
  paymentMethod: Joi.string().valid(
    // International methods
    'credit_card', 
    'paypal', 
    'bank_transfer',
    // Malawian methods
    'airtel_money', 
    'tnm_mpamba', 
    'cash_on_delivery'
  ).optional().messages({
    'any.only': 'Payment method must be: credit_card, paypal, bank_transfer, airtel_money, tnm_mpamba, or cash_on_delivery'
  })
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

module.exports = {
  orderSchema,
  updateOrderSchema,
  orderItemSchema
};