'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { generateToken, logger } = require('../../utils');
const { users: userService } = require('../../services/crud');

module.exports = asyncHandler(async (req, res, next) => {
	const { body } = req;

	const user = await userService.authenticate(body);

	logger.info(
		`USER name: ${user.name}, id: ${user._id}, email: ${user.email} AUTHENTICATE`
	);

	res.status(StatusCodes.OK).json(
		{
			success: true,
			data: {
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: generateToken(user._id),
			}
		});
});
