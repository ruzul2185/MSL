const asyncHandler = require('express-async-handler');
const dynamicMenu = require('../config/dynamicMenu');
const SkillModel = require('../models/Skill');
const TeamModel = require('../models/Team');

const viewTeamPage = asyncHandler(async(req, res, next)=> {
    const resultPerPage = 10;
    let { page } = req.query;
    const numOfUsers = await TeamModel.find().countDocuments();
    const numOfPages = Math.ceil(numOfUsers / resultPerPage);
    page = page ? (isNaN(Number(page)) ? 1 : Number(page)) : 1;
    let skip = (page - 1)*resultPerPage;
    if(skip < 0){
        skip = 0;
    }
    if(page > numOfPages){
        res.redirect('/teams/?page=' + encodeURIComponent(numOfPages));
    }else if(page < 1){
        res.redirect('/teams/?page=' + encodeURIComponent('1'));
    }
    let id = page > 1 ? (page-1)*10 + 1 : 1;
    let iterator = (page - 5) < 1? 1 : page - 5;
    let endingLink = (iterator + 9) <= numOfPages ? (iterator + 0) : page + (numOfPages - page);
    const Team = await TeamModel.find().limit(resultPerPage).skip(skip).exec();
    const modifiedData = Team.map((Team,index) => {
        return {
            ...Team.toObject(),
            _id: Team._id.toHexString(),
            id: id + index,
            createdAt: new Date(Team.createdAt).toLocaleString(),
            updatedAt: new Date(Team.updatedAt).toLocaleString(),
        };
    });
    const collectionData = await dynamicMenu();
    res.render('team',{
        sideMenu: collectionData,
        page: page,
        endingLink: endingLink,
        iterator: iterator,
        numOfPages: numOfPages,
        message: req.flash(),
        team:modifiedData,
        title: 'teams',
    });
});

const addTeamPage = asyncHandler(async(req, res, next)=> {
    const collectionData = await dynamicMenu();
    res.render('team/add',{
        sideMenu: collectionData,
        message: req.flash(),
        team:false,
    })
});

const updateTeamPage = asyncHandler(async(req, res, next)=> {
    const { id, page } = req.query

    const team = await TeamModel.findById(id).exec();
    if(!team) {
        req.flash('error','Team does not exist')
        return res.redirect('/teams/?page=' + encodeURIComponent(page));
    }
    const collectionData = await dynamicMenu();
    res.render('team/add',{
        sideMenu: collectionData,
        message: req.flash(),
        team:team,
        page: page,
    })
});

const addTeam = asyncHandler(async(req, res, next)=> {
    const {
        Name,
        Element,
        TeamURL,
        TeamDamage,
    } = req.body;

    const teamObject = {
        Name,
        Element,
        TeamURL,
        TeamDamage,
    };

    const duplicate = await TeamModel.findOne({Name,Element}).lean().exec();
    if(duplicate) {
        req.flash('error', 'Duplicate Skill')
        return res.redirect('/teams/add');
    }
    const astromonInfo = await TeamModel.create(teamObject);
    if(astromonInfo) {
        req.flash('success',`New Team Added by ${Name}`);
        res.redirect('/teams/add');
    }else {
        req.flash('error',`Problem occurred try again`);
        res.redirect('/teams/add');
    }
});

const updateTeam = asyncHandler(async(req, res, next)=> {
    const {
        id,
        page,
        Name,
        Element,
        TeamURL,
        TeamDamage,
    } = req.body;

    const oldTeam = await TeamModel.findById(id).exec();

    oldTeam.Name = Name
    oldTeam.Element = Element
    oldTeam.TeamURL = TeamURL
    oldTeam.TeamDamage = TeamDamage

    const updatedTeam = await oldTeam.save();

    if(updatedTeam){
        req.flash('success',`Team updated`);
        res.redirect('/teams/?page='+encodeURIComponent(page))
    }
});

const deleteTeam = asyncHandler(async(req, res, next)=> {
    const { id, page } = req.query

    const Team = await TeamModel.findById(id).exec();

    const result = Team.Name

    if(!result) {
        req.flash('error','Team does not exist')
        return res.redirect('/teams/?page=' + encodeURIComponent(page));
    }

    const info = await Team.deleteOne();

    if(info) {
        req.flash('success',`${result} deleted`);
        res.redirect('/teams/?page=' + encodeURIComponent(page));
    } else {
        req.flash('error','Something went wrong!');
        res.redirect('/teams/?page=' + encodeURIComponent(page));
    }
});

module.exports = {
    viewTeamPage,
    addTeamPage,
    updateTeamPage,
    addTeam,
    updateTeam,
    deleteTeam,
}