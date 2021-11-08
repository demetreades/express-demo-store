'use strict';

const { StatusCodes } = require('http-status-codes');

module.exports = {
	origin: process.env.NODE_ENV === 'production' ? 'https://express-demo-store.herokuapp.com' : 'http://localhost:3000',
	methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
	credentials: true,
	preflightContinue: false,
	optionsSuccessStatus: StatusCodes.OK,
};
