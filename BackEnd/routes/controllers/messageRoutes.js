const express = require('express');
const router = express.Router();
const messageController = require('../../controllers/messageController');
const isAuth = require('../../middleware/isAuth');
const SkillController = require("../../controllers/skillController");

router.route('/')
    .get(isAuth,messageController.viewMessagePage)

router.route('/add')
    .get(isAuth,messageController.addMessagePage)
    .post(isAuth,messageController.addMessage)

router.route('/delete')
    .get(isAuth,messageController.deleteMessage)

router.route('/update')
    .get(isAuth,messageController.updateMessagePage)
    .post(isAuth,messageController.updateMessage)

module.exports = router;
