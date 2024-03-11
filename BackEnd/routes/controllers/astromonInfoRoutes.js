const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth');
const AstromonInfoController = require('../../controllers/astromonInfoController');

router.route('/')
    .get(isAuth,AstromonInfoController.viewAstromonInfoPage)

router.route('/add')
    .get(isAuth,AstromonInfoController.addAstromonInfoPage)
    .post(isAuth,AstromonInfoController.addAstromonInfo)

router.route('/update')
    .get(isAuth,AstromonInfoController.updateAstromonInfoPage)
    .post(isAuth,AstromonInfoController.updateAstromonInfo)

router.route('/delete')
    .get(isAuth,AstromonInfoController.deleteAstromonInfo)

module.exports = router;
