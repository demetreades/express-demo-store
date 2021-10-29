'use strict';

const { StatusCodes } = require('http-status-codes');
const BaseError = require('./BaseError');

module.exports = (err, req, res, next) => {
	const { name, code, errors, keyValue } = err;

	if (name === 'CastError') {
		return next(new BaseError('Resource not found', StatusCodes.NOT_FOUND));
	}

	if (code === 11000) {
		return next(
			new BaseError(
				`Duplicate field value entered: ${Object.keys(keyValue)}`,
				StatusCodes.BAD_REQUEST
			)
		);
	}

	if (name === 'ValidationError') {
		const message = Object.values(errors).map((val) => val.message);
		return next(new BaseError(message, StatusCodes.BAD_REQUEST));
	}

	next(err);
};
