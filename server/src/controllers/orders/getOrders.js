'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { BaseError, logger } = require('../../utils');
const { Order } = require('../../services/models');


/**
 * @description  Fetch all orders
 * @route        GET /api/orders
 * @access       Private/Admin
 */
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});

  logger.info(`GET ALL ${orders.length} ORDERS`);
  res.status(StatusCodes.OK).json({
    success: true,
    total: orders.length,
    orders,
  });
});

module.exports = getOrders;
