'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { BaseError, logger, generateToken } = require('../../utils');
const userService = require('../../services/crud');
const { User } = require('../../services/models');

module.exports = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	const user = await userService(User, email);

	if (user && (await user.matchPassword(password))) {

		logger.info(`USER name: ${user.name}, id: ${user._id}, has been authorized`);

		res.status(StatusCodes.OK).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		return next(
			new BaseError(StatusCodes.UNAUTHORIZED, 'Invalid email or password')
		);
	}
});
