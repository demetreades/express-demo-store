'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const { logger } = require('../../utils');

module.exports = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/express-demo-store', {
			dbName: process.env.DB_NAME,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		logger.info(
			`Database connected: ${process.env.MONGO_URI}`
		);
	} catch (err) {
		logger.error(`Database connection error: ${err.message}`);
		process.exit(1);
	}
};
