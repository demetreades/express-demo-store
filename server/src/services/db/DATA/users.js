const bcrypt = require('bcryptjs');

exports.users = [
	{
		name: 'AdminUser',
		email: 'admin@user.com',
		password: bcrypt.hashSync('12345678', 10),
		isAdmin: true,
	},
	{
		name: 'KokosSanel',
		email: 'kokos@sanel.gr',
		isAdmin: true,
		password: bcrypt.hashSync('12345678', 10),
	},
	{
		name: 'user1user',
		email: 'user1@email.com',
		password: bcrypt.hashSync('12345678', 10),
	},
	{
		name: 'user2user',
		email: 'user2@email.com',
		password: bcrypt.hashSync('12345678', 10),
	},
	{
		name: 'user3user',
		email: 'user3@email.com',
		password: bcrypt.hashSync('12345678', 10),
	},
];
