'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { BaseError, logger } = require('../../utils');
const { Product } = require('../../services/models');

/**
 * @description  Fetch single products
 * @route        GET /api/products/:id
 * @access       Public
 */
const getProductById = asyncHandler(async (req, res, next) => {
  const { product_id } = req.params;
  const fetchProduct = await Product.findById(product_id);

  if (!fetchProduct) {
    return next(
      new BaseError(
        StatusCodes.NOT_FOUND,
        `Product with id: ${product_id} not found`
      )
    );
  }

  logger.info(
    `GET Product: ${fetchProduct.name}, ID: ${fetchProduct._id}, CATEGORY: ${fetchProduct.category}, DESC: ${fetchProduct.description}`
  );

  res.status(StatusCodes.OK).json({
    success: true,
    fetchProduct,
  });
});

module.exports = getProductById;
