'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { BaseError, logger } = require('../../utils');
const { Product } = require('../../services/models');

module.exports = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const product = await Product.findById(id);

	if (!product) {
		return next(
			new BaseError(StatusCodes.NOT_FOUND, `Product with id: ${id} not found`)
		);
	}

	logger.info(`PRODUCT: ${product.name} ${product._id} DELETED!`);
	await product.remove();

	res.status(StatusCodes.OK).json({
		success: true,
		message: `Product with id: ${id} removed`,
		data: {},
	});
});
