'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { logger } = require('../../utils');
const orderService = require('../../services/crud');
const { Order } = require('../../services/models');

module.exports = asyncHandler(async (req, res, next) => {
	const { body, params: { id } } = req;

	const order = await orderService.update(Order, id, body, {
		new: true,
		runValidators: true,
	});

	logger.info(`ORDER id: ${order._id} UPDATED`);

	res.status(StatusCodes.OK).json({
		success: true,
		data: order,
	});
});
