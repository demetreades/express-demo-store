const { corsOptions } = require('./cors/corsOptions');
const { limitOptions } = require('./limitOptions');
const upload = require('./upload');

module.exports = {
	corsOptions,
	limitOptions,
	upload,
};
