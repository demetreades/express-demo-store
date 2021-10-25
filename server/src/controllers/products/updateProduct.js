'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { BaseError, logger } = require('../../utils');
const { Product } = require('../../services/models');

/**
 * @desc    Update a product
 * @route   POST /api/products/:id
 * @access  Private/Admin
 */
const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(
      new BaseError(StatusCodes.NOT_FOUND, `Product with id: ${id} not found`)
    );
  }

  logger.info(`PRODUCT: ${product.name}, ID: ${product._id} UPDATED`);

  res.status(StatusCodes.OK).json({
    success: true,
    product,
  });
});

module.exports = updateProduct;
