const router = require('express').Router();
const { protect, admin } = require('../utils');
const {
	getProducts,
	getProductById,
	getProductBySlug,
	createProduct,
	removeProduct,
	updateProduct,
} = require('../controllers/products');

router
	.route('/')
	.get(getProducts)
	.post(protect, admin, createProduct);

router
	.route('/slug/:slug')
	.get(getProductBySlug);

router
	.route('/:id')
	.get(getProductById)
	.put(protect, admin, updateProduct)
	.delete(protect, admin, removeProduct);

module.exports = router;
