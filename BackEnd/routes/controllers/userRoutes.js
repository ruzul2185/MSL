const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth');
const userController = require('../../controllers/userController');

router.route('/')
    .get(isAuth,userController.viewUserPage)

router.route('/add')
    .get(isAuth,userController.addUserPage)
    .post(isAuth,userController.addUser)

router.route('/delete')
    .get(isAuth,userController.deleteUser)

router.route('/update')
    .get(isAuth,userController.updateUserPage)
    .post(isAuth,userController.updateUser)

module.exports = router;
