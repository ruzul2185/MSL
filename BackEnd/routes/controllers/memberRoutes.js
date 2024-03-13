const express = require('express');
const router = express.Router();
const memberController = require('../../controllers/memberController');
const isAuth = require('../../middleware/isAuth');

router.route('/')
    .get(isAuth,memberController.viewMemberPage)

router.route('/add')
    .get(isAuth,memberController.addMemberPage)
    .post(isAuth,memberController.addMember)

router.route('/delete')
    .get(isAuth,memberController.deleteMember)

router.route('/update')
    .get(isAuth,memberController.updateMemberPage)
    .post(isAuth,memberController.updateMember)

module.exports = router;
