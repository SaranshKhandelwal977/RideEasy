const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

router.post('/razorpay/order', paymentController.createOrder);

module.exports = router;
