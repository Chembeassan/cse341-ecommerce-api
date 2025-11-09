const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - customerName
 *         - customerEmail
 *         - products
 *         - total
 *         - shippingAddress
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the order
 *         customerName:
 *           type: string
 *           description: The customer's name
 *         customerEmail:
 *           type: string
 *           description: The customer's email
 *         products:
 *           type: array
 *           items:
 *             type: object
 *           description: Array of products in the order
 *         total:
 *           type: number
 *           description: The total order amount
 *         status:
 *           type: string
 *           description: Order status
 *         shippingAddress:
 *           type: string
 *           description: Shipping address
 *         paymentMethod:
 *           type: string
 *           description: Payment method
 *         orderDate:
 *           type: string
 *           format: date-time
 *           description: Order date
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: The list of all orders
 */
router.get('/', ordersController.getAllOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: The order data
 *       404:
 *         description: Order not found
 */
router.get('/:id', ordersController.getSingleOrder);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: The order was created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', ordersController.createOrder);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: The order was updated successfully
 *       404:
 *         description: Order not found
 */
router.put('/:id', ordersController.updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: The order was deleted successfully
 *       404:
 *         description: Order not found
 */
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;
