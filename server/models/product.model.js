const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
	{
		product_id: {
			type: String,
			unique: true,
			trim: true,
			required: true
		},
		title: {
			type: String,
			trim: true,
			required: true
		},
		price: {
			type: Number,
			trim: true,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		content: {
			type: Array,
			default: []
		},
		image: {
			type: Array,
			default: [],
			required: true
		},
		size: {
			type: Array,
			default: ['38', '39', '40', '41', '42', '43', '44', '45']
		},
		category: {
			type: String,
			required: true
		},
		sold: {
			type: Number,
			default: 0
		},
		stock: {
			type: Number,
			default: 0
		},
		numReviews: {
			type: Number,
			default: 0
		},
		rating: { type: Number, default: 0 }
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Product', productSchema);
