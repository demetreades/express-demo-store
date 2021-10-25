'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { BaseError, logger } = require('../../utils');
const { Product } = require('../../services/models');

/**
 * @desc    Create a product
 * @route   POST /api/products
 * @access  Private/Admin
 */
const createProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product.create(req.body);

  logger.info(`NEW PRODUCT: ${newProduct.name}, id: ${newProduct._id} CREATED`);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'new product created',
    newProduct,
  });
});

module.exports = createProduct;
