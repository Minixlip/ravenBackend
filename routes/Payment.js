const express = require('express');

const { Payment, ReturnOrder } = require('../controllers/paymentController');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

// authentication
router.use(requireAuth);

// Payment Route
router.post('', Payment);

// return order route
router.post('/order', ReturnOrder);

module.exports = router;
