const express = require('express');
const router = express.Router();
const messageController = require('../../apis/messageController');

router.route('/')
    .get(messageController.getAllMessages)

router.route('/titan')
    .get(messageController.getTitanMessage);

router.route('/apophis')
    .get(messageController.getApophisMessage);

router.route('/golem')
    .get(messageController.getGolemMessage);

module.exports = router;
