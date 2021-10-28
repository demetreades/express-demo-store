const getOrders = require('./getOrders');
const createOrder = require('./createOrder');
const updateOrder = require('./updateOrder');
const removeOrder = require('./removeOrder');
const getOrderById = require('./getOrderById');
const getOrdersByUser = require('./getOrdersByUser');

module.exports = {
	getOrders,
	createOrder,
	updateOrder,
	removeOrder,
	getOrderById,
	getOrdersByUser,
};
