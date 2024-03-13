const express = require('express');
const router = express.Router();
const messageController = require('../../apis/messageController');

router.route('/')
    .get(messageController.getAllMessages)

module.exports = router;
