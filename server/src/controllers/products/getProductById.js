'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { BaseError, logger } = require('../../utils');
const productService = require('../../services/crud');
const { Product } = require('../../services/models');

module.exports = asyncHandler(async (req, res, next) => {
	const { id } = req.params;

	const product = await productService.getByProperty(Product, id);

	logger.info(
		`GET PRODUCT name: ${product.name}, id: ${product._id}`
	);

	res.status(StatusCodes.OK).json({
		success: true,
		data: product,
	});
});
