'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { logger } = require('../../utils');
const userService = require('../../services/crud');
const { User } = require('../../services/models');

const bcrypt = require('bcryptjs');

module.exports = asyncHandler(async (req, res, next) => {
	const { body, params: { id } } = req;

	const user = await userService.update(User, id, body, {
		new: true,
		runValidators: true,
	});

	logger.info(`USER name: ${user.name}, id: ${user._id} UPDATED`);

	res.status(StatusCodes.OK).json({
		success: true,
		data: {
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			password: bcrypt.hashSync(user.password, 10), // to-fix: den doulevei to hash tou pass meta to update, den kanei match
		},
	});
});
