const express = require('express');
const router = express.Router();
const ApophisController = require("../../apis/apophisController");

router.route('/')
    .get(ApophisController.getAllApophis)

module.exports = router;