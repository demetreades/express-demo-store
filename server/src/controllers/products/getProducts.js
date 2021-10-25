'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { BaseError, logger } = require('../../utils');
const { Product } = require('../../services/models');
/**
 * @description  Fetch all products
 * @route        GET /api/products
 * @access       Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  logger.info(`GET ALL ${products.length} PRODUCTS`);
  res.status(StatusCodes.OK).json({
    success: true,
    total: products.length,
    products,
  });
});

module.exports = getProducts;
