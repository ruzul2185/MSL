const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth');
const TeamController = require('../../controllers/teamController');

router.route('/')
    .get(isAuth,TeamController.viewTeamPage)

router.route('/add')
    .get(isAuth,TeamController.addTeamPage)
    .post(isAuth,TeamController.addTeam)

router.route('/delete')
    .get(isAuth,TeamController.deleteTeam)

router.route('/update')
    .get(isAuth,TeamController.updateTeamPage)
    .post(isAuth,TeamController.updateTeam)

module.exports = router;
