'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { BaseError, logger } = require('../../utils');
const { Product } = require('../../services/models');

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
const deleteProduct = asyncHandler(async (req, res, next) => {
  const { product_id } = req.params;
  const product = await Product.findById(product_id);

  if (!product) {
    return next(
      new BaseError(
        StatusCodes.NOT_FOUND,
        `Product with id: ${product_id} not found`
      )
    );
  }

  logger.info(`PRODUCT: ${product.name} ${product._id} DELETED!`);
  await product.remove();

  res.status(StatusCodes.OK).json({
    success: true,
    message: `Product with id: ${product_id} removed`,
    data: {},
  });
});

module.exports = deleteProduct;
