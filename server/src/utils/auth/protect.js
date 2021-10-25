'use strict';

const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const BaseError = require('../errors/BaseError');
const { User } = require('../../services/models');

module.exports = asyncHandler(async (req, res, next) => {
  let token;

  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select('-password');
  } else {
    return next(
      new BaseError(StatusCodes.UNAUTHORIZED, 'Not authorized, no token')
    );
  }

  next();
});
