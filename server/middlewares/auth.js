const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
	try {
		//Get token from client send to server on Header
		const token = req.header('Authorization');

		//If dont have token
		if (!token)
			return res.status(400).json({ message: 'Invalid Authentication' });

		//Verify token
		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
			//If have token but token is changed
			if (error)
				return res.status(400).json({ message: 'Invalid Authentication' });

			// console.log(user); {id:..,iat:...,exp:...}
			req.user = user;
			next();
		});
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};

module.exports = auth;
