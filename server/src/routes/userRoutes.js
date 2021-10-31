const router = require('express').Router();
const { protect, admin, paginatedData } = require('../utils');
const {
	authUser,
	registerUser,
	getUser,
	getUsers,
	removeUser,
	updateUser,
} = require('../controllers/users');

const { User } = require('../services/models');

router
	.route('/')
	.get(paginatedData(User), protect, admin, getUsers)
	.post(registerUser);

router
	.route('/login').post(authUser);

router
	.route('/:id')
	.get(protect, admin, getUser)
	.put(protect, admin, updateUser)
	.delete(protect, admin, removeUser);

module.exports = router;
