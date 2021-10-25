'use strict';

const { StatusCodes } = require('http-status-codes');
const { BaseError } = require('../../utils');

module.exports = async (Model, props, sort = -1) => {
  const results = await Model.find({}, [...props]).sort({
    createdAt: sort,
  });

  if (!results) {
    throw new BaseError('Not found', StatusCodes.NOT_FOUND);
  }

  return results;
};
