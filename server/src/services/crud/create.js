'use strict';

const { StatusCodes } = require('http-status-codes');
const { BaseError } = require('../../utils');

module.exports = async (Model, body) => {
  const results = await Model.create(body);

  if (!results) {
    throw new BaseError('Not found', StatusCodes.NOT_FOUND);
  }

  return results;
};
