'use strict';

const { StatusCodes } = require('http-status-codes');
const BaseError = require('./BaseError');

module.exports = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return next(new BaseError('Resource not found', StatusCodes.NOT_FOUND));
  }

  if (err.code === 11000) {
    return next(
      new BaseError(
        `Duplicate field value entered: ${Object.keys(err.keyValue)}`,
        StatusCodes.BAD_REQUEST
      )
    );
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    return next(new BaseError(message, StatusCodes.BAD_REQUEST));
  }

  next(err);
};
