const router = require('express').Router();
const { protect, admin } = require('../utils');
const {
	authUser,
	registerUser,
	getUser,
	getUsers,
	removeUser,
	updateUser,
} = require('../controllers/users');

router
	.route('/')
	.get(protect, admin, getUsers)
	.post(registerUser);

router
	.route('/login').post(authUser);

router
	.route('/:id')
	.get(protect, admin, getUser)
	.put(protect, admin, updateUser)
	.delete(protect, admin, removeUser);

module.exports = router;
