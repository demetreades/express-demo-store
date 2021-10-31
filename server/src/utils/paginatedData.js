'use strict';

const asyncHandler = require('express-async-handler');

module.exports = (Model) => {
	return asyncHandler(async (req, res, next) => {
		const page = parseInt(req.query.page, 10) || 1;
		const limit = parseInt(req.query.limit, 10) || 25;

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const total = await Model.countDocuments();

		const pagination = {};

		if (endIndex < total) {
			pagination.next = {
				page: page + 1,
				limit,
			};
		}

		if (startIndex > 0) {
			pagination.previous = {
				page: page - 1,
				limit,
			};
		}

		const results = await Model.find({}).limit(limit).skip(startIndex);

		res.paginationData = {
			success: true,
			total: results.length,
			pagination,
			data: results
		};

		next();
	});
};
