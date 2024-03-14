const asyncHandler = require('express-async-handler');
const SkillModel = require('../models/Skill');

const getAllSkills = asyncHandler(async(req, res, next)=> {

    let leaderSkill = await SkillModel.find({ Type: "Leader" }).select('_id Name').exec();

    let passiveSkill = await SkillModel.find({ Type: "Passive" }).select('_id Name').exec();

    let activeSkill = await SkillModel.find({ Type: "Active" }).select('_id Name').exec();

    if(leaderSkill.length === 0){
        leaderSkill = []
    }

    if(passiveSkill.length === 0){
        passiveSkill = []
    }

    if(activeSkill.length === 0){
        activeSkill = []
    }

    const filterObject = {
      leaderSkill,
      passiveSkill,
      activeSkill
    };

    res.json(filterObject)

});

module.exports = {
    getAllSkills,
}
