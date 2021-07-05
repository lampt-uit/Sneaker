//Import package
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/user', require('./routes/user.router'));
app.use('/api', require('./routes/product.router'));
app.use('/api', require('./routes/payment.router'));
app.use('/api', require('./routes/categories.router'));

const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_URL;

mongoose
	.connect(URL, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})
	.then(() =>
		app.listen(PORT, () => {
			console.log(`Server is running on PORT: ${PORT}`);
		})
	)
	.catch((error) => {
		console.log(error.message);
	});
