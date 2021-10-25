'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { BaseError, logger } = require('../../utils');
const { User } = require('../../services/models');

/**
 * @description  Fetch all users
 * @route        GET /api/users
 * @access       Private/Admin
 */

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  logger.info(`GET ALL ${users.length} USERS`);
  res.status(StatusCodes.OK).json({
    success: true,
    total: users.length,
    users,
  });
});

module.exports = getUsers;
