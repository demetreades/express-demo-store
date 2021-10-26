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
	logOutUser,
} = require('../controllers/users');



router
	.route('/profile')
	.get(protect, getProfile);


// router
// 	.post('/:id/upload', uploadFile);

router
	.route('/login').post(authUser);

router
	.route('/logout').get(protect, logOutUser);

router
	.route('/')
	.get(getUsers)
	.post(registerUser);

router
	.route('/:id')
	.get(getUser)
	.put(protect, updateUser)
	.delete(removeUser);


module.exports = router;
