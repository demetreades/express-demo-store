'use strict';

const { StatusCodes } = require('http-status-codes');
const { BaseError, logger } = require('../../../utils');
const { User, Order } = require('../../../services/models');

const getByProperty = require('../../../services/crud/getByProperty');

module.exports = async (id, sort = -1) => {
	const user = await getByProperty(User, { _id: id });

	if (!user) {
		throw new BaseError('User not found', StatusCodes.NOT_FOUND);
	}

	const results = await Order.find({ user: user._id }).sort({
		createdAt: sort,
	});

	if (!results) {
		throw new BaseError('Orders not found', StatusCodes.NOT_FOUND);
	}

	logger.info(`GET ALL ORDERS, user: ${user.name}, email: ${user.email} COUNT: `);

	return results;
};
