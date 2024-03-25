const asyncHandler = require('express-async-handler');
const TeamModel = require('../models/Team');

const getRDTeams = asyncHandler(async (req, res, next) => {
    const resultPerPage = 5;
    let { page, state } = req.query;
    const numOfUsers = await TeamModel.find({Type:'Region Defense',Element: state}).countDocuments();
    const numOfPages = Math.ceil(numOfUsers / resultPerPage);
    page = page ? (isNaN(Number(page)) ? 1 : Number(page)) : 1;
    let skip = (page - 1)*resultPerPage;
    if(skip < 0){
        skip = 0;
    }
    if(page > numOfPages){
        page = numOfPages
    }else if(page < 1){
        page = 1
    }
    let iterator = (page - 5) < 1? 1 : page - 5;
    let endingLink = (iterator + 9) <= numOfPages ? (iterator + 0) : page + (numOfPages - page);

    const RegionDefenseTeams = await TeamModel.find({Type:'Region Defense',Element: state}).limit(resultPerPage).skip(skip).exec();
    const ModifiedData = {
        RegionDefenseTeams,
        page,
        endingLink,
        iterator,
        numOfPages,
    }
    res.json(ModifiedData);
});

const getDDTeams = asyncHandler(async (req, res, next) => {
    const resultPerPage = 5;
    let { page, state } = req.query;
    const numOfUsers = await TeamModel.find({Type:'Dimensional Defense',Element: state}).countDocuments();
    const numOfPages = Math.ceil(numOfUsers / resultPerPage);
    page = page ? (isNaN(Number(page)) ? 1 : Number(page)) : 1;
    let skip = (page - 1)*resultPerPage;
    if(skip < 0){
        skip = 0;
    }
    if(page > numOfPages){
        page = numOfPages
    }else if(page < 1){
        page = 1
    }
    let iterator = (page - 5) < 1? 1 : page - 5;
    let endingLink = (iterator + 9) <= numOfPages ? (iterator + 0) : page + (numOfPages - page);

    const DimensionalDefenseTeams = await TeamModel.find({Type:'Dimensional Defense',Element: state}).limit(resultPerPage).skip(skip).exec();
    const ModifiedData = {
        DimensionalDefenseTeams,
        page,
        endingLink,
        iterator,
        numOfPages,
    }
    res.json(ModifiedData);
});

const getDGTeams = asyncHandler(async (req, res, next) => {
    const resultPerPage = 5;
    let { page, state } = req.query;
    const numOfUsers = await TeamModel.find({Type:'Dimensional Golem',Element: state}).countDocuments();
    const numOfPages = Math.ceil(numOfUsers / resultPerPage);
    page = page ? (isNaN(Number(page)) ? 1 : Number(page)) : 1;
    let skip = (page - 1)*resultPerPage;
    if(skip < 0){
        skip = 0;
    }
    if(page > numOfPages){
        page = numOfPages
    }else if(page < 1){
        page = 1
    }
    let iterator = (page - 5) < 1? 1 : page - 5;
    let endingLink = (iterator + 9) <= numOfPages ? (iterator + 0) : page + (numOfPages - page);

    const DimensionalGolemTeams = await TeamModel.find({Type:'Dimensional Golem',Element: state}).limit(resultPerPage).skip(skip).exec();
    const ModifiedData = {
        DimensionalGolemTeams,
        page,
        endingLink,
        iterator,
        numOfPages,
    }
    res.json(ModifiedData);
});

module.exports = {
    getRDTeams,
    getDDTeams,
    getDGTeams
};