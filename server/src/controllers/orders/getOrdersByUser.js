'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { logger } = require('../../utils');
const { orders: orderService } = require('../../services/crud');

module.exports = asyncHandler(async (req, res) => {
	const { params: { id } } = req;

	const orders = await orderService.getOrdersByUser(id);

	res.status(StatusCodes.OK).json({
		success: true,
		total: orders.length,
		data: orders,
	});
});
