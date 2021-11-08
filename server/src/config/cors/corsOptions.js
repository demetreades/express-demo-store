'use strict';

const { StatusCodes } = require('http-status-codes');
const { BaseError } = require('../../utils');
const { allowed } = require('./allowedOrigins');

module.exports = {
	corsOptions: {
		origin: (origin, callback) => {
			if (allowed.indexOf(origin) !== -1) {
				callback(null, true);
			} else {
				callback(
					new BaseError(StatusCodes.UNAUTHORIZED, 'Not allowed by CORS')
				);
			}
		},
		methods: 'GET, HEAD, PUT, POST, DELETE',
		optionsSuccessStatus: StatusCodes.OK,
	},
};
