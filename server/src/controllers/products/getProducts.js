'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { logger } = require('../../utils');
const productService = require('../../services/crud');
const { Product } = require('../../services/models');

module.exports = asyncHandler(async (req, res) => {
	const products = await productService.getAll(Product);

	logger.info(`GET ALL PRODUCTS, COUNT: ${products.length}`);
	res.status(StatusCodes.OK).json({
		success: true,
		total: products.length,
		data: products,
	});
});
