'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { BaseError, logger, generateToken } = require('../../utils');
const userService = require('../../services/crud');
const { User } = require('../../services/models');

module.exports = asyncHandler(async (req, res, next) => {
	const { body } = req;

	const userExists = await userService.getByProperty(User, body.email);

	if (userExists) {
		return next(new BaseError(StatusCodes.BAD_REQUEST, 'User already exists'));
	}

	const user = await userService.create(User, body);

	logger.info(
		`NEW USER name: ${user.name}, id: ${user._id}, email: ${user.email}`
	);

	res.status(StatusCodes.CREATED).json({
		success: true,
		data: {
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		},
	});
});
