const asyncHandler = require('express-async-handler');
const SkillModel = require("../models/Skill");
const GolemModel = require("../models/Golem");

const getAllGolem = asyncHandler(async (req, res, next) => {
    const golem = await GolemModel.find().exec();

    const passiveSkills = await SkillModel.find({Type: 'Passive'}).exec();

    const ModifiedData = golem.map((item, index) => {
        const PSO = passiveSkills.find(data => data.Name === item.PassiveSkillOne);
        const PSS = passiveSkills.find(data => data.Name === item.PassiveSkillSecond);
        const PST = passiveSkills.find(data => data.Name === item.PassiveSkillThird);

        return {
            ...item.toObject(),
            _id: item._id.toHexString(),
            PassiveSkillOne: PSO !== undefined ? PSO : '',
            PassiveSkillSecond: PSS !== undefined ? PSS : '',
            PassiveSkillThird: PST !== undefined ? PST : '',
            createdAt: new Date(item.createdAt).toLocaleString(),
            updatedAt: new Date(item.updatedAt).toLocaleString(),
        }
    });

    res.json(ModifiedData);
});

module.exports = {
    getAllGolem,
}