const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth');
const TitanController = require("../../controllers/titanController");

router.route('/')
    .get(isAuth,TitanController.viewTitanPage)

router.route('/add')
    .get(isAuth,TitanController.addTitanPage)
    .post(isAuth,TitanController.addTitan)

router.route('/update')
    .get(isAuth,TitanController.updateTitanPage)
    .post(isAuth,TitanController.updateTitan)

router.route('/delete')
    .get(isAuth,TitanController.deleteTitan)

module.exports = router;