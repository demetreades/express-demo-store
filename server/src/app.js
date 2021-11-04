'use strict';

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const compression = require('compression');

const { limitOptions, corsOptions } = require('./config');
const { handleErrors, handleMongoErrors, handleMulterErrors, handleNotFound } = require('./utils');
const { userRoutes, orderRoutes, productRoutes } = require('./routes');
const dbConnection = require('./services/db/connection');

dbConnection();

const app = express();

app.use(helmet());
app.use(rateLimit(limitOptions));
app.use(cors(corsOptions));
app.use(xss());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);

app.use(handleNotFound);
app.use(handleMongoErrors);
app.use(handleErrors);

module.exports = app;
