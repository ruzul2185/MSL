const AstromonInfo = require('../models/Astromon_Info');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const dynamicMenu = require('../config/dynamicMenu');

const viewAstromonInfoPage = asyncHandler( async (req, res, next)=> {
    const resultPerPage = 8;
    let { page } = req.query;
    const numOfUsers = await AstromonInfo.find().countDocuments();
    const numOfPages = Math.ceil(numOfUsers / resultPerPage);
    // page = page ? Number(page) : 1;
    page = page ? (isNaN(Number(page)) ? 1 : Number(page)) : 1;
    let skip = (page - 1)*resultPerPage;
    if(skip < 0){
        skip = 0;
    }
    if(page > numOfPages){
        res.redirect('/astromon-infos/?page=' + encodeURIComponent(numOfPages));
    }else if(page < 1){
        res.redirect('/astromon-infos/?page=' + encodeURIComponent('1'));
    }
    let id = page > 1 ? (page-1)*10 + 1 : 1;
    const Astromon = await AstromonInfo.find().limit(resultPerPage).skip(skip).exec();

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
    res.render('astromonInfo',{
        sideMenu: collectionData,
        astromonInfo: modifiedData,
        page: page,
        endingLink: endingLink,
        iterator: iterator,
        numOfPages: numOfPages,
        message: req.flash(),
        title: 'astromon-infos',
    });
});

const addAstromonInfoPage = asyncHandler(async (req, res, next) => {
    const collectionData = await dynamicMenu();
    res.render('astromonInfo/add',{
        sideMenu: collectionData,
        message: req.flash(),
        astromonInfo:false,
    })
});

const addAstromonInfo = asyncHandler(async (req, res, next) => {
    const {
        Astromon_Associated,
        Leader_Skill_Name,
        Leader_Skill_Title,
        Leader_Skill_Desc,
        Leader_Skill_Url,
        Passive_Skill_Name,
        Passive_Skill_Target,
        Passive_Skill_Desc,
        Passive_Skill_Url,
        Active_Skill_Name,
        Active_Skill_Target,
        Active_Skill_Desc,
        Active_Skill_Url,
        Super_Skill_Name,
        Super_Skill_Target,
        Super_Skill_Desc,
        Super_Skill_Url
    } = req.body;

    const AstromonInfoObject = {
        Astromon_Associated,
        Leader_Skill_Name,
        Leader_Skill_Title,
        Leader_Skill_Desc,
        Leader_Skill_Url,
        Passive_Skill_Name,
        Passive_Skill_Target,
        Passive_Skill_Desc,
        Passive_Skill_Url,
        Active_Skill_Name,
        Active_Skill_Target,
        Active_Skill_Desc,
        Active_Skill_Url,
        Super_Skill_Name,
        Super_Skill_Target,
        Super_Skill_Desc,
        Super_Skill_Url
    };

    const duplicate = await AstromonInfo.findOne({Astromon_Associated}).lean().exec();
    if(duplicate) {
        req.flash('error', 'Duplicate Astromon Association')
        return res.redirect('/astromon-infos/add');
    }

    const astromonInfo = await AstromonInfo.create(AstromonInfoObject);

    if(astromonInfo) {
        req.flash('success',`New Astromon Information ${Astromon_Associated} Added`);
        res.redirect('/astromon-infos/add');
    }else {
        req.flash('error',`Problem occurred try again`);
        res.redirect('/astromon-infos/add');
    }

});

const updateAstromonInfoPage = asyncHandler(async (req, res, next) => {
    const { id, page } = req.query

    const user = await AstromonInfo.findById(id).exec();
    if(!user) {
        req.flash('error','Object does not exist')
        return res.redirect('/astromon-infos/?page=' + encodeURIComponent(page));
    }
    const collectionData = await dynamicMenu();
    res.render('astromonInfo/add',{
        sideMenu: collectionData,
        message: req.flash(),
        astromonInfo:user,
        page: page,
    })
});

const updateAstromonInfo = asyncHandler(async (req, res, next) => {
    const {
        id,
        page,
        Astromon_Associated,
        Leader_Skill_Name,
        Leader_Skill_Title,
        Leader_Skill_Desc,
        Leader_Skill_Url,
        Passive_Skill_Name,
        Passive_Skill_Target,
        Passive_Skill_Desc,
        Passive_Skill_Url,
        Active_Skill_Name,
        Active_Skill_Target,
        Active_Skill_Desc,
        Active_Skill_Url,
        Super_Skill_Name,
        Super_Skill_Target,
        Super_Skill_Desc,
        Super_Skill_Url
    } = req.body;

    const oldUser = await AstromonInfo.findById(id).exec();

    oldUser.Astromon_Associated = Astromon_Associated
    oldUser.Leader_Skill_Name = Leader_Skill_Name
    oldUser.Leader_Skill_Title = Leader_Skill_Title
    oldUser.Leader_Skill_Desc = Leader_Skill_Desc
    oldUser.Leader_Skill_Url = Leader_Skill_Url
    oldUser.Passive_Skill_Name = Passive_Skill_Name
    oldUser.Passive_Skill_Target = Passive_Skill_Target
    oldUser.Passive_Skill_Desc = Passive_Skill_Desc
    oldUser.Passive_Skill_Url = Passive_Skill_Url
    oldUser.Active_Skill_Name = Active_Skill_Name
    oldUser.Active_Skill_Target = Active_Skill_Target
    oldUser.Active_Skill_Desc = Active_Skill_Desc
    oldUser.Active_Skill_Url = Active_Skill_Url
    oldUser.Super_Skill_Name = Super_Skill_Name
    oldUser.Super_Skill_Target = Super_Skill_Target
    oldUser.Super_Skill_Desc = Super_Skill_Desc
    oldUser.Super_Skill_Url = Super_Skill_Url

    const updatedUser = await oldUser.save();

    if(updatedUser){
        req.flash('success',`${updatedUser.Astromon_Associated} updated`);
        res.redirect('/astromon-infos/?page='+encodeURIComponent(page))
    }

});

const deleteAstromonInfo = asyncHandler(async (req, res, next) => {
    const { id, page } = req.query

    const Astromon = await AstromonInfo.findById(id).exec();

    const result = Astromon.Astromon_Associated

    if(!result) {
        req.flash('error','Object does not exist')
        return res.redirect('/astromon-infos/?page=' + encodeURIComponent(page));
    }

    const info = await AstromonInfo.deleteOne();

    if(info) {
        req.flash('success',`${result} deleted`);
        res.redirect('/astromon-infos/?page=' + encodeURIComponent(page));
    } else {
        req.flash('error','Something went wrong!');
        res.redirect('/astromon-infos/?page=' + encodeURIComponent(page));
    }

});

module.exports = {
    viewAstromonInfoPage,
    addAstromonInfo,
    updateAstromonInfo,
    deleteAstromonInfo,
    addAstromonInfoPage,
    updateAstromonInfoPage,
}
