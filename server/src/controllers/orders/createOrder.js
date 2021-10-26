'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { logger } = require('../../utils');
const orderService = require('../../services/crud');
const { Order } = require('../../services/models');

module.exports = asyncHandler(async (req, res) => {
	const { body } = req;

	const order = await orderService.create(Order, body);

	logger.info(`NEW ORDER id: ${order._id} DISPATCHED`);

	res.status(StatusCodes.CREATED).json({
		success: true,
		data: order,
	});
});
