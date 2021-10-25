const router = require('express').Router();
// const { protect, admin } = require('../../utils');
const {
  getOrders,
  getOrderById,
  deleteOrder,
  createOrder,
  updateOrder,
} = require('../controllers/orders/index');

router
  .route('/')
  .get(getOrders)
  .post(createOrder);
  // .get(protect, admin, getOrders)

router
  .route('/:order_id')
  .get(getOrderById)
  .delete(deleteOrder)
  .put(updateOrder);
  // .get(protect, getOrderById)
  // .delete(protect, admin, deleteOrder);

module.exports = router;
