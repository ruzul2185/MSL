const express = require('express');
const router = express.Router();
const memberController = require('../../apis/memberController');

router.route('/')
    .get(memberController.getAllMembers)

module.exports = router;
