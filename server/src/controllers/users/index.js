const authUser = require('./authUser');
const registerUser = require('./registerUser');
const getUser = require('./getUser');
const getUsers = require('./getUsers');
const getProfile = require('./getProfile');
const removeUser = require('./removeUser');
const updateUser = require('./updateUser');

module.exports = {
  authUser,
  registerUser,
  getProfile,
  getUser,
  getUsers,
  removeUser,
  updateUser,
};
