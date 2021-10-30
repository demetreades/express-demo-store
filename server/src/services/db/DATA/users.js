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
		password: bcrypt.hashSync('12345678', 10),
	},
	{
		name: 'standarduser',
		email: 'user1@email.com',
		password: bcrypt.hashSync('12121278', 10),
	},
	{
		name: 'CocoLeva',
		email: 'coco@leva.bg',
		password: bcrypt.hashSync('12345678', 10),
	},
	{
		name: 'TsoniMnemonic',
		email: 'tsoni@mnemonic.ru',
		password: bcrypt.hashSync('12345678', 10),
	},
];
