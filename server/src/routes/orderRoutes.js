const router = require('express').Router();
// const { protect, admin } = require('../../utils');
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
	.post(createOrder);
// .get(protect, admin, getOrders)

router
	.route('/:id')
	.get(getOrderById)
	.put(updateOrder)
	.delete(removeOrder);
// .get(protect, getOrderById)
// .delete(protect, admin, removeOrder);

module.exports = router;
