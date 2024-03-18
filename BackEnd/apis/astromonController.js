const asyncHandler = require('express-async-handler');
const AstromonModel = require('../models/Astromon');
const AstromonInfoModel = require('../models/Astromon_Info');
const SkillModel = require("../models/Skill");

const getAllAstromons = asyncHandler(async(req, res, next)=> {

    const resultPerPage = 10;

    // let { page } = req.query;
    let { element,star,leaderSkill,passiveSkill,activeSkill,page } = req.body;

    const query = {};
    const filters = {
        Star: star,
        Element: element,
        Active_Skill: activeSkill,
        Passive_Skill: passiveSkill,
        Leader_Skill: leaderSkill,
        $or: [
            { Evolution_Level: { $in: ["Evo 3", "Super Evo", "Ultimate Evo"] } },
            { Name: { $regex: "Gleem", $options: "i" } },
            { Name: { $regex: "Shark", $options: "i" } }
        ]
    };

// Check if any filter value is not "None"
    const hasFilters = Object.values(filters).some(value => value !== "None");

// Set properties in the query object if their corresponding filter value is not "None"
    if (hasFilters) {
        for (const [key, value] of Object.entries(filters)) {
            if (value !== "None") {
                query[key] = value;
            }
        }
    }

    let numOfUsers;
    if(hasFilters) {
        numOfUsers = await AstromonModel.find(query).countDocuments();
    } else {
        numOfUsers = await AstromonModel.find().countDocuments();
    }
    const numOfPages = Math.ceil(numOfUsers / resultPerPage);
    // page = page ? Number(page) : 1;
    page = page ? (isNaN(Number(page)) ? 1 : Number(page)) : 1;
    let skip = (page - 1)*resultPerPage;
    if(skip < 0){
        skip = 0;
    }
    if(page > numOfPages){
        // res.redirect('/astromons/?page=' + encodeURIComponent(numOfPages));
        page = 1
    }else if(page < 1){
        page = 1
    }
    let id = page > 1 ? (page-1)*10 + 1 : 1;

    let Astromon;

    if (hasFilters) {
        Astromon = await AstromonModel.find(query).limit(resultPerPage).skip(skip).exec();
    } else {
        Astromon = await AstromonModel.find().limit(resultPerPage).skip(skip).exec();
    }


    const passiveSkills = await SkillModel.find({Type: 'Passive'}).exec();

    const activeSkills = await SkillModel.find({Type: 'Active'}).exec();

    // const ultimateSkills = await SkillModel.find({Type: 'Ultimate'}).exec();

    const leaderSkills = await SkillModel.find({Type: 'Leader'}).exec();

    const astromonData = Astromon.map((Astromon,index) => {

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

        // const SS = ultimateSkills.find(item => item.Name === Astromon.Ultimate_Skill);
        // let SSDesc;
        //
        // if (SS && SS.Desc) {
        //     const figures = Astromon.Ultimate_Skill_Figure.split(','); // Split the string into an array
        //     SSDesc = figures.reduce((desc, figure) => {
        //         return desc.split('&').join(figure);
        //     }, SS.Desc);
        // } else {
        //     SSDesc = '';
        // }

        return {
            ...Astromon.toObject(),
            _id: Astromon._id.toHexString(),
            id: id + index,
            Passive_Skill_Object: PS !== undefined ? PS : '',
            Active_Skill_Object: AS !== undefined ? AS : '',
            // Ultimate_Skill_Object: SS !== undefined ? SS : '',
            Leader_Skill_Object: LS !== undefined ? LS : '',
            createdAt: new Date(Astromon.createdAt).toLocaleString(),
            updatedAt: new Date(Astromon.updatedAt).toLocaleString(),
        };
    });

    let iterator = (page - 5) < 1? 1 : page - 5;
    let endingLink = (iterator + 9) <= numOfPages ? (iterator + 0) : page + (numOfPages - page);

    const responseObject = {
        astromonData,
        page,
        endingLink,
        iterator,
        numOfPages,
        passiveSkills,
        activeSkills,
        leaderSkills
    };

    res.json(responseObject);
});

const getIndividualAstromon = asyncHandler(async (req, res, next) => {
    const {name} = req.query;

    let query = {
        Name: {
            $regex: new RegExp(`\\(${name}\\)`, 'i')
        }
    };

    const AstromonData = await AstromonModel.find(query).lean().exec();
    const AstromonInfo = await AstromonInfoModel.find().exec();
    const passiveSkills = await SkillModel.find({Type: 'Passive'}).exec();
    const activeSkills = await SkillModel.find({Type: 'Active'}).exec();
    const ultimateSkills = await SkillModel.find({Type: 'Ultimate'}).exec();
    const leaderSkills = await SkillModel.find({Type: 'Leader'}).exec();

    AstromonData.forEach((data) => {
        const matchAstromonInfo = AstromonInfo.find((info) => info.Astromon_Associated === data.Astromon_Info);
        if (matchAstromonInfo) {
            data.Astromon_Info = matchAstromonInfo;
        }
        const matchPassiveSkill = passiveSkills.find((info) => info.Name === data.Passive_Skill);
        if (matchPassiveSkill) {
            data.Passive_Skill = matchPassiveSkill;
        }
        const matchActiveSkill = activeSkills.find((info) => info.Name === data.Active_Skill);
        if (matchActiveSkill) {
            data.Active_Skill = matchActiveSkill;
        }
        const matchUltimateSkill = ultimateSkills.find((info) => info.Name === data.Ultimate_Skill);
        if (matchUltimateSkill) {
            data.Ultimate_Skill = matchUltimateSkill;
        } else if (matchUltimateSkill === "None") {
            data.Ultimate_Skill = "None";
        }
        const matchLeaderSkill = leaderSkills.find((info) => info.Name === data.Leader_Skill);
        if (matchLeaderSkill) {
            data.Leader_Skill = matchLeaderSkill;
        }
    });



    const Evo1 = AstromonData.filter((item) => item.Evolution_Level === 'Evo 1');

    const Evo2 = AstromonData.filter((item) => item.Evolution_Level === 'Evo 2');

    const Evo3 = AstromonData.filter((item) => item.Evolution_Level === 'Evo 3');

    const SuperEvo2 = AstromonData.filter((item) => item.Evolution_Level === 'Super Evo 2');

    const SuperEvo3 = AstromonData.filter((item) => item.Evolution_Level === "Super Evo 3");

    const Ultimate = AstromonData.filter((item) => item.Evolution_Level === "Ultimate Evo");

    const AstromonObject = {
        Evo1,
        Evo2,
        Evo3,
        SuperEvo2,
        SuperEvo3,
        Ultimate
    }

    res.json(AstromonObject);

});

module.exports = {
    getAllAstromons,
    getIndividualAstromon
}
