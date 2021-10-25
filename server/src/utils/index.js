const BaseError = require('./errors/BaseError');
const handleNotFound = require('./errors/handleNotFound');
const handleMongoErrors = require('./errors/handleMongoErrors');
const handleErrors = require('./errors/handleErrors');

const logger = require('./logger');
const handleExit = require('./handleExit');
const normalizePort = require('./normalizePort');

module.exports = {
  BaseError,
  handleNotFound,
  handleMongoErrors,
  handleErrors,

  logger,
  handleExit,
  normalizePort,
};
