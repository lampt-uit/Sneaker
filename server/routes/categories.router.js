const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categories.controller');
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');

router
	.route('/category')
	.get(categoryController.getCategories)
	.post(auth, authAdmin, categoryController.createCategory);
router
	.route('/category/:id')
	.delete(auth, authAdmin, categoryController.deleteCategory)
	.put(auth, authAdmin, categoryController.updateCategory);

module.exports = router;
