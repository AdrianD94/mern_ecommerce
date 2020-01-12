const express = require('express');
const router = express.Router();

const {userSignUpValidator} = require('../validator')

const { signup,signin,signout } = require('../controllers/user.js');


router.post('/signup',userSignUpValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);
module.exports = router;
