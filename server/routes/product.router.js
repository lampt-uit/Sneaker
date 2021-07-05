const express = require('express');
const router = express.Router();
const multer = require('multer');

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '.\\uploads\\');
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});
const upload = multer({
	storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter
});

const productController = require('../controllers/product.controller');
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');

router.route('/products').get(productController.getProducts).post(
	// auth,
	// authAdmin,
	upload.array('image'),
	productController.createProduct
);
router
	.route('/product/:id')
	.get(productController.getProduct)
	.delete(productController.deleteProduct)
	.patch(upload.array('image'), productController.updateProduct);

module.exports = router;
