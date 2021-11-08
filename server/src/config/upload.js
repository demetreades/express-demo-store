require('dotenv').config();
const path = require('path');
const multer = require('multer');
const { StatusCodes } = require('http-status-codes');
const { BaseError } = require('../utils');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, process.env.NODE_ENV === 'developement' ? 'client/public/img/products' : 'client/build/public/img/products');
	},
	filename: (req, file, cb) => {
		const fileName = Date.now() + path.extname(file.originalname);
		req.fileName = fileName;
		req.file = file;
		cb(null, fileName);
	}
});

const checkFileType = (file, cb) => {
	const filetypes = /jpg|jpeg|png/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);

	if (extname && mimetype) {
		return cb(null, true);
	} else {
		cb(new BaseError('Only image files accepted: jpg, jpeg, png', StatusCodes.UNSUPPORTED_MEDIA_TYPE));
	}
};

module.exports = multer({
	storage,
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb);
	},
});


