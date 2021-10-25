'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { BaseError, logger } = require('../../utils');
const { Order } = require('../../services/models');
/*
 * @desc    Get single order by id
 * @route   GET /api/orders/:id
 * @access  Private
 **/
const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate('user', 'name email');

  if (order) {
    res.status(StatusCodes.OK).json({
      success: true,
      message: `Order with id: ${order._id} fetched`,
      order,
    });
  } else {
    res.status(StatusCodes.NOT_FOUND);
    throw new Error(`Order with id: ${order._id} not found`);
  }
});

module.exports = getOrderById;
