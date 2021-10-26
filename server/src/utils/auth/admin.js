'use strict';

const { StatusCodes } = require('http-status-codes');
const BaseError = require('../errors/BaseError');

module.exports = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return next(
      new BaseError('Not authorized as an admin', StatusCodes.UNAUTHORIZED)
    );
  }
};
