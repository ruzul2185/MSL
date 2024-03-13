const asyncHandler = require('express-async-handler');
const MemberModel = require('../models/Member');

const getAllMembers = asyncHandler(async(req, res, next)=> {
    const MemberList = await MemberModel.find({Type:"Member"}).exec();

    res.json(MemberList)
});

module.exports = {
    getAllMembers,
}
