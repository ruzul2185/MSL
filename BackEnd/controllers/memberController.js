const asyncHandler = require('express-async-handler');
const MemberModel = require('../models/Member');
const dynamicMenu = require("../config/dynamicMenu");

const viewMemberPage = asyncHandler(async(req, res, next)=> {
    const resultPerPage = 10;
    let { page } = req.query;
    const numOfUsers = await MemberModel.find().countDocuments();
    const numOfPages = Math.ceil(numOfUsers / resultPerPage);
    // page = page ? Number(page) : 1;
    page = page ? (isNaN(Number(page)) ? 1 : Number(page)) : 1;
    let skip = (page - 1)*resultPerPage;
    if(skip < 0){
        skip = 0;
    }
    if(page > numOfPages){
        res.redirect('/members/?page=' + encodeURIComponent(numOfPages));
    }else if(page < 1){
        res.redirect('/members/?page=' + encodeURIComponent('1'));
    }
    let id = page > 1 ? (page-1)*10 + 1 : 1;
    const member = await MemberModel.find().limit(resultPerPage).skip(skip).exec();

    const modifiedData = member.map((member,index) => {
        return {
            ...member.toObject(),
            _id: member._id.toHexString(),
            id: id + index,
            createdAt: new Date(member.createdAt).toLocaleString(),
            updatedAt: new Date(member.updatedAt).toLocaleString(),
        };
    });
    let iterator = (page - 5) < 1? 1 : page - 5;
    let endingLink = (iterator + 9) <= numOfPages ? (iterator + 0) : page + (numOfPages - page);
    const collectionData = await dynamicMenu();
    res.render('member',{
        sideMenu: collectionData,
        member: modifiedData,
        page: page,
        endingLink: endingLink,
        iterator: iterator,
        numOfPages: numOfPages,
        message: req.flash(),
        title: 'members',
    });
});

const addMemberPage = asyncHandler(async (req, res, next) => {
    const collectionData = await dynamicMenu();
    res.render('member/add',{
        sideMenu: collectionData,
        message: req.flash(),
        member:false,
    })
});

const addMember = asyncHandler(async (req, res, next) => {

   const {
       Name,
       Type,
   }  = req.body

    const memberObject = {
        Name,
        Type
    }

    const duplicate = await MemberModel.findOne({Name}).lean().exec();
    if(duplicate) {
        req.flash('error', 'Duplicate Member')
        return res.redirect('/members/add');
    }

    const member = await MemberModel.create(memberObject);

    if(member) {
        req.flash('success',`New Member ${Name} Added`);
        res.redirect('/members/add');
    }else {
        req.flash('error',`Problem occurred try again`);
        res.redirect('/members/add');
    }
});

const updateMemberPage = asyncHandler(async (req, res, next) => {
    const { id, page } = req.query

    const member = await MemberModel.findById(id).exec();
    if(!member) {
        req.flash('error','Member does not exist')
        return res.redirect('/members/?page=' + encodeURIComponent(page));
    }
    const collectionData = await dynamicMenu();
    res.render('member/add',{
        sideMenu: collectionData,
        message: req.flash(),
        member:member,
        page: page,
    })
});

const updateMember = asyncHandler(async (req, res, next) => {
    const {
            id,
            page,
            Name,
            Type
    } = req.body;

    const oldMember = await MemberModel.findById(id).exec();

    oldMember.Name = Name
    oldMember.Type = Type

    const updatedMember = await oldMember.save();

    if(updatedMember){
        req.flash('success',`${updatedMember.Name} updated`);
        res.redirect('/members/?page='+encodeURIComponent(page))
    }
});

const deleteMember = asyncHandler(async (req, res, next) => {
    const { id, page } = req.query

    const Member = await MemberModel.findById(id).exec();

    const result = Member.Name

    if(!result) {
        req.flash('error','Skill does not exist')
        return res.redirect('/members/?page=' + encodeURIComponent(page));
    }

    const info = await Member.deleteOne();

    if(info) {
        req.flash('success',`${result} deleted`);
        res.redirect('/members/?page=' + encodeURIComponent(page));
    } else {
        req.flash('error','Something went wrong!');
        res.redirect('/members/?page=' + encodeURIComponent(page));
    }
});

module.exports = {
    viewMemberPage,
    addMemberPage,
    addMember,
    updateMemberPage,
    updateMember,
    deleteMember
}
