const Users = require('../models/user.model');
const Payments = require('../models/payment.model');
const Emails = require('../models/emaill.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { google } = require('googleapis');
const { OAuth2 } = google.auth;
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);
const sendMail = require('./sendEmail');
const { CLIENT_URL } = process.env;
const fetch = require('node-fetch');

const userController = {
	register: async (req, res) => {
		try {
			const { name, email, password } = req.body;

			const user = await Users.findOne({ email });
			if (user)
				return res.status(400).json({ msg: 'The email already exists.' });

			const hashPassword = await bcrypt.hash(password, 10);
			const newUser = new Users({
				email,
				password: hashPassword,
				name
			});

			await newUser.save();

			const accesstoken = createAccessToken({ id: newUser._id });
			const refreshtoken = createRefreshToken({ id: newUser._id });

			//res.cookie(name,value[,options])
			res.cookie('refreshtoken', refreshtoken, {
				httpOnly: true, //Only access by web server
				path: '/user/refresh_token',
				maxAge: 7 * 24 * 60 * 60 * 1000 //7day => ms
			});

			// res.json({ accesstoken });

			res.status(200).json({ message: 'Create user successfully !' });
		} catch (error) {
			return res.status(500).json({ msg: error.msg });
		}
	},
	login: async (req, res) => {
		try {
			const { email, password } = req.body;

			const user = await Users.findOne({ email });

			if (!user)
				return res.status(400).json({ message: "User doesn't exists." });

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch)
				return res.status(400).json({ message: 'Password is incorrect.' });

			const accesstoken = createAccessToken({ id: user._id });
			const refreshtoken = createRefreshToken({ id: user._id });

			//res.cookie(name,value[,options])
			res.cookie('refreshtoken', refreshtoken, {
				httpOnly: true, //Only access by web server
				path: '/user/refresh_token',
				maxAge: 7 * 24 * 60 * 60 * 1000 //7day => ms
			});

			res.status(200).json({ message: 'Login successfully !' });
		} catch (error) {
			return res.status(500).json({ msg: error.msg });
		}
	},
	logout: async (req, res) => {
		try {
			res.clearCookie('refreshtoken', { path: '/user/refresh_token' });
			return res.json({ message: 'Logged Out' });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	refreshToken: (req, res) => {
		try {
			const rf_token = req.cookies?.refreshtoken;
			// console.log(rf_token);
			if (!rf_token)
				return res.status(400).json({ msg: 'Please Login or Register' });

			jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
				if (error)
					return res.status(400).json({ message: 'Please Login or Register' });

				const accesstoken = createAccessToken({ id: user.id });
				res.json({ accesstoken });
			});
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	getUser: async (req, res) => {
		try {
			const user = await Users.findById(req.user.id).select('-password');
			if (!user) return res.status(400).json({ msg: 'User does not exist.' });
			res.json(user);
		} catch (error) {
			return res.status(500).json({ msg: error.msg });
		}
	},
	getAllUser: async (req, res) => {
		try {
			const user = await Users.find().select('-password ');
			res.json(user);
		} catch (error) {
			return res.status(500).json({ msg: error.msg });
		}
	},
	addCart: async (req, res) => {
		try {
			const user = await Users.findById(req.user.id);

			if (!user)
				return res.status(400).json({ msg: "User doesn't not exists " });

			// console.log(req.body.cart);

			await Users.findOneAndUpdate(
				{ _id: req.user.id },
				{
					cart: req.body.cart
				}
			);

			return res.json({ msg: 'Added to cart' });
		} catch (error) {
			return res.status(500).json({ msg: error.msg });
		}
	},
	history: async (req, res) => {
		try {
			const history = await Payments.find({ user_id: req.user.id });
			res.json(history);
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	updateUserInfo: async (req, res) => {
		try {
			const { name, phone, address } = req.body;
			await Users.findByIdAndUpdate(
				{
					_id: req.user.id
				},
				{
					name,
					phone,
					address
				}
			);

			res.json({ message: 'Information is updated successful' });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	updateUser: async (req, res) => {
		try {
			const { name, phone, address, email } = req.body;
			await Users.findByIdAndUpdate(
				{
					_id: req.params.id
				},
				{
					name,
					phone,
					address,
					email
				}
			);

			res.json({ message: 'Information is updated successful' });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	changePassword: async (req, res) => {
		try {
			const { password, new_password } = req.body;

			const user = await Users.findById(req.user.id);
			if (!user) {
				return res.status(400).json({ message: "User doesn't exists." });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch)
				return res.status(400).json({ message: 'Password is incorrect.' });

			const hashPassword = await bcrypt.hash(new_password, 10);

			await Users.findByIdAndUpdate(
				{
					_id: req.user.id
				},
				{
					password: hashPassword
				}
			);

			res.json({ message: 'Password is updated successful' });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
	forgotPassword: async (req, res) => {
		try {
			const { email } = req.body;
			const user = await Users.findOne({ email });
			if (!user)
				return res.status(400).json({ message: 'This email does not exist.' });
			const access_token = createAccessToken({ id: user._id });

			const url = `${CLIENT_URL}/reset/${access_token}`;
			sendMail(email, url, 'Reset your password');
			res.json({ message: 'Re-send the password, please check your email.' });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	},
	resetPassword: async (req, res) => {
		try {
			const { password } = req.body;
			const passwordHash = await bcrypt.hash(password, 12);
			await Users.findOneAndUpdate(
				{ _id: req.user.id },
				{
					password: passwordHash
				}
			);
			res.json({ msg: 'Password successfully changed' });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	deleteUser: async (req, res) => {
		try {
			await Users.findByIdAndDelete(req.params.id);

			res.json({ msg: 'User Deleted Success' });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	updateRole: async (req, res) => {
		try {
			const { role } = req.body;
			await Users.findOneAndUpdate(
				{ _id: req.params.id },
				{
					role
				}
			);

			res.json({ msg: 'Role of User is Updated Successful' });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	createUser: async (req, res) => {
		try {
			const { name, email, phone, address } = req.body;
			const user = await Users.findOne({ email });
			if (user)
				return res.status(400).json({ msg: 'The email already exists.' });
			const newUser = new Users({
				name,
				email,
				phone,
				address
			});
			await newUser.save();
			res.json({ msg: 'User is created successful' });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	googleLogin: async (req, res) => {
		try {
			const { tokenId } = req.body;
			const verify = await client.verifyIdToken({
				idToken: tokenId,
				audience: process.env.MAILING_SERVICE_CLIENT_ID
			});

			const { email_verified, email, name, picture } = verify.payload;
			const password = email + process.env.GOOGLE_SECRET;
			const passwordHash = await bcrypt.hash(password, 12);

			if (!email_verified)
				return res.status(400).json({ msg: 'Email verification failed.' });

			if (email_verified) {
				const user = await Users.findOne({ email });
				if (user) {
					const isMatch = await bcrypt.compare(password, user.password);
					if (!isMatch) {
						return res.status(400).json({ msg: 'Password is incorrect' });
					}

					const refreshtoken = createRefreshToken({ id: user._id });

					//res.cookie(name,value[,options])
					res.cookie('refreshtoken', refreshtoken, {
						httpOnly: true, //Only access by web server
						path: '/user/refresh_token',
						maxAge: 7 * 24 * 60 * 60 * 1000 //7day => ms
					});
					res.json({ msg: 'Login successful' });
				}
			} else {
				const newUser = new Users({
					name,
					email,
					password: passwordHash,
					avatar: picture
				});

				await newUser.save();

				const refreshtoken = createRefreshToken({ id: newUser._id });

				//res.cookie(name,value[,options])
				res.cookie('refreshtoken', refreshtoken, {
					httpOnly: true, //Only access by web server
					path: '/user/refresh_token',
					maxAge: 7 * 24 * 60 * 60 * 1000 //7day => ms
				});
				res.json({ msg: 'Login successful' });
			}
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	facebookLogin: async (req, res) => {
		try {
			const { accessToken, userID } = req.body;

			const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture
			&access_token=${accessToken}`;

			const data = await fetch(URL)
				.then((res) => res.json())
				.then((res) => {
					return res;
				});

			const { email, name, picture } = data;
			const password = email + process.env.FACEBOOK_SECRET;
			const passwordHash = await bcrypt.hash(password, 12);

			const user = await Users.findOne({ email });

			if (user) {
				const isMatch = await bcrypt.compare(password, user.password);

				if (!isMatch)
					return res.status(400).json({ msg: 'Password is incorrect.' });

				const refresh_token = createRefreshToken({ id: user._id });

				res.cookie('refreshtoken', refresh_token, {
					httpOnly: true,
					path: '/user/refresh_token',
					maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
				});
				res.json({ msg: 'Login successful' });
			} else {
				const newUser = new Users({
					name,
					email,
					password: passwordHash,
					avatar: picture.data.url
				});
				await newUser.save();
				const refresh_token = createRefreshToken({ id: user._id });

				res.cookie('refreshtoken', refresh_token, {
					httpOnly: true,
					path: '/user/refresh_token',
					maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
				});
				res.json({ msg: 'Login successful' });
			}
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	receiveEmail: async (req, res) => {
		try {
			const { email } = req.body;
			const findEmail = await Emails.findOne({ email });
			if (findEmail)
				return res.status(400).json({ msg: 'Email have been subscribe.' });
			const newEmail = new Emails({ email });
			await newEmail.save();

			res.json({ msg: 'Subscribe successfully.' });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	}
};
const createAccessToken = (user) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7m' });
};

const createRefreshToken = (user) => {
	return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

module.exports = userController;
