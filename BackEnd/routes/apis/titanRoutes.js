const express = require('express');
const router = express.Router();
const TitanController = require('../../apis/titanController');

router.route('/')
    .get(TitanController.getAllTitan)

module.exports = router;