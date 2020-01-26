const express = require('express');
const router = express.Router();

const { create } = require('../controllers/category.js');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const {categoryValidator} = require('../validator')

const { userById } = require('../controllers/user');

router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, categoryValidator,create);

router.param('userId', userById);

module.exports = router;
