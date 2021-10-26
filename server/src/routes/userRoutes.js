const router = require('express').Router();
const { protect, admin } = require('../utils');
const {
	authUser,
	registerUser,
	getUserProfile,
	getUsers,
	removeUser,
	updateUser
} = require('../controllers/users');

router
	.route('/')
	.get(getUsers)
	.post(registerUser);

router
	.route('/:id')
	.put(protect, updateUser)
	.delete(protect, removeUser);
// .delete(protect, admin, removeUser);

// router
// 	.post('/:id/upload', uploadFile);

router
	.post('/login', authUser);

router
	.route('/profile/:id')
	.get(protect, getUserProfile);

module.exports = router;
