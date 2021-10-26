'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { logger } = require('../../utils');
const productService = require('../../services/crud');
const { Product } = require('../../services/models');

module.exports = asyncHandler(async (req, res, next) => {
	const { id } = req.params;

	const product = await productService.remove(Product, id);

	logger.info(`PRODUCT: name: ${product.name}, id: ${product._id} DELETED`);

	res.status(StatusCodes.OK).json({
		success: true,
		data: {},
	});
});
