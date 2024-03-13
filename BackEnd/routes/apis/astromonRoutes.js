const express = require('express');
const router = express.Router();
const astromonController = require('../../apis/astromonController');

router.route('/')
    .get(astromonController.getAllAstromons)

module.exports = router;
