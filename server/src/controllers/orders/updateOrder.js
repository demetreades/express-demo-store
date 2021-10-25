'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { BaseError, logger } = require('../../utils');
const { Order } = require('../../services/models');

// updateOrder
/**
 * @desc    Update a product
 * @route   POST /api/products/:id
 * @access  Private/Admin
 */
const updateOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!order) {
    return next(
      new BaseError(StatusCodes.NOT_FOUND, `Product with id: ${id} not found`)
    );
  }

  logger.info(`order: ${order.name}, ID: ${order._id} UPDATED`);

  res.status(StatusCodes.OK).json({
    success: true,
    order,
  });
});

module.exports = updateOrder;
