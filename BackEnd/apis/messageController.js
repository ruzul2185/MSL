const asyncHandler = require('express-async-handler');
const MessageModel = require('../models/Message');

const getAllMessages = asyncHandler(async(req, res, next)=> {
    let MessageList = await MessageModel.find({ Title: { $ne: 'Note' } }).exec();

    if(MessageList.length === 0){
        MessageList = []
    }

    res.json(MessageList)
});

const getTitanMessage = asyncHandler(async(req, res, next) => {
    const { element } =  req.query

   let MessageList = await MessageModel.find({Title:'Note',SubTitle:`Titan (${element})`}) .exec();

    if(MessageList.length === 0){
        MessageList = []
    }

    res.json(MessageList)
});

const getApophisMessage = asyncHandler(async(req, res, next) => {
    const { element } =  req.query

    let MessageList = await MessageModel.find({Title:'Note',SubTitle:`Apophis (${element})`}) .exec();

    if(MessageList.length === 0){
        MessageList = []
    }

    res.json(MessageList)
});

const getGolemMessage = asyncHandler(async(req, res, next) => {
    const { element } =  req.query

    let MessageList = await MessageModel.find({Title:'Note',SubTitle:`Golem (${element})`}) .exec();

    if(MessageList.length === 0){
        MessageList = []
    }

    res.json(MessageList)
});

module.exports = {
    getAllMessages,
    getTitanMessage,
    getApophisMessage,
    getGolemMessage,
}
