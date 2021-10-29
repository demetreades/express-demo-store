'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { logger } = require('../../utils');
const productService = require('../../services/crud');
const { Product } = require('../../services/models');

module.exports = asyncHandler(async (req, res) => {
	const { fileName, params: { id } } = req;

	await productService.getByProperty(Product, { _id: id });

	const imagePath = `/img/products/${fileName}`;

	const updatedProduct = await productService.update(Product, id, { image: imagePath });

	logger.info(`NEW IMAGE uploaded: ${fileName} for Product name: ${updatedProduct.name}, id: ${updatedProduct.id}'}`);

	res.status(StatusCodes.CREATED).json({
		success: true,
		data: updatedProduct,
	});
});
