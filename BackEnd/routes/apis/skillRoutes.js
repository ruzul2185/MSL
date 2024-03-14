const express = require('express');
const router = express.Router();
const skillController = require('../../apis/skillController');

router.route('/')
    .get(skillController.getAllSkills)

module.exports = router;
