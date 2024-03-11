const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth');
const AstromonController = require('../../controllers/astromonController');

router.route('/')
    .get(isAuth,AstromonController.viewAstromonPage)

router.route('/add')
    .get(isAuth,AstromonController.addAstromonPage)
    .post(isAuth,AstromonController.addAstromon)

router.route('/delete')
    .get(isAuth,AstromonController.deleteAstromon)

router.route('/update')
    .get(isAuth,AstromonController.updateAstromonPage)
    .post(isAuth,AstromonController.updateAstromon)

module.exports = router;
