const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    nameOfClothing: {
      type: String,
      required: true,
      unique: true,
    },
    typeOfClothing: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    img1: {
      type: String,
      required: true,
    },
    img2: {
      type: String,
      required: true,
    },
    img3: {
      type: String,
      required: true,
    },
    img4: {
      type: String,
      required: true,
    },
    itsNew: {
      type: Boolean,
      required: true,
    },
    sale: {
      type: Boolean,
      required: true,
    },
    bestSeller: {
      type: Boolean,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Products', productSchema);
