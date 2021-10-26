'use strict';

const { StatusCodes } = require('http-status-codes');
const { BaseError } = require('../../../utils');
const { User } = require('../../../services/models');

module.exports = async (body) => {
	const { name, email, password } = body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		throw new BaseError('User already exists', StatusCodes.BAD_REQUEST);
	} else {
		const user = await User.create({
			name,
			email,
			password,
		});

		if (!user) {
			throw new BaseError('Invalid user data', StatusCodes.BAD_REQUEST);
		}

		return user;
	}
};
