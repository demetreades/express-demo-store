'use strict';

require('dotenv').config();
const { Product, User, Order } = require('../../services/models');
const { products, users, orders } = require('./DATA');
const { logger } = require('../../utils');
const dbConnection = require('./connection');

dbConnection();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    const sampleUser = createdUsers[2]._id;
    const sampleOrders = orders.map((order) => {
      return { ...order, user: sampleUser };
    });

    await Product.insertMany(sampleProducts);
    await Order.insertMany(sampleOrders);

    logger.info('\n\nData imported\n');
    process.exit();
  } catch (err) {
    logger.error(`Seeder Error: ${err}`);
    console.log(err);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    logger.info('\n\nData deleted\n');
    process.exit();
  } catch (err) {
    logger.error(`${err}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
