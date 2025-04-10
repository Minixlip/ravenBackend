const express = require('express');

const {
  ReturnAllProducts,
  addProduct,
  ReturnProduct,
} = require('../controllers/ShopController');
const router = express.Router();

// return all products Route
router.get('', ReturnAllProducts);

router.post('/add', addProduct);

router.post('/product', ReturnProduct);

module.exports = router;
