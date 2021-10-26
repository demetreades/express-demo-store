const router = require('express').Router();
// const { protect, admin } = require('../../utils');
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
	.post(createProduct);
// .post(protect, admin, createProduct);

router
	.route('/slug/:slug')
	.get(getProductBySlug);

router
	.route('/:id')
	.get(getProductById)
	.put(updateProduct)
	.delete(removeProduct);
// .delete(protect, admin, removeProduct);
// .put(protect, admin, updateProduct)

module.exports = router;
