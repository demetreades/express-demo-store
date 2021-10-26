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
// .get(protect, admin, getUsers)

router
	.route('/:id')
	.put(updateUser)
	.delete(removeUser);
// .delete(protect, admin, removeUser);

router
	.post('/login', authUser);

router
	.route('/profile/:id')
	.get(protect, getUserProfile);
	// .get(getUserProfile)

module.exports = router;
