const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/dashboardController');
const loginLimiter = require('../../middleware/loginLimiter');
const isAuth = require('../../middleware/isAuth');

router.route('/')
    .get(isAuth,dashboardController.dashboardPage)

module.exports = router;
