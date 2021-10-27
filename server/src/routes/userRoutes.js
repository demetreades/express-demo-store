const router = require('express').Router();
const { protect, admin } = require('../utils');
const {
	authUser,
	registerUser,
	getUser,
	getUsers,
	getProfile,
	removeUser,
	updateUser,
} = require('../controllers/users');

router
	.route('/')
	.get(protect, getUsers)
	.post(registerUser);

router
		.route('/login').post(authUser);

router
	.route('/profile')
	.get(protect, getProfile);

router
	.route('/:id')
	.get(getUser)
	.put(protect, updateUser)
	.delete(protect, removeUser);

// router
	// 	.post('/:id/upload', uploadFile);

module.exports = router;
