const router = require('express').Router();
const { protect, admin, paginatedData } = require('../utils');
const {
	getOrders,
	getOrderById,
	removeOrder,
	createOrder,
	updateOrder,
	getOrdersByUser
} = require('../controllers/orders/index');

const { Order } = require('../services/models');

router
	.route('/')
	.get(paginatedData(Order), protect, admin, getOrders)
	.post(createOrder);

router
	.route('/:id')
	.get(protect, admin, getOrderById)
	.put(protect, admin, updateOrder)
	.delete(protect, admin, removeOrder);

router
	.route('/user/:id')
	.get(protect, getOrdersByUser);

module.exports = router;
