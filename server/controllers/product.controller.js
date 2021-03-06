const Products = require('../models/product.model');

class APIfeatures {
	constructor(query, queryString) {
		(this.query = query), (this.queryString = queryString);
	}
	filtering() {
		const queryObj = { ...this.queryString };
		const excludedFields = ['page', 'sort', 'limit'];
		excludedFields.forEach((el) => delete queryObj[el]);

		let queryStr = JSON.stringify(queryObj);

		queryStr = queryStr.replace(
			/\b(gte|gt|lt|lte|regex)\b/g,
			(match) => '$' + match
		);

		this.query.find(JSON.parse(queryStr));
		return this;
	}
	sorting() {
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(',').join('');
			this.query = this.query.sort(sortBy);
		}
		// } else {
		// 	this.query = this.query.sort('-createdAt');
		// }
		return this;
	}
	paginating() {
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1;
		const skip = (page - 1) * limit;
		this.query = this.query.skip(skip).limit(limit);
		return this;
	}
}

const productController = {
	getProducts: async (req, res) => {
		try {
			const features = new APIfeatures(Products.find(), req.query)
				.filtering()
				.sorting()
				.paginating();
			const products = await features.query;

			res.json({
				status: 'success',
				result: products.length,
				products
			});
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	getProduct: async (req, res) => {
		try {
			const product = await Products.findById(req.params.id);
			res.json(product);
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	createProduct: async (req, res) => {
		try {
			const image = [
				'http://localhost:4000/' + req.files[0].path,
				'http://localhost:4000/' + req.files[1].path
			];
			const { product_id, title, price, description, category, stock } =
				req.body;

			if (!image)
				return res
					.status(400)
					.json({ msg: 'No image upload. You need upload image' });

			const product = await Products.findOne({ product_id });

			if (product)
				return res.status(400).json({ msg: 'This product already exists' });

			const newProduct = new Products({
				product_id,
				title: title.toUpperCase(),
				price,
				description,
				image,
				category,
				stock
			});
			await newProduct.save();

			res.json({ msg: 'Created a New Product Successful' });
		} catch (error) {
			return res.status(500).json({ msg: error.msg });
		}
	},
	deleteProduct: async (req, res) => {
		try {
			await Products.findByIdAndDelete(req.params.id);
			res.json({ msg: 'Deleted a Product' });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	updateProduct: async (req, res) => {
		try {
			const image = [
				'http://localhost:4000/' + req.files[0].path,
				'http://localhost:4000/' + req.files[1].path
			];
			const { title, price, description, category, stock } = req.body;

			if (!image)
				return res
					.status(400)
					.json({ message: 'Please upload file image for product' });

			await Products.findOneAndUpdate(
				{
					_id: req.params.id
				},
				{
					title: title.toUpperCase(),
					price,
					description,
					image,
					category,
					stock
				}
			);
			res.json({ message: 'Product is updated successfully' });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	}
};

module.exports = productController;
