const Order = require('../models/OrdersModel');
const validator = require('validator');
const mongoose = require('mongoose');

const Payment = async (req, res) => {
  const { emailAddress, products } = req.body;

  try {
    if (!emailAddress) throw Error('No Email Detected');
    if (!validator.isEmail(emailAddress)) throw Error('Invalid Email');
    if (!products || !Array.isArray(products) || products.length === 0) {
      throw Error('No Products Detected');
    }

    // Try to find existing order by email
    const existingOrder = await Order.findOne({ orderEmail: emailAddress });

    let order;

    if (existingOrder) {
      // Update the products
      existingOrder.products.push(...products);
      order = await existingOrder.save();
    } else {
      // Create a new order
      order = await Order.create({
        orderEmail: emailAddress,
        products,
      });
    }

    return res.status(200).json({
      emailAddress,
      products: order.products,
      message: 'Successfully Saved',
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const ReturnOrder = async (req, res) => {
  const { emailAddress } = req.body;

  console.log(emailAddress);

  try {
    if (!emailAddress) {
      throw Error('No emailAddress');
    }

    if (!validator.isEmail(emailAddress)) {
      throw Error('Invalid Email');
    }

    const exists = await Order.findOne({ orderEmail: emailAddress });

    if (!exists) {
      throw Error('No orders');
    }

    return res.status(200).json({ orders: exists });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  Payment,
  ReturnOrder,
};
