'use strict';

const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		orderItems: [
			{
				quantity: {
					type: Number,
					required: true,
				},
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
			},
		],
		shippingAddress: {
			address: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
			postalCode: {
				type: String,
				required: true,
			},
		},
		// paymentMethod: {
		// 	type: String,
		// 	require: true,
		// },
		totalPrice: {
			type: Number,
			require: true,
			default: 0,
		},
		isPaid: {
			type: Boolean,
			require: true,
			default: false,
		},
		paidAt: {
			type: Date,
		},
		isDelivered: {
			type: Boolean,
			require: false,
			default: false,
		},
		deliveredAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Order', orderSchema);
