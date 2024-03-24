const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth');
const ApophisController = require("../../controllers/apophisController");

router.route('/')
    .get(isAuth,ApophisController.viewApophisPage)

router.route('/add')
    .get(isAuth,ApophisController.addApophisPage)
    .post(isAuth,ApophisController.addApophis)

router.route('/update')
    .get(isAuth,ApophisController.updateApophisPage)
    .post(isAuth,ApophisController.updateApophis)

router.route('/delete')
    .get(isAuth,ApophisController.deleteApophis)

module.exports = router;