const asyncHandler = require('express-async-handler');
const dynamicMenu = require('../config/dynamicMenu');
const GolemModel = require('../models/Golem');
const SkillModel = require("../models/Skill");
const ApophisModel = require("../models/Apophis");


const viewGolemPage = asyncHandler(async(req, res, next) => {

    const Golem = await GolemModel.find().exec();

    const passiveSkills = await SkillModel.find({Type: 'Passive'}).exec();

    const ModifiedData = Golem.map((item, index) => {
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
    const collectionData = await dynamicMenu();
    res.render('golem',{
        sideMenu: collectionData,
        golem: ModifiedData,
        message: req.flash(),
        title: 'golems',
    });
});

const addGolemPage = asyncHandler(async(req, res, next) => {
    const passiveSkills = await SkillModel.find({Type: 'Passive'}).exec();
    const collectionData = await dynamicMenu();
    res.render('golem/add',{
        sideMenu: collectionData,
        message: req.flash(),
        golem:false,
        passiveSkills: passiveSkills,
    })
});

const updateGolem = asyncHandler(async(req, res, next) => {
    const { id } = req.body;

    const {
        URL,
        Element,
        SkillOne,
        SkillOneUrl,
        SkillOneDesc,
        SkillSecond,
        SkillSecondUrl,
        SkillSecondDesc,
        SkillThird,
        SkillThirdUrl,
        SkillThirdDesc,
        PassiveSkillOne,
        PassiveSkillOneFigure,
        PassiveSkillSecond,
        PassiveSkillSecondFigure,
        PassiveSkillThird,
        PassiveSkillThirdFigure,
        PassiveBuffOne,
        PassiveBuffOneUrl,
        PassiveBuffOneFigure,
        PassiveBuffOneDesc,
        PassiveBuffSecond,
        PassiveBuffSecondUrl,
        PassiveBuffSecondFigure,
        PassiveBuffSecondDesc,
        PassiveBuffThird,
        PassiveBuffThirdUrl,
        PassiveBuffThirdFigure,
        PassiveBuffThirdDesc
    } = req.body;

    const oldGolem = await GolemModel.findById(id).exec();

    oldGolem.URL = URL
    oldGolem.Element = Element
    oldGolem.SkillOne = SkillOne
    oldGolem.SkillOneUrl = SkillOneUrl
    oldGolem.SkillOneDesc = SkillOneDesc
    oldGolem.SkillSecond = SkillSecond
    oldGolem.SkillSecondUrl = SkillSecondUrl
    oldGolem.SkillSecondDesc = SkillSecondDesc
    oldGolem.SkillThird = SkillThird
    oldGolem.SkillThirdUrl = SkillThirdUrl
    oldGolem.SkillThirdDesc = SkillThirdDesc
    oldGolem.PassiveSkillOne = PassiveSkillOne
    oldGolem.PassiveSkillOneFigure = PassiveSkillOneFigure
    oldGolem.PassiveSkillSecond = PassiveSkillSecond
    oldGolem.PassiveSkillSecondFigure = PassiveSkillSecondFigure
    oldGolem.PassiveSkillThird = PassiveSkillThird
    oldGolem.PassiveSkillThirdFigure = PassiveSkillThirdFigure
    oldGolem.PassiveBuffOne = PassiveBuffOne
    oldGolem.PassiveBuffOneUrl = PassiveBuffOneUrl
    oldGolem.PassiveBuffOneFigure = PassiveBuffOneFigure
    oldGolem.PassiveBuffOneDesc = PassiveBuffOneDesc
    oldGolem.PassiveBuffSecond = PassiveBuffSecond
    oldGolem.PassiveBuffSecondUrl = PassiveBuffSecondUrl
    oldGolem.PassiveBuffSecondFigure = PassiveBuffSecondFigure
    oldGolem.PassiveBuffSecondDesc = PassiveBuffSecondDesc
    oldGolem.PassiveBuffThird = PassiveBuffThird
    oldGolem.PassiveBuffThirdUrl = PassiveBuffThirdUrl
    oldGolem.PassiveBuffThirdFigure = PassiveBuffThirdFigure
    oldGolem.PassiveBuffThirdDesc = PassiveBuffThirdDesc

    const updatedGolem = await oldGolem.save();

    if(updatedGolem){
        req.flash('success',`Golem(${updatedGolem.Element}) updated`);
        res.redirect('/golems')
    }

});

const deleteGolem = asyncHandler(async(req, res, next) => {
    const { id } = req.query

    const object = await GolemModel.findById(id).exec();

    const result = object.Element

    if(!result) {
        req.flash('error','Golem does not exist')
        return res.redirect('/golems');
    }

    const info = await object.deleteOne();

    if(info) {
        req.flash('success',`${result} deleted`);
        res.redirect('/golems');
    } else {
        req.flash('error','Something went wrong!');
        res.redirect('/golems');
    }
});

const addGolem = asyncHandler(async(req, res, next) => {
    const {
        URL,
        Element,
        SkillOne,
        SkillOneUrl,
        SkillOneDesc,
        SkillSecond,
        SkillSecondUrl,
        SkillSecondDesc,
        SkillThird,
        SkillThirdUrl,
        SkillThirdDesc,
        PassiveSkillOne,
        PassiveSkillOneFigure,
        PassiveSkillSecond,
        PassiveSkillSecondFigure,
        PassiveSkillThird,
        PassiveSkillThirdFigure,
        PassiveBuffOne,
        PassiveBuffOneUrl,
        PassiveBuffOneFigure,
        PassiveBuffOneDesc,
        PassiveBuffSecond,
        PassiveBuffSecondUrl,
        PassiveBuffSecondFigure,
        PassiveBuffSecondDesc,
        PassiveBuffThird,
        PassiveBuffThirdUrl,
        PassiveBuffThirdFigure,
        PassiveBuffThirdDesc
    } = req.body;
    const golemObject = {
        URL,
        Element,
        SkillOne,
        SkillOneUrl,
        SkillOneDesc,
        SkillSecond,
        SkillSecondUrl,
        SkillSecondDesc,
        SkillThird,
        SkillThirdUrl,
        SkillThirdDesc,
        PassiveSkillOne,
        PassiveSkillOneFigure,
        PassiveSkillSecond,
        PassiveSkillSecondFigure,
        PassiveSkillThird,
        PassiveSkillThirdFigure,
        PassiveBuffOne,
        PassiveBuffOneUrl,
        PassiveBuffOneFigure,
        PassiveBuffOneDesc,
        PassiveBuffSecond,
        PassiveBuffSecondUrl,
        PassiveBuffSecondFigure,
        PassiveBuffSecondDesc,
        PassiveBuffThird,
        PassiveBuffThirdUrl,
        PassiveBuffThirdFigure,
        PassiveBuffThirdDesc
    }
    const duplicate = await GolemModel.findOne({Element}).lean().exec();
    if(duplicate) {
        req.flash('error', 'Duplicate Golem')
        return res.redirect('/golems/add');
    }

    const golem = await GolemModel.create(golemObject);

    if(golem) {
        req.flash('success',`New Golem Added`);
        res.redirect('/golems/add');
    }else {
        req.flash('error',`Problem occurred try again`);
        res.redirect('/golems/add');
    }
});

const updateGolemPage = asyncHandler(async(req, res, next) => {
    const { id } = req.query

    const passiveSkills = await SkillModel.find({Type: 'Passive'}).exec();

    const golem = await GolemModel.findById(id).exec();
    if(!golem) {
        req.flash('error','Golem does not exist')
        return res.redirect('/golems');
    }
    const collectionData = await dynamicMenu();
    res.render('golem/add',{
        sideMenu: collectionData,
        message: req.flash(),
        golem:golem,
        passiveSkills: passiveSkills,
    })
});

module.exports = {
    viewGolemPage,
    addGolemPage,
    updateGolem,
    deleteGolem,
    addGolem,
    updateGolemPage,
}