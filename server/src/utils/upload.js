const path = require('path');
const multer = require('multer');

const logger = require('./logger');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'client/public/img/products');
	},
	filename: (req, file, cb) => {
		const fileName = Date.now() + path.extname(file.originalname);
		logger.warn(file);
		logger.warn(fileName);
		req.fileName = fileName;
		cb(null, fileName);
	}
});

module.exports = multer({ storage });
