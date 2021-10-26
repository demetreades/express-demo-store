'use strict';

const { StatusCodes } = require('http-status-codes');
const { BaseError } = require('../../utils');

module.exports = async (Model, property, sort = -1) => {
  const results = await Model.findOne({ property}).sort({
    createdAt: sort,
  });

  if (!results) {
    throw new BaseError('Not found', StatusCodes.NOT_FOUND);
  }

  return results;
};
