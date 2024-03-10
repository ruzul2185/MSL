const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

const loginPage = (req, res, next) => {
    res.render('login',{message: req.flash()});
}

const login = asyncHandler(async (req, res, next)=> {
    const { username, password } = req.body;

    if(!username || !password){
        return res.status(400).json({message: 'All fields are required'})
    }

    const foundUser = await User.findOne({username}).exec();
    if(!foundUser || !foundUser.active) {
        // return res.status(400).json({message:'Username is inactive'})
        req.flash('error', "Username is inactive")
        return res.redirect('/auth')
    }

    if(foundUser.role !== 'Admin') {
        // return res.status(400).json({message:'Unauthorized'})
        req.flash('error', "Unauthorized")
        return res.redirect('/auth')
    }

    const match = await bcrypt.compare(password, foundUser.password)
    if(!match){
        // return res.status(401).json({message:'Username or Password is incorrect'})
        req.flash('error','Username or Password is incorrect')
        return res.redirect('/auth')
    }
    req.session.data = {
        username: foundUser.username,
    }
    req.session.isAuth = true

    res.redirect('dashboard',)
})

const logoutFunction = (req, res, next) => {
    req.session.destroy((err) => {
        if(err) throw err
        res.redirect('/auth')
    });
}


module.exports = {
    loginPage,
    login,
    logoutFunction
}
