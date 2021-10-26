'use strict';

const { StatusCodes } = require('http-status-codes');
const { BaseError, logger, generateToken } = require('../../../utils');
const { User } = require('../../../services/models');

module.exports = async (body) => {
	const { email, password } = body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {

		return {
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		};
	} else {
		throw new BaseError(StatusCodes.UNAUTHORIZED, 'Invalid email or password');
	}
};
