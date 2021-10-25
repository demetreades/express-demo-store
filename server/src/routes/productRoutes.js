const router = require('express').Router();
// const { protect, admin } = require('../../utils');
const {
  getProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  deleteProduct,
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
  .route('/:product_id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);
  // .delete(protect, admin, deleteProduct);
  // .put(protect, admin, updateProduct)

module.exports = router;
