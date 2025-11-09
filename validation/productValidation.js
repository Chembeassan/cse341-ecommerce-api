const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Product name is required',
    'string.min': 'Product name must be at least 2 characters long',
    'string.max': 'Product name cannot exceed 100 characters',
    'any.required': 'Product name is required'
  }),
  price: Joi.number().positive().precision(2).required().messages({
    'number.positive': 'Price must be a positive number',
    'number.precision': 'Price can have up to 2 decimal places',
    'any.required': 'Price is required'
  }),
  category: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Category is required',
    'string.min': 'Category must be at least 2 characters long',
    'any.required': 'Category is required'
  }),
  description: Joi.string().max(500).optional().allow('').messages({
    'string.max': 'Description cannot exceed 500 characters'
  }),
  brand: Joi.string().max(50).optional().allow('').messages({
    'string.max': 'Brand cannot exceed 50 characters'
  }),
  stockQuantity: Joi.number().integer().min(0).default(0).messages({
    'number.integer': 'Stock quantity must be an integer',
    'number.min': 'Stock quantity cannot be negative'
  })
});

const updateProductSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional().messages({
    'string.min': 'Product name must be at least 2 characters long',
    'string.max': 'Product name cannot exceed 100 characters'
  }),
  price: Joi.number().positive().precision(2).optional().messages({
    'number.positive': 'Price must be a positive number',
    'number.precision': 'Price can have up to 2 decimal places'
  }),
  category: Joi.string().min(2).max(50).optional().messages({
    'string.min': 'Category must be at least 2 characters long'
  }),
  description: Joi.string().max(500).optional().allow('').messages({
    'string.max': 'Description cannot exceed 500 characters'
  }),
  brand: Joi.string().max(50).optional().allow('').messages({
    'string.max': 'Brand cannot exceed 50 characters'
  }),
  stockQuantity: Joi.number().integer().min(0).optional().messages({
    'number.integer': 'Stock quantity must be an integer',
    'number.min': 'Stock quantity cannot be negative'
  })
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

module.exports = {
  productSchema,
  updateProductSchema
};