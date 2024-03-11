const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const dynamicMenu = require('../config/dynamicMenu');
const SkillModel = require('../models/Skill');
const AstromonInfo = require("../models/Astromon_Info");

const viewSkillPage = asyncHandler(async (req, res, next) => {
    const resultPerPage = 12;
    let { page } = req.query;
    const numOfUsers = await SkillModel.find().countDocuments();
    const numOfPages = Math.ceil(numOfUsers / resultPerPage);
    // page = page ? Number(page) : 1;
    page = page ? (isNaN(Number(page)) ? 1 : Number(page)) : 1;
    let skip = (page - 1)*resultPerPage;
    if(skip < 0){
        skip = 0;
    }
    if(page > numOfPages){
        res.redirect('/skills/?page=' + encodeURIComponent(numOfPages));
    }else if(page < 1){
        res.redirect('/skills/?page=' + encodeURIComponent('1'));
    }
    let id = page > 1 ? (page-1)*10 + 1 : 1;
    const Astromon = await SkillModel.find().limit(resultPerPage).skip(skip).exec();

    const modifiedData = Astromon.map((Astromon,index) => {
        return {
            ...Astromon.toObject(),
            _id: Astromon._id.toHexString(),
            id: id + index,
            createdAt: new Date(Astromon.createdAt).toLocaleString(),
            updatedAt: new Date(Astromon.updatedAt).toLocaleString(),
        };
    });
    let iterator = (page - 5) < 1? 1 : page - 5;
    let endingLink = (iterator + 9) <= numOfPages ? (iterator + 0) : page + (numOfPages - page);
    const collectionData = await dynamicMenu();
    res.render('skill',{
        sideMenu: collectionData,
        skill: modifiedData,
        page: page,
        endingLink: endingLink,
        iterator: iterator,
        numOfPages: numOfPages,
        message: req.flash(),
        title: 'skills',
    });
});

const addSkillPage = asyncHandler(async (req, res, next) => {
    const collectionData = await dynamicMenu();
    res.render('skill/add',{
        sideMenu: collectionData,
        message: req.flash(),
        skill:false,
    })
});

const addSkill = asyncHandler(async(req, res, next)=> {
    const {
        Name,
        Desc,
        AI_Desc,
        Url,
        Type
    } = req.body;

    const skillObject = {
        Name,
        Desc,
        AI_Desc,
        Url,
        Type
    }

    const duplicate = await SkillModel.findOne({Name}).lean().exec();
    if(duplicate) {
        req.flash('error', 'Duplicate Skill')
        return res.redirect('/skills/add');
    }
    const astromonInfo = await SkillModel.create(skillObject);
    if(astromonInfo) {
        req.flash('success',`New Skill ${Name} Added`);
        res.redirect('/skills/add');
    }else {
        req.flash('error',`Problem occurred try again`);
        res.redirect('/skills/add');
    }
});

const updateSkillPage = asyncHandler(async (req, res, next) => {
    const { id, page } = req.query

    const user = await SkillModel.findById(id).exec();
    if(!user) {
        req.flash('error','Skill does not exist')
        return res.redirect('/skills/?page=' + encodeURIComponent(page));
    }
    const collectionData = await dynamicMenu();
    res.render('skill/add',{
        sideMenu: collectionData,
        message: req.flash(),
        skill:user,
        page: page,
    })
});

const updateSkill = asyncHandler(async (req, res, next) => {
    const {
        id,
        page,
        Name,
        Desc,
        AI_Desc,
        Url,
        Type
    } = req.body;

    const oldSkill = await SkillModel.findById(id).exec();

    oldSkill.Name = Name
    oldSkill.Desc = Desc
    oldSkill.AI_Desc = AI_Desc
    oldSkill.Url = Url
    oldSkill.Type = Type

    const updatedSkill = await oldSkill.save();

    if(updatedSkill){
        req.flash('success',`${updatedSkill.Name} updated`);
        res.redirect('/skills/?page='+encodeURIComponent(page))
    }
});

const deleteSkill = asyncHandler(async (req, res, next) => {
    const { id, page } = req.query

    const Skill = await SkillModel.findById(id).exec();

    const result = Skill.Name

    if(!result) {
        req.flash('error','Skill does not exist')
        return res.redirect('/skills/?page=' + encodeURIComponent(page));
    }

    const info = await Skill.deleteOne();

    if(info) {
        req.flash('success',`${result} deleted`);
        res.redirect('/skills/?page=' + encodeURIComponent(page));
    } else {
        req.flash('error','Something went wrong!');
        res.redirect('/skills/?page=' + encodeURIComponent(page));
    }
});

module.exports = {
    viewSkillPage,
    addSkillPage,
    updateSkillPage,
    addSkill,
    updateSkill,
    deleteSkill,
}
