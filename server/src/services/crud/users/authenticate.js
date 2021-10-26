'use strict';

const { StatusCodes } = require('http-status-codes');
const { BaseError, generateToken } = require('../../../utils');
const { User } = require('../../../services/models');

module.exports = async (body) => {
  const { email, password } = body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new BaseError('User not found', StatusCodes.NOT_FOUND);
  }

  if (user && (await user.matchPassword(password))) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    };
  } else {
    throw new BaseError('Invalid email or password', StatusCodes.UNAUTHORIZED);
  }
};
