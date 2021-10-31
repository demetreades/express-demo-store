'use strict';

const { StatusCodes } = require('http-status-codes');
const asyncHandler = require('express-async-handler');
const { logger } = require('../../utils');

module.exports = asyncHandler(async (req, res) => {
	const { query: { page, limit } } = req;
	const { paginationData: { data } } = res;

	logger.info(`GET ALL USERS, PAGES: ${page}, LIMIT: ${limit},  COUNT: ${data.length}`);

	res.status(StatusCodes.OK).json(res.paginationData);
});
