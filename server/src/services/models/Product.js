'use strict';

const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			trim: true,
			required: [true, 'Name is required'],
			minlength: [1, 'Name must be at least 1 character'],
			maxlength: [64, 'Name must be shorter than 64 characters'],
		},
		slug: String,
		image: {
			type: String,
			default: '/img/products/placeholder-image.png',
		},
		brand: {
			type: String,
			required: [true, 'Brand is required'],
			minlength: [1, 'Brand must be at least 1 character'],
			maxlength: [32, 'Brand must be shorter than 32 characters'],
		},
		description: {
			type: String,
			trim: true,
			maxlength: [500, 'Description must be shorter than 500 characters'],
		},
		price: {
			type: Number,
			trim: true,
			required: [true, 'Price is required'],
			min: [0, 'Only positive values allowed'],
		},
		inStock: {
			type: Number,
			min: [0, 'Only positive values allowed'],
			default: 0,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

productSchema.pre('save', function (next) {
	this.slug = slugify(this.name, { lower: true });
	next();
});


module.exports = mongoose.model('Product', productSchema);
