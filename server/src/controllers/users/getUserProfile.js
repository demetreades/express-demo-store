'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { BaseError, logger } = require('../../utils');
const userService = require('../../services/crud');
const { User } = require('../../services/models');

module.exports = asyncHandler(async (req, res, next) => {
	const { id } = req.params;

	const user = await userService.getByProperty(id);

	logger.info(
		`USER PROFILE name: ${user.name} id: ${user._id}, email: ${user.email}`
	);

	res.status(StatusCodes.OK).json({
		success: true,
		data: user
	});
});

