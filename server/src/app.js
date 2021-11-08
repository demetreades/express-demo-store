'use strict';

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const compression = require('compression');

const { limitOptions, corsOptions } = require('./config');
const { handleErrors, handleMongoErrors, handleNotFound } = require('./utils');
const { userRoutes, orderRoutes, productRoutes } = require('./routes');
const dbConnection = require('./services/db/connection');

dbConnection();

const app = express();

app.use(helmet({
	contentSecurityPolicy: false,
}));

app.use(rateLimit(limitOptions));
// app.use(cors(corsOptions));

app.use(cors({
	origin: '*',
	// methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
	// preflightContinue: false,
	// optionsSuccessStatus: 204
}));

app.use(xss());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);

const dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
	app.use('/uploads', express.static(path.join(dirname, '/uploads')));
	app.use(express.static(path.join(dirname, '/client/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(dirname, '/client/build/index.html'));
	});
} else {
	app.get('/', (req, res) => {
		res.send('development API endpoint');
	});
}

app.use(handleNotFound);
app.use(handleMongoErrors);
app.use(handleErrors);

module.exports = app;
