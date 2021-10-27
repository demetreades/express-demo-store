const router = require('express').Router();
const { protect, admin } = require('../utils');
const {
	getOrders,
	getOrderById,
	removeOrder,
	createOrder,
	updateOrder,
} = require('../controllers/orders/index');

router
	.route('/')
	.get(getOrders)
	.post(protect, admin, createOrder)
	.get(protect, admin, getOrders);

router
	.route('/:id')
	.get(protect, admin, getOrderById)
	.put(protect, admin, updateOrder)
	.delete(protect, admin, removeOrder);

module.exports = router;
