const moment = require('moment');
const mongoose = require('mongoose');
const Product = require('../models/ProductModel');

const ReturnAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const ReturnProduct = async (req, res) => {
  const { nameOfClothing } = req.body;
  try {
    const product = await Product.findOne({
      nameOfClothing: { $regex: new RegExp(`^${nameOfClothing}$`, 'i') },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addProduct = async (req, res) => {
  const {
    nameOfClothing,
    typeOfClothing,
    price,
    img1,
    img2,
    img3,
    img4,
    itsNew,
    sale,
    bestSeller,
    description,
  } = req.body;

  try {
    product = await Product.create({
      nameOfClothing,
      typeOfClothing,
      price,
      img1,
      img2,
      img3,
      img4,
      itsNew,
      sale,
      bestSeller,
      description,
    });
    res.status(200).json({ message: 'successfully added', product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  ReturnAllProducts,
  addProduct,
  ReturnProduct,
};
