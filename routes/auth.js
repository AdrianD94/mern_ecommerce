const express = require('express');
const router = express.Router();

const {userSignUpValidator} = require('../validator')

const { signup,signin,signout,requireSignin } = require('../controllers/auth.js');


router.post('/signup',userSignUpValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);



module.exports = router;
