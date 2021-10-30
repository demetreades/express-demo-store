const router = require('express').Router();
const { protect, admin } = require('../utils');
const { upload } = require('../config');
const {
	getProducts,
	getProductById,
	getProductBySlug,
	createProduct,
	removeProduct,
	updateProduct,
	imageUpload,
} = require('../controllers/products');

router
	.route('/')
	.get(getProducts)
	.post(protect, admin, createProduct);

router
	.route('/upload/img/:id')
	.post(protect, admin, upload.single('image'), imageUpload);

router
	.route('/slug/:slug')
	.get(getProductBySlug);

router
	.route('/:id')
	.get(getProductById)
	.put(protect, admin, updateProduct)
	.delete(protect, admin, removeProduct);

module.exports = router;
