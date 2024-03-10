const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const loginLimiter = require('../../middleware/loginLimiter');
const isAuth = require('../../middleware/isAuth');

router.route('/')
    .get(authController.loginPage)
    .post(authController.login)

router.route('/logout')
    .post(isAuth,authController.logoutFunction)

module.exports = router;
