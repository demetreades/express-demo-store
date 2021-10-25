'use strict';

require('dotenv').config();
const { Product, User, Order } = require('../../services/models');
const { products, users, orders } = require('./DATA');
const { logger } = require('../../utils');
const dbConnection = require('./connection');

dbConnection();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // const sampleCategories = categories.map((category) => {
    //   return { ...category, user: adminUser };
    // });

    await Product.insertMany(sampleProducts);
    // await Category.insertMany(sampleCategories);

    logger.info('Data imported');
    process.exit();
  } catch (err) {
    logger.error(`Seeder Error: ${err}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    // await Category.deleteMany();
    await User.deleteMany();

    logger.info('Data deleted!');
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
