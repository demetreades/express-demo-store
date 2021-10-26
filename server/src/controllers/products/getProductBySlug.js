'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { BaseError, logger } = require('../../utils');
const productService = require('../../services/crud');
const { Product } = require('../../services/models');

module.exports = asyncHandler(async (req, res, next) => {
	const { slug } = req.params;

	const product = await productService.getByProperty(Product, slug);

	logger.info(
		`GET PRODUCT name: ${product.name}, id: ${product._id}, slug: ${product.slug}`
	);

	res.status(StatusCodes.OK).json({
		success: true,
		data: product,
	});
});
