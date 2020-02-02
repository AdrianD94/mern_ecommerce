const express = require('express');
const router = express.Router();

const { create } = require('../controllers/product.js');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { categoryValidator } = require('../validator');

const { userById } = require('../controllers/user');

router.post(
  '/product/create/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  create
);

router.param('userId', userById);

module.exports = router;
