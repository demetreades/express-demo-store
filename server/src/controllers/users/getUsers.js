'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { BaseError, logger } = require('../../utils');
const userService = require('../../services/crud');
const { User } = require('../../services/models');

const getUsers = asyncHandler(async (req, res) => {
	const users = await userService.getAll(User);

	logger.info(`GET ALL USERS, COUNT: ${users.length}`);

	res.status(StatusCodes.OK).json({
		success: true,
		total: users.length,
		data: users,
	});
});

module.exports = getUsers;
