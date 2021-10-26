'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { logger } = require('../../utils');
const productService = require('../../services/crud');
const { Product } = require('../../services/models');

module.exports = asyncHandler(async (req, res) => {
	const { body, user: { id } } = req;

  const product = await productService.create(Product, {
    ...body,
    user: id,
  });

  logger.info(`NEW PRODUCT name: ${product.name}, id: ${product._id} CREATED`);

  res.status(StatusCodes.CREATED).json({
    success: true,
    data: product,
  });
});
