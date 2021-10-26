'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { logger, generateToken } = require('../../utils');
// const { users: { register: registerUser } } = require('../../services/crud');
const { users: userService } = require('../../services/crud');

module.exports = asyncHandler(async (req, res, next) => {
	const { body } = req;

	const user = await userService.register(body);
	// const user = await registerUser(body);

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
