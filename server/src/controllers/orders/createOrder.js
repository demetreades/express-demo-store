'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { logger } = require('../../utils');
const { Order } = require('../../services/models');

/**
 * @desc    Dispatch new order
 * @route   POST /api/orders
 * @access  Public
 */
const createOrder = asyncHandler(async (req, res) => {
  const newOrder = await Order.create(req.body);

  logger.info(`NEW ORDER: ${newOrder.name}, id: ${newOrder._id} DISPATCHED`);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: `new order with id: ${newOrder._id} dispatched`,
    newOrder: createOrder,
  });
});

module.exports = createOrder;
