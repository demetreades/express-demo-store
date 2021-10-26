'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { BaseError, logger } = require('../../utils');

module.exports = asyncHandler(async (req, res, next) => {
  console.log('mpike logout');
  let { user } = req;

  console.log(user, '\nlogout user');
  if (!user) {
    return next(new BaseError('No user to log out', StatusCodes.NOT_FOUND));
  }

  logger.info(
    `USER name: ${user.name}, id: ${user._id}, email: ${user.email} LOGOUT`
  );

  user = null;

  res.status(StatusCodes.OK).json({
    success: true,
    data: user,
  });
});
