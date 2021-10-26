'use strict';

const { StatusCodes } = require('http-status-codes');
const { BaseError } = require('../../utils');

module.exports = async (Model, id, body) => {
  const results = await Model.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!results) {
    throw new BaseError('Not found', StatusCodes.NOT_FOUND);
  }

  return results;
};
