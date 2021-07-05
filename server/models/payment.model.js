const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
	{
		user_id: {
			type: String
		},
		name: {
			type: String,
			required: true
		},
		phone: {
			type: String,
			required: true
		},
		address: {
			type: String,
			required: true
		},
		cart: {
			type: Array,
			default: []
		},
		status: {
			type: Boolean,
			default: false
		},
		note: {
			type: String,
			default: ''
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Payment', paymentSchema);
