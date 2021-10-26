'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { logger } = require('../../utils');
const orderService = require('../../services/crud');
const { Order } = require('../../services/models');


module.exports = asyncHandler(async (req, res) => {
	const { params: { id } } = req;

	const order = await orderService.getByProperty(Order, id);

	logger.info(`GET ORDER id: ${order._id}`);

	res.status(StatusCodes.OK).json({
		success: true,
		data: order,
	});
});
