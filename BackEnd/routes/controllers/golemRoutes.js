const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth');
const GolemController = require("../../controllers/golemController");

router.route('/')
    .get(isAuth,GolemController.viewGolemPage)

router.route('/add')
    .get(isAuth,GolemController.addGolemPage)
    .post(isAuth,GolemController.addGolem)

router.route('/update')
    .get(isAuth,GolemController.updateGolemPage)
    .post(isAuth,GolemController.updateGolem)

router.route('/delete')
    .get(isAuth,GolemController.deleteGolem)

module.exports = router;