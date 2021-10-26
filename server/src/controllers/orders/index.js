const getOrders = require('./getOrders');
const createOrder = require('./createOrder');
const updateOrder = require('./updateOrder');
const removeOrder = require('./removeOrder');
const getOrderById = require('./getOrderById');

module.exports = {
	getOrders,
	removeOrder,
	getOrderById,
	createOrder,
	updateOrder,
};
