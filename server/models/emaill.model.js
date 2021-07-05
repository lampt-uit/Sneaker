const mongoose = require('mongoose');

const emailSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Email', emailSchema);
