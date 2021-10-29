const multer = require('multer');
const { StatusCodes } = require('http-status-codes');
const BaseError = require('../errors/BaseError');

module.exports = (err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		return next(new BaseError('MULTER ERROR: ', StatusCodes.BAD_REQUEST));
	} else if (err) {
		next(err);
	}

	next();
};

