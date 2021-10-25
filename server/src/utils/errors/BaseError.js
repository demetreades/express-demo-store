module.exports = class BaseError extends Error {
  constructor(message, statusCode, isOperational = false) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
};
