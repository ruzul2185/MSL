const express = require('express');
const router = express.Router();
const TeamController = require("../../apis/teamController");

router.route('/titan')
    .get(TeamController.getRDTeams)

router.route('/apophis')
    .get(TeamController.getDDTeams)

router.route('/golem')
    .get(TeamController.getDGTeams)

module.exports = router;