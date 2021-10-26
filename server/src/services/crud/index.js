const create = require('./create');
const remove = require('./remove');
const update = require('./update');
const getAll = require('./getAll');
const getByProperty = require('./getByProperty');

const register = require('./users/register');
const authenticate = require('./users/authenticate');

module.exports = {
	create,
	remove,
	update,
	getAll,
	getByProperty,
	users: {
		register,
		authenticate
	}
};
