const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  nameOfClothing: String,
  TypeOfClothing: String,
  price: Number,
  img1: String,
});

const orderSchema = new mongoose.Schema({
  orderEmail: { type: String, required: true },
  products: [productSchema],
});

module.exports = mongoose.model('Order', orderSchema);
