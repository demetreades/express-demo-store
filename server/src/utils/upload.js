const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'client/public/img/products');
	},
	filename: (req, file, cb) => {
		const fileName = Date.now() + path.extname(file.originalname);
		req.fileName = fileName;
		req.file = file;
		cb(null, fileName);
	}
});

module.exports = multer({ storage });
