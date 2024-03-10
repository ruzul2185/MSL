const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const dynamicMenu = require('../config/dynamicMenu');

const dashboardPage = asyncHandler(async (req, res, next) => {
    const username = req.session.data.username;

    const collectionData = await dynamicMenu();

    //Data for Donut Chart
    const adminUsers = await User.find({ role: 'Admin' }).countDocuments();
    const normalUsers = await User.find({ role: 'User' }).countDocuments();
    const userArray = [];
    userArray.push(adminUsers);
    userArray.push(normalUsers);

    //Users Count
    const userCount = adminUsers + normalUsers;

    res.render('dashboard',{
        username: username,
        sideMenu: collectionData,
        userCount: userCount,
        userArray: userArray,
    })
})

module.exports = {
    dashboardPage,

}
