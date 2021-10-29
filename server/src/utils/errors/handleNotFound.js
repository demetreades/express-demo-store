'use strict';

const { StatusCodes } = require('http-status-codes');
const BaseError = require('../errors/BaseError');

module.exports = (req, res, next) => {
	next(new BaseError('Route not found', StatusCodes.NOT_FOUND));
};
