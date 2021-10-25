'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { BaseError, logger } = require('../../utils');
const { Order } = require('../../services/models');

/**
 * @desc    Delete an order
 * @route   DELETE /api/orders/:id
 * @access  Private/Admin
 */
const deleteOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) {
    return next(
      new BaseError(StatusCodes.NOT_FOUND, `Order with id: ${id} not found`)
    );
  }

  logger.info(`ORDER: ${order.name} ${order._id} DELETED!`);
  await order.remove();

  res.status(StatusCodes.OK).json({
    success: true,
    message: `Order with id: ${id} removed`,
    deletedOrder: {},
  });
});

module.exports = deleteOrder;
