const asyncHandler = require('express-async-handler');
const MessageModel = require('../models/Message');

const getAllMessages = asyncHandler(async(req, res, next)=> {
    let MessageList = await MessageModel.find().exec();

    if(MessageList.length === 0){
        MessageList = []
    }

    res.json(MessageList)
});

module.exports = {
    getAllMessages,
}
