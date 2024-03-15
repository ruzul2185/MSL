const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const dynamicMenu = require('../config/dynamicMenu');
const AstromonModel = require('../models/Astromon');
const AstromonInfoModel = require('../models/Astromon_Info');
const SkillModel = require('../models/Skill');

const viewAstromonPage = asyncHandler(async (req, res, next) => {
    const resultPerPage = 8;
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

    const passiveSkills = await SkillModel.find({Type: 'Passive'}).exec();

    const activeSkills = await SkillModel.find({Type: 'Active'}).exec();

    const ultimateSkills = await SkillModel.find({Type: 'Ultimate'}).exec();

    const leaderSkills = await SkillModel.find({Type: 'Leader'}).exec();

    const modifiedData = Astromon.map((Astromon,index) => {

        const LS = leaderSkills.find(item => item.Name === Astromon.Leader_Skill);
        let LSDesc;

        if (LS && LS.Desc) {
            const figures = Astromon.Leader_Skill_Figure.split(','); // Split the string into an array
            LSDesc = figures.reduce((desc, figure) => {
                return desc.split('&').join(figure);
            }, LS.Desc);
        } else {
            LSDesc = '';
        }

        const PS = passiveSkills.find(item => item.Name === Astromon.Passive_Skill);
        let PSDesc;

        if (PS && PS.Desc) {
            const figures = Astromon.Passive_Skill_Figure.split(','); // Split the string into an array
            PSDesc = figures.reduce((desc, figure) => {
                return desc.split('&').join(figure);
            }, PS.Desc);
        } else {
            PSDesc = '';
        }

        const AS = activeSkills.find(item => item.Name === Astromon.Active_Skill);
        let ASDesc;

        if (AS && AS.Desc) {
            const figures = Astromon.Active_Skill_Figure.split(','); // Split the string into an array
            ASDesc = figures.reduce((desc, figure) => {
                return desc.split('&').join(figure);
            }, AS.Desc);
        } else {
            ASDesc = '';
        }

        const SS = ultimateSkills.find(item => item.Name === Astromon.Ultimate_Skill);
        let SSDesc;

        if (SS && SS.Desc) {
            const figures = Astromon.Ultimate_Skill_Figure.split(','); // Split the string into an array
            SSDesc = figures.reduce((desc, figure) => {
                return desc.split('&').join(figure);
            }, SS.Desc);
        } else {
            SSDesc = '';
        }

        return {
            ...Astromon.toObject(),
            _id: Astromon._id.toHexString(),
            id: id + index,
            Passive_Skill_Object: PS !== undefined ? PS : '',
            Active_Skill_Object: AS !== undefined ? AS : '',
            Ultimate_Skill_Object: SS !== undefined ? SS : '',
            Leader_Skill_Object: LS !== undefined ? LS : '',
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

    const passiveSkills = await SkillModel.find({Type: 'Passive'}).exec();

    const activeSkills = await SkillModel.find({Type: 'Active'}).exec();

    const ultimateSkills = await SkillModel.find({Type: 'Ultimate'}).exec();

    const leaderSkills = await SkillModel.find({Type: 'Leader'}).exec();

    const astromonInfoList = await AstromonInfoModel.find().exec();

    const collectionData = await dynamicMenu();
    res.render('astromon/add',{
        sideMenu: collectionData,
        message: req.flash(),
        astromon:false,
        passiveSkills: passiveSkills,
        activeSkills: activeSkills,
        ultimateSkills: ultimateSkills,
        leaderSkills: leaderSkills,
        astromonInfoList: astromonInfoList,
    })
});

const updateAstromon = asyncHandler(async(req,res,next) => {
    const {
        id,
        page,
        Name,
        Star,
        Evolution_Level,
        URL,
        Type,
        Critical_Dmg,
        Critical_Rate,
        Resist,
        Critical_Resist,
        Element,
        Leader_Skill,
        Active_Skill,
        Passive_Skill,
        Ultimate_Skill,
        Leader_Skill_Figure,
        Active_Skill_Figure,
        Passive_Skill_Figure,
        Ultimate_Skill_Figure,
        Active_Book,
        Passive_Book,
        Astromon_Info
    } = req.body;

    const oldAstromon = await AstromonModel.findById(id).exec();

    oldAstromon.Name = Name
    oldAstromon.Evolution_Level = Evolution_Level
    oldAstromon.Star = Star
    oldAstromon.URL = URL
    oldAstromon.Type = Type
    oldAstromon.Critical_Dmg = Critical_Dmg
    oldAstromon.Critical_Rate = Critical_Rate
    oldAstromon.Resist = Resist
    oldAstromon.Critical_Resist = Critical_Resist
    oldAstromon.Element = Element
    oldAstromon.Leader_Skill = Leader_Skill
    oldAstromon.Active_Skill = Active_Skill
    oldAstromon.Passive_Skill = Passive_Skill
    oldAstromon.Ultimate_Skill = Ultimate_Skill
    oldAstromon.Leader_Skill_Figure = Leader_Skill_Figure
    oldAstromon.Active_Skill_Figure = Active_Skill_Figure
    oldAstromon.Passive_Skill_Figure = Passive_Skill_Figure
    oldAstromon.Ultimate_Skill_Figure = Ultimate_Skill_Figure
    oldAstromon.Active_Book = Active_Book
    oldAstromon.Passive_Book = Passive_Book
    oldAstromon.Astromon_Info = Astromon_Info

    const updatedAstromon = await oldAstromon.save();

    if(updatedAstromon){
        req.flash('success',`${updatedAstromon.Name} updated`);
        res.redirect('/astromons/?page='+encodeURIComponent(page))
    }

});

const deleteAstromon = asyncHandler(async(req,res, next) =>{
    const { id, page } = req.query

    const object = await AstromonModel.findById(id).exec();

    const result = object.Name

    if(!result) {
        req.flash('error','Astromon does not exist')
        return res.redirect('/astromons/?page=' + encodeURIComponent(page));
    }

    const info = await object.deleteOne();

    if(info) {
        req.flash('success',`${result} deleted`);
        res.redirect('/astromons/?page=' + encodeURIComponent(page));
    } else {
        req.flash('error','Something went wrong!');
        res.redirect('/astromons/?page=' + encodeURIComponent(page));
    }
});

const addAstromon = asyncHandler(async (req, res, next) => {
    const {
        Name,
        Evolution_Level,
        URL,
        Star,
        Type,
        Critical_Dmg,
        Critical_Rate,
        Resist,
        Critical_Resist,
        Element,
        Leader_Skill,
        Active_Skill,
        Passive_Skill,
        Ultimate_Skill,
        Leader_Skill_Figure,
        Active_Skill_Figure,
        Passive_Skill_Figure,
        Ultimate_Skill_Figure,
        Active_Book,
        Passive_Book,
        Astromon_Info
    } = req.body;

    let HP = Number(req.body.HP);
    // let Star = Number(req.body.Star);
    let Attack = Number(req.body.Attack);
    let Defence = Number(req.body.Defence);
    let Recovery = Number(req.body.Recovery);

    const astromonObject = {Name,
        Evolution_Level,
        HP,
        Star,
        URL,
        Attack,
        Type,
        Defence,
        Recovery,
        Critical_Dmg,
        Critical_Rate,
        Resist,
        Critical_Resist,
        Element,
        Leader_Skill,
        Active_Skill,
        Passive_Skill,
        Ultimate_Skill,
        Leader_Skill_Figure,
        Active_Skill_Figure,
        Passive_Skill_Figure,
        Ultimate_Skill_Figure,
        Active_Book,
        Passive_Book,
        Astromon_Info}

    const duplicate = await AstromonModel.findOne({Name,Element}).lean().exec();
    if(duplicate) {
        req.flash('error', 'Duplicate Astromon')
        return res.redirect('/astromons/add');
    }
    const astromon = await AstromonModel.create(astromonObject);
    if(astromon) {
        req.flash('success',`New Astromon ${Name} Added`);
        res.redirect('/astromons/add');
    }else {
        req.flash('error',`Problem occurred try again`);
        res.redirect('/astromons/add');
    }
});

const updateAstromonPage = asyncHandler(async(req, res, next) => {
    const { id, page } = req.query

    const passiveSkills = await SkillModel.find({Type: 'Passive'}).exec();

    const activeSkills = await SkillModel.find({Type: 'Active'}).exec();

    const ultimateSkills = await SkillModel.find({Type: 'Ultimate'}).exec();

    const leaderSkills = await SkillModel.find({Type: 'Leader'}).exec();

    const astromonInfoList = await AstromonInfoModel.find().exec();

    const astromon = await AstromonModel.findById(id).exec();
    if(!astromon) {
        req.flash('error','Astromon does not exist')
        return res.redirect('/astromons/?page=' + encodeURIComponent(page));
    }
    const collectionData = await dynamicMenu();
    res.render('astromon/add',{
        sideMenu: collectionData,
        message: req.flash(),
        astromon:astromon,
        page: page,
        passiveSkills: passiveSkills,
        activeSkills: activeSkills,
        ultimateSkills: ultimateSkills,
        leaderSkills: leaderSkills,
        astromonInfoList: astromonInfoList,
    })
});

module.exports = {
    viewAstromonPage,
    addAstromonPage,
    updateAstromon,
    deleteAstromon,
    addAstromon,
    updateAstromonPage,
}
