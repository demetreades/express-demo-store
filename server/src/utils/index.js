const BaseError = require('./errors/BaseError');
const handleNotFound = require('./errors/handleNotFound');
const handleMongoErrors = require('./errors/handleMongoErrors');
const handleErrors = require('./errors/handleErrors');
const logger = require('./logger');
const handleExit = require('./handleExit');
const normalizePort = require('./normalizePort');
const generateToken = require('./auth/generateToken');
const admin = require('./auth/admin');
const protect = require('./auth/protect');

module.exports = {
	BaseError,
	handleNotFound,
	handleMongoErrors,
	handleErrors,
	logger,
	handleExit,
	normalizePort,
	generateToken,
	admin,
	protect,
};
