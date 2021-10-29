const BaseError = require('./errors/BaseError');
const handleNotFound = require('./errors/handleNotFound');
const handleMongoErrors = require('./errors/handleMongoErrors');
const handleMulterErrors = require('./errors/handleMulterErrors');
const handleErrors = require('./errors/handleErrors');
const logger = require('./logger');
const handleExit = require('./handleExit');
const normalizePort = require('./normalizePort');
const generateToken = require('./auth/generateToken');
const admin = require('./auth/admin');
const protect = require('./auth/protect');
const upload = require('./upload');

module.exports = {
	BaseError,
	handleNotFound,
	handleMongoErrors,
	handleMulterErrors,
	handleErrors,
	logger,
	handleExit,
	normalizePort,
	generateToken,
	admin,
	protect,
	upload,
};
