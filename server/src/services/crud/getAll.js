'use strict';

const { StatusCodes } = require('http-status-codes');
const { BaseError } = require('../../utils');

module.exports = async (Model) => {
	const results = await Model.find({});

	if (!results) {
		throw new BaseError('Not found', StatusCodes.NOT_FOUND);
	}

	return results;
};
