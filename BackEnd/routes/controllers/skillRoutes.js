const express = require('express');
const router = express.Router();
const isAuth = require('../../middleware/isAuth');
const SkillController = require('../../controllers/skillController');

router.route('/')
    .get(isAuth,SkillController.viewSkillPage)

router.route('/add')
    .get(isAuth,SkillController.addSkillPage)
    .post(isAuth,SkillController.addSkill)

router.route('/delete')
    .get(isAuth,SkillController.deleteSkill)

router.route('/update')
    .get(isAuth,SkillController.updateSkillPage)
    .post(isAuth,SkillController.updateSkill)

module.exports = router;
