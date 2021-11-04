'use strict';

const { StatusCodes } = require('http-status-codes');
const { BaseError } = require('../../utils');

module.exports = async (Model, id, body) => {
	const results = await Model.findById(id);

	if (!results) {
		throw new BaseError('Not found', StatusCodes.NOT_FOUND);
	}

	Object.assign(results, body);
	await results.save();

	return results;
};
