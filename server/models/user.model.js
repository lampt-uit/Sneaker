const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: { type: String, require: true, trim: true },
		email: { type: String, require: true, unique: true },
		password: { type: String },
		phone: { type: String, default: '' },
		address: { type: String, default: '' },
		role: { type: Number, default: 0 },
		avatar: {
			type: String,
			default:
				'https://res.cloudinary.com/lampt/image/upload/v1620639420/utils/avatar_cugq40_jnf6l1.png'
		},
		cart: { type: Array, default: [] }
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('User', userSchema);
