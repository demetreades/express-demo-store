'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { logger, BaseError } = require('../../utils');
const productService = require('../../services/crud');
const { Product } = require('../../services/models');

module.exports = asyncHandler(async (req, res, next) => {
	const { fileName, file, params: { id } } = req;

	if (!fileName || !file) {
		return next(new BaseError('Upload error file or filename not found', StatusCodes.NOT_FOUND));
	}

	await productService.getByProperty(Product, { _id: id });

	const imagePath = `/img/products/${fileName}`;

	const updatedProduct = await productService.update(Product, id, { image: imagePath });

	logger.info(`NEW IMAGE uploaded: ${fileName} for Product name: ${updatedProduct.name}, id: ${updatedProduct.id}'}`);

	res.status(StatusCodes.OK).json({
		success: true,
		data: updatedProduct,
	});
});
