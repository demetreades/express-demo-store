'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { logger } = require('../../utils');
const userService = require('../../services/crud');
const { User } = require('../../services/models');

module.exports = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await userService.getByProperty(User, id);

  logger.info(
    `USER PROFILE name: ${user.name} id: ${user._id}, email: ${user.email}`
  );

  res.status(StatusCodes.OK).json({
    success: true,
    data: user,
  });
});
