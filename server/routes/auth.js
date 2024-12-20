const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('Email address already exists.');
          }
        });
      })
      .normalizeEmail(),
    body('name').trim().notEmpty().withMessage('Name can not be empty'),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Password should be at least 5 characters long.'),
  ],
  authController.signup
);

router.post('/login', authController.login);

module.exports = router;
