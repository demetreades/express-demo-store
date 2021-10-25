const router = require('express').Router();
// const { protect, admin } = require('../../utils');
const {
  authUser,
  registerUser,
  getUserProfile,
  getUsers,
  deleteUser,
  updateUser
} = require('../controllers/users');

router
  .route('/')
  .get(getUsers)
  .post(registerUser);
  // .get(protect, admin, getUsers)

router
  .route('/:id')
  .delete(deleteUser);
  // .delete(protect, admin, deleteUser);

router
  .post('/login', authUser);

router
  .route('/profile/:id')
  .put(updateUser);
  // .put(protect, updateUser);

router
  .route('/profile')
  .get(getUserProfile);
  // .get(protect, getUserProfile);

module.exports = router;
