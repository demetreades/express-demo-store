'use strict';

const { StatusCodes } = require('http-status-codes');
const logger = require('../logger');

module.exports = (err, req, res, next) => {
  const { statusCode, message } = err;
  const { method, url } = req;

  logger.error(
    `ERROR: ${method} ${statusCode ||
      StatusCodes.INTERNAL_SERVER_ERROR} :: ${message} :: ${url}`
  );
  // logger.error(err.stack); // stack

  res.status(statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    status: statusCode,
    error: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
