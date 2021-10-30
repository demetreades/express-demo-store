const router = require('express').Router();
const { protect, admin } = require('../utils');
const {
	getOrders,
	getOrderById,
	removeOrder,
	createOrder,
	updateOrder,
	getOrdersByUser
} = require('../controllers/orders/index');

router
	.route('/')
	.get(protect, admin, getOrders)
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
