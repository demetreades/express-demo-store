'use strict';

require('dotenv').config();
const pino = require('pino');

module.exports = pino({
	transport: {
		target: process.env.NODE_ENV === 'production' ? 'pino/file' : 'pino-pretty',
		options: {
			destination: 2,
			levelFirst: true,
			translateTime: 'SYS:standard',
			ignore: 'hostname,pid',
		},
	},
});
