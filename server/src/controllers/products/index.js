const getProducts = require('./getProducts');
const getProductById = require('./getProductById');
const getProductBySlug = require('./getProductBySlug');
const createProduct = require('./createProduct');
const removeProduct = require('./removeProduct');
const updateProduct = require('./updateProduct');

module.exports = {
	getProducts,
	getProductById,
	getProductBySlug,
	createProduct,
	removeProduct,
	updateProduct,
};
