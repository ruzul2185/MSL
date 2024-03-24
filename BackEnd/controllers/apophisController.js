
const asyncHandler = require('express-async-handler');
const dynamicMenu = require('../config/dynamicMenu');
const ApophisModel = require('../models/Apophis');
const SkillModel = require("../models/Skill");

const viewApophisPage = asyncHandler(async (req, res, next) => {
    const resultPerPage = 7;
    let { page } = req.query;
    const numOfUsers = await ApophisModel.find().countDocuments();
    const numOfPages = Math.ceil(numOfUsers / resultPerPage);
    page = page ? (isNaN(Number(page)) ? 1 : Number(page)) : 1;
    let skip = (page - 1)*resultPerPage;
    if(skip < 0){
        skip = 0;
    }
    if(page > numOfPages){
        res.redirect('/apophis/?page=' + encodeURIComponent(numOfPages));
    }else if(page < 1){
        res.redirect('/apophis/?page=' + encodeURIComponent('1'));
    }
    let id = page > 1 ? (page-1)*10 + 1 : 1;
    const Apophis = await ApophisModel.find().limit(resultPerPage).skip(skip).exec();

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
            id: id + index,
            PassiveSkill: PS !== undefined ? PS : '',
            ActiveSkill: AS !== undefined ? AS : '',
            AOESkill: AOES !== undefined ? AOES : '',
            createdAt: new Date(item.createdAt).toLocaleString(),
            updatedAt: new Date(item.updatedAt).toLocaleString(),
        }
    });

    let iterator = (page - 5) < 1? 1 : page - 5;
    let endingLink = (iterator + 9) <= numOfPages ? (iterator + 0) : page + (numOfPages - page);
    const collectionData = await dynamicMenu();

    res.render('apophis',{
        sideMenu: collectionData,
        apophis: ModifiedData,
        page: page,
        endingLink: endingLink,
        iterator: iterator,
        numOfPages: numOfPages,
        message: req.flash(),
        title: 'apophis',
    });
});

const addApophisPage = asyncHandler(async (req, res, next) => {

    const passiveSkills = await SkillModel.find({Type: 'Passive'}).exec();

    const collectionData = await dynamicMenu();
    res.render('apophis/add',{
        sideMenu: collectionData,
        message: req.flash(),
        apophis:false,
        passiveSkills: passiveSkills,
    })
});

const addApophis = asyncHandler(async (req, res, next) => {
    const {
        id,
        page,
        Element,
        URL,
        PassiveSkill,
        PassiveSkillFigure,
        ActiveSkill,
        ActiveSkillFigure,
        AOESkill,
        AOESkillFigure
    } = req.body

    const apophisObject = {
        Element,
        URL,
        PassiveSkill,
        PassiveSkillFigure,
        ActiveSkill,
        ActiveSkillFigure,
        AOESkill,
        AOESkillFigure
    };

    const duplicate = await ApophisModel.findOne({Element}).lean().exec();
    if(duplicate) {
        req.flash('error', 'Duplicate Apophis')
        return res.redirect('/apophis/add');
    }

    const apophis = await ApophisModel.create(apophisObject);

    if(apophis) {
        req.flash('success',`New Apophis Added`);
        res.redirect('/apophis/add');
    }else {
        req.flash('error',`Problem occurred try again`);
        res.redirect('/apophis/add');
    }
});

const updateApophisPage = asyncHandler( async(req, res, next) => {
    const { id, page } = req.query

    const passiveSkills = await SkillModel.find({Type: 'Passive'}).exec();

    const apophis = await ApophisModel.findById(id).exec();
    if(!apophis) {
        req.flash('error','Apophis does not exist')
        return res.redirect('/apophis/?page=' + encodeURIComponent(page));
    }
    const collectionData = await dynamicMenu();
    res.render('apophis/add',{
        sideMenu: collectionData,
        message: req.flash(),
        apophis:apophis,
        page: page,
        passiveSkills: passiveSkills,
    })
});

const updateApophis = asyncHandler(async (req, res, next) => {
    const { id, page } = req.body;

    const {
        Element,
        URL,
        PassiveSkill,
        PassiveSkillFigure,
        ActiveSkill,
        ActiveSkillFigure,
        AOESkill,
        AOESkillFigure
    } = req.body;

    const oldApophis = await ApophisModel.findById(id).exec();

    oldApophis.Element = Element
    oldApophis.URL = URL
    oldApophis.PassiveSkill = PassiveSkill
    oldApophis.PassiveSkillFigure = PassiveSkillFigure
    oldApophis.ActiveSkill = ActiveSkill
    oldApophis.ActiveSkillFigure = ActiveSkillFigure
    oldApophis.AOESkill = AOESkill
    oldApophis.AOESkillFigure

    const updatedApophis = await oldApophis.save();

    if(updatedApophis){
        req.flash('success',`Apophis(${updatedApophis.Element}) updated`);
        res.redirect('/apophis/?page='+encodeURIComponent(page))
    }
});

const deleteApophis = asyncHandler(async(req, res, next) => {
    const { id, page } = req.query

    const object = await ApophisModel.findById(id).exec();

    const result = object.Element

    if(!result) {
        req.flash('error','Apophis does not exist')
        return res.redirect('/apophis/?page=' + encodeURIComponent(page));
    }

    const info = await object.deleteOne();

    if(info) {
        req.flash('success',`${result} deleted`);
        res.redirect('/apophis/?page=' + encodeURIComponent(page));
    } else {
        req.flash('error','Something went wrong!');
        res.redirect('/apophis/?page=' + encodeURIComponent(page));
    }
})

module.exports = {
    viewApophisPage,
    addApophisPage,
    updateApophis,
    deleteApophis,
    addApophis,
    updateApophisPage,
}