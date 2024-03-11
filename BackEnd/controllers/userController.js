const User = require('../models/User');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const dynamicMenu = require('../config/dynamicMenu');
const bcrypt = require("bcrypt");

const viewUserPage = asyncHandler(async (req, res, next) => {

    const resultPerPage = 10;
    let { page } = req.query;
    const numOfUsers = await User.find().countDocuments();
    const numOfPages = Math.ceil(numOfUsers / resultPerPage);
    // page = page ? Number(page) : 1;
    page = page ? (isNaN(Number(page)) ? 1 : Number(page)) : 1;
    const skip = (page - 1)*resultPerPage;
    if(page > numOfPages){
        res.redirect('/users/?page=' + encodeURIComponent(numOfPages));
    }else if(page < 1){
        res.redirect('/users/?page=' + encodeURIComponent('1'));
    }
    let id = page > 1 ? (page-1)*10 + 1 : 1;
    const users = await User.find().limit(resultPerPage).skip(skip).exec();

    const modifiedData = users.map((user,index) => {
        return {
            ...user.toObject(),
            _id: user._id.toHexString(),
            id: id + index,
            createdAt: new Date(user.createdAt).toLocaleString(),
            updatedAt: new Date(user.updatedAt).toLocaleString(),
        };
    });
    let iterator = (page - 5) < 1? 1 : page - 5;
    let endingLink = (iterator + 9) <= numOfPages ? (iterator + 0) : page + (numOfPages - page);
    const collectionData = await dynamicMenu();
    res.render('users',{
        sideMenu: collectionData,
        users: modifiedData,
        page: page,
        endingLink: endingLink,
        iterator: iterator,
        numOfPages: numOfPages,
        message: req.flash(),
        title: 'users',
    });
});

const addUserPage = asyncHandler(async (req, res, next) => {
    const collectionData = await dynamicMenu();
   res.render('users/add-user',{
       sideMenu: collectionData,
       message: req.flash(),
       user:false,
   });
});

const addUser = asyncHandler(async (req, res, next) => {
    const {username , password, role} = req.body

    const active = Number(req.body.active);

    if(!username || !password || !role) {
        req.flash('error','All fields are required')
        return res.redirect('/users/add');
    }

    const duplicate = await User.findOne({username}).lean().exec();
    if(duplicate) {
         req.flash('error', 'Duplicate Username')
        return res.redirect('/users/add');
    }

    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { username, "password": hashedPwd, role , active };

    const user = await User.create(userObject);

    if(user) {
        req.flash('success',`New user ${username} created`);
        res.redirect('/users/add');
    }else {
        req.flash('error',`Problem occurred try again`);
        res.redirect('/users/add');
    }

});

const updateUserPage = asyncHandler(async(req, res, next) => {
    const { id, page } = req.query

    const user = await User.findById(id).exec();
    if(!user) {
        req.flash('error','User does not exist')
        return res.redirect('/users/?page=' + encodeURIComponent(page));
    }

    const collectionData = await dynamicMenu();
    res.render('users/add-user',{
        sideMenu: collectionData,
        message: req.flash(),
        user: user,
        page: page,
    });
});

const updateUser = asyncHandler(async(req, res, next) => {

   const {id, username, password , role, active, page } = req.body

   const oldUser = await User.findById(id).exec();

   const duplicate = await User.findOne({ username }).lean().exec();
    // if(duplicate && duplicate?._id.toString() !== id) {
    //     req.flash('error','Duplicate username')
    //     return res.redirect(`/users/update/?id=${id}&page=`+encodeURIComponent(page))
    // }
    if(oldUser.username === username && oldUser._id !== id){
        req.flash('error','Duplicate username')
        return res.redirect(`/users/update/?id=${id}&page=`+encodeURIComponent(page))
    }
    if(password !== oldUser.password) {
        oldUser.password = await bcrypt.hash(password, 10) // salt rounds
    }
    oldUser.username = username
    oldUser.role = role
    oldUser.active = active

    const updatedUser = await oldUser.save();

    if(updatedUser){
        req.flash('success',`${updatedUser.username} updated`);
        res.redirect('/users/?page='+encodeURIComponent(page))
    }

});

const deleteUser = asyncHandler(async(req, res, next) => {
    const { id, page } = req.query

    const user = await User.findById(id).exec();
    const username = user.username;
    if(!user) {
         req.flash('error','User does not exist')
        return res.redirect('/users/?page=' + encodeURIComponent(page));
    }

    const result = await user.deleteOne()

    if(result) {
        req.flash('success',`user ${username} deleted`);
        res.redirect('/users/?page=' + encodeURIComponent(page));
    } else {
        req.flash('error','Something went wrong!');
        res.redirect('/users/?page=' + encodeURIComponent(page));
    }


});

module.exports = {
    viewUserPage,
    addUserPage,
    addUser,
    deleteUser,
    updateUserPage,
    updateUser,
}
