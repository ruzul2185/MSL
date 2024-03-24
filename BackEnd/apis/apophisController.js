const asyncHandler = require('express-async-handler');
const ApophisModel = require('../models/Apophis');
const SkillModel = require("../models/Skill");

const getAllApophis = asyncHandler(async (req, res, next) => {
    const Apophis = await ApophisModel.find().exec();

    const passiveSkills = await SkillModel.find({Type: 'Passive'}).exec();

    const ModifiedData = Apophis.map((item, index) => {

        const PS = passiveSkills.find(data => data.Name === item.PassiveSkill);
        let PSDesc;
        if (PS && PS.Desc) {
            const figures = item.PassiveSkillFigure.split(','); // Split the string into an array
            PSDesc = figures.reduce((desc, figure) => {
                return desc.split('&').join(figure);
            }, PS.Desc);
        } else {
            PSDesc = '';
        }

        const AS = passiveSkills.find(data => data.Name === item.ActiveSkill);
        let ASDesc;
        if (AS && AS.Desc) {
            const figures = item.ActiveSkillFigure.split(','); // Split the string into an array
            ASDesc = figures.reduce((desc, figure) => {
                return desc.split('&').join(figure);
            }, AS.Desc);
        } else {
            ASDesc = '';
        }

        const AOES = passiveSkills.find(data => data.Name === item.AOESkill);
        let AOEDesc;
        if (AOES && AOES.Desc) {
            const figures = item.AOESkillFigure.split(','); // Split the string into an array
            AOEDesc = figures.reduce((desc, figure) => {
                return desc.split('&').join(figure);
            }, AOES.Desc);
        } else {
            AOEDesc = '';
        }
        return {
            ...item.toObject(),
            _id: item._id.toHexString(),
            PassiveSkill: PS !== undefined ? PS : '',
            ActiveSkill: AS !== undefined ? AS : '',
            AOESkill: AOES !== undefined ? AOES : '',
        }
    });

    res.json({Apophis:ModifiedData});
});

module.exports = {
    getAllApophis,
};