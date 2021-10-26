'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { logger, BaseError } = require('../../utils');
const userService = require('../../services/crud');
const { User } = require('../../services/models');

module.exports = asyncHandler(async (req, res, next) => {
	const { params: { id } } = req;

  const user = await userService.getByProperty(User, {_id: id});

  logger.info(
    `USER name: ${user.name} id: ${user._id}, email: ${user.email}`
  );

  res.status(StatusCodes.OK).json({
    success: true,
    data: user,
  });
});
