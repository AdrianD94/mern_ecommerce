const express = require('express');
const router = express.Router();

const {userSignUpValidator} = require('../validator')

const { signup,signin } = require('../controllers/user.js');


router.post('/signup',userSignUpValidator, signup);
router.post('/signin', signin);
module.exports = router;
