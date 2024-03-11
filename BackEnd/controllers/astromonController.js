const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const dynamicMenu = require('../config/dynamicMenu');
const AstromonModel = require('../models/Astromon');
const SkillModel = require('../models/Skill');

const viewAstromonPage = asyncHandler(async (req, res, next) => {
    const resultPerPage = 10;
    let { page } = req.query;
    const numOfUsers = await AstromonModel.find().countDocuments();
    const numOfPages = Math.ceil(numOfUsers / resultPerPage);
    // page = page ? Number(page) : 1;
    page = page ? (isNaN(Number(page)) ? 1 : Number(page)) : 1;
    let skip = (page - 1)*resultPerPage;
    if(skip < 0){
        skip = 0;
    }
    if(page > numOfPages){
        res.redirect('/astromons/?page=' + encodeURIComponent(numOfPages));
    }else if(page < 1){
        res.redirect('/astromons/?page=' + encodeURIComponent('1'));
    }
    let id = page > 1 ? (page-1)*10 + 1 : 1;
    const Astromon = await AstromonModel.find().limit(resultPerPage).skip(skip).exec();

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
    res.render('astromon',{
        sideMenu: collectionData,
        astromon: modifiedData,
        page: page,
        endingLink: endingLink,
        iterator: iterator,
        numOfPages: numOfPages,
        message: req.flash(),
        title: 'astromons',
    });
});

const addAstromonPage = asyncHandler(async (req, res, next) => {
    const skills = await SkillModel.find('all');
    const collectionData = await dynamicMenu();
    res.render('astromon/add',{
        sideMenu: collectionData,
        message: req.flash(),
        astromon:false,
    })
});

const updateAstromon = asyncHandler(async(req,res,next) => {

});

const deleteAstromon = asyncHandler(async(req,res, next) =>{

});

const addAstromon = asyncHandler(async (req, res, next) => {

});

const updateAstromonPage = asyncHandler(async(req, res, next) => {

});

module.exports = {
    viewAstromonPage,
    addAstromonPage,
    updateAstromon,
    deleteAstromon,
    addAstromon,
    updateAstromonPage,
}
