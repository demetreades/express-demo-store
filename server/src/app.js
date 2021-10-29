'use strict';

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const compression = require('compression');

const { limitOptions, corsOptions } = require('./config');
const { handleErrors, handleMongoErrors, handleMulterErrors, handleNotFound } = require('./utils');
const { userRoutes, orderRoutes, productRoutes } = require('./routes');
const dbConnection = require('./services/db/connection');

dbConnection();

const app = express();

app.use(morgan('dev'));

app.use(helmet());
app.use(rateLimit(limitOptions));
app.use(cors(corsOptions));
app.use(compression());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);

app.use(handleNotFound);
app.use(handleMulterErrors);
app.use(handleMongoErrors);
app.use(handleErrors);

module.exports = app;
