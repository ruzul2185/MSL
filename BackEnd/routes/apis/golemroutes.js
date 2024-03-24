const express = require('express');
const router = express.Router();
const GolemController = require("../../apis/golemController");

router.route('/')
    .get(GolemController.getAllGolem)

module.exports = router;