const asyncHandler = require('express-async-handler');
const dynamicMenu = require('../config/dynamicMenu');
const MessageModel = require("../models/Message");
const MemberModel = require("../models/Member");

const viewMessagePage = asyncHandler(async(req, res, next) => {
    const resultPerPage = 10;
    let { page } = req.query;
    const numOfUsers = await MessageModel.find().countDocuments();
    const numOfPages = Math.ceil(numOfUsers / resultPerPage);
    // page = page ? Number(page) : 1;
    page = page ? (isNaN(Number(page)) ? 1 : Number(page)) : 1;
    let skip = (page - 1)*resultPerPage;
    if(skip < 0){
        skip = 0;
    }
    if(page > numOfPages){
        res.redirect('/messages/?page=' + encodeURIComponent(numOfPages));
    }else if(page < 1){
        res.redirect('/messages/?page=' + encodeURIComponent('1'));
    }
    let id = page > 1 ? (page-1)*10 + 1 : 1;
    const member = await MessageModel.find().limit(resultPerPage).skip(skip).exec();

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
    res.render('message',{
        sideMenu: collectionData,
        member: modifiedData,
        page: page,
        endingLink: endingLink,
        iterator: iterator,
        numOfPages: numOfPages,
        message: req.flash(),
        title: 'messages',
    });
});

const addMessagePage = asyncHandler(async(req, res, next) => {
    const collectionData = await dynamicMenu();
    res.render('message/add',{
        sideMenu: collectionData,
        message: req.flash(),
        member:false,
    })
});

const addMessage = asyncHandler(async (req, res, next) => {
    const {
        Title,
        SubTitle,
        Body
    }  = req.body

    const messageObject = {
        Title,
        SubTitle,
        Body
    }

    const duplicate = await MessageModel.findOne({Title,SubTitle}).lean().exec();
    if(duplicate) {
        req.flash('error', 'Duplicate Member')
        return res.redirect('/messages/add');
    }

    const member = await MessageModel.create(messageObject);

    if(member) {
        req.flash('success',`New Message Added`);
        res.redirect('/messages/add');
    }else {
        req.flash('error',`Problem occurred try again`);
        res.redirect('/messages/add');
    }
});

const updateMessagePage = asyncHandler(async(req, res, next) => {
    const { id, page } = req.query

    const member = await MessageModel.findById(id).exec();
    if(!member) {
        req.flash('error','Message does not exist')
        return res.redirect('/messages/?page=' + encodeURIComponent(page));
    }
    const collectionData = await dynamicMenu();
    res.render('message/add',{
        sideMenu: collectionData,
        message: req.flash(),
        member:member,
        page: page,
    })
});

const updateMessage = asyncHandler(async (req, res, next) => {
    const {
        id,
        page,
        Title,
        SubTitle,
        Body,
    } = req.body;

    const oldMember = await MessageModel.findById(id).exec();

    oldMember.Title = Title
    oldMember.SubTitle = SubTitle
    oldMember.Body = Body

    const updatedMember = await oldMember.save();

    if(updatedMember){
        req.flash('success',`${updatedMember.Title} updated`);
        res.redirect('/messages/?page='+encodeURIComponent(page))
    }
});

const deleteMessage = asyncHandler(async (req, res, next) => {
    const { id, page } = req.query

    const Member = await MessageModel.findById(id).exec();

    const result = Member.Title

    if(!result) {
        req.flash('error','Message does not exist')
        return res.redirect('/messages/?page=' + encodeURIComponent(page));
    }

    const info = await Member.deleteOne();

    if(info) {
        req.flash('success',`${result} deleted`);
        res.redirect('/messages/?page=' + encodeURIComponent(page));
    } else {
        req.flash('error','Something went wrong!');
        res.redirect('/messages/?page=' + encodeURIComponent(page));
    }
});

module.exports = {
    viewMessagePage,
    addMessagePage,
    addMessage,
    updateMessagePage,
    updateMessage,
    deleteMessage
}
