const User = require('../models/UsersModel');
const bcrypt = require('bcrypt');
const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '30d' });
};

//Login user

const loginUser = async (req, res) => {
  const { emailAddress, password } = req.body;

  console.log('email:' + emailAddress + 'password:' + password);

  try {
    const user = await User.findOne({ emailAddress });

    if (!user) {
      throw Error('Incorrect email');
    }

    const { firstName, surName } = user;

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw Error('Incorrect password');
    }

    const userid = user._id;

    const token = createToken(user._id);
    res.status(200).json({ emailAddress, token, userid, firstName, surName });
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
};

// signup user

// create a new user
const createUser = async (req, res) => {
  const { firstName, surName, emailAddress, password } = req.body;

  try {
    // validation

    if (!emailAddress || !password) {
      throw Error('All fields must be filled');
    }
    if (!validator.isEmail(emailAddress)) {
      throw Error('Invalid Email');
    }
    if (!validator.isStrongPassword(password)) {
      throw Error('Not strong enough password');
    }

    const exists = await User.findOne({ emailAddress });

    if (exists) {
      throw Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    // add doc to DB
    const user = await User.create({
      firstName,
      surName,
      emailAddress,
      password: hash,
    });

    const userid = user._id;

    const token = createToken(user._id);
    res.status(200).json({ emailAddress, token, userid, firstName, surName });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
};
