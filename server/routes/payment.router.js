const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');

router
	.route('/payments')
	.get(auth, authAdmin, paymentController.getPayments)
	.post(paymentController.createPayment);

router
	.route('/payment/:id')
	.patch(auth, authAdmin, paymentController.updateStatus)
	.delete(auth, authAdmin, paymentController.deletePayment);

module.exports = router;
