const asyncHandler = require('express-async-handler');
const SkillModel = require("../models/Skill");
const TitanModel = require('../models/Titan');

const getAllTitan = asyncHandler(async (req, res, next) => {
    const Titan = await TitanModel.find().exec();
    const passiveSkills = await SkillModel.find({Type: 'Passive'}).exec();
    const ModifiedData = Titan.map((item, index) => {
        const PS = passiveSkills.find(data => data.Name === item.PassiveSkill);
        const AS = passiveSkills.find(data => data.Name === item.ActiveSkill);

        return {
            ...item.toObject(),
            _id: item._id.toHexString(),
            PassiveSkill: PS !== undefined ? PS : '',
            ActiveSkill: AS !== undefined ? AS : '',
            createdAt: new Date(item.createdAt).toLocaleString(),
            updatedAt: new Date(item.updatedAt).toLocaleString(),
        }
    });

    res.json(ModifiedData);
})

module.exports = {
    getAllTitan,
}