'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { logger } = require('../../utils');
const orderService = require('../../services/crud');
const { Order } = require('../../services/models');

module.exports = asyncHandler(async (req, res) => {
	const orders = await orderService.getAll(Order);

	logger.info(`GET ALL ORDERS, COUNT: ${orders.length}`);

	res.status(StatusCodes.OK).json({
		success: true,
		total: orders.length,
		data: orders,
	});
});
