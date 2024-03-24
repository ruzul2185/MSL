const asyncHandler = require('express-async-handler');
const dynamicMenu = require('../config/dynamicMenu');
const TItanModel = require('../models/Titan');
const SkillModel = require("../models/Skill");
const GolemModel = require("../models/Golem");

const viewTitanPage = asyncHandler(async(req, res, next) => {
    const Titan = await TItanModel.find().exec();
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
    const collectionData = await dynamicMenu();
    res.render('titan',{
        sideMenu: collectionData,
        titan: ModifiedData,
        message: req.flash(),
        title: 'titans',
    });
});

const addTitanPage = asyncHandler(async (req, res, next) => {
    const passiveSkills = await SkillModel.find({Type: 'Passive'}).exec();
    const collectionData = await dynamicMenu();
    res.render('titan/add',{
        sideMenu: collectionData,
        message: req.flash(),
        titan:false,
        passiveSkills: passiveSkills,
    })
});

const updateTitanPage = asyncHandler(async(req, res, next) => {
    const { id } = req.query

    const passiveSkills = await SkillModel.find({Type: 'Passive'}).exec();

    const titan = await TItanModel.findById(id).exec();
    if(!titan) {
        req.flash('error','Titan does not exist')
        return res.redirect('/titans');
    }
    const collectionData = await dynamicMenu();
    res.render('titan/add',{
        sideMenu: collectionData,
        message: req.flash(),
        titan:titan,
        passiveSkills: passiveSkills,
    })

});

const updateTitan = asyncHandler(async(req, res, next) => {
    const { id } = req.body;

    const {
        URL,
        Element,
        PassiveSkill,
        PassiveSkillFigure,
        ActiveSkill,
        ActiveSkillFigure
    } = req.body;

    const oldTitan = await TItanModel.findById(id).exec();

    oldTitan.URL = URL
    oldTitan.Element = Element
    oldTitan.PassiveSkill = PassiveSkill
    oldTitan.PassiveSkillFigure = PassiveSkillFigure
    oldTitan.ActiveSkill = ActiveSkill
    oldTitan.ActiveSkillFigure = ActiveSkillFigure

    const updatedTitan = await oldTitan.save();

    if(updatedTitan){
        req.flash('success',`Golem(${updatedTitan.Element}) updated`);
        res.redirect('/titans')
    }
});

const addTitan = asyncHandler(async(req, res, next) => {
    const {
        URL,
        Element,
        PassiveSkill,
        PassiveSkillFigure,
        ActiveSkill,
        ActiveSkillFigure
    } = req.body;

    const titanObject = {
        URL,
        Element,
        PassiveSkill,
        PassiveSkillFigure,
        ActiveSkill,
        ActiveSkillFigure
    }

    const duplicate = await TItanModel.findOne({Element}).lean().exec();
    if(duplicate) {
        req.flash('error', 'Duplicate TItan')
        return res.redirect('/titans/add');
    }

    const titan = await TItanModel.create(titanObject);

    if(titan) {
        req.flash('success',`New Titan Added`);
        res.redirect('/titans/add');
    }else {
        req.flash('error',`Problem occurred try again`);
        res.redirect('/titans/add');
    }
});

const deleteTitan = asyncHandler(async(req, res, next) => {
    const { id } = req.query

    const object = await TItanModel.findById(id).exec();

    const result = object.Element

    if(!result) {
        req.flash('error','Titan does not exist')
        return res.redirect('/titans');
    }

    const info = await object.deleteOne();

    if(info) {
        req.flash('success',`${result} deleted`);
        res.redirect('/titans');
    } else {
        req.flash('error','Something went wrong!');
        res.redirect('/titans');
    }
});


module.exports = {
    viewTitanPage,
    addTitanPage,
    updateTitan,
    deleteTitan,
    addTitan,
    updateTitanPage,
}