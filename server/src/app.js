const express = require('express');

const { userRoutes, orderRoutes, productRoutes } = require('./routes');
const { handleErrors, handleMongoErrors, handleNotFound } = require('./utils');
const dbConnection = require('./services/db/connection');
dbConnection();

const app = express();

app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);

app.use(handleNotFound);
app.use(handleMongoErrors);
app.use(handleErrors);

module.exports = app;
